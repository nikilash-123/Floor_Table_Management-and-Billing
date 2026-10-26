package com.restaruant.menu;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MenuCard {
    private final List<MenuItem> items;

    public MenuCard() {
        List<MenuItem> menuItems = new ArrayList<>();
        menuItems.add(new MenuItem(1, "Paneer Biryani", 220.00));
        menuItems.add(new MenuItem(2, "Masala Dosa", 120.00));
        menuItems.add(new MenuItem(3, "Veg Fried Rice", 160.00));
        menuItems.add(new MenuItem(4, "Chicken Curry", 260.00));
        menuItems.add(new MenuItem(5, "Gulab Jamun", 60.00));
        items = Collections.unmodifiableList(menuItems);
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public MenuItem findById(int id) {
        for (MenuItem item : items) {
            if (item.getId() == id) {
                return item;
            }
        }
        return null;
    }
}
