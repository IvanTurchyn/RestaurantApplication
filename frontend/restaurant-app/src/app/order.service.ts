import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Order } from './models/order';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Wystąpił błąd!', error);
          return throwError(error);
        })
      );
  }

  getOrderById(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url)
      .pipe(
        catchError(error => {
          console.error('Wystąpił błąd!', error);
          return throwError(error);
        })
      );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(id: string, updatedOrder: Order): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, updatedOrder);
  }

  deleteOrder(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
