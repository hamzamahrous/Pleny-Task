import { cartProduct } from './cart-product.model';

export interface CartModel {
  id: number;
  products: cartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
