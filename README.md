# TableFlow — Restaurant Table Management & Billing System

A modern, full-stack restaurant administration and billing platform built with **Java 21**, **Spring Boot 3**, and **React (Vite)**.

This project transforms an existing Java console application into an enterprise-grade full-stack web application while **strictly preserving 100% of the original Java classes, methods, constructors, package names, and business logic without any modifications**.

---

## 1. Project Architecture & Principles

```
                              +-------------------------------------------+
                              |      React 18 + Vite Frontend Dashboard   |
                              |       (Tailored CSS, Lucide, Modular)     |
                              +---------------------+---------------------+
                                                    |  REST API (JSON)
                                                    v
+---------------------------------------------------+---------------------------------------------------+
| Spring Boot Web Layer (src/com/restaruant/web/...)                                                    |
|                                                                                                       |
|   +--------------------+     +-------------------+     +---------------------+                        |
|   |  TableController   |     |  MenuController   |     |   OrderController   |                        |
|   +---------+----------+     +---------+---------+     +----------+----------+                        |
|             |                          |                          |                                   |
|             +--------------------------+--------------------------+                                   |
|                                        v                                                              |
|                         +------------------------------+                                              |
|                         |    RestaurantWebService      |  (Integration Adapter)                       |
|                         +--------------+---------------+                                              |
+----------------------------------------|--------------------------------------------------------------+
                                         v
+----------------------------------------|--------------------------------------------------------------+
| Original Preserved Java Domain Classes | (100% Intact & Untouched)                                     |
|                                        v                                                              |
|  +--------------------+    +--------------------+    +--------------------+    +--------------------+ |
|  |    Tableservice    |    |  Tablerepository   |    |      MenuCard      |    |      MenuItem      | |
|  +--------------------+    +--------------------+    +--------------------+    +--------------------+ |
|  |  RestaurantOrder   |    |     OrderItem      |    |   PaymentMethod    |    | PaymentRepository  | |
|  |     (Table)        |    |                    |    | (Cash, Card, UPI)  |    |                    | |
|  +--------------------+    +--------------------+    +--------------------+    +--------------------+ |
|  |    Table.java      |    |    Tablecli.java   |    |     Main.java      |                         |
|  +--------------------+    +--------------------+    +--------------------+                           |
+-------------------------------------------------------------------------------------------------------+
```

### Key Architectural Guidelines
- **Zero-Modification Rule:** None of the 14 original Java source files have been changed, renamed, reformatted, or refactored.
- **Clean In-Memory Domain Reuse:** The web application directly consumes `Tableservice`, `Tablerepository`, `MenuCard`, `MenuItem`, `RestaurantOrder`, `OrderItem`, and `PaymentMethod` (with `Cash`, `Card`, `Upi`) via Spring dependency injection and adapter patterns without duplicate logic or reflection.
- **Dual Entry Points:**
  - Original CLI console application: `com.restaruant.Main`
  - Spring Boot Web API: `com.restaruant.web.RestaurantApiApplication`
- **Application-Level Simulated Payment Flow:** Settlements use the existing application-level payment flow, persisting settlements into the in-memory `PaymentRepository` and session store.

---

## 2. Preserved Original Java Files & Verification

Before development, SHA-256 hashes were calculated for all 14 original Java files. Following development and testing, cryptographic verification confirmed that all original files remain **100.00% identical**:

