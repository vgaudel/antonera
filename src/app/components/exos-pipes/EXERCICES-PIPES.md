# Exercices — Les Pipes Angular

> **Prerequis** : Angular 17+, notions de base sur les composants.
> **Objectif** : Savoir utiliser les pipes integres d'Angular pour formater l'affichage des donnees.

---

## Rappel des pipes couverts

| Pipe | Categorie | Exemple |
|------|-----------|---------|
| `uppercase` | Chaine | `'bonjour' -> 'BONJOUR'` |
| `lowercase` | Chaine | `'BONJOUR' -> 'bonjour'` |
| `titlecase` | Chaine | `'jean dupont' -> 'Jean Dupont'` |
| `number:'1.2-2'` | Nombre | `1234.5 -> '1,234.50'` |
| `currency:'EUR'` | Nombre | `49.99 -> '€49.99'` |
| `percent:'1.1-1'` | Nombre | `0.85 -> '85.0%'` |
| `date:'dd/MM/yyyy'` | Date | `Date -> '14/04/2026'` |
| `date:'HH:mm:ss'` | Date | `Date -> '09:30:00'` |
| `json` | Objet | Serialise en JSON lisible |
| `slice:0:3` | Tableau/Chaine | Extrait une portion |

Syntaxe generale dans le template :
```html
{{ valeur | nomDuPipe }}
{{ valeur | nomDuPipe:argument1:argument2 }}
```

---

## Exercice 1 — Transformation de chaines (***)

**Contexte** : Vous affichez des titres de films saisis par des utilisateurs. Les donnees arrivent dans des formats inconsistants.

**Objectif** : Declarer une propriete `titre` contenant la chaine `'le seigneur des anneaux : la communaute de l\'anneau'`.
L'afficher trois fois : en majuscules, en minuscules, et en capitalisation de titre.

**Affichage attendu** :
```
Brut        : le seigneur des anneaux : la communaute de l'anneau
Uppercase   : LE SEIGNEUR DES ANNEAUX : LA COMMUNAUTE DE L'ANNEAU
Lowercase   : le seigneur des anneaux : la communaute de l'anneau
Titlecase   : Le Seigneur Des Anneaux : La Communaute De L'Anneau
```

**Import necessaire** : `UpperCasePipe, LowerCasePipe, TitleCasePipe` depuis `@angular/common`
(ou simplement `CommonModule`).

---

## Exercice 2 — Formatage d'un prix en devise (***)

**Contexte** : Une boutique en ligne affiche ses prix dans plusieurs devises.

**Objectif** : Declarer une propriete `prix = 49.99`.
L'afficher en euros (symbole EUR), en dollars (symbole $), et en livres sterling (symbole GBP), sans decimale pour le dollar.

**Affichage attendu** :
```
Prix brut   : 49.99
EUR         : €49.99
USD         : $50 (arrondi, sans decimale)
GBP         : £49.99
```

**Import necessaire** : `CurrencyPipe`

---

## Exercice 3 — Affichage de pourcentages (***)

**Contexte** : Un tableau de bord RH affiche des statistiques sur les effectifs.

**Objectif** : Declarer trois proprietes :
- `tauxTva = 0.20`
- `tauxRemise = 0.15`
- `tauxReussite = 0.8745`

Afficher chacune avec le pipe `percent`, en variant la precision des decimales.

**Affichage attendu** :
```
TVA         : 20%
Remise      : 15%
Reussite    : 87.5% (1 decimale)
```

**Import necessaire** : `PercentPipe`

---

## Exercice 4 — Formatage de grands nombres (****)

**Contexte** : Une application scientifique affiche des mesures astronomiques.

**Objectif** : Declarer deux proprietes :
- `population = 8045311447`
- `distance = 384400.5678` (distance Terre-Lune en km)

Les afficher avec differentes options du pipe `number` :
- `population` : sans decimale, avec separateurs de milliers
- `distance` : avec exactement 2 decimales

**Affichage attendu** :
```
Population  : 8,045,311,447
Distance    : 384,400.57 km
```

**Import necessaire** : `DecimalPipe`

---

## Exercice 5 — Dates avec formats predefinis (****)

