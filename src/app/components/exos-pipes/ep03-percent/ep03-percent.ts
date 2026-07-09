import { Component } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-ep03-percent',
  imports: [PercentPipe],
  templateUrl: './ep03-percent.html',
  styleUrl: './ep03-percent.scss',
})
export class Ep03Percent {
  tauxTva = 0.20;
  tauxRemise = 0.15;
  tauxReussite = 0.8745;
}
