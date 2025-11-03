import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { DataSource, Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { BookEntity } from '../books/book.entity';
import { ClientEntity, ClientId } from '../clients/client.entity';
import { CreateSaleModel, SaleModel } from './sale.model';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    const client = await this.clientRepository.findOne({
      where: { id: sale.clientId },
    });

    if (!client) {
      throw new Error('Client not found');
    }
    const book = await this.bookRepository.findOne({
      where: { id: sale.bookId },
    });
    if (!book) {
      throw new Error('Book not found');
    }

    return this.saleRepository.save(this.saleRepository.create(sale));
  }
}
