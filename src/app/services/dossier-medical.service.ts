import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface DossierMedical {
  analyse: string;
  statut: string;
  patientId: number;
  medecinId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {
  private apiUrl = 'http://localhost:3000/api/dossier-medical';

  constructor(private http: HttpClient) {}

  addDossierMedical(dossier: DossierMedical): Observable<DossierMedical> {
    return this.http.post<DossierMedical>(this.apiUrl, dossier);
  }
}
