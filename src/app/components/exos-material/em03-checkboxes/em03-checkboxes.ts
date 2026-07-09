import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Article {
  nom: string;
  coche: boolean;
}

@Component({
  selector: 'app-em03-checkboxes',
  imports: [MatCheckboxModule],
  templateUrl: './em03-checkboxes.html',
  styleUrl: './em03-checkboxes.scss',
})
export class Em03Checkboxes {
  articles: Article[] = [
    { nom: 'Pommes',  coche: false },
    { nom: 'Pain',    coche: false },
    { nom: 'Lait',    coche: true  },
    { nom: 'Oeufs',   coche: false },
    { nom: 'Beurre',  coche: true  },
    { nom: 'Café',    coche: false },
  ];

  get coches()   { return this.articles.filter(a => a.coche).length; }
  get restants() { return this.articles.length - this.coches; }
}
