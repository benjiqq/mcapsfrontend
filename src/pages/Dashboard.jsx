import { useState, useEffect } from 'react'
import PriceTable from '../components/PriceTable'
import './Dashboard.css'

function Dashboard() {
  // State for snapshot and price data
  const [snapshot, setSnapshot] = useState(null)
  const [prices, setPrices] = useState([])
  const [limit, setLimit] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      // Get coins data from the coins table
      const coinsRes = await fetch(`/coins?limit=${limit}`)
      if (!coinsRes.ok) throw new Error(`HTTP ${coinsRes.status}`)
      const coinsData = await coinsRes.json()
      
      if (!coinsData.length) {
        setSnapshot(null)
        setPrices([])
        setError('No coins data available')
        return
      }

      // Set snapshot info (for display purposes)
      setSnapshot({
        id: 'coins',
        created_at: new Date().toISOString(),
        vs_currency: 'usd'
      })

      setPrices(coinsData)
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  // Load data on mount and when limit changes
  useEffect(() => {
    fetchData()
  }, [limit])

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Crypto Coins Database</h1>
        {prices.length > 0 && (
          <span className="muted">
            Showing {prices.length} coins with stored data
          </span>
        )}
      </header>

      <div className="toolbar">
        <button onClick={fetchData} disabled={loading}>
          Refresh
        </button>
        <label>
          Limit{' '}
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) || 100)}
            min="1"
            max="100"
          />
        </label>
        {loading && <span className="loading">Loading...</span>}
        {error && <span className="error">{error}</span>}
      </div>

      <PriceTable prices={prices} />
    </div>
  )
}

export default Dashboard

