import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PreferenceService } from '../../services/preference-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private _router = inject(Router);
  private _preferenceService = inject(PreferenceService)

  titleHeader = input.required<string>();

  get preferenceService(){
    return this._preferenceService;
  }

  goToWelcome(){
    this._router.navigate(['welcome']);
    //this._router.navigateByUrl('/welcome');
  }

}
