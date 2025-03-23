import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  private apiUrl = 'http://localhost:3000/api/radios';

  constructor(private http: HttpClient) {}

  ajouterRadio(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }
}
