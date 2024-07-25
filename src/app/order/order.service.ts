import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IOrder, IProduct, NetworkResponse } from '../shared/interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    constructor(private httpClient: HttpClient,
      private authService: AuthService
    ){
        
    }
  private cart: IProduct[] = [];
  private cartSubject = new BehaviorSubject<IProduct[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: IProduct) {
    const existingProduct = this.cart.find(p => p._id === product._id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        product.quantity = product.quantity ||1;
      this.cart.push({ ...product });
    }
    console.log(this.cart.length);
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(p => p._id != productId);
    this.cartSubject.next(this.cart);
  }

  updateQuantity(productId: string, quantity: number) {
    console.log(productId,quantity)
    const product = this.cart.find(p => p._id == productId);
    if (product) {
      product.quantity = quantity;
      this.cartSubject.next(this.cart);
    }
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
  placeOrder(cart:any) {
    console.log('cart',cart);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*',
    });
    const options = {
      headers
    };
    const totalItems = cart.reduce((sum: any, product : any) => sum + (product.quantity || 0), 0);
    const totalPrice = this.cart.reduce((sum: any, product:any) => sum + ((product.price || 0) * (product.quantity || 0)), 0);
    const order ={
      'customerName':this.authService.userName,
      'customerId':this.authService.userId,
      'orderDate':new Date(),
      'status':'Received',
      'totalPrice': totalPrice,
      'totalQuantity':totalItems
    }
    return this.httpClient.post<NetworkResponse<any>>(`/order`,order, options)
  }

  getOrders(){
    return this.httpClient.get<NetworkResponse<Array<any>>>(`/order/table`)
  }
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
}
