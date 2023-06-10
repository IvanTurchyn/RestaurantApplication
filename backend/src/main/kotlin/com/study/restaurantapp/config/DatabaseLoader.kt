package com.study.restaurantapp.config

import com.study.restaurantapp.model.User
import com.study.restaurantapp.model.UserRole
import com.study.restaurantapp.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class DatabaseLoader(
    private val repository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) : CommandLineRunner {

    override fun run(vararg args: String) {
        val manager = repository.findByUsername("manager@email.com")

        if (manager == null) {
            val newManager = User(
                id = null,
                username = "manager@email.com",
                password = passwordEncoder.encode("password"),
                role = UserRole.MANAGER
            )
            repository.save(newManager)
        }
    }
}