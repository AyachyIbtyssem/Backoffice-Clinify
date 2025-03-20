import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../../services/patient.service';
import { RouterModule } from '@angular/router'; // ✅ Ajout du RouterModule
import { Router } from '@angular/router'; // ✅ Ajout du Router

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule ], // ✅ Importation de MatTableModule
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'Dossier Medical', 'Les Rendez Vous','ajout']; // ✅ Ajout pour le tableau

  constructor(private patientsService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientsService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        console.log("Patients chargés :", this.patients);
      },
      error: (err: unknown) => {
        console.error("Erreur lors du chargement des patients :", err);
      }
    });
  }

  goToDossierMedical(patientId: number) {
    this.router.navigate([`/patient-details/${patientId}`], { queryParams: { view: 'dossier' } });
  }

  goToRendezvous(patientId: number) {
    this.router.navigate([`/patient-details/${patientId}`], { queryParams: { view: 'rendezvous' } });
  }

  goToAjouterDossier(patientId: number) {
    this.router.navigate([`/dossier-medical/${patientId}`]);
  }

  
}
