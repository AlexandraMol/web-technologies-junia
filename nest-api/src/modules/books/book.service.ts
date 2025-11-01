import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  GetBooksClientsInput,
  GetBooksWithNumberOfClientsModel,
  ListOfClientsByBookModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getAllBooksWithNumberOfClients(
    input?: FilterBooksModel,
  ): Promise<GetBooksWithNumberOfClientsModel> {
    const [books, totalCount] =
      await this.bookRepository.getAllBooksWithNumberOfClients(input);

    return {
      totalCount,
      data: books,
    };
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    return this.bookRepository.getBookById(id);
  }

  public async getBooksClients(
    input: GetBooksClientsInput,
  ): Promise<ListOfClientsByBookModel> {
    const [clients, totalCount] =
      await this.bookRepository.getBooksClients(input);

    return {
      totalCount,
      data: clients,
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.getBookById(id);
    if (!oldBook) {
      return undefined;
    }

    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
