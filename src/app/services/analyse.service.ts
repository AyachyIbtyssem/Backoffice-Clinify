import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Analyse {
  nom: string;
  resultat: string;
  date: string;
  patientId: number;
  medecinId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private apiUrl = 'http://localhost:3000/api/analyse';

  constructor(private http: HttpClient) {}

  ajouterAnalyse(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }
}

