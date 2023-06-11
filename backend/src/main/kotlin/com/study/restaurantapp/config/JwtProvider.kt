package com.study.restaurantapp.config

import com.study.restaurantapp.model.User
import com.study.restaurantapp.model.UserRole
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.stereotype.Component
import java.util.*
import io.jsonwebtoken.security.Keys
import javax.crypto.SecretKey


@Component
class JwtProvider {

    private val jwtSecret: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512)
    private val jwtExpiration: Long = 86400

    fun generateToken(user: User): String {
        val claims = HashMap<String, Any>()
        claims["username"] = user.username
        claims["role"] = user.role.name

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpiration * 1000))
            .signWith(jwtSecret, SignatureAlgorithm.HS512)
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