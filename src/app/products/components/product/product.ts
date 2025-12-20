import { Component, computed, inject, input, signal } from '@angular/core';
import { Product as ProductModel } from '../../models/product.model';
import { Cart } from '../../../shared/services/cart/cart';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  product = input.required<ProductModel>();
  isInCart = signal(false);
  isLoading = signal(false);
  error = signal(false);

  private cartService = inject(Cart);

  newPrice = computed<number>(() => {
    const discountValue = this.product().price * (this.product().discountPercentage / 100);
    return Number((this.product().price - discountValue).toFixed(2));
  });

  addToCart() {
    this.error.set(false);

    if (this.isInCart()) {
      return;
    }

    this.isLoading.set(true);
    this.cartService
      .updateCart([
        {
          id: this.product().id,
          quantity: 1,
        },
      ])
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isInCart.set(true);
        },

        error: () => {
          this.isLoading.set(false);
          this.error.set(true);
        },
      });
  }
}
