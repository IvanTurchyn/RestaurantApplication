package com.study.restaurantapp.service

import com.study.restaurantapp.model.MenuPosition
import com.study.restaurantapp.repository.MenuPositionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MenuPositionServiceImpl(private val menuPositionRepository: MenuPositionRepository) : MenuPositionService {

    override fun getAllMenuPositions(): List<MenuPosition> {
        return menuPositionRepository.findAll()
    }

    override fun getMenuPositionById(id: String): MenuPosition {
        return menuPositionRepository.findById(id).orElseThrow { NoSuchElementException("MenuPosition not found") }
    }

    override fun createMenuPosition(menuPosition: MenuPosition): MenuPosition {
        return menuPositionRepository.save(menuPosition)
    }

    override fun updateMenuPosition(id: String, updatedMenuPosition: MenuPosition): MenuPosition {
        val menuPosition = menuPositionRepository.findById(id)
            .orElseThrow { NoSuchElementException("MenuPosition not found") }

        val newMenuPosition = MenuPosition(
            id = menuPosition.id,
            name = updatedMenuPosition.name,
            price = updatedMenuPosition.price,
            description = updatedMenuPosition.description
        )

        return menuPositionRepository.save(newMenuPosition)
    }

    override fun deleteMenuPosition(id: String) {
        if (!menuPositionRepository.existsById(id)) {
            throw NoSuchElementException("MenuPosition not found")
        }
        menuPositionRepository.deleteById(id)
    }
}