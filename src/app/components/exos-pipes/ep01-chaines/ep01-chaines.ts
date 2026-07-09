import { Component } from '@angular/core';
import { UpperCasePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ep01-chaines',
  imports: [UpperCasePipe, LowerCasePipe, TitleCasePipe],
  templateUrl: './ep01-chaines.html',
  styleUrl: './ep01-chaines.scss',
})
export class Ep01Chaines {
  titre = "le seigneur des anneaux : la communaute de l'anneau";
}
