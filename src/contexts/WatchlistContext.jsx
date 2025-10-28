import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  // Load watchlist from localStorage on mount
  // Includes error handling for corrupted data
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('watchlist')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure we have an array
        return Array.isArray(parsed) ? parsed : []
      }
      return []
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error)
      // Clear corrupted data
      localStorage.removeItem('watchlist')
      return []
    }
  })

  // Save to localStorage whenever watchlist changes
  // Includes error handling for quota exceeded
  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist))
    } catch (error) {
      console.error('Error saving watchlist to localStorage:', error)
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please remove some items from your watchlist.')
      }
    }
  }, [watchlist])

  // Add asset to watchlist
  const addToWatchlist = (asset) => {
    if (!watchlist.find(a => a.coin_id === asset.coin_id)) {
      setWatchlist([...watchlist, asset])
    }
  }

  // Remove asset from watchlist
  const removeFromWatchlist = (coinId) => {
    setWatchlist(watchlist.filter(a => a.coin_id !== coinId))
  }

  // Check if asset is in watchlist
  const isInWatchlist = (coinId) => {
    return watchlist.some(a => a.coin_id === coinId)
  }

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }
  return context
}
