package com.restaruant.web.dto;

import com.restaruant.models.OrderItem;

public class OrderItemResponseDto {
    private int menuItemId;
    private String name;
    private double unitPrice;
    private int quantity;
    private double subtotal;

    public OrderItemResponseDto() {
    }

    public OrderItemResponseDto(int menuItemId, String name, double unitPrice, int quantity, double subtotal) {
        this.menuItemId = menuItemId;
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public static OrderItemResponseDto fromOrderItem(OrderItem item) {
        if (item == null || item.getMenuItem() == null) {
            return null;
        }
        return new OrderItemResponseDto(
                item.getMenuItem().getId(),
                item.getMenuItem().getName(),
                item.getMenuItem().getPrice(),
                item.getQuantity(),
                item.getSubtotal()
        );
    }

    public int getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(int menuItemId) {
        this.menuItemId = menuItemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}
