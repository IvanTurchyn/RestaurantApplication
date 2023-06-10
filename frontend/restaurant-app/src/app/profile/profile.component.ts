import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../order.service';
import { User, UserRole } from '../models/user';
import { Order, OrderStatus } from '../models/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  UserRole = UserRole;
  orders: Order[] = [];

  constructor(public authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser?.role === UserRole.CHEF) {
      this.getOrders();
    }
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  updateOrderStatus(order: Order): void {
    order.status = OrderStatus.READY_FOR_PICKUP;
    this.orderService.updateOrder(order.id, order).subscribe(() => this.getOrders());
  }
}
