import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchQuery {
  private _searchTerm = signal<string>('');
  readonly searchTerm = this._searchTerm.asReadonly();

  setSearchTerm(query: string): void {
    this._searchTerm.set(query);
  }
}
