import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { RendezVousService } from '../../services/rendezvous.service';
import { RouterModule } from '@angular/router';

interface RendezVous {
  idRDV: number;
  date: string;
  heure: string;
  statut: string;
  typeRendezVous: string;
  IdPatient: number;
  IdMedecin: number;
}

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heure', 'statut', 'typeRendezVous', 'IdPatient', 'IdMedecin'];
  dataSource = new MatTableDataSource<RendezVous>([]);

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous() {
    this.rendezVousService.getRendezVous().subscribe({
      next: (data: RendezVous[]) => {
        this.dataSource.data = data; // Mise à jour de `dataSource`
        console.log("Rendez-vous chargés :", this.dataSource.data);
      },
      error: (err: unknown) => {
        console.error("Erreur lors du chargement des rendez-vous :", err);
      }
    });
  }
}
