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

    createProduct$(product: Omit<IProduct, 'id'>) : Observable<IProduct>{
        return this._http.post<IProduct>(this.apiUrl,product);
    }

    productExists$(name : string) : Observable<boolean>{
        return this._http.get<boolean>(`${this.apiUrl}/exists/${name}`);
    }

}
