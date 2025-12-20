import { Component, computed, inject, input, signal } from '@angular/core';
import { Product as ProductModel } from '../../models/product.model';
import { Cart } from '../../../shared/services/cart/cart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  product = input.required<ProductModel>();
  isInCart = signal(false);

  private cartService = inject(Cart);

  newPrice = computed<number>(() => {
    const discountValue = this.product().price * (this.product().discountPercentage / 100);
    return Number((this.product().price - discountValue).toFixed(2));
  });

  addToCart() {
    this.cartService
      .updateCart(true, [
        {
          id: this.product().id,
          quantity: 1,
        },
      ])
      .subscribe({
        next: () => {
          this.isInCart.set(true);
          this.cartService.incrementCartCount();
        },
      });
  }
}
