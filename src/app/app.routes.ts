import { Routes } from '@angular/router';
import { TextInterpolation } from './components/text-interpolation/text-interpolation';
import { Bindings } from './components/bindings/bindings';
import { Welcome } from './components/welcome/welcome';
import { NotFound } from './components/not-found/not-found';
import { ExosBindings } from './components/exos-bindings/exos-bindings';
import { Signals } from './components/signals/signals';
import { ExosSignals } from './components/exos-signals/exos-signals';
import { Pipes } from './components/pipes/pipes';
import { ExosPipes } from './components/exos-pipes/exos-pipes';
import { ProduitList } from './components/produit-list/produit-list';
import { VoteList } from './components/vote-list/vote-list';
import { ControlFlow } from './components/control-flow/control-flow';

export const routes: Routes = [
    { path : 'welcome', component : Welcome},
    { path : '', redirectTo:'welcome', pathMatch : 'full'},
    { path : 'text-interpolation', component : TextInterpolation},
    { path : 'control-flow', component : ControlFlow},
    { path : 'bindings', component : Bindings},
    { path : 'exos-bindings/:numExo', component : ExosBindings},
    { path : 'exos-bindings', component : ExosBindings},
    { path : 'signals', component : Signals},
    { path : 'exos-signals', component : ExosSignals},
    { path : 'pipes', component : Pipes},
    { path : 'exos-pipes', component : ExosPipes},
    { path : 'produits', component : ProduitList},
    { path : 'votes', component : VoteList},
    { path : '**', component: NotFound}
];
