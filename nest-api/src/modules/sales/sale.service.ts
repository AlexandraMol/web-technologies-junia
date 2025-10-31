import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel, SaleModel } from './sale.model';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  //   public async getAllBooks(
  //     input?: FilterBooksModel,
  //   ): Promise<[BookModel[], number]> {
  //     return this.bookRepository.getAllBooks(input);
  //   }

  //   public async getBookById(id: string): Promise<BookModel | undefined> {
  //     return this.bookRepository.getBookById(id);
  //   }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.createSale(sale);
  }

  //   public async updateBook(
  //     id: string,
  //     book: UpdateBookModel,
  //   ): Promise<BookModel | undefined> {
  //     const oldBook = await this.getBookById(id);
  //     if (!oldBook) {
  //       return undefined;
  //     }

  //     return this.bookRepository.updateBook(id, book);
  //   }

  //   public async deleteBook(id: string): Promise<void> {
  //     await this.bookRepository.deleteBook(id);
  //   }
}
