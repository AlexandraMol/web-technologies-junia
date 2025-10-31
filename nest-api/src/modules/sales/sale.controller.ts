import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  //   @Get()
  //   async getBooks(@Query() input: GetBooksDto): Promise<GetBooksModel> {
  //     const [property, direction] = input.sort
  //       ? input.sort.split(',')
  //       : ['title', 'ASC'];

  //     const [books, totalCount] = await this.bookService.getAllBooks({
  //       ...input,
  //       sort: {
  //         [property]: direction,
  //       },
  //     });

  //     return {
  //       data: books,
  //       totalCount,
  //     };
  //   }

  //   @Get(':id')
  //   public async getBook(@Param('id') id: string) {
  //     return this.bookService.getBookById(id);
  //   }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.createSale(createSaleDto);
  }

  //   @Patch(':id')
  //   updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //     return this.bookService.updateBook(id, updateBookDto);
  //   }

  //   @Delete(':id')
  //   deleteBook(@Param('id') id: string) {
  //     return this.bookService.deleteBook(id);
  //   }
}
