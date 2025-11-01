import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookModel,
  BookWithNumberOfClients,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookEntity, BookId } from './entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { raw } from 'express';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const [books, totalCount] = await this.bookRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      relations: { author: true },
      order: input?.sort,
    });

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
    const raw = await qb.getRawMany();

    const books = this.mapBooksWithNumberOfClients(entities, raw);

    return [books, totalCount];
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
    raw: any[],
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
}
