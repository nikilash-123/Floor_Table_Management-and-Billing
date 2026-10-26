package com.restaruant.web.controller;

import com.restaruant.web.dto.CreateTableRequestDto;
import com.restaruant.web.dto.TableResponseDto;
import com.restaruant.web.dto.UpdateTableRequestDto;
import com.restaruant.web.service.RestaurantWebService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for Table Management.
 */
@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final RestaurantWebService restaurantWebService;

    public TableController(RestaurantWebService restaurantWebService) {
        this.restaurantWebService = restaurantWebService;
    }

    /**
     * GET /api/tables - List all tables
     */
    @GetMapping
    public ResponseEntity<List<TableResponseDto>> getAllTables() {
        return ResponseEntity.ok(restaurantWebService.getAllTables());
    }

    /**
     * GET /api/tables/{id} - Get table by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TableResponseDto> getTableById(@PathVariable int id) {
        return ResponseEntity.ok(restaurantWebService.getTableById(id));
    }

    /**
     * POST /api/tables - Add a new table
     */
    @PostMapping
    public ResponseEntity<TableResponseDto> createTable(@Valid @RequestBody CreateTableRequestDto request) {
        TableResponseDto created = restaurantWebService.createTable(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PUT /api/tables/{id} - Update table capacity
     */
    @PutMapping("/{id}")
    public ResponseEntity<TableResponseDto> updateTableCapacity(
            @PathVariable int id,
            @Valid @RequestBody UpdateTableRequestDto request) {
        TableResponseDto updated = restaurantWebService.updateTableCapacity(id, request);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/tables/{id} - Delete a table
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable int id) {
        restaurantWebService.deleteTable(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * PATCH /api/tables/{id}/status - Update table occupancy status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<TableResponseDto> updateTableStatus(
            @PathVariable int id,
            @RequestBody Map<String, String> body) {
        String status = body != null ? body.get("status") : null;
        TableResponseDto updated = restaurantWebService.updateTableStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
