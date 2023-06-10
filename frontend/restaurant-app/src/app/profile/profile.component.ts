import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../order.service';
import { MenuService } from '../menu.service';
import { User, UserRole } from '../models/user';
import { Order, OrderStatus } from '../models/order';
import {MenuPosition} from "../models/menu-positions";
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  UserRole = UserRole;
  users: User[] = [];
  orders: Order[] = [];
  menu: MenuPosition[] = [];

  showUsersTable: boolean = false;
  showOrdersTable: boolean = false;
  showMenuTable: boolean = false;

  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private menuService : MenuService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser?.role === UserRole.CHEF) {
      this.getOrders(OrderStatus.IN_PROGRESS);
      this.getMenu();
    }
    if (this.currentUser?.role === UserRole.MANAGER) {
      this.getUsers();
      this.getOrders();
      this.getMenu();
    }
    if (this.currentUser?.role === UserRole.CLIENT) {
      this.getMenu();
    }
    if (this.currentUser?.role === UserRole.WAITER) {
      this.getOrders();
      this.getMenu();
    }
  }

  getOrders(status?: OrderStatus): void {
    if (status) {
      this.orderService.getOrdersByStatus(status).subscribe(orders => this.orders = orders);
    } else {
      this.orderService.getOrders().subscribe(orders => this.orders = orders);
    }
  }

  updateOrderStatus(order: Order): void {
    order.status = OrderStatus.READY_FOR_PICKUP;
    this.orderService.updateOrder(order.id, order).subscribe(() => this.getOrders());
  }

  getMenu(): void {
    this.menuService.getAllMenuPositions().subscribe(menu => this.menu = menu);
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  toggleTable(table: string): void {
    switch(table) {
      case 'users':
        this.showUsersTable = !this.showUsersTable;
        break;
      case 'orders':
        this.showOrdersTable = !this.showOrdersTable;
        break;
      case 'menu':
        this.showMenuTable = !this.showMenuTable;
        break;
      default:
        break;
    }
  }
}
