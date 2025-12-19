import { Product } from './product.model';

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
