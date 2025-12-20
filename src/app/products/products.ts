import { Component, inject, OnInit, signal } from '@angular/core';
import { Products as ProductsService } from './services/products';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Category } from './models/product-category.model';
import { ProductsCategories } from './components/products-categories/products-categories';
import { ProductsContainer } from './components/products-container/products-container';
import { SearchQuery } from '../shared/services/search-query/search-query';
import { toObservable } from '@angular/core/rxjs-interop';
import { Pagination } from './components/pagination/pagination';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ProductsCategories, ProductsContainer, Pagination],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  private searchQueryService = inject(SearchQuery);

  productsCategories$!: Observable<Category[]>;

  private searchTerm$ = toObservable(this.searchQueryService.searchTerm);
  private selectedCategory$ = toObservable(this.productsService.category$);

  // Get the selected category signal to be able to pass it to the category component as input, so we can reset the category when the user search on something
  selectedCategory = this.productsService.category$;

  limit = this.productsService.limit$;
  skip = this.productsService.skip$;

  // We will extract the value from the response
  total = signal<number>(0);

  private skip$ = toObservable(this.skip);

  // Combined the search, category & skip streams into one stream, so we can respond to the latest values from all stream and update the productsArray
  productsArray$ = combineLatest([
    this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged()),
    this.selectedCategory$,
    this.skip$,
  ]).pipe(
    switchMap(([search, category]) => {
      const hasSearch = search.trim().length > 0;
      const hasCategory = category !== 'all';

      // The priority is for user's searching query

      // I think they should be combined => search inside selected category ... but I didn't find suitable endpoint to achieve this
      // as the endpoints are separated (one for searching & one for selecting category)
      if (hasSearch) {
        // Reset category first
        this.productsService.setCategory('all');
        return this.productsService.searchProducts(search);
      }

      if (hasCategory) {
        return this.productsService.getProductsByCategory();
      }

      return this.productsService.getProducts();
    }),
    tap((response) => this.total.set(response.total))
  );

  ngOnInit(): void {
    this.productsCategories$ = this.productsService.getCategories();
  }

  onCategoryChanged(category: string) {
    this.productsService.setCategory(category);
  }
}
