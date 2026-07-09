import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExclamationPipe } from '../../pipes/exclamation-pipe';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, ExclamationPipe, TimeAgoPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
})
export class Pipes {


  // Pipes sur les chaînes de caractères
  nom = "John Legend BAGUETTE";

  // pipes sur les nombres
  prix = 1234.567;
  pourcentage = 0.8542;

  // pipes sur les dates
  maintenant = new Date();

  hier = new Date("2026-07-08T15:14:00") ;

  // Pipes sur les objets / JSON
  utilisateur = {
    prenom : 'Marie',
    nom : 'Curie',
    age : 66,
    prix_nobel : ['Physique','Chimie']
  }
}
