import { Injectable } from '@nestjs/common';
import {
  AuthorModel,
  CreateAuthorModel,
  FilterAuthorsModel,
  GetAuthorsWithNumberOfBooksModel,
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

  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
    return this.authorRepository.getAuthorById(id);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
