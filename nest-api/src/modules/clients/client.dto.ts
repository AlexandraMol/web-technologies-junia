import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  pictureUrl?: string;
}

// export class UpdateBookDto {
//   @IsString()
//   @IsOptional()
//   title: string;

//   @IsUUID(4)
//   @IsOptional()
//   authorId: AuthorId;

//   @IsInt()
//   @Min(1500)
//   @Max(2025)
//   @IsOptional()
//   yearPublished: number;
// }

export class GetClientsDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
