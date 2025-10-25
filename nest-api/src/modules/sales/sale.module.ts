import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity, BookEntity])],
//   controllers: [ClientsController],
//   providers: [ClientsService],
})
export class SalesModule {}

