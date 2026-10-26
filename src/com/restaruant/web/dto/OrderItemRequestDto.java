package com.restaruant.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class OrderItemRequestDto {

    @NotNull(message = "Menu item ID is required.")
    @Min(value = 1, message = "Menu item ID must be greater than zero.")
    private Integer menuItemId;

    @NotNull(message = "Quantity is required.")
    @Min(value = 1, message = "Quantity must be at least 1.")
    private Integer quantity;

    public OrderItemRequestDto() {
    }

    public OrderItemRequestDto(Integer menuItemId, Integer quantity) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }

    public Integer getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Integer menuItemId) {
        this.menuItemId = menuItemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
