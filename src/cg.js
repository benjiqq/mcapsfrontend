// CoinGecko API client for fetching cryptocurrency prices
// Uses backend API endpoints to avoid CORS issues

// Base URL - use localhost in development, production URL otherwise
// Detect local development by checking hostname and port
const isLocalDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.port === '5173' || // Vite dev server default port
  window.location.port === '3000';    // Common React dev server port

const API_BASE = isLocalDevelopment
  ? 'http://localhost:8080'
  : 'https://api.mcaps.com';

/**
 * Fetch Bitcoin price from backend API (which proxies CoinGecko)
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with price, change24h, and currency properties
 */
export async function fetchBitcoinPrice(vsCurrency = 'usd') {
  try {
    const url = `${API_BASE}/api/price/bitcoin?vs_currency=${encodeURIComponent(vsCurrency)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Failed to fetch Bitcoin price: ${error.message}`)
  }
}

/**
 * Fetch Ethereum price from backend API (which proxies CoinGecko)
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with price, change24h, and currency properties
 */
export async function fetchEthereumPrice(vsCurrency = 'usd') {
  try {
    const url = `${API_BASE}/api/price/ethereum?vs_currency=${encodeURIComponent(vsCurrency)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Failed to fetch Ethereum price: ${error.message}`)
  }
}

/**
 * Fetch XRP price from backend API (which proxies CoinGecko)
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with price, change24h, and currency properties
 */
export async function fetchXRPPrice(vsCurrency = 'usd') {
  try {
    const url = `${API_BASE}/api/price/xrp?vs_currency=${encodeURIComponent(vsCurrency)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Failed to fetch XRP price: ${error.message}`)
  }
}

/**
 * Fetch Solana price from backend API (which proxies CoinGecko)
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with price, change24h, and currency properties
 */
export async function fetchSolanaPrice(vsCurrency = 'usd') {
  try {
    const url = `${API_BASE}/api/price/solana?vs_currency=${encodeURIComponent(vsCurrency)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Failed to fetch Solana price: ${error.message}`)
  }
}
