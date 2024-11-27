import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-site',
  standalone: true,
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminSiteComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Można załadować dane użytkownika lub przeprowadzić inne działania po załadowaniu strony
  }

  SeeList(): void {
    // Akcja rezerwacji książki (do zaimplementowania)
    console.log('Przeglądaj liste');
  }

  manageBook(): void {
    // Akcja zobaczenia wypożyczonych książek (do zaimplementowania)
    console.log('Patrz ksiazki');
  }

  manageUser(): void {
    // Akcja przedłużenia książki (do zaimplementowania)
    console.log('Patrz użytkownik');
  }

  raport(): void {
    // Akcja przeglądania profilu użytkownika (do zaimplementowania)
    console.log('raport');
  }

}
