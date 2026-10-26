package com.restaruant.models;

public class Table {
    public enum Availablity{
        occupy,free
    }
    private int id;
    private int capacity;
    private Availablity status;

    public Table (int id,int capacity){
        this.id=id;
        this.capacity=capacity;
        this.status=Availablity.free;
    }
    public int getId() {
        return id;
    }
    public int getcapacity(){
        return capacity;
    }
    public void setCapacity(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be greater than zero.");
        }
        this.capacity = capacity;
    }
    public Availablity getstatus(){
        return status;
    }
    public void booking(){
        status = Availablity.occupy;
    }
    public void freenow(){
        status = Availablity.free;
    }
}
