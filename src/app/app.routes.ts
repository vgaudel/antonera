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
import { ExosIO } from './components/exos-io/exos-io';
import { Ei01Carte } from './components/exos-io/ei01-carte/ei01-carte';
import { Ei02Enfant } from './components/exos-io/ei02-notes/ei02-enfant/ei02-enfant';
import { Ei02Notes } from './components/exos-io/ei02-notes/ei02-notes';
import { Ei03Contacts } from './components/exos-io/ei03-contacts/ei03-contacts';
import { Ei04Cinema } from './components/exos-io/ei04-cinema/ei04-cinema';
import { Ei05Alertes } from './components/exos-io/ei05-alertes/ei05-alertes';
import { Ei06Couleur } from './components/exos-io/ei06-couleur/ei06-couleur';
import { Ei07Reactions } from './components/exos-io/ei07-reactions/ei07-reactions';
import { Ei08Formulaire } from './components/exos-io/ei08-formulaire/ei08-formulaire';
import { Ei09Todos } from './components/exos-io/ei09-todos/ei09-todos';
import { Ei10Boutique } from './components/exos-io/ei10-boutique/ei10-boutique';
import { ExosMaterial } from './components/exos-material/exos-material';

export const routes: Routes = [
    { path : 'welcome', component : Welcome},
    { path : '', redirectTo:'welcome', pathMatch : 'full'},
    { path : 'text-interpolation', component : TextInterpolation},
    { path : 'control-flow', component : ControlFlow},
    { path : 'bindings', component : Bindings},
    { path : 'exos-bindings/:numExo', component : ExosBindings},
    { path : 'exos-bindings', component : ExosBindings},
    { path : 'exos-material/:numExo', component : ExosMaterial},
    { path : 'exos-material', component : ExosMaterial},
    { path : 'signals', component : Signals},
    { path : 'exos-signals', component : ExosSignals},
    { path : 'pipes', component : Pipes},
    { path : 'exos-pipes', component : ExosPipes},
    { path : 'produits', component : ProduitList},
    { path : 'votes', component : VoteList},
    { 
        path : 'exos-io', 
        component : ExosIO,
        children: [
              { path: 'ei01-carte', component : Ei01Carte},
              { path: 'ei02-notes', component : Ei02Notes},
              { path: 'ei03-contacts', component : Ei03Contacts},
              { path: 'ei04-cinema', component : Ei04Cinema},
              { path: 'ei05-alertes', component : Ei05Alertes},
              { path: 'ei06-couleur', component : Ei06Couleur},
              { path: 'ei07-reactions', component : Ei07Reactions},
              { path: 'ei08-formulaire', component : Ei08Formulaire},
              { path: 'ei09-todos', component : Ei09Todos},
              { path: 'ei10-boutique', component : Ei10Boutique},
    
        ]

    },
    { path : '**', component: NotFound}
];
