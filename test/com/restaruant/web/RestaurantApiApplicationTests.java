package com.restaruant.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaruant.web.dto.CreateTableRequestDto;
import com.restaruant.web.dto.OrderItemRequestDto;
import com.restaruant.web.dto.OrderPaymentRequestDto;
import com.restaruant.web.dto.UpdateTableRequestDto;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RestaurantApiApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    void contextLoads() {
    }

    @Test
    @Order(2)
    void testGetAllTables() throws Exception {
        mockMvc.perform(get("/api/tables"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(3))))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].capacity", is(5)))
                .andExpect(jsonPath("$[0].status", is("free")));
    }

    @Test
    @Order(3)
    void testGetTableById_Success() throws Exception {
        mockMvc.perform(get("/api/tables/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.capacity", is(5)))
                .andExpect(jsonPath("$.status", is("free")));
    }

    @Test
    @Order(4)
    void testGetTableById_NotFound() throws Exception {
        mockMvc.perform(get("/api/tables/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.message", containsString("does not exist")));
    }

    @Test
    @Order(5)
    void testCreateTable_Success() throws Exception {
        CreateTableRequestDto request = new CreateTableRequestDto(20, 6);
        mockMvc.perform(post("/api/tables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(20)))
                .andExpect(jsonPath("$.capacity", is(6)))
                .andExpect(jsonPath("$.status", is("free")));
    }

    @Test
    @Order(6)
    void testCreateTable_DuplicateConflict() throws Exception {
        CreateTableRequestDto request = new CreateTableRequestDto(20, 6);
        mockMvc.perform(post("/api/tables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status", is(409)))
                .andExpect(jsonPath("$.message", containsString("already exists")));
    }

    @Test
    @Order(7)
    void testCreateTable_InvalidValidation() throws Exception {
        CreateTableRequestDto request = new CreateTableRequestDto(-1, 0);
        mockMvc.perform(post("/api/tables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)));
    }

    @Test
    @Order(8)
    void testUpdateTableCapacity_Success() throws Exception {
        UpdateTableRequestDto request = new UpdateTableRequestDto(8);
        mockMvc.perform(put("/api/tables/20")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(20)))
                .andExpect(jsonPath("$.capacity", is(8)));
    }

    @Test
    @Order(9)
    void testDeleteTable_Success() throws Exception {
        mockMvc.perform(delete("/api/tables/20"))
                .andExpect(status().isNoContent());

        // Verify table is indeed deleted
        mockMvc.perform(get("/api/tables/20"))
                .andExpect(status().isNotFound());
    }

    @Test
    @Order(10)
    void testGetMenu_MatchesOriginalMenuCard() throws Exception {
        mockMvc.perform(get("/api/menu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Paneer Biryani")))
                .andExpect(jsonPath("$[0].price", is(220.0)))
                .andExpect(jsonPath("$[1].name", is("Masala Dosa")))
                .andExpect(jsonPath("$[1].price", is(120.0)))
                .andExpect(jsonPath("$[4].name", is("Gulab Jamun")))
                .andExpect(jsonPath("$[4].price", is(60.0)));
    }

    @Test
    @Order(11)
    void testOrderAndPay_Cash_Success() throws Exception {
        // Table 1: 2 x Paneer Biryani (220*2 = 440) + 1 x Gulab Jamun (60) = 500.00
        OrderPaymentRequestDto request = new OrderPaymentRequestDto(
                1,
                List.of(
                        new OrderItemRequestDto(1, 2),
                        new OrderItemRequestDto(5, 1)
                ),
                "Cash"
        );

        mockMvc.perform(post("/api/orders/pay")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId", startsWith("ORD-")))
                .andExpect(jsonPath("$.total", is(500.0)))
                .andExpect(jsonPath("$.subtotal", is(500.0)))
                .andExpect(jsonPath("$.paymentMethod", is("Cash")))
                .andExpect(jsonPath("$.paymentStatus", is("PAID")))
                .andExpect(jsonPath("$.simulated", is(true)))
                .andExpect(jsonPath("$.items", hasSize(2)))
                .andExpect(jsonPath("$.items[0].subtotal", is(440.0)))
                .andExpect(jsonPath("$.items[1].subtotal", is(60.0)));
    }

    @Test
    @Order(12)
    void testOrderAndPay_Card_Success() throws Exception {
        // Table 2: 1 x Masala Dosa (120) = 120.00
        OrderPaymentRequestDto request = new OrderPaymentRequestDto(
                2,
                List.of(new OrderItemRequestDto(2, 1)),
                "Card"
        );

        mockMvc.perform(post("/api/orders/pay")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total", is(120.0)))
                .andExpect(jsonPath("$.paymentMethod", is("Card")))
                .andExpect(jsonPath("$.paymentStatus", is("PAID")));
    }

    @Test
    @Order(13)
    void testOrderAndPay_UPI_Success() throws Exception {
        // Table 3: 1 x Veg Fried Rice (160) = 160.00
        OrderPaymentRequestDto request = new OrderPaymentRequestDto(
                3,
                List.of(new OrderItemRequestDto(3, 1)),
                "UPI"
        );

        mockMvc.perform(post("/api/orders/pay")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total", is(160.0)))
                .andExpect(jsonPath("$.paymentMethod", is("UPI")))
                .andExpect(jsonPath("$.paymentStatus", is("PAID")));
    }

    @Test
    @Order(14)
    void testOrderAndPay_InvalidPaymentMethod() throws Exception {
        OrderPaymentRequestDto request = new OrderPaymentRequestDto(
                1,
                List.of(new OrderItemRequestDto(1, 1)),
                "Crypto"
        );

        mockMvc.perform(post("/api/orders/pay")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.message", containsString("Unsupported payment method")));
    }

    @Test
    @Order(15)
    void testOrderAndPay_NonExistentTable() throws Exception {
        OrderPaymentRequestDto request = new OrderPaymentRequestDto(
                999,
                List.of(new OrderItemRequestDto(1, 1)),
                "Cash"
        );

        mockMvc.perform(post("/api/orders/pay")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }

    @Test
    @Order(16)
    void testOrderHistoryAndStats() throws Exception {
        // Check order history has the 3 orders placed in tests above
        mockMvc.perform(get("/api/orders/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(3))));

        // Check stats
        mockMvc.perform(get("/api/orders/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalTables", is(3)))
                .andExpect(jsonPath("$.totalMenuItems", is(5)))
                .andExpect(jsonPath("$.sessionOrderCount", greaterThanOrEqualTo(3)))
                .andExpect(jsonPath("$.sessionRevenue", greaterThanOrEqualTo(780.0)));
    }
}
