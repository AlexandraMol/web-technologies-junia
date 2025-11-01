import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
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
}
