import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookModel,
  BookWithNumberOfClients,
  CreateBookModel,
  FilterBooksModel,
  GetBooksClientsInput,
  UpdateBookModel,
} from './book.model';
import { BookEntity, BookId } from './book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { ClientModel } from '../clients/client.model';
import { ClientEntity } from '../clients/client.entity';
import { BookWithClientsRaw } from './book.module';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    private readonly dataSource: DataSource,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const qb = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (input?.sort) {
      const [property, direction] = Object.entries(input.sort)[0];
      if (property === 'author') {
        qb.orderBy('author.lastName', direction);
      } else {
        qb.orderBy(`book.${property}`, direction);
      }
    }

    if (input?.limit) qb.take(input.limit);
    if (input?.offset) qb.skip(input.offset);

    const [books, totalCount] = await qb.getManyAndCount();
    return [books, totalCount];
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    const book = await this.bookRepository.findOne({
      where: { id: id as BookId },
    });

    if (!book) {
      return undefined;
    }

    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...book,
      author,
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId },
    });

    if (!author) {
      throw new Error('Author not found');
    }

    return this.bookRepository.save(this.bookRepository.create(book));
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.bookRepository.findOne({
      where: { id: id as BookId },
    });

    if (!oldBook) {
      return undefined;
    }

    await this.bookRepository.update(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

  public async deleteBooks(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) => transactionalEntityManager.delete(BookEntity, { id })),
      );
    });
  }

  public async getAllBooksWithNumberOfClients(
    input?: FilterBooksModel,
  ): Promise<[BookWithNumberOfClients[], number]> {
    const qb = this.buildBooksWithNumberOfClientsQuery(input);

    const [entities, totalCount] = await qb.getManyAndCount();
    const raw = await qb.getRawMany<BookWithClientsRaw>();

    const books = this.mapBooksWithNumberOfClients(entities, raw);

    return [books, totalCount];
  }

  public async getBooksClients(
    input: GetBooksClientsInput,
  ): Promise<[ClientModel[], number]> {
    const qb = this.buildBooksClientsQuery(input);

    const [clients, totalCount] = await qb.getManyAndCount();

    const data = this.mapBooksClients(clients);

    return [data, totalCount];
  }

  private buildBooksWithNumberOfClientsQuery(
    input?: FilterBooksModel,
  ): SelectQueryBuilder<BookEntity> {
    const qb = this.bookRepository
      .createQueryBuilder('book')
      // join sales to count distinct clients
      .leftJoin(SaleEntity, 'sale', 'sale.bookId = book.id')
      // join author to get first/last name
      .leftJoin('book.author', 'author')
      .addSelect('COUNT(DISTINCT sale.clientId)', 'clientsCount')
      .addSelect('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .groupBy('book.id')
      .addGroupBy('book.title')
      .addGroupBy('book.yearPublished')
      .addGroupBy('book.pictureUrl')
      .addGroupBy('book.authorId')
      .addGroupBy('author.firstName')
      .addGroupBy('author.lastName');

    if (input?.sort) {
      qb.orderBy(this.mapSortToQueryOrder(input.sort, 'book'));
    }
    if (input?.limit !== undefined) {
      qb.take(input.limit);
    }
    if (input?.offset !== undefined) {
      qb.skip(input.offset);
    }

    return qb;
  }

  private buildBooksClientsQuery(
    input: GetBooksClientsInput,
  ): SelectQueryBuilder<ClientEntity> {
    const qb = this.clientRepository
      .createQueryBuilder('client')
      .innerJoin(SaleEntity, 'sale', 'sale.clientId = client.id')
      .where('sale.bookId = :bookId', { bookId: input.bookId })
      .distinct(true);

    if (input?.sort) {
      qb.orderBy(this.mapSortToQueryOrder(input.sort, 'client'));
    }
    if (input?.limit !== undefined) {
      qb.take(input.limit);
    }
    if (input?.offset !== undefined) {
      qb.skip(input.offset);
    }

    return qb;
  }

  private mapSortToQueryOrder(
    sort: NonNullable<FilterBooksModel['sort']>,
    entity: string,
  ): Record<string, 'ASC' | 'DESC'> {
    return Object.fromEntries(
      Object.entries(sort).map(([key, dir]) => [`${entity}.${key}`, dir]),
    );
  }

  private mapBooksWithNumberOfClients(
    entities: BookEntity[],
    raw: BookWithClientsRaw[],
  ): BookWithNumberOfClients[] {
    return entities.map((entity, index) => ({
      book: {
        id: entity.id,
        title: entity.title,
        yearPublished: entity.yearPublished,
        pictureUrl: entity.pictureUrl,
        author: {
          firstName: raw[index]?.author_firstName ?? '',
          lastName: raw[index]?.author_lastName ?? '',
        },
      },
      numberOfClients: Number(raw[index]?.clientsCount ?? 0),
    }));
  }

  private mapBooksClients(clients: ClientEntity[]): ClientModel[] {
    return clients.map((client) => ({
      id: client.id.toString(),
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      pictureUrl: client.pictureUrl,
    }));
  }
}
