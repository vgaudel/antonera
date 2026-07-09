import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Em01Boutons } from './em01-boutons/em01-boutons';
import { Em02Slider } from './em02-slider/em02-slider';
import { Em03Checkboxes } from './em03-checkboxes/em03-checkboxes';
import { Em04Chips } from './em04-chips/em04-chips';
import { Em05Tabs } from './em05-tabs/em05-tabs';
import { Em06Expansion } from './em06-expansion/em06-expansion';
import { Em07Table } from './em07-table/em07-table';
import { Em09Autocomplete } from './em09-autocomplete/em09-autocomplete';
import { Em10Crud } from './em10-crud/em10-crud';
import { Em08Stepper } from './em08-stepper/em08-stepper';

@Component({
  selector: 'app-exos-material',
  imports: [
    FormsModule, 
    Em01Boutons,
    Em02Slider,
    Em03Checkboxes,
    Em04Chips,
    Em05Tabs,
    Em06Expansion, 
    Em07Table,
    Em08Stepper,
    Em09Autocomplete,
    Em10Crud,
  ],
  templateUrl: './exos-material.html',
  styleUrl: './exos-material.scss',
})
export class ExosMaterial {

    
private _activatedRoute = inject(ActivatedRoute);

  subComponents: string[] = [
    'em01-boutons',
    'em02-slider',
    'em03-checkboxes',
    'em04-chips',
    'em05-tabs', 
    'em06-expansion',
    'em07-table',
    'em08-stepper',
    'em09-autocomplete',
    'em10-crud',
  ];
  selectedSubcomponent: string ;

  isIndexOutOfBounds : boolean = false;

  constructor(){
    let indice: number = this._activatedRoute.snapshot.paramMap.get('numExo')?
                         Number(this._activatedRoute.snapshot.paramMap.get('numExo')):1;
    this.isIndexOutOfBounds = (this._activatedRoute.snapshot.paramMap.get('numExo')) ? (
      (indice-1<0) || (indice-1>this.subComponents.length)) : false;

    this.selectedSubcomponent = this.subComponents[this.isIndexOutOfBounds?0:indice-1];
  }
}
