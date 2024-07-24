import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct, NetworkResponse } from '../shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient){}

  addProduct(product:Omit<IProduct, 'id'>) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*',
    });
    const options = {
      headers
    };
    return this.httpClient.post<NetworkResponse<any>>(`/product`,product, options)
  }

  updateProduct(updatedProduct: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*',
    });
    const options = {
      headers
    };
    return this.httpClient.put<NetworkResponse<any>>(`/product/${updatedProduct._id}`,updatedProduct,options);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete<NetworkResponse<any>>(`/product/${id}`)
  }
  getProducts() {
    return this.httpClient.get<NetworkResponse<Array<any>>>(`/product/table`)
  }
}
