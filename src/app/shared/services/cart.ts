import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface cartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface CartModel {
  id: number;
  products: cartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private http = inject(HttpClient);
  cartCount = signal(0);

  getCart(): Observable<CartModel> {
    return this.http.get<CartModel>('https://dummyjson.com/carts/1');
  }

  incrementCartCount() {
    this.cartCount.update((val) => val + 1);
  }

  updateCart(
    merge: boolean,
    newProducts: { id: number; quantity: number }[]
  ): Observable<CartModel> {
    return this.http.put<CartModel>('https://dummyjson.com/carts/1', {
      merge,
      products: newProducts,
    });
  }
}
