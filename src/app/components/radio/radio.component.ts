import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RadioService } from '../../services/radio.service';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})

export class RadioComponent {
  radio = {
    patientId: 0,
    file: null
  };

  constructor(
    private radioService: RadioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("RadioComponent chargé !");
    this.route.params.subscribe(params => {
      this.radio.patientId = +params['id']; // Convertir en number
    });
  }

  onFileSelected(event: any) {
    this.radio.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.radio.file) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append('patientId', this.radio.patientId.toString());
    formData.append('image', this.radio.file);

    console.log("Données envoyées :", formData);

    this.radioService.ajouterRadio(formData).subscribe({
      next: () => {
        console.log("Image de radio ajoutée avec succès !");
        this.router.navigate(['/patients']);
      },
      error: (err) => console.error("Erreur lors de l'ajout :", err)
    });
  }
}
