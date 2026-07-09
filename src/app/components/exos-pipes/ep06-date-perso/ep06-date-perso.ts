import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ep06-date-perso',
  imports: [DatePipe],
  templateUrl: './ep06-date-perso.html',
  styleUrl: './ep06-date-perso.scss',
})
export class Ep06DatePerso {
  evenement = new Date(2024, 5, 21, 14, 30, 0);
}
