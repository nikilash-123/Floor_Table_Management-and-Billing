package com.restaruant.repository;

import com.restaruant.payment.PaymentMethod.Payment;
import java.util.ArrayList;
import java.util.List;

public class PaymentRepository {
    private final List<Payment> payments = new ArrayList<>();

    public void save(Payment payment) {
        if (payment == null) {
            throw new IllegalArgumentException("Payment is required.");
        }
        payments.add(payment);
    }

    public List<Payment> findAll() {
        return new ArrayList<>(payments);
    }
}
