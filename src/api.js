
const API_BASE_URL = 'https://api.libertyroam.com/invalid-path';

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
    const response = await fetch(`${API_BASE_URL}/packages?limit=${limit}`);
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
