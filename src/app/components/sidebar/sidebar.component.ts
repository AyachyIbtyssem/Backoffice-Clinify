import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon'; // ✅ Import de MatIconModule
import { CommonModule } from '@angular/common'; // ✅ Importer CommonModule pour ngClass et ngIf
import { NgIf } from '@angular/common'; // ✅ Import de NgIf pour les *ngIf
import { RouterModule } from '@angular/router'; // ✅ Ajout du RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, NgIf, CommonModule,RouterModule], // ✅ Ajouter ici MatIconModule + NgIf
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;
  isLoggedIn = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ Redirection après déconnexion
  }
}
