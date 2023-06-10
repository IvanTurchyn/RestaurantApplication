package com.study.restaurantapp.repository

import com.study.restaurantapp.model.Order
import com.study.restaurantapp.model.OrderStatus
import org.springframework.data.mongodb.repository.MongoRepository

interface OrderRepository : MongoRepository<Order, String> {
    fun findByStatus(status: OrderStatus): List<Order>
}