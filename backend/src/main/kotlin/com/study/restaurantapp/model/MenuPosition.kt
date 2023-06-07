package com.study.restaurantapp.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class MenuPosition(
        @Id
        val id: String,
        val name: String,
        val price: Double,
        val description: String
)