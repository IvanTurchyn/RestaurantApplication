import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Order, OrderStatus } from '../models/order';
import { User, UserRole } from '../models/user';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getOrderById(id);
    }
    this.currentUser = this.authService.currentUserValue;
  }

  getOrderById(id: string): void {
    this.orderService.getOrderById(id).subscribe(order => this.order = order);
  }

  updateOrderStatus(): void {
    if (this.order) {
      this.order.status = OrderStatus.READY_FOR_PICKUP;
      this.orderService.updateOrder(this.order.id, this.order).subscribe();
    }
  }

  isChef(): boolean {
    return this.currentUser?.role === UserRole.CHEF;
  }
}
