import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';

interface Employe {
  nom:          string;
  departement:  string;
  salaire:      number;
}

const EMPLOYES: Employe[] = [
  { nom: 'Alice',  departement: 'RH',           salaire: 3200 },
  { nom: 'Bob',    departement: 'Informatique',  salaire: 4100 },
  { nom: 'Clara',  departement: 'Finance',       salaire: 3800 },
  { nom: 'David',  departement: 'Informatique',  salaire: 4500 },
  { nom: 'Emma',   departement: 'RH',            salaire: 3100 },
  { nom: 'Félix', departement: 'Marketing',     salaire: 3300 },
  { nom: 'Grace',  departement: 'Finance',       salaire: 3900 },
  { nom: 'Hugo',   departement: 'Marketing',     salaire: 3400 },
];

@Component({
  selector: 'app-em07-table',
  imports: [DecimalPipe, MatTableModule, MatSortModule],
  templateUrl: './em07-table.html',
  styleUrl: './em07-table.scss',
})
export class Em07Table implements AfterViewInit {
  colonnes = ['nom', 'departement', 'salaire'];

  // MatTableDataSource gère le tri et le filtrage pour nous
  dataSource = new MatTableDataSource(EMPLOYES);

  // @ViewChild récupère la directive MatSort posée sur le <table>
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // On branche le tri après que la vue soit initialisée
    this.dataSource.sort = this.sort;
  }
}
