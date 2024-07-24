import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { IProduct } from '../../shared/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  cart: IProduct[] = [];
  totalPrice: number = 0;
  constructor(private orderService: OrderService,private router: Router) {}

  ngOnInit() {
    this.orderService.cart$.subscribe(cart => {
      this.cart = cart
      this.calculateTotalPrice();
    });
  }
  calculateTotalPrice(){
    this.totalPrice = this.cart.reduce((sum, product) => sum + ((product.price || 0) * (product.quantity || 0)), 0);
  }
  updateQuantity(productId: string, quantity: number) {
    this.orderService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: any) {
    this.orderService.removeFromCart(productId);
  }
  proceedToBuy(){
    this.orderService.placeOrder(this.cart).subscribe(result =>{
      console.log(result);
      this.orderService.clearCart();
      this.router.navigate(['/order-success']);
    });

  }
  increaseQuantity(productId: any) {
    this.orderService.updateQuantity(productId, (this.getQuantity(productId) || 0) + 1);
    this.calculateTotalPrice();
  }

  decreaseQuantity(productId: any) {
    const currentQuantity = this.getQuantity(productId) || 0;
    if (currentQuantity > 1) {
      this.orderService.updateQuantity(productId, currentQuantity - 1);
      this.calculateTotalPrice();
    }
  }

  getQuantity(productId: string): number {
    const product = this.cart.find(p => p._id === productId);
    return product ? product.quantity || 0 : 0;
  }
}
