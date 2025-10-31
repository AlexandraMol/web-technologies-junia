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
import { ClientModel, GetClientsWithSalesCountModel } from './client.model';
import { ClientService } from './client.service';
import { CreateClientDto, GetClientsDto } from './client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(
    @Query() input: GetClientsDto,
  ): Promise<GetClientsWithSalesCountModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    return this.clientService.getAllClientsWithSalesCount({
      ...input,
      sort: {
        [property]: direction,
      },
    });
  }

  @Get(':id')
  public async getClient(
    @Param('id') id: string,
  ): Promise<ClientModel | undefined> {
    return this.clientService.getClientById(id);
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  //   @Patch(':id')
  //   updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //     return this.bookService.updateBook(id, updateBookDto);
  //   }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
