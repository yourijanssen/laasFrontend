import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../services/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.accountService.getUserRole();

    if (this.accountService.isAuthenticated() && userRole === 'TRAINER') {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
