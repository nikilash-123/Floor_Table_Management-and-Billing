import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewSection from './components/OverviewSection';
import TableManagementSection from './components/TableManagementSection';
import MenuViewSection from './components/MenuViewSection';
import OrderManagementSection from './components/OrderManagementSection';
import OrderHistorySection from './components/OrderHistorySection';
import BillReceiptModal from './components/BillReceiptModal';
import NotificationToast from './components/NotificationToast';
import { restaurantApi } from './api/restaurantApi';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [stats, setStats] = useState({
    totalTables: 0,
    availableTables: 0,
    occupiedTables: 0,
    totalMenuItems: 0,
    sessionOrderCount: 0,
    sessionRevenue: 0.0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedReceiptBill, setSelectedReceiptBill] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Toast notification helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Fetch initial/refreshed data from REST API
  const fetchData = useCallback(async (quiet = false) => {
    if (!quiet) setIsLoading(true);
    try {
      const [tablesData, menuData, statsData, ordersData] = await Promise.all([
        restaurantApi.getTables(),
        restaurantApi.getMenu(),
        restaurantApi.getStats(),
        restaurantApi.getOrderHistory(),
      ]);

      setTables(tablesData || []);
      setMenuItems(menuData || []);
      if (statsData) setStats(statsData);
      if (ordersData) setRecentOrders(ordersData);
      setIsBackendOnline(true);
    } catch (err) {
      setIsBackendOnline(false);
      addToast(
        'Backend Connection Issue',
        err.message || 'Unable to connect to Spring Boot server. Please ensure backend is running.',
        'error'
      );
    } finally {
      if (!quiet) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Section title mapping
  const sectionTitles = {
    overview: 'Restaurant Overview',
    tables: 'Floor Table Management',
    menu: 'Menu Catalog',
    order: 'Order Terminal & Payment',
    history: 'Session Billing History',
  };

  // Table Management Actions
  const handleCreateTable = async (id, capacity) => {
    setIsLoading(true);
    try {
      const created = await restaurantApi.createTable({ id, capacity });
      addToast('Table Added', `Table #${created.id} with capacity ${created.capacity} created successfully.`, 'success');
      await fetchData(true);
      return created;
    } catch (err) {
      addToast('Failed to Create Table', err.message, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCapacity = async (id, capacity) => {
    setIsLoading(true);
    try {
      const updated = await restaurantApi.updateTableCapacity(id, { capacity });
      addToast('Capacity Updated', `Table #${updated.id} capacity updated to ${updated.capacity}.`, 'success');
      await fetchData(true);
      return updated;
    } catch (err) {
      addToast('Update Failed', err.message, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTable = async (id) => {
    setIsLoading(true);
    try {
      await restaurantApi.deleteTable(id);
      addToast('Table Deleted', `Table #${id} removed from the system.`, 'success');
      await fetchData(true);
    } catch (err) {
      addToast('Delete Failed', err.message, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    setIsLoading(true);
    try {
      const updated = await restaurantApi.updateTableStatus(id, newStatus);
      const label = updated.occupied ? 'Occupied' : 'Available';
      addToast('Status Updated', `Table #${updated.id} is now marked as ${label}.`, 'info');
      await fetchData(true);
    } catch (err) {
      addToast('Status Change Failed', err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Cart & Order Actions
  const handleAddToCart = (menuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
    addToast('Item Added', `${menuItem.name} added to current order.`, 'info');
  };

  const handleStartOrderWithItem = (menuItem) => {
    handleAddToCart(menuItem);
    setActiveSection('order');
  };

  const handleUpdateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProcessOrder = async (orderPayload) => {
    setIsProcessingOrder(true);
    try {
      const bill = await restaurantApi.placeOrderAndPay(orderPayload);
      addToast(
        'Order Settled & Paid',
        `Receipt ${bill.receiptNumber} issued for Table ${bill.table?.id || ''}. Total: ₹${bill.total.toFixed(2)}`,
        'success'
      );
      setCartItems([]);
      setSelectedReceiptBill(bill);
      await fetchData(true);
      return bill;
    } catch (err) {
      addToast('Payment Failed', err.message, 'error');
      throw err;
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isBackendOnline={isBackendOnline}
        tableCount={tables.length}
      />

      {/* Main Content View */}
      <div className="main-wrapper">
        <Header
          activeSectionTitle={sectionTitles[activeSection] || 'Restaurant Management'}
          onRefresh={() => fetchData()}
          isLoading={isLoading}
          onOpenAddTable={() => setActiveSection('tables')}
          onOpenNewOrder={() => setActiveSection('order')}
        />

        <main className="content-area">
          {activeSection === 'overview' && (
            <OverviewSection
              stats={stats}
              recentOrders={recentOrders}
              onNavigate={setActiveSection}
              onViewReceipt={setSelectedReceiptBill}
              isLoading={isLoading}
            />
          )}

          {activeSection === 'tables' && (
            <TableManagementSection
              tables={tables}
              onCreateTable={handleCreateTable}
              onUpdateCapacity={handleUpdateCapacity}
              onDeleteTable={handleDeleteTable}
              onToggleStatus={handleToggleStatus}
              isLoading={isLoading}
            />
          )}

          {activeSection === 'menu' && (
            <MenuViewSection
              menuItems={menuItems}
              onStartOrderWithItem={handleStartOrderWithItem}
            />
          )}

          {activeSection === 'order' && (
            <OrderManagementSection
              tables={tables}
              menuItems={menuItems}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onProcessOrder={handleProcessOrder}
              isProcessing={isProcessingOrder}
            />
          )}

          {activeSection === 'history' && (
            <OrderHistorySection
              orders={recentOrders}
              onViewReceipt={setSelectedReceiptBill}
              onNavigate={setActiveSection}
            />
          )}
        </main>
      </div>

      {/* Bill & Receipt Modal */}
      {selectedReceiptBill && (
        <BillReceiptModal
          bill={selectedReceiptBill}
          onClose={() => setSelectedReceiptBill(null)}
        />
      )}

      {/* Toast Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissToast}
      />
    </div>
  );
}
