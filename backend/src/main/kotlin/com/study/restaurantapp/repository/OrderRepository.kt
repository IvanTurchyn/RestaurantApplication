package com.study.restaurantapp.repository

import com.study.restaurantapp.model.Order
import org.springframework.data.mongodb.repository.MongoRepository

interface OrderRepository : MongoRepository<Order, String>