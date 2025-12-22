import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Products } from '../../services/products';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  private productsService = inject(Products);

  limit = input.required<number>();
  skip = input.required<number>();
  total = input.required<number>();

  currentPage = computed(() => {
    const previousPages = this.skip() / this.limit();
    return previousPages + 1;
  });

  endingPage = computed(() => Math.ceil(this.total() / this.limit()));

  canGoPrevious = computed(() => this.currentPage() > 1);
  canGoNext = computed(() => this.currentPage() < this.endingPage());

  goPrev() {
    this.fetchPage(this.currentPage() - 1);
  }

  goNext() {
    this.fetchPage(this.currentPage() + 1);
  }

  // Return the first page, last page, current page and it's previous and next pages
  visiblePages = computed<number[]>(() => {
    const st = this.currentPage();
    const end = this.endingPage();

    let pagesSet;

    if (end - st >= 1) {
      pagesSet = new Set([1, st, st + 1, end]);
    } else {
      pagesSet = new Set([1, st]);
    }

    if (st - 1 > 1) pagesSet.add(st - 1);
    let pagesArr = [...pagesSet].sort((a, b) => a - b);

    return pagesArr;
  });

  fetchPage(pageNumber: number) {
    let newSkip = (pageNumber - 1) * this.limit();
    this.productsService.updateSkip(newSkip);
  }
}
