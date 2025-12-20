import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  credentialsError = signal(false);
  isLoading = signal(false);

  private formBuilder = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Delete the error message when the user interact with the form again
    this.loginForm.valueChanges.subscribe(() => {
      this.credentialsError.set(false);
    });
  }

  get usernameIsInvalid() {
    return this.loginForm.get('username')?.invalid && this.loginForm.get('username')?.touched;
  }

  get passwordIsInvalid() {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  onSubmit() {
    // show the error messages if the user submitted directly
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.auth.login(credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/products']);
      },

      error: (err) => {
        this.isLoading.set(false);
        this.credentialsError.set(true);
        console.error(err);
      },
    });
  }
}
