import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/register'; // URL du backend

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    console.log('Données envoyées au backend:', userData);
    return this.http.post<any>(this.apiUrl, userData);
  }
}
