export type ClientModel = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  pictureUrl?: string;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  pictureUrl?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;

export type FilterClientsModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>;
};

export type GetClientsModel = {
  totalCount: number;
  data: ClientModel[];
};
