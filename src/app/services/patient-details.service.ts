import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {}

  getDossierMedical(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/dossier`);
  }

  getRendezVous(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/rendezvous`);
  }
}
