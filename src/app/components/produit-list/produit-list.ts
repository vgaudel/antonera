import { Component, inject, signal } from '@angular/core';
import { IProduit } from '../../model/IProduit';
import { ProduitCard } from '../produit-card/produit-card';
import { MockProductService } from '../../services/mock-product-service';
import { ProduitAddForm } from '../produit-add-form/produit-add-form';

@Component({
  selector: 'app-produit-list',
  imports: [ProduitCard, ProduitAddForm],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList {

  private _mockProductService = inject(MockProductService);
  produitsList = signal(this._mockProductService.getAllProducts());

  loadProducts(){
    this.produitsList = signal(this._mockProductService.getAllProducts());
  }

}
