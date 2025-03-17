import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // ✅ Ajouté pour standalone components
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // ✅ Importation des modules nécessaires
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['patient', Validators.required], // Patient par défaut
      specialty: [''],
      numSalle: [''],
      nomDept: ['']
    });
  }

  
  get isMedecin() {
    return this.registerForm.get('role')?.value === 'medecin';
  }

  get isAssistant() {
    return this.registerForm.get('role')?.value === 'assistant';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulaire soumis', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: response =>{
          console.log('Inscription réussie', response);
          this.successMessage = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
          this.registerForm.reset();
        } ,
        error: error => console.error('Erreur lors de l’inscription', error)
      });
    }
  }
}
