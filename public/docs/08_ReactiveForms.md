# Les Reactive Forms en Angular

> **Prérequis** : Angular 20+, notions de composants standalone, RxJS (`Observable`, `pipe`), et Angular Material.
> **Objectif** : Construire un formulaire de création de produit entièrement validé (côté synchrone **et** asynchrone) en utilisant l'API **Reactive Forms** (`@angular/forms`).

---

## 1. Pourquoi les Reactive Forms ?

Angular propose plusieurs approches pour gérer les formulaires :

| Approche | Idée directrice |
|----------|-----------------|
| **Template-driven** | La logique vit dans le HTML (`ngModel`). |
| **Reactive Forms** | La logique vit dans le TypeScript (`FormGroup`, `FormControl`). |
| **Signal Forms** | La source de vérité est un `signal()` (voir le cours 09). |

Les **Reactive Forms** sont l'approche de référence pour les formulaires complexes :

- Le formulaire est **décrit en TypeScript** : on voit d'un coup d'œil tous les champs et toutes les règles.
- Chaque champ (`FormControl`) est un **objet observable** : on peut réagir à chaque frappe.
- La validation est **explicite** : on attache des validateurs synchrones et asynchrones.
- Le tout est **fortement typé** et testable sans dépendre du template.

---

## 2. Les 3 briques essentielles

### a) Le `FormControl` (un champ)

Un `FormControl` représente **un seul champ**. Il prend une valeur initiale et une configuration :

```typescript
import { FormControl, Validators } from '@angular/forms';

name = new FormControl('', {
  nonNullable: true,                              // la valeur ne repasse jamais à null (reset → '')
  validators: [Validators.required, Validators.minLength(5)],
  asyncValidators: [/* ... */],
});
```

### b) Le `FormGroup` (le formulaire)

Un `FormGroup` **regroupe plusieurs `FormControl`** sous un objet unique. C'est le formulaire complet :

```typescript
form = new FormGroup({
  name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.min(0.01)] }),
  // ...autres champs
}, this.differentNameAndDescription); // ← validateur au niveau du groupe (voir §5)
```

### c) La liaison dans le template

On relie le HTML au `FormGroup` avec `[formGroup]`, puis chaque champ avec `formControlName` :

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input matInput formControlName="name">
</form>
```

> ⚠️ Il faut importer `ReactiveFormsModule` dans les `imports` du composant.

---

## 3. Les validateurs intégrés (synchrones)

Un validateur **synchrone** répond immédiatement : la valeur est valide ou non.

| Validateur | Rôle |
|------------|------|
| `Validators.required` | Le champ ne doit pas être vide. |
| `Validators.requiredTrue` | La valeur doit être `true` (case à cocher). |
| `Validators.minLength(n)` | Longueur minimale de `n` caractères. |
| `Validators.maxLength(n)` | Longueur maximale de `n` caractères. |
| `Validators.min(n)` | Valeur numérique minimale. |
| `Validators.max(n)` | Valeur numérique maximale. |
| `Validators.email` | Format e-mail valide. |
| `Validators.pattern(regex)` | Correspond à une expression régulière. |
| `Validators.compose([...])` | Combine plusieurs validateurs (équivalent à un tableau). |

Dans notre étude de cas, le champ `price` utilise deux validateurs :

```typescript
price: new FormControl<number>(0, {
  nonNullable: true,
  validators: [Validators.required, Validators.min(0.01)],
}),
```

---

## 4. Lire l'état d'un champ dans le template

On récupère un champ avec `form.get('name')`, puis on interroge son état. Pour éviter de répéter `form.get(...)`, on utilise `@let` :

```html
@let nameFC = form.get('name');

