import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Composant dialog isolé, ouvert via MatDialog.open().
 * Il reçoit MatDialogRef pour pouvoir se fermer
 * et transmettre les données au composant appelant.
 */
@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <h2 mat-dialog-title>Nouveau contact</h2>

    <mat-dialog-content>
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1rem; padding-top: 0.5rem">

        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="nom">
          <mat-error>Champ requis</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
          @if (form.get('email')?.hasError('required')) {
            <mat-error>Champ requis</mat-error>
          }
          @if (form.get('email')?.hasError('email')) {
            <mat-error>Format email invalide</mat-error>
          }
        </mat-form-field>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <!-- mat-dialog-close sans valeur ferme et retourne undefined -->
      <button mat-stroked-button mat-dialog-close>Annuler</button>
      <!-- On ferme manuellement via dialogRef.close(data) pour passer les données -->
      <button mat-flat-button [disabled]="form.invalid" (click)="valider()">Ajouter</button>
    </mat-dialog-actions>
  `,
})
export class ContactDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<ContactDialogComponent>>(MatDialogRef);

  form = this.fb.group({
    nom:   ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  valider() {
    if (this.form.valid) {
      // dialogRef.close(data) renvoie la valeur à l'appelant via afterClosed()
      this.dialogRef.close(this.form.value);
    }
  }
}
