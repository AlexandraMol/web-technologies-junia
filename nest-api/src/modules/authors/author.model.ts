import { BookModelWithNoAuthor } from '../books/book.model';
import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  pictureUrl: string;
};

export type AuthorWithNumberOfBooks = {
  author: AuthorModel;
  numberOfBooks: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  pictureUrl: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;

export type GetAuthorsModel = {
  totalCount: number;
  data: AuthorModel[];
};

export type GetAuthorsWithNumberOfBooksModel = {
  totalCount: number;
  data: AuthorWithNumberOfBooks[];
};

export type FilterAuthorsModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof AuthorModel, 'ASC' | 'DESC'>>;
};

export type GetAuthorsBooksInput = {
  authorId: string;
  limit?: number;
  offset?: number;
  sort?: Partial<Record<keyof BookModelWithNoAuthor, 'ASC' | 'DESC'>>;
};

export type ListOfBooksByAuthorModel = {
  totalCount: number;
  data: BookModelWithNoAuthor[];
};
