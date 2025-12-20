import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../auth/services/auth';
import { SearchQuery } from '../../services/search-query/search-query';
import { Cart } from '../../services/cart/cart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private searchQueryService = inject(SearchQuery);
  private authService = inject(Auth);
  private cartService = inject(Cart);

  isAuthenticated = this.authService.isAuthenticated;
  cartCount = this.cartService.cartCount;

  onSearchInputChange(query: string) {
    this.searchQueryService.setSearchTerm(query);
  }
}
