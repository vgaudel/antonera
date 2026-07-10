import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, maxDate, minLength, pattern, required, validate } from '@angular/forms/signals';
import { IUser, IUserForm } from '../../model/IUser';

@Component({
  selector: 'app-user-add-form',
  imports: [FormField, DatePipe],
  templateUrl: './user-add-form.html',
  styleUrl: './user-add-form.scss',
})
export class UserAddForm {

  users = signal<IUser[]>([]);

  // Signal qui va nous servir pour construire le formulaire
  // C'est lui qui est en charge du Two-way binding
  modele = signal<IUserForm>({
    name: '',
    password: '',
    confirmPassword: '',
    birthday: null,
    role: '',
  });

  userForm = form(this.modele, (path) => {
    //---- Name : obligatoire + 3 caractères ---
    required(path.name, { message: 'Le nom est obligatoire' });
    minLength(path.name, 3, { message: 'Le nom doit comporter au moins 3 caractères' });
    // --- Mot de passe : obligatoire, 8 caractères mini, 1 majuscule + 1 chiffre ---
    required(path.password, { message: 'Le mot de passe est obligatoire.' });
    minLength(path.password, 8, {
      message: 'Le mot de passe doit contenir au moins 8 caractères.',
    });
    // pattern() vérifie une expression régulière. Ici, deux « look-ahead » :
    //   (?=.*[A-Z]) → il existe au moins une majuscule
    //   (?=.*\d)    → il existe au moins un chiffre
    pattern(path.password, /(?=.*[A-Z])(?=.*\d)/, {
      message: 'Le mot de passe doit contenir au moins une majuscule et un chiffre.',
    });

    // --- Confirmation : obligatoire + doit être identique au mot de passe ---
    required(path.confirmPassword, { message: 'Veuillez confirmer le mot de passe.' });
    // validate() permet une règle SUR-MESURE. La fonction reçoit un contexte :
    //   value()          → la valeur du champ courant (ici confirmPassword)
    //   valueOf(chemin)  → la valeur d'un AUTRE champ (ici password)
    // On renvoie `null` si tout va bien, sinon un objet { kind, message }.
    // C'est ainsi qu'on réalise une validation « croisée » entre deux champs.
    validate(path.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(path.password)
        ? {
          kind: 'passwordMismatch',
          message: 'Les deux mots de passe doivent être identiques',
        }
        : null,
    );

    // --- Date de naissance : obligatoire + ne peut pas être dans le futur ---
    required(path.birthday, { message: 'La date de naissance est obligatoire.' });
    // maxDate() est un validateur natif dédié aux dates : la valeur doit être
    // antérieure ou égale à la date passée en argument (aujourd'hui).
    maxDate(path.birthday, new Date(), {
      message: 'La date de naissance ne peut pas être dans le futur.',
    });

    // --- Rôle : obligatoire (une chaîne vide '' est considérée comme « vide ») ---
    required(path.role, { message: 'Veuillez choisir un rôle.' });
  })


  onSubmit(): void {
    this.userForm().markAsTouched();

    if (this.userForm().invalid()) {
      return;
    }
    // On retire le champ de confirmation avant d'enregistrer : la déstructuration
    // « ...user » récupère toutes les propriétés SAUF confirmPassword.
    const { confirmPassword, ...user } = this.modele();
    this.users.update((list) => [...list, user]);

    this.modele.set({
      name: '',
      password: '',
      confirmPassword: '',
      birthday: null,
      role: '',
    }) 

    this.userForm().reset();
  }

}
