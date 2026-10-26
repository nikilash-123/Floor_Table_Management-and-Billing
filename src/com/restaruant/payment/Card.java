package com.restaruant.payment;

public class Card implements PaymentMethod {
    @Override
    public String getName() {
        return "Card";
    }
}
