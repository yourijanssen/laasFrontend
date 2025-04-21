import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addBook', book);
  }

  addBookCopies(bookId: number, count: number): Observable<any[]> {
    const requests = [];
    for (let i = 0; i < count; i++) {
      const bookCopy = {
        bookId: bookId,
        condition: 'new',
        status: 'available'
      };
      requests.push(this.http.post(this.baseUrl + '/addBookCopy', bookCopy));
    }
    return forkJoin(requests);
  }  
}
