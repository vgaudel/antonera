import { Component, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const COMPETENCES = [
  'Angular', 'React', 'Vue', 'TypeScript', 'JavaScript',
  'Node.js', 'Python', 'Docker', 'Git', 'SQL',
];

@Component({
  selector: 'app-em09-autocomplete',
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './em09-autocomplete.html',
  styleUrl: './em09-autocomplete.scss',
})
export class Em09Autocomplete {
  // Référence native à l'input, pour le vider après sélection
  @ViewChild('saisieInput') saisieInput!: ElementRef<HTMLInputElement>;

  // FormControl pour piloter la saisie et déclencher le filtre
  saisieCtrl = new FormControl('');

  // Liste des compétences sélectionnées
  selectionnes = signal<string[]>([]);

  // toSignal() convertit l'Observable valueChanges en signal réactif
  private saisie = toSignal(this.saisieCtrl.valueChanges, { initialValue: '' });

  // computed() filtre les suggestions : exclut les déjà sélectionnées
  suggestionsFiltrees = computed(() => {
    const val = (this.saisie() ?? '').toLowerCase();
    return COMPETENCES.filter(c =>
      c.toLowerCase().includes(val) && !this.selectionnes().includes(c)
    );
  });

  ajouter(event: MatAutocompleteSelectedEvent) {
    const valeur: string = event.option.value;
    if (!this.selectionnes().includes(valeur)) {
      this.selectionnes.update(s => [...s, valeur]);
    }
    // On vide le FormControl ET la valeur native de l'input
    this.saisieCtrl.setValue('');
    this.saisieInput.nativeElement.value = '';
  }

  retirer(competence: string) {
    this.selectionnes.update(s => s.filter(c => c !== competence));
  }
}
