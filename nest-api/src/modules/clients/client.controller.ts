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
import { GetClientsModel } from './client.model';
import { ClientService } from './client.service';
import { CreateClientDto, GetClientsDto } from './client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(@Query() input: GetClientsDto): Promise<GetClientsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    const [clients, totalCount] = await this.clientService.getAllClients({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: clients,
      totalCount,
    };
  }

  //   @Get(':id')
  //   public async getBook(@Param('id') id: string) {
  //     return this.bookService.getBookById(id);
  //   }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
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
