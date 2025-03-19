import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MedecinsComponent } from './components/medecins/medecins.component';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

export const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'patients', component: PatientsComponent }, // ✅ Ajout de la route Patients
  { path: 'patient-details/:id', component: PatientDetailsComponent },
  { path: 'patient-details/:id/dossier-medical', component: PatientDetailsComponent },
  { path: 'patient-details/:id/rendez-vous', component: PatientDetailsComponent },
  { path: 'medecins', component: MedecinsComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: '', component: HomeComponent }, // Accueil par défaut
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' } // Redirection par défaut

];
