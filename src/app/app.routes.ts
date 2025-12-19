import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { productsGuard } from './products/guards/products-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'products',
    // canActivate guard to prevent unauthenticated users to see the products
    canActivate: [productsGuard],
    loadComponent: () => {
      return import('./products/products').then((mod) => mod.Products);
    },
  },
];
