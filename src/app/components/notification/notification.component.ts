import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  newNotification: any = {
    id: 0,
    message: '',
    type: 'rendez-vous',
    isRead: false,
    patientId: 0
  };
  isLoading = false;
  errorMessage = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  // Charger les notifications
  loadNotifications() {
    this.isLoading = true;
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Échec du chargement des notifications';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Marquer une notification comme lue
  markAsRead(notification: any) {
    if (!notification.isRead && notification.id) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: (response) => {
          console.log('Réponse du backend :', response);
          notification.isRead = true;  // Mise à jour de l'état local
        },
        error: (err) => {
          console.error('Échec de la mise à jour', err);
        }
      });
    }
  }
  

  // Ajouter une nouvelle notification
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = ''; // Réinitialise le message d'erreur

      this.notificationService.addNotification(this.newNotification).subscribe({
        next: (data) => {
          this.notifications.unshift(data); // Ajouter la nouvelle notification au début de la liste
          this.resetForm();
          form.resetForm();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          // Affiche des détails spécifiques selon le type d'erreur
          if (err.status === 0) {
            this.errorMessage = 'Impossible de se connecter au serveur';
          } else if (err.status === 400) {
            this.errorMessage = 'Données invalides: ' + (err.error?.message || '');
          } else {
            this.errorMessage = `Erreur serveur (${err.status}): ${err.error?.message || 'Veuillez réessayer'}`;
          }
          console.error('Détails complets:', err);
        }
      });
    }
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.newNotification = {
      id: 0,
      message: '',
      type: 'rendez-vous',
      isRead: false,
      patientId: 0
    };
  }
}
