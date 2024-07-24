import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.cart$.subscribe(cart => {
      this.totalItems = cart.reduce((sum, product) => sum + (product.quantity || 0), 0);
      this.totalPrice = cart.reduce((sum, product) => sum + ((product.price || 0) * (product.quantity || 0)), 0);
    });
  }
}
