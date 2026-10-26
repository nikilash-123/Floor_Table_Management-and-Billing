package com.restaruant.web.dto;

import com.restaruant.models.Table;

public class TableResponseDto {
    private int id;
    private int capacity;
    private String status;
    private boolean occupied;

    public TableResponseDto() {
    }

    public TableResponseDto(int id, int capacity, String status) {
        this.id = id;
        this.capacity = capacity;
        this.status = status;
        this.occupied = "occupy".equalsIgnoreCase(status);
    }

    public static TableResponseDto fromTable(Table table) {
        if (table == null) {
            return null;
        }
        String statusStr = table.getstatus() != null ? table.getstatus().name() : "free";
        return new TableResponseDto(table.getId(), table.getcapacity(), statusStr);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.occupied = "occupy".equalsIgnoreCase(status);
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }
}
