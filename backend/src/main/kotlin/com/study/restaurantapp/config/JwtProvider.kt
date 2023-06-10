package com.study.restaurantapp.config

import com.study.restaurantapp.model.User
import com.study.restaurantapp.model.UserRole
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtProvider {

    @Value("\${jwt.secret}")
    private lateinit var jwtSecret: String

    @Value("\${jwt.expiration}")
    private var jwtExpiration: Long = 0

    fun generateToken(user: User): String {
        val claims = HashMap<String, Any>()
        claims["username"] = user.username
        claims["role"] = user.role.name

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpiration * 1000))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact()
    }

    fun refreshToken(token: String): String {
        val claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).body
        val username = claims["username"] as String
        val role = UserRole.valueOf(claims["role"] as String)

        val user = User(username = username, password = "placeholderPassword", role = role)

        return generateToken(user)
    }

}