| File Path | SHA-256 Checksum | Status |
| :--- | :--- | :--- |
| `src/com/restaruant/Main.java` | `A25AE7846081342FDA171ECEA8D404FF86F2E65319CB6A41100907DC578253E0` | **Verified Unchanged** |
| `src/com/restaruant/cli/Tablecli.java` | `5BBBC8D1400C95262C20E87F1686D7DF9EAD1E644027E0116A061F6A80514953` | **Verified Unchanged** |
| `src/com/restaruant/menu/MenuCard.java` | `BAC870EBB9D44B574CF96BC17BBDD4A5FD721FCB6818A1E80C2093A179B2C3DB` | **Verified Unchanged** |
| `src/com/restaruant/menu/MenuItem.java` | `D4E46D2B20B2DCC383A3F58142EDAA064E7674F461A7A65700C5967E7AF1D9B6` | **Verified Unchanged** |
| `src/com/restaruant/models/OrderItem.java` | `EDA395026094E2218122D8C35C9115EE9A93178AC76A570787C33A8DEDEC02C5` | **Verified Unchanged** |
| `src/com/restaruant/models/RestaurantOrder.java` | `7B00BD3FF014BDB3A515DB8C9FE3A53BC089BC794B3C47A762626787E9EC952E` | **Verified Unchanged** |
| `src/com/restaruant/models/Table.java` | `FD7889192F380D4959A506E210D5667CF0693C43E9B9DF88D12A61388C53EFD5` | **Verified Unchanged** |
| `src/com/restaruant/payment/Card.java` | `6A4BB8E2D3713C6EC96F8BF33C495FD8466D8803F558E86E5335427A39E17A2A` | **Verified Unchanged** |
| `src/com/restaruant/payment/Cash.java` | `B5A2C78B30C351C238F0C88C7034321E659FB29E50A0321B0FCCAAEADFB303CA` | **Verified Unchanged** |
| `src/com/restaruant/payment/PaymentMethod.java` | `AFF3E929AFFAB4300EA09C614E6B9CF4E19B16A0D9CF7B6BAF8CADDA222EE1AE` | **Verified Unchanged** |
| `src/com/restaruant/payment/Upi.java` | `47E80909F575872CFFA4C2F9C6B13869CBE0EE3B217CE86B68BBB5FDB20264F2` | **Verified Unchanged** |
| `src/com/restaruant/repository/PaymentRepository.java` | `D2FEA7B3E14CEFE154EBF141B7FF84FF543DA316662A1D2C124A1AB8281843A0` | **Verified Unchanged** |
| `src/com/restaruant/repository/Tablerepository.java` | `6ACDD8BEA9968DDF183165AD619EDF40BAECDE15DB0B3AA7C61FDFC5F5BCA288` | **Verified Unchanged** |
| `src/com/restaruant/Service/Tableservice.java` | `91AF36D7F900D7D1918578B0748A8807E5FD4F0CD4E969D46597C71275AE0223` | **Verified Unchanged** |

---

## 3. Technology Stack

- **Backend:**
  - Java 21 (Adoptium OpenJDK 21)
  - Spring Boot 3.3.4 (`spring-boot-starter-web`, `spring-boot-starter-validation`, `spring-boot-starter-test`)
  - Apache Maven 3.9.9
  - JUnit 5 & MockMvc for Automated Testing
- **Frontend:**
  - React 18.3.1
  - Vite 5.4.8 (Fast HMR & Dev Server)
  - Lucide React Icons
  - Pure Modern CSS Design System (Glassmorphic dark-slate aesthetic, fluid typography, responsive layout, printable receipt media styles)

---

## 4. REST API Specification

### Tables API (`/api/tables`)

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tables` | List all tables with capacity & actual occupancy status | `200 OK` |
| `GET` | `/api/tables/{id}` | Get specific table details | `200 OK`, `404 Not Found` |
| `POST` | `/api/tables` | Add a new table (`{ id: 4, capacity: 6 }`) | `201 Created`, `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/tables/{id}` | Update table capacity (`{ capacity: 8 }`) | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/tables/{id}` | Delete a table | `204 No Content`, `404 Not Found` |
| `PATCH` | `/api/tables/{id}/status`| Update table occupancy (`{ status: "occupy" / "free" }`)| `200 OK`, `400 Bad Request`, `404 Not Found` |

### Menu API (`/api/menu`)

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menu` | Return verified dishes from `MenuCard` with real prices | `200 OK` |

### Orders & Payments API (`/api/orders`)

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders/pay` | Validate order, compute totals, process payment via Cash/Card/UPI, return itemized bill | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `GET` | `/api/orders/history` | List settled bills and receipts for current application session | `200 OK` |
| `GET` | `/api/orders/stats` | Aggregate dashboard floor and revenue statistics | `200 OK` |

