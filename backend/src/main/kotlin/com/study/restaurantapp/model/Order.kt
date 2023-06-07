package com.study.restaurantapp.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Order(
        @Id
        val id: String,
        val client: User,
        val items: List<MenuPosition>,
        val status: OrderStatus
)