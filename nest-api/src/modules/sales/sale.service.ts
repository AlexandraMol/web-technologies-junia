import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel, SaleModel } from './sale.model';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.createSale(sale);
  }
}
