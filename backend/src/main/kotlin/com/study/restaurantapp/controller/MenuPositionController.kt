package com.study.restaurantapp.controller

import com.study.restaurantapp.model.MenuPosition
import com.study.restaurantapp.service.MenuPositionServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class MenuPositionController @Autowired constructor(
        private val menuPositionService: MenuPositionServiceImpl
) {
    @GetMapping("/menu-positions")
    fun getAllMenuPositions(): List<MenuPosition> {
        return menuPositionService.getAllMenuPositions()
    }

    @GetMapping("/menu-positions/{id}")
    fun getMenuPositionById(@PathVariable id: String): MenuPosition {
        return menuPositionService.getMenuPositionById(id)
    }

    @PostMapping("/menu-positions")
    fun createMenuPosition(@RequestBody menuPosition: MenuPosition): MenuPosition {
        return menuPositionService.createMenuPosition(menuPosition)
    }

    @PutMapping("/menu-positions/{id}")
    fun updateMenuPosition(@PathVariable id: String, @RequestBody updatedMenuPosition: MenuPosition): MenuPosition {
        return menuPositionService.updateMenuPosition(id, updatedMenuPosition)
    }

    @DeleteMapping("/menu-positions/{id}")
    fun deleteMenuPosition(@PathVariable id: String) {
        return menuPositionService.deleteMenuPosition(id)
    }
}