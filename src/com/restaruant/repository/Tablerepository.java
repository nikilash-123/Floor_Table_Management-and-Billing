package com.restaruant.repository;

import java.util.ArrayList;
import java.util.List;
import com.restaruant.models.Table;

public class Tablerepository {
    private final List<Table> tables = new ArrayList<>();

    public Tablerepository() {
        tables.add(new Table(1, 5));
        tables.add(new Table(2, 2));
        tables.add(new Table(3, 7));
    }

    public List<Table> show() {
        return new ArrayList<>(tables);
    }

    public Table findById(int id) {
        for (Table table : tables) {
            if (table.getId() == id) {
                return table;
            }
        }
        return null;
    }

    public boolean add(Table table) {
        if (findById(table.getId()) != null) {
            return false;
        }
        tables.add(table);
        return true;
    }

    public boolean updateCapacity(int id, int capacity) {
        Table table = findById(id);
        if (table == null) {
            return false;
        }
        table.setCapacity(capacity);
        return true;
    }

    public boolean delete(int id) {
        Table table = findById(id);
        if (table == null) {
            return false;
        }
        tables.remove(table);
        return true;
    }

}
