package com.study.restaurantapp.controller

import com.study.restaurantapp.model.LoginDto
import com.study.restaurantapp.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class LoginController @Autowired constructor(
    private val userService: UserService
) {
    @PostMapping("/login")
    fun loginUser(@RequestBody loginDto: LoginDto): ResponseEntity<String> {
        val token = userService.loginUser(loginDto)
        return ResponseEntity.ok(token)
    }
}
