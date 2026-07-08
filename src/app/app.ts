import { Component, signal } from '@angular/core';
import { TextInterpolation } from './components/text-interpolation/text-interpolation';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Bindings } from './components/bindings/bindings';
import { ControlFlow } from './components/control-flow/control-flow';
import { ExosBindings } from './components/exos-bindings/exos-bindings';
import { Signals } from './components/signals/signals';

@Component({
  selector: 'app-root',
  imports: [
    TextInterpolation,
    Header,
    Footer,
    Bindings,
    ControlFlow,
    ExosBindings,
    Signals,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('antonera');
}
