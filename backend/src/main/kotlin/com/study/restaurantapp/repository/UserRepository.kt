package com.study.restaurantapp.repository

import com.study.restaurantapp.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String> {
    fun findByUsername(username: String): User?
}