package com.restaruant.web.service;

import com.restaruant.Service.Tableservice;
import com.restaruant.menu.MenuCard;
import com.restaruant.menu.MenuItem;
import com.restaruant.models.OrderItem;
import com.restaruant.models.RestaurantOrder;
import com.restaruant.models.Table;
import com.restaruant.payment.Card;
import com.restaruant.payment.Cash;
import com.restaruant.payment.PaymentMethod;
import com.restaruant.payment.Upi;
import com.restaruant.repository.PaymentRepository;
import com.restaruant.web.dto.*;
import com.restaruant.web.exception.BadRequestException;
import com.restaruant.web.exception.DuplicateResourceException;
import com.restaruant.web.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Adapter and service layer that integrates the original Java domain classes
 * (Tableservice, MenuCard, PaymentRepository, PaymentMethod) with the Web API.
 */
@Service
public class RestaurantWebService {

    private final Tableservice tableService;
    private final PaymentRepository paymentRepository;
    private final MenuCard menuCard;

    // In-memory session-level stores for order history & statistics
    private final List<BillResponseDto> sessionOrders = new CopyOnWriteArrayList<>();
    private final AtomicInteger orderSequence = new AtomicInteger(1000);
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public RestaurantWebService(Tableservice tableService, PaymentRepository paymentRepository, MenuCard menuCard) {
        this.tableService = tableService;
        this.paymentRepository = paymentRepository;
        this.menuCard = menuCard;
    }

    /* =========================================================================
     * TABLE MANAGEMENT METHODS
     * ========================================================================= */

    public List<TableResponseDto> getAllTables() {
        List<Table> tables = tableService.getAll();
        List<TableResponseDto> dtos = new ArrayList<>();
        for (Table table : tables) {
            dtos.add(TableResponseDto.fromTable(table));
        }
        return dtos;
    }

    public TableResponseDto getTableById(int id) {
        if (id <= 0) {
            throw new BadRequestException("Table ID must be greater than zero.");
        }
        Table table = tableService.getTable(id);
        if (table == null) {
            throw new ResourceNotFoundException("Table with ID " + id + " does not exist.");
        }
        return TableResponseDto.fromTable(table);
    }

    public TableResponseDto createTable(CreateTableRequestDto request) {
        if (request.getId() == null || request.getId() <= 0) {
            throw new BadRequestException("Table ID must be greater than zero.");
        }
        if (request.getCapacity() == null || request.getCapacity() <= 0) {
            throw new BadRequestException("Capacity must be greater than zero.");
        }

        boolean added = tableService.addTable(request.getId(), request.getCapacity());
        if (!added) {
            throw new DuplicateResourceException("A table with ID " + request.getId() + " already exists.");
        }
        Table table = tableService.getTable(request.getId());
        return TableResponseDto.fromTable(table);
    }

    public TableResponseDto updateTableCapacity(int id, UpdateTableRequestDto request) {
        if (id <= 0) {
            throw new BadRequestException("Table ID must be greater than zero.");
        }
        if (request.getCapacity() == null || request.getCapacity() <= 0) {
            throw new BadRequestException("Capacity must be greater than zero.");
        }

        boolean updated = tableService.updateTableCapacity(id, request.getCapacity());
        if (!updated) {
            throw new ResourceNotFoundException("Table with ID " + id + " does not exist.");
        }
        Table table = tableService.getTable(id);
        return TableResponseDto.fromTable(table);
    }

    public void deleteTable(int id) {
        if (id <= 0) {
            throw new BadRequestException("Table ID must be greater than zero.");
        }
        boolean deleted = tableService.deleteTable(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Table with ID " + id + " does not exist.");
        }
    }

    public TableResponseDto updateTableStatus(int id, String status) {
        if (id <= 0) {
            throw new BadRequestException("Table ID must be greater than zero.");
        }
        Table table = tableService.getTable(id);
        if (table == null) {
            throw new ResourceNotFoundException("Table with ID " + id + " does not exist.");
        }

        if ("occupy".equalsIgnoreCase(status) || "occupied".equalsIgnoreCase(status)) {
            table.booking();
        } else if ("free".equalsIgnoreCase(status) || "available".equalsIgnoreCase(status)) {
            table.freenow();
        } else {
            throw new BadRequestException("Invalid status: " + status + ". Allowed values: occupy, free");
        }
        return TableResponseDto.fromTable(table);
    }

