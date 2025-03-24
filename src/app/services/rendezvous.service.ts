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

  // Récupérer tous les rendez-vous
  getRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  // Récupérer les rendez-vous pour une date spécifique
  getRendezvousByDate(date: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?date=${date}`);
  }

  // Récupérer toutes les dates avec rendez-vous
  getAllRendezvousDates(): Observable<{ date: string, statut: string }[]> {
    return this.http.get<{ date: string, statut: string }[]>(this.apiUrl);
  }

  // Récupérer les rendez-vous en attente
  getRendezvousEnAttente(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/statut/en%20attente`);
  }
  

// Confirmer un rendez-vous avec PATCH
confirmerRendezVous(idRDV: number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${idRDV}/confirmer`, {});
}
// Annuler un rendez-vous avec PATCH
annulerRendezVous(idRDV: number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${idRDV}/annuler`, {});
}


}
