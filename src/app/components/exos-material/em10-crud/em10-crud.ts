import { Component, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactDialogComponent } from './contact-dialog/contact-dialog';

interface Contact {
  nom:   string;
  email: string;
}

@Component({
  selector: 'app-em10-crud',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './em10-crud.html',
  styleUrl: './em10-crud.scss',
})
export class Em10Crud {
  colonnes = ['nom', 'email', 'action'];

  // Les données sources (signal pour la réactivité)
  contacts = signal<Contact[]>([
    { nom: 'Alice Martin', email: 'alice@example.com' },
    { nom: 'Bob Dupont',   email: 'bob@example.com'   },
  ]);

  // MatTableDataSource : wrapping des données pour mat-table
  dataSource = new MatTableDataSource(this.contacts());

  constructor(
    private dialog:   MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ouvrirDialog() {
    const ref = this.dialog.open(ContactDialogComponent, { width: '400px' });

    // afterClosed() émet la valeur passée à dialogRef.close()
    ref.afterClosed().subscribe((data: Partial<Contact> | undefined) => {
      if (data?.nom && data?.email) {
        this.contacts.update(list => [...list, data as Contact]);
        // [...] crée un nouveau tableau → mat-table détecte le changement
        this.dataSource.data = this.contacts();
        this.snackBar.open(`Contact "${data.nom}" ajouté !`, '✕', { duration: 3000 });
      }
    });
  }

  supprimer(contact: Contact) {
    this.contacts.update(list => list.filter(c => c !== contact));
    this.dataSource.data = this.contacts();
    this.snackBar.open(`Contact "${contact.nom}" supprimé.`, '✕', { duration: 3000 });
  }
}
