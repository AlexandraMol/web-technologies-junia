import { ClientId } from '../clients/client.entity';
import { BookId } from '../books/entities/book.entity';

export type CreateSaleModel = {
  soldAt: Date;
  clientId: ClientId;
  bookId: BookId;
};

export type SaleModel = {
  id: string;
  soldAt: Date;
  clientId: ClientId;
  bookId: BookId;
};
