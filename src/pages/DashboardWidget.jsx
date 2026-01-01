import { useState, useEffect } from 'react'
import { fetchCoinGeckoPrice, fetchCoinStatsPrice } from '../api'
import './DashboardWidget.css'

function DashboardWidget() {
  // State for all cryptocurrencies with both API sources
  const [prices, setPrices] = useState({
    btc: { 
      coingecko: { price: null, change24h: null },
      coinstats: { price: null, change24h: null }
    },
    eth: { 
      coingecko: { price: null, change24h: null },
      coinstats: { price: null, change24h: null }
    },
    xrp: { 
      coingecko: { price: null, change24h: null },
      coinstats: { price: null, change24h: null }
    },
    sol: { 
      coingecko: { price: null, change24h: null },
      coinstats: { price: null, change24h: null }
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch all cryptocurrency prices from both APIs
  const fetchPrices = async () => {
    try {
      setError('')
      setLoading(true)
      
      // Coin IDs mapping for both APIs
      const coinIds = {
        btc: 'bitcoin',
        eth: 'ethereum',
        xrp: 'xrp',
        sol: 'solana'
      }
      
      // Fetch all prices in parallel from both APIs
      const pricePromises = Object.entries(coinIds).flatMap(([key, coinId]) => [
        fetchCoinGeckoPrice(coinId, 'usd').then(data => ({ key, source: 'coingecko', data })).catch(err => ({ key, source: 'coingecko', error: err.message })),
        fetchCoinStatsPrice(coinId).then(data => ({ key, source: 'coinstats', data })).catch(err => ({ key, source: 'coinstats', error: err.message }))
      ])
      
      const results = await Promise.all(pricePromises)
      
      // Process results and update state
      const newPrices = { ...prices }
      results.forEach(({ key, source, data, error: err }) => {
        if (data) {
          newPrices[key][source] = { price: data.price, change24h: data.change24h }
        } else if (err) {
          // On error, keep existing data or set to null
          newPrices[key][source] = { price: null, change24h: null }
        }
      })
      
      setPrices(newPrices)
      setLastUpdate(new Date())
      setLoading(false)
    } catch (e) {
      setError(e.message || String(e))
      setLoading(false)
    }
  }

  // Fetch prices on mount and set up interval to fetch every 1 minute
  useEffect(() => {
    // Fetch immediately on mount
    fetchPrices()

    // Set up interval to fetch every 1 minute (60000 ms)
    const intervalId = setInterval(() => {
      fetchPrices()
    }, 60000)

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // Format price with commas and 2 decimal places
  const formatPrice = (value) => {
    if (value === null || value === undefined) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  // Format 24h change percentage
  const formatChange = (value) => {
    if (value === null || value === undefined) return 'N/A'
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  // Cryptocurrency data for display
  const cryptos = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', data: prices.btc },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', data: prices.eth },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', data: prices.xrp },
    { id: 'sol', name: 'Solana', symbol: 'SOL', data: prices.sol }
  ]

  return (
    <div className="dashboard-widgets-container">
      <div className="dashboard-widget">
        <header className="widget-header">
          <h1>Crypto Prices</h1>
          {lastUpdate && (
            <span className="last-update">
              Updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </header>

        <div className="widget-content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          )}
          {error && <div className="error">Error: {error}</div>}
          
          {!loading && !error && (
            <div className="crypto-grid">
              {cryptos.map((crypto) => (
                <div key={crypto.id} className="crypto-card">
                  <div className="crypto-name">{crypto.name}</div>
                  <div className="crypto-symbol">{crypto.symbol}</div>
                  
                  {/* CoinGecko price */}
                  <div className="price-source">
                    <div className="price-source-label">CoinGecko</div>
                    {crypto.data.coingecko.price !== null ? (
                      <>
                        <div className="price-value">{formatPrice(crypto.data.coingecko.price)}</div>
                        <div className={`price-change ${crypto.data.coingecko.change24h >= 0 ? 'positive' : 'negative'}`}>
                          {formatChange(crypto.data.coingecko.change24h)} (24h)
                        </div>
                      </>
                    ) : (
                      <div className="price-value">N/A</div>
                    )}
                  </div>
                  
                  {/* CoinStats price */}
                  <div className="price-source">
                    <div className="price-source-label">CoinStats</div>
                    {crypto.data.coinstats.price !== null ? (
                      <>
                        <div className="price-value">{formatPrice(crypto.data.coinstats.price)}</div>
                        <div className={`price-change ${crypto.data.coinstats.change24h >= 0 ? 'positive' : 'negative'}`}>
                          {formatChange(crypto.data.coinstats.change24h)} (24h)
                        </div>
                      </>
                    ) : (
                      <div className="price-value">N/A</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardWidget
