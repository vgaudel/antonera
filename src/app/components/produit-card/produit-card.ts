import { Component, effect, input } from '@angular/core';
import { IProduit } from '../../model/IProduit';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-produit-card',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './produit-card.html',
  styleUrl: './produit-card.scss',
})
export class ProduitCard {

  // L'attribut produit va recevoir un objet de type IProduit depuis
  // son composant parent
  // avec le .required l'input est obligatoire
  produit = input.required<IProduit>();

  constructor(){
    effect(() => console.log("Produit depuis effect" + this.produit().label));
  }

}
