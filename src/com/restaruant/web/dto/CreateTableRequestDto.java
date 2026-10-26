package com.restaruant.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CreateTableRequestDto {

    @NotNull(message = "Table ID is required.")
    @Min(value = 1, message = "Table ID must be greater than zero.")
    private Integer id;

    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be greater than zero.")
    private Integer capacity;

    public CreateTableRequestDto() {
    }

    public CreateTableRequestDto(Integer id, Integer capacity) {
        this.id = id;
        this.capacity = capacity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}
