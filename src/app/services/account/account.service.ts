import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://projectlaasbackend-hpaeeweaexhcd0d3.westeurope-01.azurewebsites.net/api/accounts';
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
  }

   // ==========================
  // Authentication Methods
  // ==========================

  /**
   * Authenticates a user and manages the JWT token.
   * @param credentials The user login credentials
   * @returns Observable of the JWT token
   */
  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
          localStorage.setItem('name', response.name);
          localStorage.setItem('role', response.role);
          this.loggedIn.next(true);
        }
      })
    );
  }

    /**
   * Registers a new user.
   * @param user The user registration data
   * @returns Observable of the registration response
   */
    registerUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/create`, user);
    }

  // ==========================
  // User Management Methods
  // ==========================

 /**
   * Fetches all users (Trainer-only access).
   * @returns Observable of the list of users
   */
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

    /**
   * Updates a user's details (Trainer-only access).
   * @param id The ID of the user to update
   * @param userData The updated user data
   * @returns Observable of the updated user
   */
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${user.id}`, user);
  }

  /**
   * Deletes a user (Trainer-only access).
   * @param id The ID of the user to delete
   * @returns Observable of the deletion result
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  // ==========================
  // Token Management Methods
  // ==========================

  /**
   * Sets the JWT token in local storage.
   * @param token The JWT token
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

   /**
   * Retrieves the JWT token from local storage.
   * @returns The JWT token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  /**
   * Checks if a JWT token exists in local storage.
   * @returns True if a token exists, false otherwise
  */
 private hasToken(): boolean {
   return !!localStorage.getItem('token');
  }
  
  setLoggedIn(status: boolean, name: string | null = null): void {
    this.loggedIn.next(status);
    if (!status) {
      this.removeToken();
    }
  }
  
  logout(): void {
    this.loggedIn.next(false);
    this.removeToken();
    localStorage.removeItem('name');
    localStorage.removeItem('role');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
  
  // ==========================
  // Utility Methods
  // ==========================
  
  /**
   * Retrieves the user's name from local storage.
   * @returns The user's name or null if not found
  */
  private getNameFromLocalStorage(): string | null {
  return localStorage.getItem('name');
}
  
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  private getRoleFromLocalStorage(): string | null {
    return localStorage.getItem('role');
  }




  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
