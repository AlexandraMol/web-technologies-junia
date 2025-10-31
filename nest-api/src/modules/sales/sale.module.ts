import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleRepository } from './sale.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity, BookEntity])],
  //   controllers: [SalesController],
  providers: [SaleRepository],
})
export class SalesModule {}
