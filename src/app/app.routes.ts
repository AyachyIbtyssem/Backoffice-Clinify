import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MedecinsComponent } from './components/medecins/medecins.component';
import { RendezVousComponent } from './components/rendezvous/rendezvous.component';

export const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'patients', component: PatientsComponent }, // ✅ Ajout de la route Patients
  { path: 'medecins', component: MedecinsComponent },
  { path: 'rendezvous', component: RendezVousComponent },
  { path: '', component: HomeComponent }, // Accueil par défaut
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' } // Redirection par défaut

];
