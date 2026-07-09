import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

interface FaqItem {
  question: string;
  reponse:  string;
  expanded: boolean;
}

@Component({
  selector: 'app-em06-expansion',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './em06-expansion.html',
  styleUrl: './em06-expansion.scss',
})
export class Em06Expansion {
  faq: FaqItem[] = [
    {
      question: "Qu'est-ce qu'Angular Material ?",
      reponse:  "Angular Material est une librairie de composants UI pour Angular, implémentant les spécifications Material Design de Google.",
      expanded: true,
    },
    {
      question: "Quels composants sont disponibles ?",
      reponse:  "Boutons, formulaires, tableaux, dialogs, menus, sliders, chips, onglets, steppers, snackbars et bien d'autres.",
      expanded: false,
    },
    {
      question: "Comment personnaliser le thème ?",
      reponse:  "Via le mixin SCSS mat.theme() dans styles.scss, en choisissant des palettes pour primary, secondary et tertiary.",
      expanded: false,
    },
    {
      question: "Material Design 2 ou 3 ?",
      reponse:  "Angular Material supporte Material Design 3 (Material You) depuis la v17, avec des custom properties CSS et des design tokens.",
      expanded: false,
    },
    {
      question: "Les composants sont-ils accessibles ?",
      reponse:  "Oui. Tous les composants Angular Material respectent les standards WCAG avec support clavier et attributs ARIA.",
      expanded: false,
    },
  ];

  toutFermer() {
    // On reconstruit le tableau pour déclencher la détection de changements
    this.faq = this.faq.map(item => ({ ...item, expanded: false }));
  }
}
