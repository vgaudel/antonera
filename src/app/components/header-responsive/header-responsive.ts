import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PreferenceService } from '../../services/preference-service';

@Component({
  selector: 'app-header-responsive',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header-responsive.html',
  styleUrl: './header-responsive.scss',
})
export class HeaderResponsive {


  private _router = inject(Router);
  private _preferenceService = inject(PreferenceService);

  titleHeader = input.required<string>();

  navLinks= [
    { label: 'Bindings', path: '/bindings' },
    { label: 'exos-Bindings', path: '/exos-bindings' },
    { label: 'Signals', path: '/signals' },
    { label: 'exosSignals', path: '/exos-signals' },
    { label: 'ControlFlow', path: '/control-flow' },
    { label: 'Pipes', path: '/pipes' },
    { label: 'Exos-IO', path: '/exos-io/ei01-carte' },
    { label: 'Material', path: '/exos-material' },
    { label: 'ProduitsV1', path: '/produits' },
    { label: 'ProduitsTable', path: '/produits-table' },
  ];


  get preferenceService() {
    return this._preferenceService;
  }

  goToWelcome() {
    this._router.navigate(['welcome']);
  }

}
