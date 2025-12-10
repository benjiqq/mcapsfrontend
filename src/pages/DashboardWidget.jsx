import { useState, useEffect } from 'react'
import { fetchBitcoinPrice, fetchEthereumPrice, fetchXRPPrice, fetchSolanaPrice } from '../cg'
import './DashboardWidget.css'

function DashboardWidget() {
  // State for all cryptocurrencies
  const [prices, setPrices] = useState({
    btc: { price: null, change24h: null },
    eth: { price: null, change24h: null },
    xrp: { price: null, change24h: null },
    sol: { price: null, change24h: null }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch all cryptocurrency prices
  const fetchPrices = async () => {
    try {
      setError('')
      setLoading(true)
      
      // Fetch all prices in parallel
      const [btcData, ethData, xrpData, solData] = await Promise.all([
        fetchBitcoinPrice('usd'),
        fetchEthereumPrice('usd'),
        fetchXRPPrice('usd'),
        fetchSolanaPrice('usd')
      ])
      
      setPrices({
        btc: { price: btcData.price, change24h: btcData.change24h },
        eth: { price: ethData.price, change24h: ethData.change24h },
        xrp: { price: xrpData.price, change24h: xrpData.change24h },
        sol: { price: solData.price, change24h: solData.change24h }
      })
      
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
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error: {error}</div>}
        
        {!loading && !error && (
          <div className="crypto-grid">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="crypto-card">
                <div className="crypto-name">{crypto.name}</div>
                <div className="crypto-symbol">{crypto.symbol}</div>
                {crypto.data.price !== null ? (
                  <>
                    <div className="price-value">{formatPrice(crypto.data.price)}</div>
                    <div className={`price-change ${crypto.data.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {formatChange(crypto.data.change24h)} (24h)
                    </div>
                  </>
                ) : (
                  <div className="price-value">N/A</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardWidget
