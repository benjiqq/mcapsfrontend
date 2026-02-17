
const API_BASE_URL = window.location.origin === 'http://localhost:5173'
  ? 'http://localhost:9000'
  : 'https://api.libertyroam.com';

const cache = {
  packages: {}, // Structure: { [limit]: { data, timestamp } }
};

const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export const getPackages = async (limit = 5) => {
  const now = Date.now();
  const cachedItem = cache.packages[limit];

  if (cachedItem && (now - cachedItem.timestamp < CACHE_TTL)) {
    return cachedItem.data;
  }

  try {
    //predefined packages not all
    const url = `${API_BASE_URL}//definedpackages?limit=${limit}`;
    console.log("Fetching packages from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching packages: ${response.statusText}`);
    }
    const data = await response.json();

    // Update cache
    cache.packages[limit] = {
      data,
      timestamp: now
    };

    return data;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    throw error;
  }
};

export const getOrders = async (limit = 20, page = 1, include = null) => {
  try {
    let url = `${API_BASE_URL}/orders?limit=${limit}&page=${page}`;
    if (include) {
      url += `&include=${include}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const getOrder = async (orderId, include = 'sims') => {
  try {
    let url = `${API_BASE_URL}/orders/${orderId}`;
    if (include) {
      url += `?include=${include}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching order ${orderId}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error;
  }
};
export const createOrder = async (packageId, quantity = 1, description = '') => {
  try {
    const formData = new FormData();
    formData.append('package_id', packageId);
    formData.append('quantity', quantity.toString());
    if (description) {
      formData.append('description', description);
    }

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error creating order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

export const getMyOrders = async (limit = 20, page = 1, include = 'sims') => {
  try {
    const authData = JSON.parse(localStorage.getItem('auth_data') || '{}');
    const token = authData.session_token;

    if (!token) {
      throw new Error("No session token found. Please log in.");
    }

    let url = `${API_BASE_URL}/me/orders?limit=${limit}&page=${page}`;
    if (include) {
      url += `&include=${include}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error fetching personal orders: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch personal orders:", error);
    throw error;
  }
};
