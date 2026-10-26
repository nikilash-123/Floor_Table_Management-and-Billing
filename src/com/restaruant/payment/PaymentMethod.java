package com.restaruant.payment;

import com.restaruant.models.RestaurantOrder;
import com.restaruant.models.Table;
import com.restaruant.repository.PaymentRepository;

public interface PaymentMethod {
    String getName();

    default Payment processPayment(RestaurantOrder order, PaymentRepository repository) {
        if (order == null || order.isEmpty()) {
            throw new IllegalArgumentException("A non-empty order is required for billing.");
        }
        if (repository == null) {
            throw new IllegalArgumentException("A payment repository is required.");
        }

        Payment payment = new Payment(order, this);
        payment.markPaid();
        repository.save(payment);
        return payment;
    }

    final class Payment {
        private final RestaurantOrder order;
        private final Table table;
        private final double amount;
        private final PaymentMethod method;
        private Status status;

        private Payment(RestaurantOrder order, PaymentMethod method) {
            this.order = order;
            this.table = order.getTable();
            this.amount = order.getTotal();
            this.method = method;
            this.status = Status.PENDING;
        }

        public RestaurantOrder getOrder() {
            return order;
        }

        public Table getTable() {
            return table;
        }

        public double getAmount() {
            return amount;
        }

        public PaymentMethod getMethod() {
            return method;
        }

        public Status getStatus() {
            return status;
        }

        private void markPaid() {
            status = Status.PAID;
        }
    }

    enum Status {
        PENDING,
        PAID
    }
}
