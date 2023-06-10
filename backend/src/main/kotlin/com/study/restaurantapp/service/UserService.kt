package com.study.restaurantapp.service

import com.study.restaurantapp.model.LoginDto
import com.study.restaurantapp.model.TokenDto
import com.study.restaurantapp.model.User
import com.study.restaurantapp.model.UserDto

interface UserService {
    fun getAllUsers(): List<User>
    fun getUserById(id: String): User
    fun createUser(userDto: UserDto): User
    fun updateUser(id: String, userDto: UserDto): User
    fun deleteUser(id: String)
    fun refreshToken(tokenDto: TokenDto): String
    fun registerUser(userDto:UserDto)
    fun loginUser(loginDto: LoginDto): String
}
