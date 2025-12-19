import { productsGuard } from './products-guard';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

describe('productsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => productsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
