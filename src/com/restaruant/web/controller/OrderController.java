package com.restaruant.web.controller;

import com.restaruant.web.dto.BillResponseDto;
import com.restaruant.web.dto.OrderPaymentRequestDto;
import com.restaruant.web.dto.RestaurantStatsDto;
import com.restaruant.web.service.RestaurantWebService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Orders, Billing, Payments, and Stats.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final RestaurantWebService restaurantWebService;

    public OrderController(RestaurantWebService restaurantWebService) {
        this.restaurantWebService = restaurantWebService;
    }

    /**
     * POST /api/orders/pay - Validate an order, calculate total, process payment, and return billing details.
     */
    @PostMapping("/pay")
    public ResponseEntity<BillResponseDto> placeOrderAndPay(@Valid @RequestBody OrderPaymentRequestDto request) {
        BillResponseDto bill = restaurantWebService.processOrderAndPayment(request);
        return ResponseEntity.ok(bill);
    }

    /**
     * GET /api/orders/history - Return session-level order and payment history.
     */
    @GetMapping("/history")
    public ResponseEntity<List<BillResponseDto>> getOrderHistory() {
        return ResponseEntity.ok(restaurantWebService.getSessionOrderHistory());
    }

    /**
     * GET /api/orders/stats - Return dashboard metrics and overview numbers.
     */
    @GetMapping("/stats")
    public ResponseEntity<RestaurantStatsDto> getStats() {
        return ResponseEntity.ok(restaurantWebService.getStats());
    }
}
