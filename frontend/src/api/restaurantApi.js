/**
 * REST API client for Restaurant Table Management backend.
 * Uses configurable base URL with local development fallback.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch {
      // not JSON
    }

    const message =
      errorData?.message ||
      errorData?.error ||
      `HTTP Error ${response.status}: ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export const restaurantApi = {
  // Table operations
  async getTables() {
    const res = await fetch(`${API_BASE_URL}/tables`);
    return handleResponse(res);
  },

  async getTable(id) {
    const res = await fetch(`${API_BASE_URL}/tables/${id}`);
    return handleResponse(res);
  },

  async createTable(tableData) {
    const res = await fetch(`${API_BASE_URL}/tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tableData),
    });
    return handleResponse(res);
  },

  async updateTableCapacity(id, capacityData) {
    const res = await fetch(`${API_BASE_URL}/tables/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capacityData),
    });
    return handleResponse(res);
  },

  async deleteTable(id) {
    const res = await fetch(`${API_BASE_URL}/tables/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  async updateTableStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/tables/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  // Menu operations
  async getMenu() {
    const res = await fetch(`${API_BASE_URL}/menu`);
    return handleResponse(res);
  },

  // Order & Payment operations
  async placeOrderAndPay(orderPaymentData) {
    const res = await fetch(`${API_BASE_URL}/orders/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPaymentData),
    });
    return handleResponse(res);
  },

  async getOrderHistory() {
    const res = await fetch(`${API_BASE_URL}/orders/history`);
    return handleResponse(res);
  },

  async getStats() {
    const res = await fetch(`${API_BASE_URL}/orders/stats`);
    return handleResponse(res);
  },
};
