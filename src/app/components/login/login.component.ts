import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Getter methods for easy access in the template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Handles the login process.
   */
  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.accountService.loginUser(loginData).subscribe({
      next: (token: string) => {
        console.log('Login successful');
        const userName = loginData.email.split('@')[0];
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid email or password. Please try again.');
      },
    });
  }
}
