package com.restaruant.menu;

public class MenuItem {
    private final int id;
    private final String name;
    private final double price;

    public MenuItem(int id, String name, double price) {
        if (id <= 0) {
            throw new IllegalArgumentException("Menu item ID must be greater than zero.");
        }
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Menu item name is required.");
        }
        if (price <= 0 || !Double.isFinite(price)) {
            throw new IllegalArgumentException("Menu item price must be greater than zero.");
        }
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}
