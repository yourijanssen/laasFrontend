import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelloService {
  private apiUrl = 'http://localhost:8080/hello'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getHelloMessageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
