import { IsDate, IsUUID } from 'class-validator';
import type { BookId } from '../books/book.entity';
import type { ClientId } from '../clients/client.entity';

export class CreateSaleDto {
  @IsDate()
  soldAt: Date;
  @IsUUID(4)
  clientId: ClientId;
  @IsUUID(4)
  bookId: BookId;
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

// export class GetBooksDto {
//   @IsInt()
//   @Min(1)
//   @Max(100)
//   limit: number;

//   @IsInt()
//   @Min(0)
//   offset: number;

//   @IsString()
//   @IsOptional()
//   sort?: string;
// }