@if (nameFC?.hasError('required')) {
  <mat-error>Le nom du produit est obligatoire.</mat-error>
} @else if (nameFC?.hasError('minlength')) {
  <mat-error>
    Nom de {{ nameFC?.getError('minlength').requiredLength }} caractères.
    Actuellement {{ nameFC?.getError('minlength').actualLength }}.
  </mat-error>
}
```

Propriétés et méthodes utiles d'un `FormControl` :

| Membre | Rôle |
|--------|------|
| `value` | La valeur courante du champ. |
| `valid` / `invalid` | Le champ est-il valide ? |
| `hasError('cle')` | Le champ porte-t-il cette erreur ? |
| `getError('cle')` | L'objet détaillé de l'erreur (ex. `{ requiredLength, actualLength }`). |
| `touched` | Le champ a-t-il été visité (blur) ? |
| `dirty` | La valeur a-t-elle été modifiée ? |
| `pending` | Une validation **asynchrone** est-elle en cours ? |

> 💡 `getError('minlength')` renvoie un objet `{ requiredLength, actualLength }` : c'est ce qui permet d'afficher « il manque X caractères » dynamiquement.

---

## 5. Un validateur sur-mesure (synchrone)

Quand aucun validateur intégré ne convient, on écrit une **fonction** qui reçoit le contrôle et renvoie `null` (valide) ou un objet d'erreur (invalide).

Exemple : interdire les chiffres dans la catégorie.

```typescript
noDigits(control: AbstractControl): ValidationErrors | null {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];
  const value = '' + control.value;
  const hasDigit = digits.some((d) => value.includes(d));
  return hasDigit ? { hasDigits: true } : null;
}
```

On l'attache comme un validateur classique :

```typescript
category: new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, this.noDigits],
}),
```

Côté template, on lit la clé renvoyée (`hasDigits`) :

```html
@if (categoryFC?.hasError('hasDigits')) {
  <mat-error>La catégorie ne doit pas contenir de chiffre.</mat-error>
}
```

---

## 6. La validation croisée (validateur de groupe)

Pour comparer **plusieurs champs entre eux**, on attache un validateur **au `FormGroup`** (2ᵉ argument du constructeur). Il reçoit le groupe entier :

```typescript
differentNameAndDescription(group: AbstractControl): ValidationErrors | null {
  const name = group.get('name')?.value;
  const description = group.get('description')?.value;
  const valid = !name || !description || (name !== description);
  return valid ? null : { identicalNameAndDescription: true };
}
```

```typescript
form = new FormGroup({
  // ...les champs
}, this.differentNameAndDescription);   // ← validateur de groupe
```

L'erreur se lit **sur le formulaire lui-même**, pas sur un champ :

```html
@if (form?.hasError('identicalNameAndDescription')) {
  <mat-error>La description ne peut pas être identique au nom.</mat-error>
}
```

C'est le mécanisme fondamental pour les règles impliquant plusieurs champs (mots de passe identiques, dates cohérentes, etc.).

---

## 7. La validation asynchrone (appel serveur)

Certaines règles nécessitent le **serveur** : ici, vérifier que le nom du produit n'existe pas déjà. On écrit un **validateur asynchrone** qui renvoie un `Observable`.

```typescript
nomPris(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);                 // champ vide → on ne valide pas
    }

    return timer(500).pipe(            // debounce : attend 500 ms d'inactivité
      switchMap(() =>                  // switchMap annule la requête précédente si nouvelle frappe
        productService.productExists$(control.value).pipe(
          map((existe: boolean) => (existe ? { nomPris: true } : null)),
          catchError(() => of(null)),  // en cas d'erreur réseau, on ne bloque pas le formulaire
        ),
      ),
      first(),                         // complète l'Observable (obligatoire pour sortir de l'état "pending")
    );
  };
}
```

On l'attache via la clé `asyncValidators` :

```typescript
name: new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, Validators.minLength(5)],
  asyncValidators: [this.nomPris(this._productService)],
}),
```

Points clés à retenir :

- **`timer(500)` + `switchMap`** : évite de bombarder le serveur à chaque touche (debounce) et annule les requêtes obsolètes.
- **`catchError`** : une panne réseau ne doit pas empêcher l'utilisateur de soumettre.
- **`first()`** : indispensable pour que l'Observable se **termine**, sinon le champ reste bloqué en `pending`.

Pendant l'appel, `control.pending` vaut `true`, ce qui permet d'afficher un indicateur :

```html
@if (nameFC?.pending) {
  <span>Vérification en cours…</span>
}
```

---

## 8. Soumettre le formulaire

```typescript
onSubmit() {
  this.form.markAllAsTouched();        // affiche les erreurs même sur les champs non visités
  if (this.form.invalid) {
    return;                            // on bloque l'envoi
  }

  this._productService.createProduct$(this.form.getRawValue()).subscribe({
    next: (product) => { /* succès */ },
    error: (err) => console.log('Échec de l\'ajout', err.message || err),
  });

  this.form.reset();                   // remise à zéro (grâce à nonNullable → valeurs vides)
  this.productAdded.emit();            // notifie le composant parent
}
```

- **`markAllAsTouched()`** : force l'affichage de toutes les erreurs au moment de la soumission.
- **`getRawValue()`** : récupère l'objet complet, y compris les champs désactivés.
- **`reset()`** : remet le formulaire à zéro ; combiné à `nonNullable: true`, les champs repartent sur `''` / `0`.

Côté template, on relie la soumission avec `(ngSubmit)` :

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  ...
  <button mat-raised-button type="submit">Enregistrer</button>
</form>
```

