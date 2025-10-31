import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import {
  ClientModel,
  CreateClientModel,
  FilterClientsModel,
  GetClientsWithSalesCountModel,
} from './client.model';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    return this.clientRepository.getAllClients(input);
  }

  public async getAllClientsWithSalesCount(
    input?: FilterClientsModel,
  ): Promise<GetClientsWithSalesCountModel> {
    const [clients, totalCount] =
      await this.clientRepository.getAllClientsWithSalesCount(input);

    return {
      totalCount,
      data: clients,
    };
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    return this.clientRepository.getClientById(id);
  }

  // public async getClientDetails(id: string): Promise<ClientDetailsModel> {
  //   const client = await this.getClientById(id);

  //   if (!client) {
  //     throw new NotFoundException('Client not found');
  //   }

  //   const numberOfBooksBought = await this.saleRepository.countByClientId(id);

  //   return {
  //     data: client,
  //     numberOfBooksBought,
  //   };
  // }

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
