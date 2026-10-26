package com.restaruant.Service;

import com.restaruant.models.Table;
import com.restaruant.repository.Tablerepository;
import java.util.List;

public class Tableservice {
    private final Tablerepository repository;

    public Tableservice() {
        repository = new Tablerepository();
    }

    public List<Table> getAll() {
        return repository.show();
    }

    public Table getTable(int id) {
        validateId(id);
        return repository.findById(id);
    }

    public boolean addTable(int id, int capacity) {
        validateId(id);
        validateCapacity(capacity);
        return repository.add(new Table(id, capacity));
    }

    public boolean updateTableCapacity(int id, int capacity) {
        validateId(id);
        validateCapacity(capacity);
        return repository.updateCapacity(id, capacity);
    }

    public boolean deleteTable(int id) {
        validateId(id);
        return repository.delete(id);
    }

    private void validateId(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Table ID must be greater than zero.");
        }
    }

    private void validateCapacity(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be greater than zero.");
        }
    }
}
