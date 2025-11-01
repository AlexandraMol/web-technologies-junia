import { AuthorId } from '../authors/author.entity';
import { ClientModel } from '../clients/client.model';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  pictureUrl: string;
};

export type BookWithNumberOfClients = {
  book: BookModel;
  numberOfClients: number;
};

export type GetBooksClientsInput = {
  bookId: string;
  limit?: number;
  offset?: number;
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>;
};

export type ListOfClientsByBookModel = {
  totalCount: number;
  data: ClientModel[];
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
  pictureUrl: string;
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
