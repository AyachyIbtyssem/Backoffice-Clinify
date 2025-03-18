import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PatientsService } from '../../services/patient.service';

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
  imports: [CommonModule, MatTableModule], // ✅ Importation de MatTableModule
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address']; // ✅ Ajout pour le tableau

  constructor(private patientsService: PatientsService) {}

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
}
