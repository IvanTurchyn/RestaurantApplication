import { Component, OnInit } from '@angular/core';
import {OrderService} from "../order.service";
import {Order, OrderStatus} from "../models/order";
import {User} from "../models/user";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    id: '',
    client: {} as User,
    items: [],
    status: OrderStatus.IN_PROGRESS
  };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  createOrder(order: Order): void {
    this.orderService.createOrder(order).subscribe(newOrder => this.orders.push(newOrder));
  }

  updateOrder(id: string, updatedOrder: Order): void {
    this.orderService.updateOrder(id, updatedOrder).subscribe(() => this.getOrders());
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(() => this.getOrders());
  }
}
