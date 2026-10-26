package com.restaruant.models;

import com.restaruant.menu.MenuItem;

public class OrderItem {
    private final MenuItem menuItem;
    private final int quantity;

    public OrderItem(MenuItem menuItem, int quantity) {
        if (menuItem == null) {
            throw new IllegalArgumentException("Menu item is required.");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }
        this.menuItem = menuItem;
        this.quantity = quantity;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getSubtotal() {
        return menuItem.getPrice() * quantity;
    }
}
