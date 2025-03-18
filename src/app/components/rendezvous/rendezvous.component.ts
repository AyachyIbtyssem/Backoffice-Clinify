import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
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
export class RendezVousComponent implements OnInit {
  rendezvous: RendezVous[] = [];
  displayedColumns: string[] = ['date', 'heure', 'statut', 'typeRendezVous', 'IdPatient', 'IdMedecin'];

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous() {
    this.rendezVousService.getRendezVous().subscribe({
      next: (data: RendezVous[]) => {
        this.rendezvous = data;
        console.log("Rendez-vous chargés :", this.rendezvous);
      },
      error: (err: unknown) => {
        console.error("Erreur lors du chargement des rendez-vous :", err);
      }
    });
  }
}
