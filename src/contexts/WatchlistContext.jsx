import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])
  const [xUserId, setXUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in and load their watchlist
  useEffect(() => {
    const userId = localStorage.getItem('x_user_id')
    setXUserId(userId)
    
    if (userId) {
      // User is logged in - load from backend
      loadWatchlistFromBackend(userId)
    } else {
      // User not logged in - load from localStorage
      loadWatchlistFromLocalStorage()
    }

    // Listen for login events
    const handleLogin = () => {
      const userId = localStorage.getItem('x_user_id')
      setXUserId(userId)
      if (userId) {
        // Sync localStorage watchlist to backend on login
        syncLocalStorageToBackend(userId)
      }
    }

    window.addEventListener('x-user-login', handleLogin)
    
    return () => {
      window.removeEventListener('x-user-login', handleLogin)
    }
  }, [])

  // Load watchlist from backend
  const loadWatchlistFromBackend = async (userId) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/watchlist/${userId}`)
      if (response.ok) {
        const data = await response.json()
        // Backend now returns enriched asset data with all fields including images
        setWatchlist(data.items)
        console.log(`Loaded ${data.items.length} items from backend watchlist`)
      } else {
        console.error('Failed to load watchlist from backend')
        loadWatchlistFromLocalStorage()
      }
    } catch (error) {
      console.error('Error loading watchlist from backend:', error)
      loadWatchlistFromLocalStorage()
    } finally {
      setIsLoading(false)
    }
  }

  // Load watchlist from localStorage (fallback for non-logged-in users)
  const loadWatchlistFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('watchlist')
      if (stored) {
        const parsed = JSON.parse(stored)
        setWatchlist(Array.isArray(parsed) ? parsed : [])
      } else {
        setWatchlist([])
      }
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error)
      localStorage.removeItem('watchlist')
      setWatchlist([])
    } finally {
      setIsLoading(false)
    }
  }

  // Sync localStorage watchlist to backend on login
  const syncLocalStorageToBackend = async (userId) => {
    try {
      const stored = localStorage.getItem('watchlist')
      if (stored) {
        const items = JSON.parse(stored)
        if (Array.isArray(items) && items.length > 0) {
          // Add all items to backend (only coin_id is stored)
          for (const item of items) {
            await fetch(`/watchlist/${userId}/add?coin_id=${item.coin_id}`, {
              method: 'POST'
            })
          }
          console.log(`Synced ${items.length} items from localStorage to backend`)
        }
      }
      // Load fresh watchlist from backend
      await loadWatchlistFromBackend(userId)
    } catch (error) {
      console.error('Error syncing watchlist:', error)
    }
  }

  // Save to localStorage (for non-logged-in users)
  useEffect(() => {
    if (!xUserId) {
      try {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
      } catch (error) {
        console.error('Error saving watchlist to localStorage:', error)
      }
    }
  }, [watchlist, xUserId])

  // Add asset to watchlist
  const addToWatchlist = async (asset) => {
    if (watchlist.find(a => a.coin_id === asset.coin_id)) {
      return // Already in watchlist
    }

    // Optimistically update UI
    setWatchlist([...watchlist, asset])

    if (xUserId) {
      // User logged in - save to backend (only coin_id is stored)
      try {
        const response = await fetch(
          `/watchlist/${xUserId}/add?coin_id=${asset.coin_id}`,
          { method: 'POST' }
        )
        
        if (!response.ok) {
          console.error('Failed to add to backend watchlist')
          // Revert optimistic update
          setWatchlist(prev => prev.filter(a => a.coin_id !== asset.coin_id))
        } else {
          console.log(`Added ${asset.coin_id} to backend watchlist`)
        }
      } catch (error) {
        console.error('Error adding to backend watchlist:', error)
        // Revert optimistic update
        setWatchlist(prev => prev.filter(a => a.coin_id !== asset.coin_id))
      }
    }
    // For non-logged-in users, localStorage is updated via useEffect
  }

  // Remove asset from watchlist
  const removeFromWatchlist = async (coinId) => {
    // Optimistically update UI
    setWatchlist(prev => prev.filter(a => a.coin_id !== coinId))

    if (xUserId) {
      // User logged in - remove from backend
      try {
        const response = await fetch(`/watchlist/${xUserId}/remove/${coinId}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          console.error('Failed to remove from backend watchlist')
          // Revert optimistic update
          await loadWatchlistFromBackend(xUserId)
        } else {
          console.log(`Removed ${coinId} from backend watchlist`)
        }
      } catch (error) {
        console.error('Error removing from backend watchlist:', error)
        // Revert optimistic update
        await loadWatchlistFromBackend(xUserId)
      }
    }
    // For non-logged-in users, localStorage is updated via useEffect
  }

  // Check if asset is in watchlist
  const isInWatchlist = (coinId) => {
    return watchlist.some(a => a.coin_id === coinId)
  }

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    isLoading,
    isLoggedIn: !!xUserId
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