    /* =========================================================================
     * MENU METHODS
     * ========================================================================= */

    public List<MenuItemDto> getMenuItems() {
        List<MenuItem> items = menuCard.getItems();
        List<MenuItemDto> dtos = new ArrayList<>();
        for (MenuItem item : items) {
            dtos.add(MenuItemDto.fromMenuItem(item));
        }
        return dtos;
    }

    /* =========================================================================
     * ORDER AND PAYMENT METHODS
     * ========================================================================= */

    public BillResponseDto processOrderAndPayment(OrderPaymentRequestDto request) {
        if (request.getTableId() == null || request.getTableId() <= 0) {
            throw new BadRequestException("Valid Table ID is required.");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order must contain at least one item.");
        }
        if (request.getPaymentMethod() == null || request.getPaymentMethod().trim().isEmpty()) {
            throw new BadRequestException("Payment method is required.");
        }

        // 1. Validate Table exists
        Table table = tableService.getTable(request.getTableId());
        if (table == null) {
            throw new ResourceNotFoundException("Table with ID " + request.getTableId() + " does not exist.");
        }

        // 2. Build RestaurantOrder from existing classes
        RestaurantOrder order = new RestaurantOrder(table);
        List<OrderItemResponseDto> responseItems = new ArrayList<>();

        for (OrderItemRequestDto itemReq : request.getItems()) {
            if (itemReq.getMenuItemId() == null || itemReq.getMenuItemId() <= 0) {
                throw new BadRequestException("Menu item ID must be greater than zero.");
            }
            if (itemReq.getQuantity() == null || itemReq.getQuantity() <= 0) {
                throw new BadRequestException("Quantity must be greater than zero.");
            }

            MenuItem menuItem = menuCard.findById(itemReq.getMenuItemId());
            if (menuItem == null) {
                throw new BadRequestException("Menu item with ID " + itemReq.getMenuItemId() + " not found.");
            }

            OrderItem orderItem = new OrderItem(menuItem, itemReq.getQuantity());
            order.addItem(orderItem);
            responseItems.add(OrderItemResponseDto.fromOrderItem(orderItem));
        }

        // 3. Select supported payment method
        String paymentMethodStr = request.getPaymentMethod().trim();
        PaymentMethod method = switch (paymentMethodStr.toUpperCase()) {
            case "CASH" -> new Cash();
            case "CARD" -> new Card();
            case "UPI" -> new Upi();
            default -> throw new BadRequestException(
                    "Unsupported payment method: " + paymentMethodStr + ". Supported methods: Cash, Card, UPI.");
        };

        // 4. Process payment through existing domain logic
        PaymentMethod.Payment payment = method.processPayment(order, paymentRepository);

        // 5. Construct Bill response
        int seq = orderSequence.incrementAndGet();
        String orderId = "ORD-" + seq;
        String receiptNumber = "REC-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "-" + seq;
        String timestamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);

        BillResponseDto bill = new BillResponseDto(
                orderId,
                receiptNumber,
                timestamp,
                TableResponseDto.fromTable(table),
                responseItems,
                order.getTotal(),
                payment.getAmount(),
                payment.getMethod().getName(),
                payment.getStatus().name(),
                true,
                "Payment successfully completed (Simulated application-level transaction)."
        );

        // Store in session history
        sessionOrders.add(0, bill); // newest first

        return bill;
    }

    public List<BillResponseDto> getSessionOrderHistory() {
        return Collections.unmodifiableList(new ArrayList<>(sessionOrders));
    }

    public RestaurantStatsDto getStats() {
        List<Table> tables = tableService.getAll();
        int totalTables = tables.size();
        int occupiedTables = 0;
        int availableTables = 0;

        for (Table table : tables) {
            if (table.getstatus() == Table.Availablity.occupy) {
                occupiedTables++;
            } else {
                availableTables++;
            }
        }

        int totalMenuItems = menuCard.getItems().size();
        int sessionOrderCount = sessionOrders.size();
        double sessionRevenue = 0.0;
        for (BillResponseDto bill : sessionOrders) {
            sessionRevenue += bill.getTotal();
        }

        return new RestaurantStatsDto(
                totalTables,
                availableTables,
                occupiedTables,
                totalMenuItems,
                sessionOrderCount,
                sessionRevenue
        );
    }
}
