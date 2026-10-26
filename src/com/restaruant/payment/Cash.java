package com.restaruant.payment;

public class Cash implements PaymentMethod {
    @Override
    public String getName() {
        return "Cash";
    }
}
