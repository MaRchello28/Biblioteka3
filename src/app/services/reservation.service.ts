import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: Reservation[] = [
    new Reservation(1, 3, 1, new Date('2025-11-20'))
  ]
  constructor() { }
}
