import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { PatientService } from '../../services/patient.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [CommonModule, MatTableModule, MatMenuModule, RouterModule,MatIconModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'actions'];
  menuOpen: { [key: number]: boolean } = {}; // Correct

  
  constructor(private patientsService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }
  // Ajoutez ce HostListener pour fermer le menu en cliquant ailleurs
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  if (!(event.target as HTMLElement).closest('.actions-cell')) {
    Object.keys(this.menuOpen).forEach(key => {
      this.menuOpen[parseInt(key)] = false;
    });
  }
}


toggleMenu(patientId: number, event: MouseEvent): void {
  event.stopPropagation(); // Évite que le clic ferme immédiatement le menu
  
  // Ferme tous les autres menus sauf celui concerné
  Object.keys(this.menuOpen).forEach(id => {
    this.menuOpen[parseInt(id)] = parseInt(id) === patientId ? !this.menuOpen[parseInt(id)] : false;
  });

  console.log("État des menus :", this.menuOpen);
}


  showMenu(patientId: number) {
    this.menuOpen[patientId] = true;
  }
  
  hideMenu(patientId: number) {
    this.menuOpen[patientId] = false;
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

  goToAjouterAnalyse(patientId: number) {
    this.router.navigate([`/analyse/${patientId}`]);
  }

  goToAjouterRadio(patientId: number) {
    this.router.navigate([`/radio/${patientId}`]);
  }
}
