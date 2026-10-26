package com.restaruant.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateTableRequestDto {

    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be greater than zero.")
    private Integer capacity;

    public UpdateTableRequestDto() {
    }

    public UpdateTableRequestDto(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}
