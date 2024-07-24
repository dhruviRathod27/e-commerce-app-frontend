import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/interface';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = [];
  displayedColumns=['id','customerName','orderDate','status',
    'totalAmount'
  ]
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(result => {
      if(result && result.data)
      this.orders = result.data;
    });
  }
}
