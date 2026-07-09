import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from '../../services/preference-service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  private _preferenceService = inject(PreferenceService);

  get preferenceService(){
    return this._preferenceService;
  }

}
