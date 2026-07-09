import { Component, signal, computed } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

interface Categorie {
  nom: string;
  selectionnee: boolean;
}

@Component({
  selector: 'app-em04-chips',
  imports: [MatChipsModule],
  templateUrl: './em04-chips.html',
  styleUrl: './em04-chips.scss',
})
export class Em04Chips {
  categories = signal<Categorie[]>([
    { nom: 'Fruits',   selectionnee: false },
    { nom: 'Légumes',  selectionnee: false },
    { nom: 'Viandes',  selectionnee: false },
    { nom: 'Poissons', selectionnee: false },
    { nom: 'Épices',   selectionnee: false },
  ]);

  selection = computed(() =>
    this.categories()
      .filter(c => c.selectionnee)
      .map(c => c.nom)
  );

  basculer(index: number) {
    this.categories.update(cats =>
      cats.map((c, i) => i === index ? { ...c, selectionnee: !c.selectionnee } : c)
    );
  }
}
