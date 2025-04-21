import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Filters {
  email: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  searchEmail: string = '';

    // Filtering and Sorting
    filters: Filters = {
      email: '',
      name: '',
      role: ''
    };
    sortOption: string = 'name';
    sortAscending: boolean = true;
    private filterSubject = new Subject<void>();

    constructor(private accountService: AccountService, private router: Router ) {
      // Setup debounced filtering
      this.filterSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        this.applyFilters();
      });
    }

  ngOnInit(): void {
    this.fetchUsers();
  }

   // Filtering Methods
   applyFilters(): void {
    let filtered = [...this.users];

    // Apply filters
    if (this.filters.email) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(this.filters.email.toLowerCase())
      );
    }

    if (this.filters.name) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(this.filters.name.toLowerCase())
      );
    }

    if (this.filters.role) {
      filtered = filtered.filter(user =>
        user.role === this.filters.role
      );
    }

    // Apply sorting
    filtered = this.sortUsers(filtered);

    this.filteredUsers = filtered;
  }

  sortUsers(users: User[]): User[] {
    return users.sort((a, b) => {
      const aValue = a[this.sortOption as keyof User];
      const bValue = b[this.sortOption as keyof User];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortAscending 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return this.sortAscending 
        ? (aValue < bValue ? -1 : 1)
        : (bValue < aValue ? -1 : 1);
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  toggleSortDirection(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  clearFilter(filterName: keyof Filters): void {
    this.filters[filterName] = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.filters = {
      email: '',
      name: '',
      role: ''
    };
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return Object.values(this.filters).some(value => value !== '');
  }

  // Trigger debounced filtering
  onFilterChange(): void {
    this.filterSubject.next();
  }

  fetchUsers(): void {
    this.accountService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Failed to fetch users.');
      },
    });
  }

  searchUsers(): void {
    if (!this.searchEmail.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const searchTerm = this.searchEmail.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user => 
        user.email.toLowerCase().includes(searchTerm)
      );
    }
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  // updateUser(): void {
  //   if (this.selectedUser) {
  //     this.accountService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
  //       next: () => {
  //         alert('User updated successfully!');
  //         this.fetchUsers();
  //         this.selectedUser = null;
  //       },
  //       error: (err) => {
  //         console.error('Error updating user:', err);
  //         alert('Failed to update user.');
  //       },
  //     });
  //   }
  // }

  deleteUser(userId: number): void {
    if (typeof userId !== 'number') {
      console.error('Invalid user ID:', userId);
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.accountService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.fetchUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        },
      });
    }
  }
}