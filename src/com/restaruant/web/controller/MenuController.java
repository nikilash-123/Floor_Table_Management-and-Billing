package com.restaruant.web.controller;

import com.restaruant.web.dto.MenuItemDto;
import com.restaruant.web.service.RestaurantWebService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST Controller for Menu View and Items.
 */
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final RestaurantWebService restaurantWebService;

    public MenuController(RestaurantWebService restaurantWebService) {
        this.restaurantWebService = restaurantWebService;
    }

    /**
     * GET /api/menu - Return existing menu items
     */
    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getMenu() {
        return ResponseEntity.ok(restaurantWebService.getMenuItems());
    }
}
