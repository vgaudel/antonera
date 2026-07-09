import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ep01Chaines } from './ep01-chaines/ep01-chaines';
import { Ep02Currency } from './ep02-currency/ep02-currency';
import { Ep03Percent } from './ep03-percent/ep03-percent';
import { Ep04Number } from './ep04-number/ep04-number';
import { Ep05DatePredefini } from './ep05-date-predefini/ep05-date-predefini';
import { Ep06DatePerso } from './ep06-date-perso/ep06-date-perso';
import { Ep07SliceChaine } from './ep07-slice-chaine/ep07-slice-chaine';
import { Ep08SliceTableau } from './ep08-slice-tableau/ep08-slice-tableau';
import { Ep09Json } from './ep09-json/ep09-json';
import { Ep10FicheProduit } from './ep10-fiche-produit/ep10-fiche-produit';

@Component({
  selector: 'app-exos-pipes',
  imports: [
    FormsModule,
    Ep01Chaines, Ep02Currency, Ep03Percent, Ep04Number, Ep05DatePredefini,
    Ep06DatePerso, Ep07SliceChaine, Ep08SliceTableau, Ep09Json, Ep10FicheProduit,
  ],
  templateUrl: './exos-pipes.html',
  styleUrl: './exos-pipes.scss',
})
export class ExosPipes {
  composants: string[] = [
    'ep01-chaines',
    'ep02-currency',
    'ep03-percent',
    'ep04-number',
    'ep05-date-predefini',
    'ep06-date-perso',
    'ep07-slice-chaine',
    'ep08-slice-tableau',
    'ep09-json',
    'ep10-fiche-produit',
  ];
  selectedComponent: string = this.composants[0];
}
