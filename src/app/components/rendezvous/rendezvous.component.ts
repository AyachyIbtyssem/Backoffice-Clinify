import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { RendezVousService } from '../../services/rendezvous.service';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { MedecinsService } from '../../services/medecins.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

// Interface pour représenter un rendez-vous
interface RendezVous {
  idRDV: number;
  date: string;
  heure: string;
  statut: string;
  typeRendezVous: string;
  IdPatient: number;
  NomPatient?: string;
  IdMedecin: number;
  NomMedecin?: string;
}

// Interface pour représenter un patient
interface Patient {
  firstName: string;
  lastName: string;
}

// Interface pour représenter un médecin
interface Medecin {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heure', 'statut', 'typeRendezVous', 'NomPatient', 'NomMedecin'];
  dataSource = new MatTableDataSource<RendezVous>([]);
  isEnAttente: boolean = false;

  constructor(
    private rendezVousService: RendezVousService,
    private patientService: PatientService,
    private medecinService: MedecinsService,
    private route: ActivatedRoute // Ajout de la virgule ici
  ) {}

  ngOnInit(): void {
    // Vérifier l'URL pour savoir si on doit afficher les RDV en attente
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    this.isEnAttente = urlSegments.includes('statut') && urlSegments.includes('en attente');

    if (this.isEnAttente) {
      this.loadRendezVousEnAttente();
    } else {
      this.loadRendezVous();
    }
  }

  loadRendezVous() {
    this.rendezVousService.getRendezVous().subscribe({
      next: (data: RendezVous[]) => {
        const observables = data.map(rdv => 
          forkJoin({
            patient: this.patientService.getPatientById(rdv.IdPatient),
            medecin: this.medecinService.getMedecinById(rdv.IdMedecin)
          }).pipe(
            map(({ patient, medecin }) => ({
              ...rdv,
              NomPatient: `${patient.firstName} ${patient.lastName}`,
              NomMedecin: `${medecin.firstName} ${medecin.lastName}`
            }))
          )
        );

        forkJoin(observables).subscribe((updatedRdvList: RendezVous[]) => {
          this.dataSource.data = updatedRdvList;
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement des rendez-vous :", err);
      }
    });
  }

  loadRendezVousEnAttente() {
    this.rendezVousService.getRendezvousEnAttente().subscribe({
      next: (data: RendezVous[]) => {
        const observables = data.map(rdv => 
          forkJoin({
            patient: this.patientService.getPatientById(rdv.IdPatient),
            medecin: this.medecinService.getMedecinById(rdv.IdMedecin)
          }).pipe(
            map(({ patient, medecin }) => ({
              ...rdv,
              NomPatient: `${patient.firstName} ${patient.lastName}`,
              NomMedecin: `${medecin.firstName} ${medecin.lastName}`
            }))
          )
        );

        forkJoin(observables).subscribe((updatedRdvList: RendezVous[]) => {
          this.dataSource.data = updatedRdvList;
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement des rendez-vous en attente :", err);
      }
    });
  }
}
