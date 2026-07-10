import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MockProductService } from '../../services/mock-product-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IProduct } from '../../model/IProduct';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
@Component({
  selector: 'app-produit-table-from-api-rest',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './produit-table-from-api-rest.html',
  styleUrl: './produit-table-from-api-rest.scss',
})
export class ProduitTableFromApiRest {


  private _productService = inject(ProductService);

  dataSource = new MatTableDataSource<IProduct>([]);

  colonnes = ['name', 'description', 'price', 'category', 'stock', 'actions']

  filtre : string = "";

  error = signal('');

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(): void {
    this._productService.getAllProducts$().subscribe({
      next: (productsFromBack) => {
        this.dataSource.data = productsFromBack;
      },
      error: (err) => this.error.set(`Erreur du backEnd: ${err.message || err}`)
    });
  }

  deleteProduct(product: IProduct): void {
    // const confirmation = confirm(`Voulez-vous supprimer le produit "${product.name}" ?`);

    // if (!confirmation) { return; }

    // this._productService.deleteProductById(product.id);
    // this.loadProducts();
  }

  applyFilter() {
    this.dataSource.filter = this.filtre.trim().toLowerCase();
  }

}
