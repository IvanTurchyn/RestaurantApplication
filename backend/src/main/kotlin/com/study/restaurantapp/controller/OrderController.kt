package com.study.restaurantapp.controller

import com.study.restaurantapp.model.Order
import com.study.restaurantapp.service.OrderServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class OrderController @Autowired constructor(
        private val orderService: OrderServiceImpl
) {
    @GetMapping("/orders")
    fun getAllOrders(): List<Order> {
        return orderService.getAllOrders()
    }

    @GetMapping("/orders/{id}")
    fun getOrderById(@PathVariable id: String): Order {
        return orderService.getOrderById(id)
    }

    @PostMapping("/orders")
    fun createOrder(@RequestBody order: Order): Order {
        return orderService.createOrder(order)
    }

    @PutMapping("/orders/{id}")
    fun updateOrder(@PathVariable id: String, @RequestBody updatedOrder: Order): Order {
        return orderService.updateOrder(id, updatedOrder)
    }

    @DeleteMapping("/orders/{id}")
    fun deleteOrder(@PathVariable id: String) {
        orderService.deleteOrder(id)
    }
}
