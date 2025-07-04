import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/get`);
  }

  addReservation(newReservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/post`, newReservation);
  }

  updateReservation(updatedReservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/put/${updatedReservation._id}`, updatedReservation);
  }

  cancelReservation(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${_id}`);
  }
}