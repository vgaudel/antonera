import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ep04-number',
  imports: [DecimalPipe],
  templateUrl: './ep04-number.html',
  styleUrl: './ep04-number.scss',
})
export class Ep04Number {
  population = 8045311447;
  distance = 384400.5678;
}
