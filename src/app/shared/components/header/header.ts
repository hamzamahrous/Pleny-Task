import { Component, inject } from '@angular/core';
import { Auth } from '../../../auth/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(Auth);
}
