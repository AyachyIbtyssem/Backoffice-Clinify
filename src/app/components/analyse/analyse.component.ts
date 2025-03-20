import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnalyseService } from '../../services/analyse.service';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})

export class AnalyseComponent {
  analyse = {
    nom: '',
    date: '',
    resultat: '',
    patientId: 0,
    file: null
  };

  constructor(
    private analyseService: AnalyseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("AjouterAnalyseComponent chargé !");
    this.route.params.subscribe(params => {
      this.analyse.patientId = +params['id']; // Convertir en number
    });
  }
  
  onFileSelected(event: any) {
    this.analyse.file = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nom', this.analyse.nom);
    formData.append('date', this.analyse.date);
    formData.append('resultat', this.analyse.resultat);
    formData.append('patientId', this.analyse.patientId.toString());
    if (this.analyse.file) {
      formData.append('pdf', this.analyse.file);
    }
  
    console.log("Données envoyées :", formData); // 🔍 Vérifie les données envoyées
  
    this.analyseService.ajouterAnalyse(formData).subscribe({
      next: () => {
        console.log("Analyse ajoutée avec succès !");
        this.router.navigate(['/patients']);
      },
      error: (err) => console.error("Erreur lors de l'ajout :", err)
    });
  }
  
}
