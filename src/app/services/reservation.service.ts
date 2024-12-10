import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  addReservation(newReservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, newReservation);
  }

  updateReservation(updatedReservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${updatedReservation.reservationId}`, updatedReservation);
  }

  cancelReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
  }
}