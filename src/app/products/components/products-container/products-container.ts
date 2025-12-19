import { Component, input } from '@angular/core';
import { Products } from '../../models/products.model';
import { Product } from '../product/product';

@Component({
  selector: 'app-products-container',
  imports: [Product],
  templateUrl: './products-container.html',
  styleUrl: './products-container.css',
})
export class ProductsContainer {
  products = input.required<Products | null>();
}
