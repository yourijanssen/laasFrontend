import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  userRole: string | null = null;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.accountService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (status) {
        // Fetch user info when logged in
        this.loadUserInfo();
      } else {
        // Clear user info when logged out
        this.clearUserInfo();
      }
    });
  }

  private loadUserInfo(): void {
    // Fetch user info from localStorage
    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');

    this.userName = storedName;
    this.userRole = storedRole;
  }

  private clearUserInfo(): void {
    // Clear user info
    this.userName = null;
    this.userRole = null;
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
