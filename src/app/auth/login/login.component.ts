import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   submitted = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) return;
    const { email, senha } = this.loginForm.value;
    this.authService.login(email!, senha!)
    .subscribe({
      next: (user) => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    });

  }
}