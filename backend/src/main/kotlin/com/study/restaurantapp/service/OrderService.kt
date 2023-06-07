package com.study.restaurantapp.service

import com.study.restaurantapp.model.Order

interface OrderService {
    fun getAllOrders(): List<Order>
    fun getOrderById(id: String): Order
    fun createOrder(order: Order): Order
    fun updateOrder(id: String, updatedOrder: Order): Order
    fun deleteOrder(id: String)
}