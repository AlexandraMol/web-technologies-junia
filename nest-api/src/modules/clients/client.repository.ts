import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ClientEntity, ClientId } from './client.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import {
  ClientModel,
  ClientWithSalesCountModel,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
} from './client.model';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
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

  public async getAllClientsWithSalesCount(
    input?: FilterClientsModel,
  ): Promise<[ClientWithSalesCountModel[], number]> {
    const qb = this.buildClientsWithSalesCountQuery(input);

    const [entities, totalCount] = await qb.getManyAndCount();
    const raw = await qb.getRawMany();

    const clients = this.mapClientsWithSalesCount(entities, raw);

    return [clients, totalCount];
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
      qb.orderBy(this.mapSortToQueryOrder(input.sort));
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
  ): Record<string, 'ASC' | 'DESC'> {
    return Object.fromEntries(
      Object.entries(sort).map(([key, dir]) => [`client.${key}`, dir]),
    );
  }
  private mapClientsWithSalesCount(
    entities: ClientEntity[],
    raw: any[],
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
}
