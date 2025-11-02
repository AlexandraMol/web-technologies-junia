import { Injectable } from '@nestjs/common';
import {
  AuthorModel,
  AuthorWithStatsModel,
  CreateAuthorModel,
  FilterAuthorsModel,
  GetAuthorsBooksInput,
  GetAuthorsWithNumberOfBooksModel,
  ListOfBooksByAuthorModel,
  UpdateAuthorModel,
} from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(
    input?: FilterAuthorsModel,
  ): Promise<[AuthorModel[], number]> {
    return this.authorRepository.getAllAuthors(input);
  }

  public async getAllAuthorsWithNumberOfBooks(
    input?: FilterAuthorsModel,
  ): Promise<GetAuthorsWithNumberOfBooksModel> {
    const [authors, totalCount] =
      await this.authorRepository.getAllAuthorsWithNumberOfBooks(input);

    return {
      totalCount,
      data: authors,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    const oldAuthor = await this.getAuthorById(id);
    if (!oldAuthor) {
      return undefined;
    }

    return this.authorRepository.updateAuthor(id, author);
  }

  public async getBooksByAuthor(
    input: GetAuthorsBooksInput,
  ): Promise<ListOfBooksByAuthorModel> {
    const [books, totalCount] =
      await this.authorRepository.getBooksByAuthor(input);

    return {
      totalCount,
      data: books,
    };
  }

  public async getAuthorById(
    id: string,
  ): Promise<AuthorWithStatsModel | undefined> {
    const author = await this.authorRepository.getAuthorById(id);
    if (!author) {
      return undefined;
    }

    const [booksCount, salesCount] = await Promise.all([
      this.authorRepository.countBooksOfAuthor(id),
      this.authorRepository.countSalesOfAuthorBooks(id),
    ]);

    const averageSalesPerBook =
      Math.round((booksCount > 0 ? salesCount / booksCount : 0) * 100) / 100;

    return {
      ...author,
      stats: {
        booksCount,
        salesCount,
        averageSalesPerBook,
      },
    };
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
