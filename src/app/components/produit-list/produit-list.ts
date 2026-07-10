import { Component, inject, signal } from '@angular/core';
import { IProduit } from '../../model/IProduit';
import { ProduitCard } from '../produit-card/produit-card';
import { MockProductService } from '../../services/mock-product-service';
import { ProduitAddForm } from '../produit-add-form/produit-add-form';
import { ProductService } from '../../services/product-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-produit-list',
  imports: [ProduitCard, ProduitAddForm, AsyncPipe],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList {

  private _productService = inject(ProductService);
  produitsList$ = this._productService.getAllProducts$();

  loadProducts(){
    this.produitsList$ = this._productService.getAllProducts$();
  }

}
