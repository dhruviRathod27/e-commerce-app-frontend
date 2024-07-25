import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order/order.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '../shared/roles.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItems: number = 0;
  ROLE = Role;
  userRole = '';
  constructor(private orderService: OrderService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.userRole = this.authService.userRole;
    this.orderService.cart$.subscribe(cart => {
      this.totalItems = cart.reduce((sum, product) => sum + (product.quantity || 0), 0);
    });
  }

  goToOrder() {
    this.router.navigate(['/cart']);
  }
  logout() {
    this.orderService.clearCart();
    this.authService.logout();
  }
}
