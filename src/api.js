// API functions for fetching cryptocurrency data

// Base URL - always use production API
const API_BASE = 'https://api.mcaps.com';

// Fetch the total count of assets
export async function fetchAssetsCount() {
  const response = await fetch(`${API_BASE}/assets/count`)
  if (!response.ok) {
    throw new Error(`Failed to fetch assets count: HTTP ${response.status}`)
  }
  const data = await response.json()
  return data.count || 0
}

// Fetch all assets data
export async function fetchAllAssets() {
  const response = await fetch(`${API_BASE}/assets`)
  if (!response.ok) {
    throw new Error(`Failed to fetch assets: HTTP ${response.status}`)
  }
  const data = await response.json()
  return data
}

// Fetch assets data (main function that combines count and assets)
export async function fetchAssetsData() {
  try {
    // Fetch total count
    const count = await fetchAssetsCount()
    
    // Fetch all assets
    const assets = await fetchAllAssets()
    
    if (!assets.length) {
      throw new Error('No assets data available')
    }
    
    return {
      count,
      assets,
      snapshot: {
        id: 'assets',
        created_at: new Date().toISOString(),
        vs_currency: 'usd'
      }
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch assets data')
  }
}

// Fetch asset details by asset ID
export async function fetchAssetDetails(assetId) {
  const response = await fetch(`${API_BASE}/assets/${assetId}/details`)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${assetId}`)
    }
    throw new Error(`Failed to fetch asset details: HTTP ${response.status}`)
  }
  const data = await response.json()
  return data
}

// Send chat message to the chat API
export async function sendChatMessage(message, vsCurrency = 'usd') {
  const url = `${API_BASE}/chat?message=${encodeURIComponent(message)}&vs_currency=${encodeURIComponent(vsCurrency)}`
  const response = await fetch(url, { method: 'POST' })
  
  if (!response.ok) {
    throw new Error(`Failed to send chat message: HTTP ${response.status}`)
  }
  
  const data = await response.json()
  return data.reply || 'No reply'
}

// Fetch coin price from CoinGecko API
// Returns: { price, change24h, currency }
export async function fetchCoinGeckoPrice(coinId, vsCurrency = 'usd') {
  const url = `${API_BASE}/coingecko/price/${encodeURIComponent(coinId)}?vs_currency=${encodeURIComponent(vsCurrency)}`
  
  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Price data not found for coin: ${coinId}`)
    }
    throw new Error(`Failed to fetch CoinGecko price for ${coinId}: HTTP ${response.status}`)
  }
  const data = await response.json()
  return data
}

// Fetch coin price from CoinStats API
// Returns: { price, change24h, currency }
export async function fetchCoinStatsPrice(coinId) {
  const url = `${API_BASE}/coinstats/price/${encodeURIComponent(coinId)}`
  
  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Price data not found for coin: ${coinId}`)
    }
    throw new Error(`Failed to fetch CoinStats price for ${coinId}: HTTP ${response.status}`)
  }
  const data = await response.json()
  return data
}