#### Sample Order & Payment Request (`POST /api/orders/pay`)
```json
{
  "tableId": 1,
  "items": [
    { "menuItemId": 1, "quantity": 2 },
    { "menuItemId": 5, "quantity": 1 }
  ],
  "paymentMethod": "Cash"
}
```

#### Sample Bill & Payment Response
```json
{
  "orderId": "ORD-1001",
  "receiptNumber": "REC-20261026-1001",
  "timestamp": "2026-10-26 22:09:32",
  "table": {
    "id": 1,
    "capacity": 5,
    "status": "free",
    "occupied": false
  },
  "items": [
    {
      "menuItemId": 1,
      "name": "Paneer Biryani",
      "unitPrice": 220.0,
      "quantity": 2,
      "subtotal": 440.0
    },
    {
      "menuItemId": 5,
      "name": "Gulab Jamun",
      "unitPrice": 60.0,
      "quantity": 1,
      "subtotal": 60.0
    }
  ],
  "subtotal": 500.0,
  "total": 500.0,
  "paymentMethod": "Cash",
  "paymentStatus": "PAID",
  "simulated": true,
  "message": "Payment successfully completed (Simulated application-level transaction)."
}
```

---

## 5. Quick Start & Execution Guide

### Prerequisites
- **Java 21** installed and configured (`java -version`).
- **Maven 3.9+** (`mvn -v` or use the installed binary).
- **Node.js 18+** & **npm** (`node -v`, `npm -v`).

### 1. Compile Backend & Run Automated Tests
```powershell
# From the project root (A201):
mvn clean compile
mvn test
```
All 16 unit and integration tests will execute against the Spring Boot MockMvc web test environment.

### 2. Run the Spring Boot Web Application
```powershell
mvn spring-boot:run
```
The backend initializes on **port 8081** (or 8080 if free on your system) with context path `/`.

### 3. Run the React Frontend
In a separate terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser. The Vite development server proxies `/api` directly to `http://localhost:8081`.

### 4. Run the Original Java Console Application (Optional)
To run the original command-line interface:
```powershell
# Compile if not done:
mvn compile
# Execute original Main CLI:
java -cp target/classes com.restaruant.Main
```

---

## 6. Frontend Dashboard Modules

1. **Overview Dashboard:**
   - Real-time KPIs: Total Tables, Available Tables (Free), Occupied Tables (Occupy), Total Menu Items, Session Order Count, Session Revenue.
   - Quick navigation launchpads.
   - Recent orders log with quick "View Bill" action.

2. **Table Management:**
   - Visual cards showing Table ID, seating capacity, and real-time status pills.
   - Search by table ID or capacity, filter by Available/Occupied.
   - Add Table modal with live validation (positive integer ID and capacity).
   - Duplicate ID detection and friendly error banners.
   - Edit Capacity modal.
   - Delete Table confirmation modal.
   - Real-time table occupancy toggle (`occupy` / `free`) calling domain `booking()` and `freenow()` methods.

3. **Menu View:**
   - Cards displaying item ID, name, and official price in Indian Rupees (₹).
   - Search by dish name or item number.
   - Price and alphabetical sorting.
   - "Add to Order" quick shortcut.

4. **Order Terminal & Settlement:**
   - Dining table dropdown selector.
   - Dish selection with instant cart addition.
   - Interactive cart with quantity steppers (`+` / `-`), item removal, and live subtotal calculations.
   - Running Grand Total display.
   - Selection of supported payment methods: **Cash**, **Card**, **UPI**.
   - Repeated-click prevention with loading state during payment processing.

5. **Bill & Receipt Modal:**
   - Itemized professional invoice layout.
   - Table details, receipt number, sequential order ID, and date/time.
   - Itemized lines: Dish, Quantity, Unit Price, Subtotal.
   - Settlement box with simulated application-level payment note.
   - Printable slip via `window.print()` using dedicated `@media print` CSS rules.

