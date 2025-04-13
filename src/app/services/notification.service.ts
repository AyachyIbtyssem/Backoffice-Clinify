import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications';  // API pour les notifications
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Récupérer les notifications
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Ajouter une notification
  addNotification(notification: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, notification, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Marquer une notification comme lue
  markAsRead(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { isRead: true }, this.httpOptions).pipe(
      catchError((err) => {
        console.error('Erreur lors de la mise à jour de la notification', err);
        return throwError(() => new Error('Erreur lors de la mise à jour'));
      })
    );
  }
  

  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Détails de l\'erreur:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Erreur côté client:', error.error.message);
    } else {
      console.error(`Code d'erreur: ${error.status}\nMessage: ${error.error}`);
    }
    return throwError(() => new Error('Une erreur est survenue'));
  }
}
