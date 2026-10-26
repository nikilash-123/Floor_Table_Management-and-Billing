package com.restaruant.web.dto;

import java.util.List;

public class BillResponseDto {
    private String orderId;
    private String receiptNumber;
    private String timestamp;
    private TableResponseDto table;
    private List<OrderItemResponseDto> items;
    private double subtotal;
    private double total;
    private String paymentMethod;
    private String paymentStatus;
    private boolean simulated;
    private String message;

    public BillResponseDto() {
    }

    public BillResponseDto(String orderId, String receiptNumber, String timestamp,
                           TableResponseDto table, List<OrderItemResponseDto> items,
                           double subtotal, double total, String paymentMethod,
                           String paymentStatus, boolean simulated, String message) {
        this.orderId = orderId;
        this.receiptNumber = receiptNumber;
        this.timestamp = timestamp;
        this.table = table;
        this.items = items;
        this.subtotal = subtotal;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.simulated = simulated;
        this.message = message;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public TableResponseDto getTable() {
        return table;
    }

    public void setTable(TableResponseDto table) {
        this.table = table;
    }

    public List<OrderItemResponseDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDto> items) {
        this.items = items;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public boolean isSimulated() {
        return simulated;
    }

    public void setSimulated(boolean simulated) {
        this.simulated = simulated;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
