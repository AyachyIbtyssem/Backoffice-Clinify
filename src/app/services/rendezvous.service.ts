import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RendezVous {
  idRDV: number;
  date: string;
  heure: string;
  statut: string;
  typeRendezVous: string;
  IdPatient: number;
  IdMedecin: number;
}

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'http://localhost:3000/api/rendezvous';

  constructor(private http: HttpClient) {}

  getRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }
}
