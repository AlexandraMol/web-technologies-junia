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
import { AuthorService } from './author.service';
import { CreateAuthorDto, GetAuthorsDto, UpdateAuthorDto } from './author.dto';
import {
  GetAuthorsWithNumberOfBooksModel,
  ListOfBooksByAuthorModel,
} from './author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(
    @Query() input: GetAuthorsDto,
  ): Promise<GetAuthorsWithNumberOfBooksModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    return this.authorService.getAllAuthorsWithNumberOfBooks({
      ...input,
      sort: {
        [property]: direction,
      },
    });
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  public async getAuthor(@Param('id') id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Get(':id/books')
  public async getBooksByAuthor(
    @Param('id') id: string,
    @Query() input: GetAuthorsDto,
  ): Promise<ListOfBooksByAuthorModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC'];

    return this.authorService.getBooksByAuthor({
      ...input,
      sort: {
        [property]: direction,
      },
      authorId: id,
    });
  }

  @Patch(':id')
  updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
