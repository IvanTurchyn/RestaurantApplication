package com.study.restaurantapp.service

import com.study.restaurantapp.config.JwtProvider
import com.study.restaurantapp.model.*
import com.study.restaurantapp.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtProvider: JwtProvider
) : UserService {

    private fun createNewUser(userDto: UserDto): User {
        val hashedPassword = passwordEncoder.encode(userDto.password)
        val userRole: UserRole
        try {
            userRole = UserRole.valueOf(userDto.role)
        } catch (e: IllegalArgumentException) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role value")
        }
        return User(
            username = userDto.username,
            password = hashedPassword,
            role = userRole
        )
    }

    override fun createUser(userDto: UserDto): User {
        val user = createNewUser(userDto)
        return userRepository.save(user)
    }

    override fun registerUser(userDto: UserDto) {
        val user = createNewUser(userDto)
        userRepository.save(user)
    }

    override fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    override fun getUserById(id: String): User {
        return userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
    }

    override fun updateUser(id: String, userDto: UserDto): User {
        val user = userRepository.findById(id)
            .orElseThrow { NoSuchElementException("User not found") }

        val hashedPassword = passwordEncoder.encode(userDto.password)
        val userRole: UserRole
        try {
            userRole = UserRole.valueOf(userDto.role)
        } catch (e: IllegalArgumentException) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role value")
        }
        val newUser = User(
            id = user.id,
            username = userDto.username,
            password = hashedPassword,
            role = userRole
        )

        return userRepository.save(newUser)
    }

    override fun deleteUser(id: String) {
        if (!userRepository.existsById(id)) {
            throw NoSuchElementException("User not found")
        }
        userRepository.deleteById(id)
    }

    override fun refreshToken(tokenDto: TokenDto): String {
        return jwtProvider.refreshToken(tokenDto.token)
    }

    override fun loginUser(loginDto: LoginDto): String {
        val user = userRepository.findByUsername(loginDto.username)
        if (user != null && passwordEncoder.matches(loginDto.password, user.password)) {
            return jwtProvider.generateToken(user)
        } else {
            throw BadCredentialsException("Invalid username/password")
        }
    }
}