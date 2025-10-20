import './PriceTable.css'

// Format number with proper commas and decimals
function formatNumber(n, digits = 2) {
  if (n === null || n === undefined || isNaN(n)) return 'n/a'
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits })
}

// Format percentage
function formatPercent(n) {
  if (n === null || n === undefined || isNaN(n)) return 'n/a'
  return Number(n).toFixed(2) + '%'
}

// Get CSS class for percentage (positive or negative)
function getPercentClass(n) {
  if (n === null || n === undefined || isNaN(n)) return ''
  return Number(n) >= 0 ? 'pos' : 'neg'
}

// Format date/time
function formatDateTime(dateStr) {
  if (!dateStr) return 'n/a'
  try {
    const date = new Date(dateStr)
    return date.toLocaleString()
  } catch (e) {
    return dateStr
  }
}

function PriceTable({ prices }) {
  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th className="right">Price (USD)</th>
          <th className="right">24h %</th>
          <th className="right">Market Cap</th>
          <th>Platform</th>
          <th className="right">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((coin, index) => (
          <tr key={coin.coin_id || index}>
            <td>{(coin.symbol || '').toUpperCase()}</td>
            <td>{coin.name || ''}</td>
            <td className="right">${formatNumber(coin.current_price, 6)}</td>
            <td className={`right ${getPercentClass(coin.price_change_24h)}`}>
              {formatPercent(coin.price_change_24h)}
            </td>
            <td className="right">${formatNumber(coin.market_cap, 0)}</td>
            <td>{coin.asset_platform_id || 'N/A'}</td>
            <td className="right">{formatDateTime(coin.last_updated)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PriceTable

