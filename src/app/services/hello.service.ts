import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelloService {
  private apiUrl = 'https://projectlaasbackend-hpaeeweaexhcd0d3.westeurope-01.azurewebsites.net/hello'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getHelloMessageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
