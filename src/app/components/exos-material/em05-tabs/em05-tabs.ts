import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Profil {
  prenom:    string;
  nom:       string;
  email:     string;
  telephone: string;
}

@Component({
  selector: 'app-em05-tabs',
  imports: [FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './em05-tabs.html',
  styleUrl: './em05-tabs.scss',
})
export class Em05Tabs {
  profil: Profil = { prenom: '', nom: '', email: '', telephone: '' };
}
