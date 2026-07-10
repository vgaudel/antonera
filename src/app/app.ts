import { Component, signal } from '@angular/core';
import { TextInterpolation } from './components/text-interpolation/text-interpolation';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Bindings } from './components/bindings/bindings';
import { ControlFlow } from './components/control-flow/control-flow';
import { ExosBindings } from './components/exos-bindings/exos-bindings';
import { Signals } from './components/signals/signals';
import { ProduitList } from './components/produit-list/produit-list';
import { VoteList } from './components/vote-list/vote-list';
import { ExosIO } from './components/exos-io/exos-io';
import { Pipes } from './components/pipes/pipes';
import { RouterOutlet } from '@angular/router';
import { HeaderV2 } from "./components/header-v2/header-v2";
import { HeaderResponsive } from "./components/header-responsive/header-responsive";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    HeaderV2,
    HeaderResponsive
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('antonera');
}
