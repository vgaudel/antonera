import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-em08-stepper',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './em08-stepper.html',
  styleUrl: './em08-stepper.scss',
})
export class Em08Stepper {
  // inject() est appelé pendant l'initialisation des champs (injection context actif)
  // → disponible AVANT les champs suivants, contrairement au constructeur
  private fb = inject(FormBuilder);

  // Étape 1 : informations de compte
  compteForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Étape 2 : informations personnelles
  infoForm = this.fb.group({
    prenom: ['', Validators.required],
    nom:    ['', Validators.required],
    email:  ['', [Validators.required, Validators.email]],
  });
}
