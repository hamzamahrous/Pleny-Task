import { Component, input, OnInit, output } from '@angular/core';
import { Category } from '../../models/product-category.model';

@Component({
  selector: 'app-products-categories',
  imports: [],
  templateUrl: './products-categories.html',
  styleUrl: './products-categories.css',
})
export class ProductsCategories {
  categories = input.required<Category[] | null>();
  selectedCategory = input<string>('all');
  categoryChanged = output<string>();

  onCategoryChanged(event: Event) {
    const category = (event.target as HTMLInputElement).value;
    this.categoryChanged.emit(category);
  }
}
