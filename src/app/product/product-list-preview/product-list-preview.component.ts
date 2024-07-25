import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interface';
import { ProductService } from '../product.service';
import { OrderService } from '../../order/order.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list-preview',
  templateUrl: './product-list-preview.component.html',
  styleUrl: './product-list-preview.component.css'
})
export class ProductListPreviewComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: result => {
        if (result && result.data) {
          this.products = result.data;
        }
      },
      error: error => Notify.failure(error)
    });
  }

  addToCart(product: IProduct) {
    console.log('Adding to cart', product);
    this.orderService.addToCart(product);
    //this.router.navigate(['/products/cart'])
  }
}
