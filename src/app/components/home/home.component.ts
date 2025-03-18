import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, 
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDatepickerModule, 
    MatNativeDateModule] // ✅ Permet d'utiliser routerLink
})
export class HomeComponent {
  selectedDate: Date = new Date();
}
