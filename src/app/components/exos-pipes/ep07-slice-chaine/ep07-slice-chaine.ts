import { Component } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-ep07-slice-chaine',
  imports: [SlicePipe],
  templateUrl: './ep07-slice-chaine.html',
  styleUrl: './ep07-slice-chaine.scss',
})
export class Ep07SliceChaine {
  description = 'Angular est un framework JavaScript developpe et maintenu par Google.';
}
