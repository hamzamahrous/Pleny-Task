import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Products } from '../../services/products';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  limit = input.required<number>();
  skip = input.required<number>();
  total = input.required<number>();

  private productsService = inject(Products);

  startingPage = computed<number>(() => {
    const previousPages = Math.ceil(this.skip() / this.limit());
    return previousPages + 1;
  });

  endingPage = computed<number>(() => {
    return Math.ceil(this.total() / this.limit());
  });

  hasMorePages = computed<boolean>(() => {
    return this.startingPage() + 1 !== this.endingPage() - 1;
  });

  totalPages = computed<number>(() => {
    return Math.ceil(this.total() / this.limit());
  });

  canGoPrevious = computed(() => this.startingPage() > 1);
  canGoNext = computed(() => this.startingPage() < this.totalPages());

  visiblePages = computed<number[]>(() => {
    const st = this.startingPage();
    const end = this.endingPage();

    let pages: number[] = [];

    if (end - st >= 1) {
      // Pass the pages through set first to remove duplications for example when (st = 1 & end = 3 => [1, 2, 2, 3])
      let pagesSet = new Set([st, st + 1, end - 1, end]);
      pages = [...pagesSet].sort((a, b) => a - b);
    } else {
      pages = [st];
    }

    return pages;
  });

  loadAnotherProductsPage(pageNumber: number) {
    let newSkip = (pageNumber - 1) * this.limit();
    this.productsService.updateSkip(newSkip);
  }

  goPrev() {
    this.loadAnotherProductsPage(this.startingPage() - 1);
  }

  goNext() {
    this.loadAnotherProductsPage(this.startingPage() + 1);
  }
}
