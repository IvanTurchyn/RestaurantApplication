package com.study.restaurantapp.service

import com.study.restaurantapp.model.User

interface UserService {
    fun getAllUsers(): List<User>
    fun getUserById(id: String): User
    fun createUser(user: User): User
    fun updateUser(id: String, user: User): User
    fun deleteUser(id: String)
}