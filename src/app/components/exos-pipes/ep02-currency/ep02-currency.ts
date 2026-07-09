import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ep02-currency',
  imports: [CurrencyPipe],
  templateUrl: './ep02-currency.html',
  styleUrl: './ep02-currency.scss',
})
export class Ep02Currency {
  prix = 49.99;
}
