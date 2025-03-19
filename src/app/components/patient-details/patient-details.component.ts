import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider'; // ✅ Ajouté ici
import { PatientDetailsService } from '../../services/patient-details.service';
import { MatListModule } from '@angular/material/list'; // ✅ Ajout pour mat-list
import { MatIconModule } from '@angular/material/icon'; // ✅ Ajout pour mat-icon

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatDividerModule, MatListModule, MatIconModule   ], // ✅ Ajouté MatDividerModule
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientId!: number;
  rendezVous: any[] = [];
  dossierMedical: any;
  displayedColumns: string[] = ['date', 'heure'];

  showDossier: boolean = false;
  showRendezVous: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private patientDetailsService: PatientDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = Number(params.get('id'));
      this.route.queryParams.subscribe(queryParams => {
        const view = queryParams['view'];
        if (view === 'dossier') {
          this.toggleDossierMedical();
        } else if (view === 'rendezvous') {
          this.toggleRendezVous();
        }
      });
    });
  }

  chargerDossierMedical(): void {
    this.patientDetailsService.getDossierMedical(this.patientId).subscribe(data => {
      console.log("Données reçues pour le dossier médical :", data);
      
      if (data.length > 0) {
        this.dossierMedical = data[0];  // Prend le premier élément du tableau
      } else {
        console.warn("Aucun dossier médical trouvé !");
        this.dossierMedical = null;  // Gérer le cas où aucun dossier n'existe
      }
    }, error => {
      console.error("Erreur lors du chargement du dossier médical :", error);
    });
  }
  
  
  

  chargerRendezVous(): void {
    this.patientDetailsService.getRendezVous(this.patientId).subscribe(data => {
      this.rendezVous = data;
    });
  }

  toggleDossierMedical() {
    this.showDossier = true;
    this.showRendezVous = false;
    this.chargerDossierMedical();
  }

  toggleRendezVous() {
    this.showDossier = false;
    this.showRendezVous = true;
    this.chargerRendezVous();
  }
}
