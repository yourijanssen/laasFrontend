import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() userUpdated = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.editForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.user) {
      this.editForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.user) {
      this.isSubmitting = true;
      const updatedUser = {
        ...this.user,
        ...this.editForm.value
      };

      this.accountService.updateUser(updatedUser).subscribe({
        next: (user) => {
          this.userUpdated.emit(user);
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update user. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}