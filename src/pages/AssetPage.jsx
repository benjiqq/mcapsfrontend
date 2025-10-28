import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import './AssetPage.css'

function AssetPage() {
  const { coinId } = useParams()
  const navigate = useNavigate()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const ASSETS_KEY = 'assets'
  
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load asset from localStorage
    try {
      const stored = localStorage.getItem(ASSETS_KEY)
      if (stored) {
        const assets = JSON.parse(stored)
        const foundAsset = assets.find(a => a.coin_id === coinId)
        if (foundAsset) {
          setAsset(foundAsset)
          setLoading(false)
          return
        }
      }
      setError('Asset not found')
      setLoading(false)
    } catch (error) {
      console.error('Error loading asset:', error)
      setError('Failed to load asset')
      setLoading(false)
    }
  }, [coinId])

  // Format number helper
  const formatNumber = (n, digits = 2) => {
    if (n === null || n === undefined || isNaN(n)) return 'N/A'
    return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits })
  }

  // Format percentage helper
  const formatPercent = (n) => {
    if (n === null || n === undefined || isNaN(n)) return 'N/A'
    return Number(n).toFixed(2) + '%'
  }

  // Toggle watchlist
  const handleToggleWatchlist = () => {
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId)
    } else {
      addToWatchlist(asset)
    }
  }

  if (loading) {
    return (
      <div className="asset-page">
        <div className="loading-state">Loading...</div>
      </div>
    )
  }

  if (error || !asset) {
    return (
      <div className="asset-page">
        <div className="error-state">
          <p>{error || 'Asset not found'}</p>
          <button onClick={() => navigate('/')}>Back to Markets</button>
        </div>
      </div>
    )
  }

  return (
    <div className="asset-page">
      <header className="page-header">
        <div>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back
          </button>
          <h1>{asset.name}</h1>
          <span className="muted">{asset.symbol?.toUpperCase()}</span>
        </div>
        <button
          className={`watchlist-button ${isInWatchlist(coinId) ? 'starred' : ''}`}
          onClick={handleToggleWatchlist}
        >
          {isInWatchlist(coinId) ? '★ Starred' : '☆ Add to Watchlist'}
        </button>
      </header>

      <div className="asset-content">
        {asset.image && (
          <div className="asset-image-container">
            <img src={asset.image} alt={asset.name} className="asset-image" />
          </div>
        )}

        <div className="asset-stats">
          <div className="stat-card">
            <div className="stat-label">Current Price</div>
            <div className="stat-value price">
              ${formatNumber(asset.current_price, 6)}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">24h Change</div>
            <div className={`stat-value ${asset.price_change_percentage_24h >= 0 ? 'pos' : 'neg'}`}>
              {formatPercent(asset.price_change_percentage_24h)}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Market Cap</div>
            <div className="stat-value">
              ${formatNumber(asset.market_cap, 0)}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Market Cap Rank</div>
            <div className="stat-value">
              #{asset.market_cap_rank || 'N/A'}
            </div>
          </div>
        </div>

        <div className="asset-details">
          <h2>Asset Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{asset.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Symbol:</span>
              <span className="detail-value">{asset.symbol?.toUpperCase()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Coin ID:</span>
              <span className="detail-value">{asset.coin_id || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Current Price:</span>
              <span className="detail-value">${formatNumber(asset.current_price, 6)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">24h Change:</span>
              <span className={`detail-value ${asset.price_change_percentage_24h >= 0 ? 'pos' : 'neg'}`}>
                {formatPercent(asset.price_change_percentage_24h)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Market Cap:</span>
              <span className="detail-value">${formatNumber(asset.market_cap, 0)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Market Cap Rank:</span>
              <span className="detail-value">#{asset.market_cap_rank || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated:</span>
              <span className="detail-value">
                {asset.last_updated ? new Date(asset.last_updated).toLocaleString() : 'N/A'}
              </span>
            </div>
            {asset.coin_id && (
              <div className="detail-item">
                <span className="detail-label">CoinGecko:</span>
                <a
                  href={`https://www.coingecko.com/en/coins/${asset.coin_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  View on CoinGecko
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="asset-raw-data">
          <h2>Raw Data</h2>
          <pre className="raw-data-content">
            {JSON.stringify(asset, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default AssetPage