6. **Billing History:**
   - Full audit trail of session orders.
   - Search by order ID, receipt number, table, or payment method.
   - On-demand receipt viewing and printing.

---

## 7. Newly Created Files Manifest

```
A201/
├── pom.xml                                               <-- Maven configuration for Java 21 & Spring Boot 3
├── .gitignore                                            <-- Git ignore rules
├── README.md                                             <-- Comprehensive system documentation
├── src/
│   ├── resources/
│   │   └── application.properties                        <-- Spring Boot port, logging & Jackson config
│   └── com/restaruant/web/
│       ├── RestaurantApiApplication.java                 <-- Spring Boot web entry point
│       ├── config/
│       │   ├── AppBeanConfig.java                        <-- Singleton bean provider for domain services
│       │   └── WebConfig.java                            <-- CORS configuration for frontend
│       ├── controller/
│       │   ├── TableController.java                      <-- REST controller for Table operations
│       │   ├── MenuController.java                       <-- REST controller for Menu view
│       │   ├── OrderController.java                      <-- REST controller for Orders & Payments
│       │   └── GlobalExceptionHandler.java               <-- Consistent JSON error response handler
│       ├── dto/
│       │   ├── TableResponseDto.java                     <-- Table response payload
│       │   ├── CreateTableRequestDto.java                <-- Add table request payload with Bean Validation
│       │   ├── UpdateTableRequestDto.java                <-- Update capacity request payload
│       │   ├── MenuItemDto.java                          <-- Menu item payload
│       │   ├── OrderItemRequestDto.java                  <-- Order item input payload
│       │   ├── OrderPaymentRequestDto.java               <-- Order & pay input payload
│       │   ├── OrderItemResponseDto.java                 <-- Bill itemized line payload
│       │   ├── BillResponseDto.java                      <-- Settlement invoice payload
│       │   ├── RestaurantStatsDto.java                   <-- Overview dashboard statistics payload
│       │   └── ErrorResponseDto.java                     <-- Standardized error JSON payload
│       ├── exception/
│       │   ├── ResourceNotFoundException.java            <-- 404 HTTP Exception
│       │   ├── DuplicateResourceException.java           <-- 409 HTTP Exception
│       │   └── BadRequestException.java                  <-- 400 HTTP Exception
│       └── service/
│           └── RestaurantWebService.java                 <-- Domain integration & adapter service
├── test/
│   └── com/restaruant/web/
│       └── RestaurantApiApplicationTests.java            <-- 16 Automated MockMvc integration tests
└── frontend/
    ├── package.json                                      <-- Vite & React dependencies
    ├── vite.config.js                                    <-- Vite build and /api proxy configuration
    ├── index.html                                        <-- HTML5 template with Google Fonts
    └── src/
        ├── main.jsx                                      <-- React root entry point
        ├── App.jsx                                       <-- Top-level app state manager & layout
        ├── index.css                                     <-- Complete modern dark-slate design system
        ├── api/
        │   └── restaurantApi.js                          <-- Fetch API client wrapper
        └── components/
            ├── Sidebar.jsx                               <-- Navigation sidebar
            ├── Header.jsx                                <-- Top header with clock & refresh
            ├── OverviewSection.jsx                       <-- Metrics and recent orders
            ├── TableManagementSection.jsx                <-- Table grid, modals & occupancy toggle
            ├── MenuViewSection.jsx                       <-- Menu cards & search
            ├── OrderManagementSection.jsx                <-- Ordering cart & payment selector
            ├── OrderHistorySection.jsx                   <-- Session billing history
            ├── BillReceiptModal.jsx                      <-- Printable invoice modal
            └── NotificationToast.jsx                     <-- Notification alert system
```

---

## 8. License & Integrity

All original Java source files remain licensed and structured under `com.restaruant.*`. All new integration layers adhere to standard Spring Boot and React modern practices.
