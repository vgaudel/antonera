import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bindings',
  imports: [FormsModule],
  templateUrl: './bindings.html',
  styleUrl: './bindings.scss',
})
export class Bindings {

  // --- Interpolation ---
  title: string = 'Démonstration des bindings Angular';
  user = {firstname: 'Ada', lastname: 'Lovelace'};

  // --- Property Binding ---
  imageUrl: string = 'beard.svg';
  isButtonDisabled = true;

  // --- Attribute Binding ---
  colspanValue=3;

  // --- Class Binding ---
  isActive=true;

  // --- Style Binding ---
  textColor = 'crimson';
  fontSize = 18;

  // --- EventBinding ---
  clickCount = 0;

  // --- Two-way binding ---
  username = 'Vincent';

  incrementerCounter(): void {
    this.clickCount++;
  }

  test(): void {
    this.clickCount = 0;
  }

  toggleButton(): void {
    this.isButtonDisabled=!this.isButtonDisabled;
  }

  onKeyUp(value: string): void {
    this.username = value;
  }
}
