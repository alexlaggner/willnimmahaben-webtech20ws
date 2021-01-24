import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('id_token')
   })
  };

  productList : Product [] = null;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product []> {
    return this.http.get<Product []>("http://localhost:3000/products", this.httpOptions);
  }

  newProduct(addedProduct:Product) : Observable<Product> {
    return this.http.post<Product>("http://localhost:3000/products", addedProduct, this.httpOptions);
  }
  deleteProduct (id : string): Observable<string>{
    return this.http.delete<string>("http://localhost:3000/products/"+id, this.httpOptions);
  }
  updateProduct (updatedProduct : Product) : Observable<Product>{
    return this.http.put<Product>("http://localhost:3000/products/"+updatedProduct.id, updatedProduct, this.httpOptions);
  }
  getProductsByCategory(category : string): Observable<Product []>{
    return this.http.get<Product[]>("http://localhost:3000/products/category/"+category, this.httpOptions);
  }
  getProductsByUser(contact : string):Observable<Product []>{
    return this.http.get<Product []>("http://localhost:3000/products/byUser/"+contact, this.httpOptions);
  }
  getProductById(id  :string) :Observable<Product>{
    return this.http.get<Product>("http://localhost:3000/products/detail/"+id ,this.httpOptions);
  }
}
