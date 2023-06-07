package com.study.restaurantapp.service

import com.study.restaurantapp.model.MenuPosition

interface MenuPositionService {
    fun getAllMenuPositions(): List<MenuPosition>
    fun getMenuPositionById(id: String): MenuPosition
    fun createMenuPosition(menuPosition: MenuPosition): MenuPosition
    fun updateMenuPosition(id: String, updatedMenuPosition: MenuPosition): MenuPosition
    fun deleteMenuPosition(id: String)
}