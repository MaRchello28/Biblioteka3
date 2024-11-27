import { Component, OnInit } from '@angular/core';
import { ReserveBookComponent } from '../reserve-book/reserve-book.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css'],
  imports: [ReserveBookComponent, CommonModule],
})
export class UserSiteComponent implements OnInit {
  isReserveBookVisible = false;

  constructor() {}

  ngOnInit(): void {}

  reserveBook(): void {
    this.isReserveBookVisible = true;
  }

  viewLoans(): void {
    console.log('Zobacz wypożyczone');
  }

  extendBook(): void {
    console.log('Przedłuż książkę');
  }

  viewProfile(): void {
    console.log('Profil');
  }
}
