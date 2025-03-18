import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { RendezVousService } from '../../services/rendezvous.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDatepickerModule, 
    MatNativeDateModule
  ]
})
export class HomeComponent implements OnInit {
  selectedDate: Date = new Date();
  rendezvousDates: Map<string, string> = new Map(); // Stocke la date et le statut du rendez-vous
  selectedRdvDetails: string = ''; // Détails du rendez-vous sélectionné

  constructor(private rendezvousService: RendezVousService) {}

  ngOnInit() {
    this.fetchRendezvousDates();
  }

  fetchRendezvousDates() {
    this.rendezvousService.getAllRendezvousDates().subscribe((data) => {
      console.log("Données récupérées :", data);

      this.rendezvousDates.clear();
      data.forEach((rdv) => { 
        const dateStr = new Date(rdv.date).toDateString();
        console.log(`Stockage: ${dateStr} -> ${rdv.statut}`);
        this.rendezvousDates.set(dateStr, rdv.statut);
      });

      console.log("Dates stockées :", this.rendezvousDates);
    });
  }

  onDateSelect(date: Date | null) {
    if (date) {
      const dateStr = date.toDateString();
      const statut = this.rendezvousDates.get(dateStr);
      this.selectedRdvDetails = statut 
        ? `Rendez-vous pour le ${dateStr} : ${statut}` 
        : `Aucun rendez-vous pour le ${dateStr}`;
    } else {
      this.selectedRdvDetails = '';
    }
  }

  // Applique les classes CSS aux jours de rendez-vous selon leur statut
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const dateStr = d.toDateString();
    const statut = this.rendezvousDates.get(dateStr);
  
    console.log(`🔹 Vérification : ${dateStr} -> ${statut}`);
  
    if (statut) {
      return `rdv-${statut.replace(/\s+/g, '-').toLowerCase()}`;  
    }
    return ''; 
  };
}
