package com.restaruant.payment;

public class Upi implements PaymentMethod {
    @Override
    public String getName() {
        return "UPI";
    }
}
