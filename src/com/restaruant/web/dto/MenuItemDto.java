package com.restaruant.web.dto;

import com.restaruant.menu.MenuItem;

public class MenuItemDto {
    private int id;
    private String name;
    private double price;

    public MenuItemDto() {
    }

    public MenuItemDto(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public static MenuItemDto fromMenuItem(MenuItem item) {
        if (item == null) {
            return null;
        }
        return new MenuItemDto(item.getId(), item.getName(), item.getPrice());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
