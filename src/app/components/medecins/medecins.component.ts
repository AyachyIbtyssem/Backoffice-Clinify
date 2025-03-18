import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MedecinsService } from '../../services/medecins.service';
import { RouterModule } from '@angular/router';

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

@Component({
  selector: 'app-medecins',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule], 
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  medecins: Medecin[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'specialty', 'address', 'numSalle', 'nomDept'];

  constructor(private medecinsService: MedecinsService) {}

  ngOnInit(): void {
    this.loadMedecins();
  }

  loadMedecins() {
    this.medecinsService.getMedecins().subscribe({
      next: (data: Medecin[]) => {
        this.medecins = data;
        console.log("Médecins chargés :", this.medecins);
      },
      error: (err: unknown) => {
        console.error("Erreur lors du chargement des médecins :", err);
      }
    });
  }
}