---

## 9. Le formulaire complet de ce projet

Le composant `ProduitAddForm` illustre tous ces concepts :

- **name** : `required` + `minLength(5)` + **validateur async** (`nomPris` → le nom ne doit pas déjà exister).
- **description** : `required` + `minLength(5)` + `maxLength(50)`.
- **price** : `required` + `min(0.01)`.
- **category** : `required` + **validateur sur-mesure** `noDigits` (pas de chiffre).
- **stock** : `required` + `min(0)`.
- **Groupe** : validateur croisé `differentNameAndDescription` (le nom ≠ la description).

Fichiers de référence :

- `src/app/model/IProduct.ts` — le modèle de données.
- `src/app/services/product-service.ts` — les appels HTTP (`createProduct$`, `productExists$`).
- `src/app/components/produit-add-form/produit-add-form.ts` — le formulaire et ses règles.
- `src/app/components/produit-add-form/produit-add-form.html` — la liaison et l'affichage des erreurs.

---

## 10. Exercices

1. **Champ e-mail fournisseur** : ajoutez un champ `contactEmail` obligatoire au format valide (`required` + `Validators.email`).
2. **Bouton intelligent** : décommentez `[disabled]="form.invalid"` sur le bouton « Enregistrer » et observez la différence avec le blocage dans `onSubmit()`.
3. **Prix maximum** : ajoutez `Validators.max(10000)` sur `price` et affichez un message d'erreur dédié.
4. **Validateur sur-mesure** : écrivez un validateur `noSpecialChars` qui interdit les caractères `@`, `#`, `$` dans le nom.
5. **Validation croisée** : ajoutez une règle de groupe imposant que `price` soit supérieur au `stock` (règle arbitraire, pour l'exercice).
6. **Bouton « Effacer »** : ajoutez un bouton `type="button"` qui appelle `form.reset()`.

---

## 11. À retenir

- Les Reactive Forms décrivent le formulaire **en TypeScript** : `FormGroup` regroupe des `FormControl`.
- `[formGroup]` + `formControlName` relient le HTML ; il faut importer `ReactiveFormsModule`.
- Un `FormControl` accepte `(valeur, { validators, asyncValidators, nonNullable })`.
- Un **validateur synchrone** renvoie `null` ou `{ cle: true }` ; on lit l'erreur avec `hasError('cle')`.
- Un **validateur de groupe** (2ᵉ argument du `FormGroup`) permet la **validation croisée**.
- Un **validateur asynchrone** renvoie un `Observable` : on utilise `timer` + `switchMap` + `first` pour interroger le serveur proprement.
- On soumet avec `markAllAsTouched()` puis un test sur `form.invalid`.
