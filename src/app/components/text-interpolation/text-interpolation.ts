import { Component } from '@angular/core';

@Component({
  selector: 'app-text-interpolation',
  imports: [],
  templateUrl: './text-interpolation.html',
  styleUrl: './text-interpolation.scss',
})
export class TextInterpolation {

  user = {name: "Gaudel", firstname: "Vincent", age: 40};
  message: string = "Bonjour l'Onera !";

}
