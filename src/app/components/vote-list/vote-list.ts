import { Component } from '@angular/core';
import { VoteBureau } from '../vote-bureau/vote-bureau';

@Component({
  selector: 'app-vote-list',
  imports: [VoteBureau],
  templateUrl: './vote-list.html',
  styleUrl: './vote-list.scss',
})
export class VoteList {

  // Le parent comptabilise les votes reçus 
  pour: number = 0;
  contre : number = 0;
  abstention : number = 0;

  get total() {return this.pour + this.contre + this.abstention }

  onVoteRecu(choix: string): void{
    if (choix === 'pour') this.pour++;
    else if (choix === 'contre') this.contre++;
    else this.abstention++;
    
  }
}
