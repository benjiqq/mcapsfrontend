
const API_BASE_URL = 'http://localhost:8000';

export const getPackages = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error fetching packages: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    throw error;
  }
};
