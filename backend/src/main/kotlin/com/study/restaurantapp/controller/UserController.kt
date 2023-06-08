package com.study.restaurantapp.controller

import com.study.restaurantapp.model.User
import com.study.restaurantapp.model.UserDto
import com.study.restaurantapp.model.UserRole
import com.study.restaurantapp.service.UserServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class UserController @Autowired constructor(
    private val userService: UserServiceImpl
) {
    @GetMapping("/users")
    fun getAllUsers(): List<User> {
        return userService.getAllUsers()
    }

    @GetMapping("/users/{id}")
    fun getUserById(@PathVariable id: String): User {
        return userService.getUserById(id)
    }

    @PostMapping("/users")
    fun createUser(@RequestBody userDto: UserDto): User {
        return userService.createUser(userDto)
    }

    @PutMapping("/users/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody updatedUser: UserDto): User {
        return userService.updateUser(id, updatedUser)
    }

    @DeleteMapping("/users/{id}")
    fun deleteUser(@PathVariable id: String) {
        userService.deleteUser(id)
    }
}
