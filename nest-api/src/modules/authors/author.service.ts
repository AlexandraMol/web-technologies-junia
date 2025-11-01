import { Injectable } from '@nestjs/common';
import {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
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
}
