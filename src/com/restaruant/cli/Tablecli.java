package com.restaruant.cli;

import com.restaruant.Service.Tableservice;
import com.restaruant.models.OrderItem;
import com.restaruant.models.RestaurantOrder;
import com.restaruant.models.Table;
import com.restaruant.menu.MenuCard;
import com.restaruant.menu.MenuItem;
import com.restaruant.payment.Card;
import com.restaruant.payment.Cash;
import com.restaruant.payment.PaymentMethod;
import com.restaruant.payment.Upi;
import com.restaruant.repository.PaymentRepository;
import java.util.Scanner;

public class Tablecli {
    private final Tableservice service;
    private final PaymentRepository paymentRepository = new PaymentRepository();
    private final MenuCard menuCard = new MenuCard();

    public Tablecli(Tableservice service) {
        this.service = service;
    }

    public void run() {
        try (Scanner scanner = new Scanner(System.in)) {
            boolean running = true;
            while (running) {
                printMenu();
                int choice = readInt(scanner, "Choose an option: ");
                switch (choice) {
                    case 1 -> listTables();
                    case 2 -> addTable(scanner);
                    case 3 -> updateTable(scanner);
                    case 4 -> deleteTable(scanner);
                    case 5 -> showMenuCard();
                    case 6 -> placeOrderAndPay(scanner);
                    case 0 -> {
                        running = false;
                        System.out.println("Goodbye.");
                    }
                    default -> System.out.println("Invalid option. Choose 0 through 6.");
                }
            }
        }
    }

    private void printMenu() {
        System.out.println("\nRestaurant table manager");
        System.out.println("1. List tables");
        System.out.println("2. Add table");
        System.out.println("3. Update table capacity");
        System.out.println("4. Delete table");
        System.out.println("5. View menu card");
        System.out.println("6. Place order and pay");
        System.out.println("0. Exit");
    }

    private void showMenuCard() {
        System.out.println("\nMenu card");
        for (MenuItem item : menuCard.getItems()) {
            System.out.printf("%d. %s - %.2f%n", item.getId(), item.getName(), item.getPrice());
        }
    }

    private void listTables() {
        if (service.getAll().isEmpty()) {
            System.out.println("No tables found.");
            return;
        }
        for (Table table : service.getAll()) {
            System.out.printf(
                    "Table %d: capacity %d, status %s%n",
                    table.getId(),
                    table.getcapacity(),
                    table.getstatus());
        }
    }

    private void addTable(Scanner scanner) {
        int id = readInt(scanner, "Table ID: ");
        int capacity = readInt(scanner, "Capacity: ");
        try {
            if (service.addTable(id, capacity)) {
                System.out.println("Table added.");
            } else {
                System.out.println("A table with that ID already exists.");
            }
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private void updateTable(Scanner scanner) {
        int id = readInt(scanner, "Table ID to update: ");
        int capacity = readInt(scanner, "New capacity: ");
        try {
            if (service.updateTableCapacity(id, capacity)) {
                System.out.println("Table updated.");
            } else {
                System.out.println("Table not found.");
            }
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private void deleteTable(Scanner scanner) {
        int id = readInt(scanner, "Table ID to delete: ");
        try {
            if (service.deleteTable(id)) {
                System.out.println("Table deleted.");
            } else {
                System.out.println("Table not found.");
            }
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private void placeOrderAndPay(Scanner scanner) {
        int tableId = readInt(scanner, "Table ID to bill: ");
        Table table;
        try {
            table = service.getTable(tableId);
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
            return;
        }
        if (table == null) {
            System.out.println("Table not found.");
            return;
        }

        RestaurantOrder order = new RestaurantOrder(table);
        showMenuCard();
        System.out.println("Enter 0 when you have finished adding items.");
        while (true) {
            int itemId = readInt(scanner, "Menu item number: ");
            if (itemId == 0) {
                break;
            }
            MenuItem menuItem = menuCard.findById(itemId);
            if (menuItem == null) {
                System.out.println("Menu item not found. Choose an item from the menu.");
                continue;
            }
            int quantity = readPositiveInt(scanner, "Quantity: ");
            order.addItem(new OrderItem(menuItem, quantity));
        }
        if (order.isEmpty()) {
            System.out.println("No items were ordered.");
            return;
        }

        System.out.println("Payment method: 1. Cash  2. Card  3. UPI");
        int choice = readInt(scanner, "Choose a payment method: ");
        PaymentMethod method = switch (choice) {
            case 1 -> new Cash();
            case 2 -> new Card();
            case 3 -> new Upi();
            default -> {
                System.out.println("Invalid payment method. Choose 1 through 3.");
                yield null;
            }
        };
        if (method == null) {
            return;
        }

        try {
            PaymentMethod.Payment payment = method.processPayment(order, paymentRepository);
            System.out.println("\nTable details");
            System.out.printf(
                    "Table %d: capacity %d, status %s%n",
                    payment.getTable().getId(),
                    payment.getTable().getcapacity(),
                    payment.getTable().getstatus());
            System.out.println("Billing details");
            for (OrderItem item : payment.getOrder().getItems()) {
                System.out.printf(
                        "%s x %d - %.2f%n",
                        item.getMenuItem().getName(),
                        item.getQuantity(),
                        item.getSubtotal());
            }
            System.out.printf(
                    "Total: %.2f%nPayment method: %s%nPayment status: %s%n",
                    payment.getAmount(),
                    payment.getMethod().getName(),
                    payment.getStatus());
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private int readInt(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine();
            try {
                return Integer.parseInt(input.trim());
            } catch (NumberFormatException exception) {
                System.out.println("Please enter a whole number.");
            }
        }
    }

    private int readPositiveInt(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine();
            try {
                int value = Integer.parseInt(input.trim());
                if (value > 0) {
                    return value;
                }
                System.out.println("Please enter a quantity greater than zero.");
            } catch (NumberFormatException exception) {
                System.out.println("Please enter a whole-number quantity.");
            }
        }
    }
}
