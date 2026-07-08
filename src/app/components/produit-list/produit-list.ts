import { Component } from '@angular/core';
import { IProduit } from '../../model/IProduit';
import { ProduitCard } from '../produit-card/produit-card';

@Component({
  selector: 'app-produit-list',
  imports: [ProduitCard],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList {

  produitsList: IProduit[] =
    [
      { ref: 'p1', label: 'iPhone 16', prix: 999, categorie: 'smartphone' },
      { ref: 'p2', label: 'MacBook Air M4', prix: 1299, categorie: 'laptop' },
      { ref: 'p3', label: 'AirPods Pro 3', prix: 279, categorie: 'accessoire' },
    ];

  augmenterLesPrix(){
    this.produitsList = this.produitsList.map(produitItem => ({ ...produitItem, prix: produitItem.prix * 1.1 }));
  }
}
