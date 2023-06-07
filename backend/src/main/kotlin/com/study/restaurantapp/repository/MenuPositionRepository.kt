package com.study.restaurantapp.repository

import com.study.restaurantapp.model.MenuPosition
import org.springframework.data.mongodb.repository.MongoRepository

interface MenuPositionRepository : MongoRepository<MenuPosition, String>