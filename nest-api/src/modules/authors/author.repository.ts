import { Injectable } from '@nestjs/common';
import {
  AuthorModel,
  AuthorWithNumberOfBooks,
  CreateAuthorModel,
  FilterAuthorsModel,
  GetAuthorsBooksInput,
  UpdateAuthorModel,
  AuthorWithBooksCountRaw,
} from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BookEntity } from '../books/book.entity';
import { BookModelWithNoAuthor } from '../books/book.model';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllAuthors(
    input?: FilterAuthorsModel,
  ): Promise<[AuthorModel[], number]> {
    const [authors, totalCount] = await this.authorRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });

    return [authors, totalCount];
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
    const author = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...author,
    };
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    const oldAuthor = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!oldAuthor) {
      return undefined;
    }

    await this.authorRepository.update(id, author);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }

  public async getAllAuthorsWithNumberOfBooks(
    input?: FilterAuthorsModel,
  ): Promise<[AuthorWithNumberOfBooks[], number]> {
    const qb = this.buildAuthorsWithNumberOfBooksQuery(input);

    const [entities, totalCount] = await qb.getManyAndCount();
    const raw = await qb.getRawMany<AuthorWithBooksCountRaw>();

    const authors = this.mapAuthorsWithNumberOfBooks(entities, raw);

    return [authors, totalCount];
  }

  public async getBooksByAuthor(
    input: GetAuthorsBooksInput,
  ): Promise<[BookModelWithNoAuthor[], number]> {
    const qb = this.buildBooksByAuthorQuery(input);

    const [books, totalCount] = await qb.getManyAndCount();
    const data = this.mapBooksByAuthor(books);

    return [data, totalCount];
  }

  private buildAuthorsWithNumberOfBooksQuery(
    input?: FilterAuthorsModel,
  ): SelectQueryBuilder<AuthorEntity> {
    const qb = this.authorRepository
      .createQueryBuilder('author')
      .leftJoin(BookEntity, 'book', 'book.authorId = author.id')
      .addSelect('COUNT(book.id)', 'booksCount')
      .groupBy('author.id')
      .addGroupBy('author.firstName')
      .addGroupBy('author.lastName')
      .addGroupBy('author.pictureUrl');

    if (input?.sort) {
      qb.orderBy(this.mapSortToQueryOrder(input.sort, 'author'));
    }
    if (input?.limit !== undefined) {
      qb.take(input.limit);
    }
    if (input?.offset !== undefined) {
      qb.skip(input.offset);
    }

    return qb;
  }

  private buildBooksByAuthorQuery(
    input: GetAuthorsBooksInput,
  ): SelectQueryBuilder<BookEntity> {
    const qb = this.bookRepository
      .createQueryBuilder('book')
      .where('book.authorId = :authorId', { authorId: input.authorId });

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

  public async countBooksOfAuthor(authorId: string): Promise<number> {
    return this.bookRepository
      .createQueryBuilder('book')
      .where('book.authorId = :authorId', { authorId })
      .getCount();
  }

  public async countSalesOfAuthorBooks(authorId: string): Promise<number> {
    return this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin('sale.book', 'book')
      .where('book.authorId = :authorId', { authorId })
      .getCount();
  }

  private mapSortToQueryOrder(
    sort: NonNullable<FilterAuthorsModel['sort']>,
    entity: string,
  ): Record<string, 'ASC' | 'DESC'> {
    return Object.fromEntries(
      Object.entries(sort).map(([key, dir]) => [`${entity}.${key}`, dir]),
    );
  }

  private mapAuthorsWithNumberOfBooks(
    entities: AuthorEntity[],
    raw: AuthorWithBooksCountRaw[],
  ): AuthorWithNumberOfBooks[] {
    return entities.map((entity, index) => ({
      author: {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        pictureUrl: entity.pictureUrl,
      },
      numberOfBooks: Number(raw[index]?.booksCount ?? 0),
    }));
  }

  private mapBooksByAuthor(books: BookEntity[]): BookModelWithNoAuthor[] {
    return books.map((book) => ({
      id: book.id.toString(),
      title: book.title,
      yearPublished: book.yearPublished,
      pictureUrl: book.pictureUrl,
    }));
  }
}
