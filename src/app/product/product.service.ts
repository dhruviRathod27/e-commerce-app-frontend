import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = new BehaviorSubject<IProduct[]>([]);
  private idCounter = 0;
  products$ = this.products.asObservable();

  addProduct(product:Omit<IProduct, 'id'>) {
    console.log(product);
    const currentProducts = this.products.value;
    const newProduct = { ...product, id: ++this.idCounter };
    this.products.next([...currentProducts,newProduct]);
  }

  updateProduct(updatedProduct: IProduct) {
    const currentProducts = this.products.value.map(product => 
        product.id == updatedProduct.id ? updatedProduct : product
      );
      this.products.next(currentProducts);
  }

  deleteProduct(id: number) {
    const currentProducts = this.products.value.filter(product => product.id !== id);
    this.products.next(currentProducts);
  }
  getProducts() {
    return this.products$;
  }
}
