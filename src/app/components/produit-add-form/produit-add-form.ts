import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockProductService } from '../../services/mock-product-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-add-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatAnchor],
  templateUrl: './produit-add-form.html',
  styleUrl: './produit-add-form.scss',
})
export class ProduitAddForm {

  private _mockProductService = inject(MockProductService);
  private _routeur = inject(Router);

  productAdded = output();
  // ────────────────────────────────────────────────────────────────────────────
  // FormGroup : regroupe plusieurs FormControl sous un objet unique.
  // Chaque FormControl accepte : (valeurInitiale, validateurSync, validateurAsync)
  //
  // Validators disponibles (built-in) :
  //   Validators.required          → le champ ne doit pas être vide
  //   Validators.requiredTrue      → la valeur doit être true (case à cocher)
  //   Validators.minLength(n)      → longueur minimale de n caractères
  //   Validators.maxLength(n)      → longueur maximale de n caractères
  //   Validators.min(n)            → valeur numérique minimale
  //   Validators.max(n)            → valeur numérique maximale
  //   Validators.email             → format email valide
  //   Validators.pattern(regex)    → correspond à une expression régulière
  //   Validators.nullValidator     → ne fait rien (placeholder utile)
  //   Validators.compose([...])    → combine plusieurs validateurs (équivalent à un tableau)
  //   Validators.composeAsync([...]) → idem pour les validateurs asynchrones
  // ────────────────────────────────────────────────────────────────────────────


  form = new FormGroup({
    name: new FormControl('',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5)
        ]
      }),
    description: new FormControl('',
      {
        nonNullable: true, validators:
          [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
          ]
      }),
    price: new FormControl<number>(0,
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0.01)]
      }),
    category: new FormControl('',
      {
        nonNullable: true,
        validators: [Validators.required]
      }),
    stock: new FormControl<number>(0,
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0)]
      }),
  });

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid)
      return;

    console.log(this.form.getRawValue());
    this._mockProductService.createProduct(this.form.getRawValue());
    //this._routeur.navigateByUrl('produits');
    this.form.reset();
    this.productAdded.emit();
  }

}
