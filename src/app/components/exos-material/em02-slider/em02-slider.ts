import { Component, signal, computed } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-em02-slider',
  imports: [MatSliderModule, MatIconModule, FormsModule],
  templateUrl: './em02-slider.html',
  styleUrl: './em02-slider.scss',
})
export class Em02Slider {
  luminosite = signal(50);

  icone = computed(() => {
    const v = this.luminosite();
    if (v <= 33) return 'brightness_low';
    if (v <= 66) return 'brightness_medium';
    return 'brightness_high';
  });
}
