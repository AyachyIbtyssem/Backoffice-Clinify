import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DossierMedicalService } from '../../services/dossier-medical.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dossier-medical',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent {
  dossierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dossierService: DossierMedicalService,
    private router: Router
  ) {
    this.dossierForm = this.fb.group({
      analyse: this.fb.array([this.createAnalyse()]),
      statut: ['', Validators.required],
      patientId: [null, Validators.required],
      medecinId: [null, Validators.required]
    });
  }

  get analyseControls() {
    return (<FormArray>this.dossierForm.get('analyse'))?.controls;
  }

  createAnalyse(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      resultat: ['', Validators.required]
    });
  }

  addAnalyse() {
    const control = <FormArray>this.dossierForm.get('analyse');
    control.push(this.createAnalyse());
  }

  jsonValidator(control: AbstractControl) {
    try {
      JSON.parse(control.value);
      return null;
    } catch (e) {
      return { invalidJson: true };
    }
  }

  onSubmit() {
    if (this.dossierForm.valid) {
      this.dossierService.addDossierMedical(this.dossierForm.value).subscribe({
        next: () => {
          this.router.navigate(['/patients']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du dossier médical", err);
        }
      });
    }
  }
}
