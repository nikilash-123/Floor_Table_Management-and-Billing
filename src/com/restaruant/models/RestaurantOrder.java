package com.restaruant.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RestaurantOrder {
    private final Table table;
    private final List<OrderItem> items = new ArrayList<>();

    public RestaurantOrder(Table table) {
        if (table == null) {
            throw new IllegalArgumentException("A table is required for an order.");
        }
        this.table = table;
    }

    public Table getTable() {
        return table;
    }

    public List<OrderItem> getItems() {
        return Collections.unmodifiableList(items);
    }

    public void addItem(OrderItem item) {
        if (item == null) {
            throw new IllegalArgumentException("Order item is required.");
        }
        items.add(item);
    }

    public double getTotal() {
        double total = 0;
        for (OrderItem item : items) {
            total += item.getSubtotal();
        }
        return total;
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }
}
