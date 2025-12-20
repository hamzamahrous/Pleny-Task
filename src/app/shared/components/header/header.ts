import { Component, inject } from '@angular/core';
import { Auth } from '../../../auth/services/auth';
import { SearchQuery } from '../../services/search-query/search-query';
import { Cart } from '../../services/cart/cart';

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
