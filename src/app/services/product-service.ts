import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/IProduct';

@Service()
export class ProductService {

    private _http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:3000/products"

     getAllProducts$(): Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.apiUrl);
  }
  
  getProductById$(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  getProductByName$(name: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this.apiUrl}/name/${name}`);
  }

  getProductsByCategory$(category: string): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this.apiUrl}/category/${category}`);
  }
  
  getProductsCategories$(): Observable<string[]> {
    return this._http.get<string[]>(`${this.apiUrl}/categories`);
  }

  productExists$(name: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.apiUrl}/exists/${name}`);
  }

  countProducts$(): Observable<number> {
    return this._http.get<number>(`${this.apiUrl}/count/total`);
  }

  createProduct$(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this._http.post<IProduct>(this.apiUrl, product);
  }

  updateProduct$(id: string, product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this._http.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  deleteProductById$(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  deleteProductByName$(name: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this.apiUrl}/name/${name}`);
  }

}
