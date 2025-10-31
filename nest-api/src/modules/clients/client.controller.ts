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
import {
  ClientModel,
  GetClientsWithSalesCountModel,
  ListOfBooksByClientModel,
} from './client.model';
import { ClientService } from './client.service';
import { CreateClientDto, GetClientsDto, UpdateClientDto } from './client.dto';

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

  @Get(':id/books')
  public async getClientsBooks(
    @Param('id') id: string,
    @Query() input: GetClientsDto,
  ): Promise<ListOfBooksByClientModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC'];

    return this.clientService.getClientsBooks({
      ...input,
      sort: {
        [property]: direction,
      },
      clientId: id,
    });
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Patch(':id')
  updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
