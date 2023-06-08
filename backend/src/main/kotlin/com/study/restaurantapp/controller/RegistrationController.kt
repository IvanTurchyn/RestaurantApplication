package com.study.restaurantapp.controller

import com.study.restaurantapp.model.UserDto
import com.study.restaurantapp.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class RegistrationController @Autowired constructor(
    private val userService: UserService
) {
    @PostMapping("/register")
    fun registerUser(@RequestBody userDto: UserDto): ResponseEntity<String> {
        userService.registerUser(userDto)
        return ResponseEntity("User registered successfully", HttpStatus.CREATED)
    }
}
