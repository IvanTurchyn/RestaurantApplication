package com.study.restaurantapp.service

import com.study.restaurantapp.model.Order
import com.study.restaurantapp.repository.OrderRepository
import org.springframework.stereotype.Service

@Service
class OrderServiceImpl(private val orderRepository: OrderRepository) {

    fun getAllOrders(): List<Order> {
        return orderRepository.findAll()
    }

    fun getOrderById(id: String): Order {
        return orderRepository.findById(id).orElseThrow { NoSuchElementException("Order not found") }
    }

    fun createOrder(order: Order): Order {
        return orderRepository.save(order)
    }

    fun updateOrder(id: String, updatedOrder: Order): Order {
        val order = orderRepository.findById(id)
            .orElseThrow { NoSuchElementException("Order not found") }

        val newOrder = Order(
            id = order.id,
            customerName = order.customerName,
            items = updatedOrder.items,
            status = order.status
        )

        return orderRepository.save(newOrder)
    }

    fun deleteOrder(id: String) {
        if (!orderRepository.existsById(id)) {
            throw NoSuchElementException("Order not found")
        }
        orderRepository.deleteById(id)
    }
}

