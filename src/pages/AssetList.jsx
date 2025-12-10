import { useState, useEffect } from 'react'
import AssetTable from '../components/AssetTable'
import { useStats } from '../contexts/StatsContext'
import { fetchAssetsData } from '../api'
import './AssetList.css'

function AssetList() {
  // State for snapshot and price data
  const [snapshot, setSnapshot] = useState(null)
  const [prices, setPrices] = useState([])
  const { totalCount, setTotalCount } = useStats()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAssetsData()
      
      // Update total count
      setTotalCount(data.count)
      
      // Update snapshot and prices
      setSnapshot(data.snapshot)
      setPrices(data.assets)
    } catch (e) {
      setError(e.message || String(e))
      setSnapshot(null)
      setPrices([])
    } finally {
      setLoading(false)
    }
  }

  // Load data on mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="assetlist">
      <header className="page-header">
        <div>
          <h1>Crypto Coins Database</h1>
          {totalCount > 0 && (
            <span className="muted">
              Total Assets: {totalCount}
            </span>
          )}
        </div>
      </header>

      <div className="toolbar">
        <button onClick={fetchData} disabled={loading}>
          Refresh
        </button>
        {loading && <span className="loading">Loading...</span>}
        {error && <span className="error">{error}</span>}
      </div>

      <AssetTable prices={prices} />
    </div>
  )
}

export default AssetList
