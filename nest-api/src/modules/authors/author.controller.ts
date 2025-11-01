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
import { GetAuthorsModel } from './author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(@Query() input: GetAuthorsDto): Promise<GetAuthorsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    const [authors, totalCount] = await this.authorService.getAllAuthors({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: authors,
      totalCount,
    };
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  public async getAuthor(@Param('id') id: string) {
    return this.authorService.getAuthorById(id);
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
