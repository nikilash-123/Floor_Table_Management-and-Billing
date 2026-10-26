package com.restaruant.web.config;

import com.restaruant.Service.Tableservice;
import com.restaruant.menu.MenuCard;
import com.restaruant.repository.PaymentRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Spring configuration providing singleton instances of the existing domain classes.
 * Ensures state persistence across API requests within the application session.
 */
@Configuration
public class AppBeanConfig {

    @Bean
    public Tableservice tableService() {
        return new Tableservice();
    }

    @Bean
    public PaymentRepository paymentRepository() {
        return new PaymentRepository();
    }

    @Bean
    public MenuCard menuCard() {
        return new MenuCard();
    }
}
