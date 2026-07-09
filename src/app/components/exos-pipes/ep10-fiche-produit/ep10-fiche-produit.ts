import { Component } from '@angular/core';
import { TitleCasePipe, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ep10-fiche-produit',
  imports: [TitleCasePipe, CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './ep10-fiche-produit.html',
  styleUrl: './ep10-fiche-produit.scss',
})
export class Ep10FicheProduit {
  produit = {
    nom: 'macbook pro 16 pouces',
    prix: 2999.00,
    dateAjout: new Date(2024, 0, 15),
    stock: 12,
  };
}
