import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-produit-table',
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
  templateUrl: './produit-table.html',
  styleUrl: './produit-table.scss',
})
export class ProduitTable implements OnInit, AfterViewInit {

  private _productService = inject(MockProductService);

  dataSource = new MatTableDataSource<IProduct>([]);

  colonnes = ['name', 'description', 'price', 'category', 'stock', 'actions']

  filtre : string = "";

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
    this.dataSource.data = this._productService.getAllProducts();
  }

  deleteProduct(product: IProduct): void {
    const confirmation = confirm(`Voulez-vous supprimer le produit "${product.name}" ?`);

    if (!confirmation) { return; }

    this._productService.deleteProductById(product.id);
    this.loadProducts();
  }

  applyFilter() {
    this.dataSource.filter = this.filtre.trim().toLowerCase();
  }
}
