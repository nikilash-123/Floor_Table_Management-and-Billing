package com.restaruant.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot Web Application entry point for Restaurant Table Management.
 * Leaves the original console application (com.restaruant.Main) intact.
 */
@SpringBootApplication(scanBasePackages = {"com.restaruant.web", "com.restaruant"})
public class RestaurantApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestaurantApiApplication.class, args);
    }
}
