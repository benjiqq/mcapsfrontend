import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllAssets } from '../api'
import './Search.css'

function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [assets, setAssets] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Load assets from localStorage or fetch from API
  useEffect(() => {
    const loadAssets = async () => {
      // Try to load from localStorage first
      try {
        const stored = localStorage.getItem('assets')
        console.log('localStorage assets:', stored ? 'found' : 'not found')
        if (stored) {
          const parsed = JSON.parse(stored)
        console.log('Parsed assets:', parsed.length, 'items')
        // Only use localStorage if we have a reasonable amount of data (at least 100 assets)
        if (Array.isArray(parsed) && parsed.length >= 100) {
          console.log('Loaded from localStorage, first asset:', JSON.stringify(parsed[0], null, 2))
          console.log('First asset name:', parsed[0]?.name)
          console.log('First asset symbol:', parsed[0]?.symbol)
          console.log('First asset coin_id:', parsed[0]?.coin_id)
          setAssets(parsed)
          return
        }
        }
      } catch (error) {
        console.error('Error loading assets from localStorage:', error)
      }

      // If no localStorage data or insufficient data, fetch from API
      console.log('Fetching assets from API...')
      try {
        setLoading(true)
        const fetchedAssets = await fetchAllAssets()
        console.log('Fetched assets:', fetchedAssets.length, 'items')
        console.log('First fetched asset:', fetchedAssets[0])
        setAssets(fetchedAssets)
        // Store in localStorage for future use
        localStorage.setItem('assets', JSON.stringify(fetchedAssets))
      } catch (error) {
        console.error('Error fetching assets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  // Search coins by name, symbol, or coin_id
  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim().toLowerCase()
    
    if (!query) {
      setSearchResults([])
      return
    }

    // Debug: Log assets count
    console.log('Searching through', assets.length, 'assets')
    console.log('Search query:', query)
    console.log('First asset:', assets[0])
    console.log('First asset name lowercased:', (assets[0]?.name || '').toLowerCase())
    console.log('First asset symbol lowercased:', (assets[0]?.symbol || '').toLowerCase())

    // Filter assets by name, symbol, or coin_id
    const results = assets.filter(asset => {
      const name = (asset.name || '').toLowerCase()
      const symbol = (asset.symbol || '').toLowerCase()
      const coinId = (asset.coin_id || '').toLowerCase()
      const matches = name.includes(query) || symbol.includes(query) || coinId.includes(query)
      if (matches) {
        console.log('Match found:', asset.name, 'name:', name, 'symbol:', symbol, 'coinId:', coinId)
      }
      return matches
    })

    console.log('Search results:', results.length, 'matches for query:', query)
    setSearchResults(results)

    // Add search query to history
    const newMessage = {
      id: Date.now(),
      text: searchQuery,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
  }

  // Remove a message from the inbox
  const removeMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Search</h1>
        <p className="page-description">
          Search for cryptocurrencies, analyze data, and manage your queries.
        </p>
      </header>

      {/* Search form */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search for cryptocurrency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
        <div className="debug-info">
          <p>Assets loaded: {assets.length}</p>
          {assets.length > 0 && (
            <p>Sample asset: {assets[0]?.name || 'No name'} ({assets[0]?.symbol || 'No symbol'})</p>
          )}
        </div>
      </div>

      {/* Search results */}
      {searchQuery && searchResults.length === 0 && (
        <div className="no-results">
          <p>No results found for "{searchQuery}"</p>
          <p className="hint">Try searching by name, symbol, or coin ID</p>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="results-section">
          <h2>Search Results ({searchResults.length})</h2>
          <div className="results-list">
            {searchResults.map(asset => (
              <Link 
                key={asset.coin_id || asset.id} 
                to={`/asset/${asset.coin_id}`}
                className="result-item"
              >
                {asset.image && (
                  <img src={asset.image} alt={asset.name} className="result-image" />
                )}
                <div className="result-info">
                  <div className="result-name">{asset.name}</div>
                  <div className="result-symbol">{asset.symbol?.toUpperCase()}</div>
                </div>
                <div className="result-price">
                  ${asset.current_price ? Number(asset.current_price).toLocaleString() : 'N/A'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Inbox with search history */}
      <div className="inbox-section">
        <div className="inbox-header">
          <h2>Search History</h2>
          {messages.length > 0 && (
            <button 
              className="clear-all-button"
              onClick={() => setMessages([])}
            >
              Clear All
            </button>
          )}
        </div>

        {messages.length === 0 ? (
          <div className="empty-inbox">
            <div className="empty-icon">📋</div>
            <p>No search history yet</p>
            <p className="empty-hint">Your searches will appear here</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className="message-item">
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => removeMessage(msg.id)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

