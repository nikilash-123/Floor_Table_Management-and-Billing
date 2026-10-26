package com.restaruant.web.dto;

public class RestaurantStatsDto {
    private int totalTables;
    private int availableTables;
    private int occupiedTables;
    private int totalMenuItems;
    private int sessionOrderCount;
    private double sessionRevenue;

    public RestaurantStatsDto() {
    }

    public RestaurantStatsDto(int totalTables, int availableTables, int occupiedTables,
                              int totalMenuItems, int sessionOrderCount, double sessionRevenue) {
        this.totalTables = totalTables;
        this.availableTables = availableTables;
        this.occupiedTables = occupiedTables;
        this.totalMenuItems = totalMenuItems;
        this.sessionOrderCount = sessionOrderCount;
        this.sessionRevenue = sessionRevenue;
    }

    public int getTotalTables() {
        return totalTables;
    }

    public void setTotalTables(int totalTables) {
        this.totalTables = totalTables;
    }

    public int getAvailableTables() {
        return availableTables;
    }

    public void setAvailableTables(int availableTables) {
        this.availableTables = availableTables;
    }

    public int getOccupiedTables() {
        return occupiedTables;
    }

    public void setOccupiedTables(int occupiedTables) {
        this.occupiedTables = occupiedTables;
    }

    public int getTotalMenuItems() {
        return totalMenuItems;
    }

    public void setTotalMenuItems(int totalMenuItems) {
        this.totalMenuItems = totalMenuItems;
    }

    public int getSessionOrderCount() {
        return sessionOrderCount;
    }

    public void setSessionOrderCount(int sessionOrderCount) {
        this.sessionOrderCount = sessionOrderCount;
    }

    public double getSessionRevenue() {
        return sessionRevenue;
    }

    public void setSessionRevenue(double sessionRevenue) {
        this.sessionRevenue = sessionRevenue;
    }
}
