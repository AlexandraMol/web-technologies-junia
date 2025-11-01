import { AuthorId } from '../authors/author.entity';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  pictureUrl?: string;
};

export type BookWithNumberOfClients = {
  book: BookModel;
  numberOfClients: number;
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookModel[];
};

export type GetBooksWithNumberOfClientsModel = {
  totalCount: number;
  data: BookWithNumberOfClients[];
};
