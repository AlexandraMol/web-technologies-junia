import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { ClientController } from './client.controller';
import { SaleRepository } from '../sales/sale.repository';
import { SaleEntity } from '../sales/sale.entity';
import { BookEntity } from '../books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, SaleEntity, BookEntity])],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService, SaleRepository],
})
export class ClientsModule {}
