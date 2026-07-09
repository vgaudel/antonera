import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ep05-date-predefini',
  imports: [DatePipe],
  templateUrl: './ep05-date-predefini.html',
  styleUrl: './ep05-date-predefini.scss',
})
export class Ep05DatePredefini {
  naissance = new Date(1984, 3, 12);
}
