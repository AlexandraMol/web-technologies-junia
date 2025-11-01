import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { BookEntity } from '../books/book.entity';
import { BookRepository } from '../books/book.repository';
import { ClientRepository } from '../clients/client.repository';
import { ClientEntity } from '../clients/client.entity';
import { SaleRepository } from '../sales/sale.repository';
import { SaleEntity } from '../sales/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      BookEntity,
      ClientEntity,
      SaleEntity,
    ]),
  ],
  controllers: [AuthorController],
  providers: [
    AuthorRepository,
    AuthorService,
    BookRepository,
    ClientRepository,
    SaleRepository,
  ],
})
export class AuthorModule {}
