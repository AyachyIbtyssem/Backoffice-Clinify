import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { RendezVousService } from '../../services/rendezvous.service';
import { PatientService } from '../../services/patient.service';
import { MedecinsService } from '../../services/medecins.service';

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

interface Patient {
  firstName: string;
  lastName: string;
}

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
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<RendezVous>([]);
  isEnAttente: boolean = false;

  constructor(
    private rendezVousService: RendezVousService,
    private patientService: PatientService,
    private medecinService: MedecinsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    this.isEnAttente = urlSegments.includes('statut') && urlSegments.includes('en attente');

    this.displayedColumns = ['date', 'heure', 'statut', 'typeRendezVous', 'NomPatient', 'NomMedecin'];
    if (this.isEnAttente) this.displayedColumns.push('Confirmation');

    this.loadRendezVous();
  }

  loadRendezVous() {
    const patientMap = new Map<number, Patient>();
    const medecinMap = new Map<number, Medecin>();

    const rendezVousObservable = this.isEnAttente 
      ? this.rendezVousService.getRendezvousEnAttente() 
      : this.rendezVousService.getRendezVous();

    rendezVousObservable.pipe(
      switchMap((data: RendezVous[]) => {
        if (!data || data.length === 0) {
          this.dataSource.data = [];
          return of([]);
        }

        const observables = data.map(rdv => {
          const patientObs = patientMap.has(rdv.IdPatient) 
            ? of(patientMap.get(rdv.IdPatient)!) 
            : this.patientService.getPatientById(rdv.IdPatient).pipe(
                tap(patient => patient && patientMap.set(rdv.IdPatient, patient)),
                catchError(() => of({ firstName: 'Inconnu', lastName: '' })) 
              );

          const medecinObs = medecinMap.has(rdv.IdMedecin) 
            ? of(medecinMap.get(rdv.IdMedecin)!) 
            : this.medecinService.getMedecinById(rdv.IdMedecin).pipe(
                tap(medecin => medecin && medecinMap.set(rdv.IdMedecin, medecin)),
                catchError(() => of({ firstName: 'Inconnu', lastName: '' })) 
              );

          return forkJoin({ patient: patientObs, medecin: medecinObs }).pipe(
            map(({ patient, medecin }) => ({
              ...rdv,
              NomPatient: `${patient.firstName} ${patient.lastName}`,
              NomMedecin: `${medecin.firstName} ${medecin.lastName}`
            }))
          );
        });

        return forkJoin(observables);
      })
    ).subscribe({
      next: (updatedRdvList: RendezVous[]) => {
        this.dataSource.data = updatedRdvList;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des rendez-vous :", err);
      }
    });
  }

  confirmerRendezVous(idRDV: number) {
    this.rendezVousService.confirmerRendezVous(idRDV).subscribe({
      next: () => {
        console.log(`Rendez-vous ID ${idRDV} confirmé avec succès`);
        this.loadRendezVous(); // Recharger la liste après confirmation
      },
      error: (err) => {
        console.error(`Erreur lors de la confirmation du rendez-vous ID ${idRDV}:`, err);
      }
    });
  }
  annulerRendezVous(idRDV: number) {
    this.rendezVousService.annulerRendezVous(idRDV).subscribe({
      next: () => {
        console.log(`Rendez-vous ID ${idRDV} annulé avec succès`);
        this.loadRendezVous(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error(`Erreur lors de l'annulation du rendez-vous ID ${idRDV}:`, err);
      }
    });
  }
  
  
}
