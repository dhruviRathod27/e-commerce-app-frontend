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
  products: IProduct[] = [{
    "id":1,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  },
  {
    "id":2,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  },
  {
    "id":3,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  },
  {
    "id":4,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  },
  {
    "id":5,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  }];

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    //this.productService.getProducts().subscribe(products => this.products = products);
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
