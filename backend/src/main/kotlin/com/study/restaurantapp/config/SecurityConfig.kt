package com.study.restaurantapp.config

import org.springframework.security.config.annotation.web.invoke
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain

@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun userDetailsService(): UserDetailsService {
        val encoder: PasswordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
        val user = User.builder().passwordEncoder(encoder::encode)

        val waiter = user.username("waiter").password("password").roles("WAITER").build()
        val chef = user.username("chef").password("password").roles("CHEF").build()
        val client = user.username("client").password("password").roles("CLIENT").build()
        val manager = user.username("manager").password("password").roles("MANAGER").build()

        return InMemoryUserDetailsManager(waiter, chef, client, manager)
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            authorizeHttpRequests {
                authorize(HttpMethod.GET, "/api/orders", hasAuthority("WAITER"))
                authorize(HttpMethod.DELETE, "/api/orders", hasAuthority("WAITER"))
                authorize(HttpMethod.PUT, "/api/orders", hasAuthority("WAITER"))
                authorize(HttpMethod.POST, "/api/orders", hasAuthority("CLIENT"))
                authorize(HttpMethod.GET, "/api/menu-positions", hasAuthority("CLIENT"))
                authorize(HttpMethod.GET, "/api/menu-positions", hasAuthority("WAITER"))
                authorize(HttpMethod.PUT, "/api/orders/{id}", hasAuthority("CHEF"))
                authorize(HttpMethod.GET, "/api/orders", hasAuthority("CHEF"))
                authorize(HttpMethod.POST, "/api/menu-position", hasAuthority("CHEF"))
                authorize(HttpMethod.GET, "/api/menu-position", hasAuthority("CHEF"))
                authorize(HttpMethod.DELETE, "/api/menu-position", hasAuthority("CHEF"))
                authorize(HttpMethod.PUT, "/api/menu-position", hasAuthority("CHEF"))
                authorize("/**", hasAuthority("MANAGER"))
                authorize(anyRequest, authenticated)
            }
            formLogin { }
            httpBasic { }
        }
        return http.build()
    }
}