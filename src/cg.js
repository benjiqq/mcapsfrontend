// CoinGecko API client for fetching cryptocurrency prices
// Frontend-only implementation

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

/**
 * Fetch Bitcoin price from CoinGecko API
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with usd property
 */
export async function fetchBitcoinPrice(vsCurrency = 'usd') {
  try {
    const url = `${COINGECKO_API_BASE}/simple/price`
    const params = new URLSearchParams({
      ids: 'bitcoin',
      vs_currencies: vsCurrency,
      include_24hr_change: 'true'
    })
    
    const response = await fetch(`${url}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.bitcoin) {
      throw new Error('Bitcoin price data not found in response')
    }
    
    return {
      price: data.bitcoin[vsCurrency],
      change24h: data.bitcoin[`${vsCurrency}_24h_change`],
      currency: vsCurrency.toUpperCase()
    }
  } catch (error) {
    throw new Error(`Failed to fetch Bitcoin price: ${error.message}`)
  }
}

/**
 * Fetch Ethereum price from CoinGecko API
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with usd property
 */
export async function fetchEthereumPrice(vsCurrency = 'usd') {
  try {
    const url = `${COINGECKO_API_BASE}/simple/price`
    const params = new URLSearchParams({
      ids: 'ethereum',
      vs_currencies: vsCurrency,
      include_24hr_change: 'true'
    })
    
    const response = await fetch(`${url}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.ethereum) {
      throw new Error('Ethereum price data not found in response')
    }
    
    return {
      price: data.ethereum[vsCurrency],
      change24h: data.ethereum[`${vsCurrency}_24h_change`],
      currency: vsCurrency.toUpperCase()
    }
  } catch (error) {
    throw new Error(`Failed to fetch Ethereum price: ${error.message}`)
  }
}

/**
 * Fetch XRP price from CoinGecko API
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with usd property
 */
export async function fetchXRPPrice(vsCurrency = 'usd') {
  try {
    const url = `${COINGECKO_API_BASE}/simple/price`
    const params = new URLSearchParams({
      ids: 'ripple',
      vs_currencies: vsCurrency,
      include_24hr_change: 'true'
    })
    
    const response = await fetch(`${url}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.ripple) {
      throw new Error('XRP price data not found in response')
    }
    
    return {
      price: data.ripple[vsCurrency],
      change24h: data.ripple[`${vsCurrency}_24h_change`],
      currency: vsCurrency.toUpperCase()
    }
  } catch (error) {
    throw new Error(`Failed to fetch XRP price: ${error.message}`)
  }
}

/**
 * Fetch Solana price from CoinGecko API
 * @param {string} vsCurrency - The currency to convert to (default: 'usd')
 * @returns {Promise<Object>} Price data with usd property
 */
export async function fetchSolanaPrice(vsCurrency = 'usd') {
  try {
    const url = `${COINGECKO_API_BASE}/simple/price`
    const params = new URLSearchParams({
      ids: 'solana',
      vs_currencies: vsCurrency,
      include_24hr_change: 'true'
    })
    
    const response = await fetch(`${url}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.solana) {
      throw new Error('Solana price data not found in response')
    }
    
    return {
      price: data.solana[vsCurrency],
      change24h: data.solana[`${vsCurrency}_24h_change`],
      currency: vsCurrency.toUpperCase()
    }
  } catch (error) {
    throw new Error(`Failed to fetch Solana price: ${error.message}`)
  }
}
