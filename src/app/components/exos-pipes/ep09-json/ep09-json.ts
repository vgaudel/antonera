import { Component } from '@angular/core';
import { JsonPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ep09-json',
  imports: [JsonPipe, CurrencyPipe],
  templateUrl: './ep09-json.html',
  styleUrl: './ep09-json.scss',
})
export class Ep09Json {
  commande = {
    id: 1042,
    client: 'Dupont Jean',
    articles: ['Clavier', 'Souris', 'Ecran'],
    total: 459.99,
    livree: false,
  };
}
