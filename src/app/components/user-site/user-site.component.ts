import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Można załadować dane użytkownika lub przeprowadzić inne działania po załadowaniu strony
  }

  reserveBook(): void {
    // Akcja rezerwacji książki (do zaimplementowania)
    console.log('Zarezerwuj książkę');
  }

  viewLoans(): void {
    // Akcja zobaczenia wypożyczonych książek (do zaimplementowania)
    console.log('Zobacz wypożyczone');
  }

  extendBook(): void {
    // Akcja przedłużenia książki (do zaimplementowania)
    console.log('Przedłuż książkę');
  }

  viewProfile(): void {
    // Akcja przeglądania profilu użytkownika (do zaimplementowania)
    console.log('Profil');
  }
}
