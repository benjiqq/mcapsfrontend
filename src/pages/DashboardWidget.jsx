import { useState, useEffect } from 'react'
import { fetchCoinGeckoPrice, fetchCoinStatsPrice } from '../api'
import { datapoints } from './datapoints'
import { useVisibility } from '../contexts/VisibilityContext'
import './DashboardWidget.css'

function DashboardWidget() {
  // Get visibility context
  const { visibleDatapoints } = useVisibility()
  
  // Initialize state dynamically from datapoints
  const initialPrices = datapoints.reduce((acc, dp) => {
    acc[dp.id] = { price: null, change24h: null }
    return acc
  }, {})
  
  const [prices, setPrices] = useState(initialPrices)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch all prices from their respective sources
  const fetchPrices = async () => {
    try {
      setError('')
      setLoading(true)
      
      // Fetch prices from each datapoint's source
      const pricePromises = datapoints.map((dp) => {
        // Call the appropriate API based on the source
        const fetchPromise = dp.sourceKey === 'coingecko'
          ? fetchCoinGeckoPrice(dp.coinId, 'usd')
          : fetchCoinStatsPrice(dp.coinId)
        
        return fetchPromise
          .then(data => ({ id: dp.id, data }))
          .catch(err => ({ id: dp.id, error: err.message }))
      })
      
      const results = await Promise.all(pricePromises)
      
      // Process results and update state
      const newPrices = { ...prices }
      results.forEach(({ id, data, error: err }) => {
        if (data) {
          newPrices[id] = { price: data.price, change24h: data.change24h }
        } else if (err) {
          // On error, keep existing data or set to null
          newPrices[id] = { price: null, change24h: null }
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

  // Map datapoints to display data, filtering by visibility
  const widgets = datapoints
    .filter(dp => visibleDatapoints[dp.id])
    .map(dp => ({
      id: dp.id,
      name: dp.name,
      symbol: dp.symbol,
      source: dp.source,
      price: prices[dp.id]
    }))

  return (
    <div className="dashboard-widgets-container">
      {widgets.map((widget) => (
        <div key={widget.id} className="dashboard-widget">
          <header className="widget-header">
            <h1>{widget.name}</h1>
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
              <div className="crypto-card">
                <div className="crypto-symbol">{widget.symbol}</div>
                
                {widget.price.price !== null ? (
                  <>
                    <div className="price-value">{formatPrice(widget.price.price)}</div>
                    <div className={`price-change ${widget.price.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {formatChange(widget.price.change24h)} (24h)
                    </div>
                  </>
                ) : (
                  <div className="price-value">N/A</div>
                )}
              </div>
            )}
          </div>
          
          <footer className="widget-footer">
            <div className="widget-source-label">Source: {widget.source}</div>
          </footer>
        </div>
      ))}
    </div>
  )
}

export default DashboardWidget
