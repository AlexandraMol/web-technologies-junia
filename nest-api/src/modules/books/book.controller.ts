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
import { CreateBookDto, GetBooksDto, UpdateBookDto } from './book.dto';
import {
  GetBooksModel,
  GetBooksWithNumberOfClientsModel,
  ListOfClientsByBookModel,
} from './book.model';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(
    @Query() input: GetBooksDto,
  ): Promise<GetBooksWithNumberOfClientsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC'];

    return this.bookService.getAllBooksWithNumberOfClients({
      ...input,
      sort: {
        [property]: direction,
      },
    });
  }

  @Get(':id')
  public async getBook(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Get(':id/clients')
  public async getBooksClients(
    @Param('id') id: string,
    @Query() input: GetBooksDto,
  ): Promise<ListOfClientsByBookModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    return this.bookService.getBooksClients({
      ...input,
      sort: {
        [property]: direction,
      },
      bookId: id,
    });
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
