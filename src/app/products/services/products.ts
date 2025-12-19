import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/product-category.model';
import { Products as ProductsModel } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private baseUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);

  // Limit has a default value of 9 to follow the design requirements
  private limit = signal(9);
  private skip = signal(0);
  private category = signal('all');

  limit$ = this.limit.asReadonly();
  skip$ = this.skip.asReadonly();
  category$ = this.category.asReadonly();

  // Update skip by pagination component
  updateSkip(newSkipValue: number): void {
    this.skip.set(newSkipValue);
  }

  setCategory(category: string) {
    this.category.set(category);
  }

  getProducts(): Observable<ProductsModel> {
    let params = new HttpParams();
    params = params.set('limit', this.limit()).set('skip', this.skip());

    return this.http.get<ProductsModel>(`${this.baseUrl}`, { params });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(): Observable<ProductsModel> {
    let params = new HttpParams();
    params = params.set('limit', this.limit()).set('skip', this.skip());

    return this.http.get<ProductsModel>(`${this.baseUrl}/category/${this.category()}`, { params });
  }

  searchProducts(query: string): Observable<ProductsModel> {
    let params = new HttpParams();
    params = params.set('limit', this.limit()).set('skip', this.skip()).set('q', query);

    return this.http.get<ProductsModel>(`${this.baseUrl}/search`, { params });
  }
}
