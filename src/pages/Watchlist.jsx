import { useState } from 'react'
import { useWatchlist } from '../contexts/WatchlistContext'
import AssetTable from '../components/AssetTable'
import './Dashboard.css'

function Watchlist() {
  const { watchlist } = useWatchlist()

  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <h1>Watchlist</h1>
          {watchlist.length > 0 && (
            <span className="muted">
              {watchlist.length} starred {watchlist.length === 1 ? 'asset' : 'assets'}
            </span>
          )}
        </div>
      </header>

      {watchlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No starred assets yet</p>
          <p style={{ fontSize: '14px' }}>Click the star icon on any asset to add it to your watchlist</p>
        </div>
      ) : (
        <AssetTable prices={watchlist} />
      )}
    </div>
  )
}

export default Watchlist
