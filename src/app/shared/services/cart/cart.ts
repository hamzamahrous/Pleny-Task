import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Auth } from '../../../auth/services/auth';
import { CartModel } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private http = inject(HttpClient);
  private auth = inject(Auth);

  private cartId = signal(1);

  private _cartCount = signal(0);
  readonly cartCount = this._cartCount.asReadonly();

  // If cartId == 0 then we didn't initiate a cart for the user yet
  userHasCart = computed<boolean>(() => this.cartId() !== 0);

  // NOTE: I should have initiated cartId with value = 0 so the first updateCart function call will make a new cart and then use this cartId
  // But DummyJSON won't actually add any data to the server so in the second call we would have errors due to the PUT call with the new cartId
  // So I just wrote the right code but initiated it with value = 1 to avoid errors

  updateCart(newProducts: { id: number; quantity: number }[]): Observable<CartModel> {
    if (this.userHasCart()) {
      return this.http
        .put<CartModel>(`https://dummyjson.com/carts/${this.cartId()}`, {
          merge: true,
          products: newProducts,
        })
        .pipe(
          tap((res) => {
            this._cartCount.set(res.totalProducts);
          })
        );
    } else {
      return this.http
        .post<CartModel>('https://dummyjson.com/carts/add', {
          userId: this.auth.userId(),
          products: newProducts,
        })
        .pipe(
          tap((res) => {
            console.log(res);
            this.cartId.set(res.id);
            this._cartCount.set(res.totalProducts);
          })
        );
    }
  }
}
