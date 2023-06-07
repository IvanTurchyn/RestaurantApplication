package com.study.restaurantapp.service

import com.study.restaurantapp.model.User
import com.study.restaurantapp.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(private val userRepository: UserRepository) {

    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    fun getUserById(id: String): User {
        return userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
    }

    fun createUser(user: User): User {
        return userRepository.save(user)
    }

    fun updateUser(id: String, updatedUser: User): User {
        val user = userRepository.findById(id)
            .orElseThrow { NoSuchElementException("User not found") }

        val newUser = User(
            id = user.id,
            name = updatedUser.name,
            email = updatedUser.email
        )

        return userRepository.save(newUser)
    }

    fun deleteUser(id: String) {
        if (!userRepository.existsById(id)) {
            throw NoSuchElementException("User not found")
        }
        userRepository.deleteById(id)
    }
}