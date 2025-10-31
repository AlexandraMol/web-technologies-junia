import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import {
  ClientModel,
  CreateClientModel,
  FilterClientsModel,
} from './client.model';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    return this.clientRepository.getAllClients(input);
  }

  //   public async getBookById(id: string): Promise<BookModel | undefined> {
  //     return this.bookRepository.getBookById(id);
  //   }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.createClient(client);
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

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
