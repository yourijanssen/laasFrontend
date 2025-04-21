import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z\s]*$/),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        role: ['TRAINEE', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  // Getter methods for easy access in template
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get role() {
    return this.registerForm.get('role');
  }

  /**
   * Registers a new user using the account service.
   * Performs comprehensive validation before submission.
   */
  register(): void {
    this.submitted = true;

    // Mark all fields as touched to trigger validation display
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      control?.markAsTouched();
    });

    // Check overall form validity
    if (this.registerForm.invalid) {
      console.log('Form is invalid', this.registerForm.errors);
      return;
    }

    // Additional custom validation
    if (!this.validateForm()) {
      return;
    }

    // Prepare user data
    const user = { ...this.registerForm.value };

    // Remove confirm password before sending
    delete user.confirmPassword;

    // Submit registration
    this.accountService.registerUser(user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        alert('Registration successful!');
        this.router.navigate(['/']); // Redirect to home
      },
      (error) => {
        console.error('Error registering user', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  /**
   * Performs additional custom validations
   * @returns boolean indicating if validation passes
   */
  validateForm(): boolean {
    let isValid = true;

    // Name validation
    if (
      !this.name?.value ||
      this.name.value.length < 2 ||
      this.name.value.length > 50
    ) {
      console.log('Invalid name');
      isValid = false;
    }

    // Email validation
    if (!this.email?.value || !this.isValidEmail(this.email.value)) {
      console.log('Invalid email');
      isValid = false;
    }

    // Password validation
    if (!this.isStrongPassword(this.password?.value)) {
      console.log('Weak password');
      isValid = false;
    }

    // Password match validation
    if (this.password?.value !== this.confirmPassword?.value) {
      console.log('Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validates email format
   * @param email Email to validate
   * @returns boolean indicating if email is valid
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Checks password strength
   * @param password Password to check
   * @returns boolean indicating if password is strong
   */
  isStrongPassword(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
