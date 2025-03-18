import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Medecin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  address: string;
  numSalle: string;
  nomDept: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedecinsService {
  private apiUrl = 'http://localhost:3000/api/medecins';

  constructor(private http: HttpClient) {}

  getMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.apiUrl);
  }
}
