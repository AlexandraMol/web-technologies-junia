import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  pictureUrl: string;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  pictureUrl: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;

export type GetAuthorsModel = {
  totalCount: number;
  data: AuthorModel[];
};

export type FilterAuthorsModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof AuthorModel, 'ASC' | 'DESC'>>;
};
