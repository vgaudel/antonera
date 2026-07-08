import { Component, output } from '@angular/core';

@Component({
  selector: 'app-vote-bureau',
  imports: [],
  templateUrl: './vote-bureau.html',
  styleUrl: './vote-bureau.scss',
})
export class VoteBureau {

  // -------------------------------------------------------
  // output() — Émet un événement VERS le parent
  // -------------------------------------------------------

  // output<string>() crée un OutputEmitterRef qui émet des valeurs de type string.
  // Le parent écoute cet événement avec (aVote)="maMethode($event)"
  

  aVote=output<string>();

  voter(choix: string){
    // .emit(value) envoie value au parent
    this.aVote.emit(choix);
  }

}
