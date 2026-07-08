import { Component } from '@angular/core';

@Component({
  selector: 'app-control-flow',
  imports: [],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.scss',
})
export class ControlFlow {

  // --- @if / @else if / @else ---
  isLoggedIn: boolean = true;
  userRole: 'admin' | 'editor' | 'guest' = 'editor';

  // --- @for ---
  fruits: string[] = ['Pomme', 'Banane', 'Cerise', ];
  users: { id: number, name: string }[] = [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Alan' },
    { id: 3, name: 'Grace' },
  ];
  emptyList: string[] = [];

  // --- @switch ---
  status:  'loading' | 'success' | 'error' = 'success';

  // --- @let ---
  firstname: string = "Ada";
  lastname: string = "Lovelace";

  // --- Méthodes pour interagir
  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  changeStatus(value: 'loading' | 'success' | 'error'): void {
    this.status = value;
  }
}
