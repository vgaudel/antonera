import { Component } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-ep08-slice-tableau',
  imports: [SlicePipe],
  templateUrl: './ep08-slice-tableau.html',
  styleUrl: './ep08-slice-tableau.scss',
})
export class Ep08SliceTableau {
  pays = ['France', 'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Belgique', 'Suisse', 'Autriche'];
}
