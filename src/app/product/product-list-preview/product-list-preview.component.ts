import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interface';
import { ProductService } from '../product.service';
import { OrderService } from '../../order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-preview',
  templateUrl: './product-list-preview.component.html',
  styleUrl: './product-list-preview.component.css'
})
export class ProductListPreviewComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(result =>{
      if(result && result.data){
        this.products = result.data;
      }
   } );
  }

  addToCart(product: IProduct) {
    console.log('Adding to cart', product);
    this.orderService.addToCart(product);
    //this.router.navigate(['/products/cart'])
  }
  // increaseQuantity(product:IProduct) {
  //   console.log('increaseQuantity called',product);
  //   this.orderService.updateQuantity(product.id, (product.quantity || 1) + 1);
  // }

  // decreaseQuantity(product: IProduct) {
  //   const currentQuantity =  0;
  //   if (currentQuantity > 1) {
  //     this.orderService.updateQuantity(product.id, currentQuantity - 1);
  //   }
  // }
}
