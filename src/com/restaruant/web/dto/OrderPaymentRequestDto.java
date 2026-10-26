package com.restaruant.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.util.List;

public class OrderPaymentRequestDto {

    @NotNull(message = "Table ID is required.")
    @Min(value = 1, message = "Table ID must be greater than zero.")
    private Integer tableId;

    @NotEmpty(message = "Order must contain at least one item.")
    @Valid
    private List<OrderItemRequestDto> items;

    @NotBlank(message = "Payment method is required.")
    private String paymentMethod;

    public OrderPaymentRequestDto() {
    }

    public OrderPaymentRequestDto(Integer tableId, List<OrderItemRequestDto> items, String paymentMethod) {
        this.tableId = tableId;
        this.items = items;
        this.paymentMethod = paymentMethod;
    }

    public Integer getTableId() {
        return tableId;
    }

    public void setTableId(Integer tableId) {
        this.tableId = tableId;
    }

    public List<OrderItemRequestDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDto> items) {
        this.items = items;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