**Contexte** : Un profil utilisateur affiche sa date de naissance sous plusieurs formes.

**Objectif** : Declarer `naissance = new Date(1984, 3, 12)` (12 avril 1984).
L'afficher avec les formats predefinis : `short`, `medium`, `long` et `full`.

**Affichage attendu** (les valeurs varient selon la locale) :
```
short   : 4/12/84, 12:00 AM
medium  : Apr 12, 1984, 12:00:00 AM
long    : April 12, 1984 at 12:00:00 AM GMT+2
full    : Saturday, April 12, 1984 at ...
```

**Import necessaire** : `DatePipe`

---

## Exercice 6 — Dates avec formats personnalises (****)

**Contexte** : Un systeme de reservation affiche la date et l'heure d'un evenement.

**Objectif** : Declarer `evenement = new Date(2024, 5, 21, 14, 30, 0)` (21 juin 2024 a 14h30).
L'afficher avec trois formats personnalises :
- `dd/MM/yyyy`
- `dd MMMM yyyy`
- `HH:mm` (heure et minutes uniquement)

**Affichage attendu** :
```
Format court : 21/06/2024
Format long  : 21 June 2024
Heure        : 14:30
```

**Import necessaire** : `DatePipe`

---

## Exercice 7 — Slice sur une chaine (***)

**Contexte** : Un composant doit afficher un extrait (apercu) d'une longue description.

**Objectif** : Declarer une propriete :
```typescript
description = 'Angular est un framework JavaScript developpe et maintenu par Google.';
```
L'afficher en entier, puis n'afficher que les 20 premiers caracteres suivis de `'...'`.

**Affichage attendu** :
```
Complet : Angular est un framework JavaScript developpe et maintenu par Google.
Apercu  : Angular est un fra...
```

**Import necessaire** : `SlicePipe`

---

## Exercice 8 — Slice sur un tableau (***)

**Contexte** : Une liste de pays doit etre affichee par pages de 3 elements.

**Objectif** : Declarer un tableau :
```typescript
pays = ['France', 'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Belgique', 'Suisse', 'Autriche'];
```
Afficher :
- Les 3 premiers pays
- Les pays de la position 3 a 6 (exclusive)
- Les 3 derniers pays (utiliser un index negatif)

**Import necessaire** : `SlicePipe`

---

## Exercice 9 — Pipe JSON pour le debogage (****)

**Contexte** : Pendant le developpement, vous devez inspecter un objet complexe directement dans le template.

**Objectif** : Declarer l'objet suivant :
```typescript
commande = {
  id: 1042,
  client: 'Dupont Jean',
  articles: ['Clavier', 'Souris', 'Ecran'],
  total: 459.99,
  livree: false
};
```
L'afficher dans une balise `<pre>` avec le pipe `json`.
Afficher aussi separement `commande.total` avec le pipe `currency:'EUR'`.

**Import necessaire** : `JsonPipe, CurrencyPipe`

---

## Exercice 10 — Combinaison de pipes sur une fiche produit (*****)

**Contexte** : Une page produit doit afficher toutes les informations formatees.

**Objectif** : Declarer l'objet :
```typescript
produit = {
  nom: 'macbook pro 16 pouces',
  prix: 2999.00,
  dateAjout: new Date(2024, 0, 15),
  stock: 12
};
```
Afficher :
- Le nom en `titlecase`
- Le prix en `currency:'EUR'`
- La date au format `dd/MM/yyyy`
- Le stock avec `number:'1.0-0'`

Aucun pipe ne doit etre applique dans le `.ts`, tout doit se faire dans le template.

**Import necessaire** : `TitleCasePipe, CurrencyPipe, DatePipe, DecimalPipe`

---

## Recapitulatif des pipes par exercice

| Exercice | Pipes utilises |
|----------|---------------|
| 1 | `uppercase`, `lowercase`, `titlecase` |
| 2 | `currency` |
| 3 | `percent` |
| 4 | `number` |
| 5 | `date` (formats predefinis) |
| 6 | `date` (formats personnalises) |
| 7 | `slice` sur chaine |
| 8 | `slice` sur tableau |
| 9 | `json`, `currency` |
| 10 | `titlecase`, `currency`, `date`, `number` |
