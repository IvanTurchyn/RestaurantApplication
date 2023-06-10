package com.study.restaurantapp.service

import com.study.restaurantapp.model.Order
import com.study.restaurantapp.model.OrderStatus

interface OrderService {
    fun getAllOrders(): List<Order>
    fun getOrderById(id: String): Order
    fun createOrder(order: Order): Order
    fun getOrderByStatus(status: OrderStatus) : List<Order>
    fun updateOrder(id: String, updatedOrder: Order): Order
    fun deleteOrder(id: String)
}