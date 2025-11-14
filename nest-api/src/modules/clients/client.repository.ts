import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ClientEntity, ClientId } from './client.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import {
  BookPurchasedByClientModel,
  ClientModel,
  ClientWithSalesCountModel,
  ClientWithSalesCountRaw,
  CreateClientModel,
  FilterClientsModel,
  GetClientBooksInput,
  UpdateClientModel,
} from './client.model';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    const [clients, totalCount] = await this.clientRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });

    return [clients, totalCount];
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return undefined;
    }

    return {
      ...client,
    };
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!oldClient) {
      return undefined;
    }

    await this.clientRepository.update(id, client);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }

  public async deleteClients(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) =>
          transactionalEntityManager.delete(ClientEntity, { id }),
        ),
      );
    });
  }

  public async getAllClientsWithSalesCount(
    input?: FilterClientsModel,
  ): Promise<[ClientWithSalesCountModel[], number]> {
    const qb = this.buildClientsWithSalesCountQuery(input);

    const [entities, totalCount] = await qb.getManyAndCount();
    const raw = await qb.getRawMany<ClientWithSalesCountRaw>();

    const clients = this.mapClientsWithSalesCount(entities, raw);

    return [clients, totalCount];
  }

  public async getClientsBooks(
    input: GetClientBooksInput,
  ): Promise<[BookPurchasedByClientModel[], number]> {
    const qb = this.buildClientsBooksQuery(input);

    const totalCount = await qb.getCount();

    qb.select([
      'sale.id',
      'sale.soldAt',
      'book.id',
      'book.title',
      'author.firstName',
      'author.lastName',
    ]);

    const sales = await qb.getMany();

    const data = this.mapClientsBooks(sales);

    return [data, totalCount];
  }

  private buildClientsWithSalesCountQuery(
    input?: FilterClientsModel,
  ): SelectQueryBuilder<ClientEntity> {
    const qb = this.clientRepository
      .createQueryBuilder('client')
      .leftJoin(SaleEntity, 'sale', 'sale.clientId = client.id')
      .addSelect('COUNT(sale.id)', 'salesCount')
      .groupBy('client.id');

    if (input?.sort) {
      qb.orderBy(this.mapSortToQueryOrder(input.sort, 'client'));
    }
    if (input?.limit !== undefined) {
      qb.take(input.limit);
    }
    if (input?.offset !== undefined) {
      qb.skip(input.offset);
    }

    return qb;
  }

  private buildClientsBooksQuery(
    input: GetClientBooksInput,
  ): SelectQueryBuilder<SaleEntity> {
    const qb = this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin('sale.book', 'book')
      .innerJoin('book.author', 'author')
      .where('sale.clientId = :clientId', { clientId: input.clientId });

    if (input?.sort) {
      qb.orderBy(this.mapSortToQueryOrder(input.sort, 'book'));
    }
    if (input?.limit !== undefined) {
      qb.take(input.limit);
    }
    if (input?.offset !== undefined) {
      qb.skip(input.offset);
    }

    return qb;
  }
  private mapSortToQueryOrder(
    sort: NonNullable<FilterClientsModel['sort']>,
    entity: string,
  ): Record<string, 'ASC' | 'DESC'> {
    return Object.fromEntries(
      Object.entries(sort).map(([key, dir]) => [`${entity}.${key}`, dir]),
    );
  }
  private mapClientsWithSalesCount(
    entities: ClientEntity[],
    raw: ClientWithSalesCountRaw[],
  ): ClientWithSalesCountModel[] {
    return entities.map((entity, index) => ({
      client: {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        pictureUrl: entity.pictureUrl,
      },
      numberOfBooksBought: Number(raw[index]?.salesCount ?? 0),
    }));
  }
  private mapClientsBooks(sales: SaleEntity[]): BookPurchasedByClientModel[] {
    return sales.map((sale) => ({
      id: sale.book.id.toString(),
      title: sale.book.title,
      soldAt: sale.soldAt,
      author: {
        firstName: sale.book.author.firstName,
        lastName: sale.book.author.lastName,
      },
    }));
  }
}
