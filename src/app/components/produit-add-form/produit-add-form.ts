import { Component, inject, output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MockProductService } from '../../services/mock-product-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from "@angular/material/button";
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { catchError, first, map, Observable, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-produit-add-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatAnchor],
  templateUrl: './produit-add-form.html',
  styleUrl: './produit-add-form.scss',
})
export class ProduitAddForm {

  private _productService = inject(ProductService);
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
        ], asyncValidators: [this.nomPris(this._productService)]
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
        validators: [Validators.required, this.noDigits]
      }),
    stock: new FormControl<number>(0,
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0)]
      }),
  }, this.differentNameAndDescription);

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid)
      return;

    console.log(this.form.getRawValue());
    this._productService.createProduct$(this.form.getRawValue()).subscribe(
      {
        next: (product) => { },
        error: (err) => console.log("Failed to add product ", (err.message || err))
      }
    );
    //this._routeur.navigateByUrl('produits');
    this.form.reset();
    this.productAdded.emit();
  }

  noDigits(control: AbstractControl): ValidationErrors | null {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let hasDigit = false;
    const value = '' + control.value;
    digits.forEach((d) => hasDigit = hasDigit || value.includes(d));
    return !hasDigit ? null : { hasDigits: true };
  }

  differentNameAndDescription(group: AbstractControl): ValidationErrors | null {
    const name = group.get('name')?.value;
    const description = group.get('description')?.value;
    const valid = !name || !description || (name != description);
    return valid ? null : { identicalNameAndDescription: true }
  }

  nomPris(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return timer(500).pipe(  // debounce : attend 2000 ms d'inactivité
        switchMap(() =>  //Switchmap annule l'appel précédent si nouvelle frappe
          productService.productExists$(control.value).pipe(
            // On convertit le boolean de l'api en validationError ou null
            map((indispo: boolean) => (indispo ? { nomPris: true } : null)),
            // En cas d'erreur, on ne blque pas le formulaire
            catchError(() => of(null))
          )
        ),
        first() // Complète l'Observable (obligatoire pour sortir de l'état pending)
      );
    };
  }
}
