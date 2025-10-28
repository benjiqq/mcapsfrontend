import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import './AssetTable.css'

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

function AssetTable({ prices }) {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  // Store assets in localStorage whenever prices prop changes
  useEffect(() => {
    if (prices && prices.length > 0) {
      try {
        localStorage.setItem('assets', JSON.stringify(prices))
      } catch (error) {
        console.error('Error saving assets to localStorage:', error)
        // Handle quota exceeded error
        if (error.name === 'QuotaExceededError') {
          console.warn('Storage quota exceeded. Assets data is too large.')
        }
      }
    }
  }, [prices])

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'star',
        header: '',
        cell: ({ row }) => {
          const asset = row.original
          const isStarred = isInWatchlist(asset.coin_id)
          return (
            <button
              className={`star-button ${isStarred ? 'starred' : ''}`}
              onClick={() => {
                if (isStarred) {
                  removeFromWatchlist(asset.coin_id)
                } else {
                  addToWatchlist(asset)
                }
              }}
            >
              ★
            </button>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'market_cap_rank',
        header: 'Rank',
        meta: { className: 'right' }
      },
      {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => (
          row.original.image ? (
            <img src={row.original.image} alt={row.original.name || row.original.symbol} className="coin-image" />
          ) : (
            'N/A'
          )
        ),
        enableSorting: false
      },
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: ({ getValue }) => ((getValue() || '').toUpperCase())
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <Link to={`/asset/${row.original.coin_id}`} className="asset-name-link">
            {row.original.name}
          </Link>
        )
      },
      {
        accessorKey: 'current_price',
        header: 'Price (USD)',
        cell: ({ getValue }) => '$' + formatNumber(getValue(), 6),
        meta: { className: 'right' }
      },
      {
        accessorKey: 'price_change_percentage_24h',
        header: '24h %',
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            <span className={getPercentClass(value)}>
              {formatPercent(value)}
            </span>
          )
        },
        meta: { className: 'right' }
      },
      {
        accessorKey: 'market_cap',
        header: 'Market Cap',
        cell: ({ getValue }) => '$' + formatNumber(getValue(), 0),
        meta: { className: 'right' }
      },
      {
        accessorKey: 'last_updated',
        header: 'Last Updated',
        cell: ({ getValue }) => formatDateTime(getValue()),
        meta: { className: 'right' }
      },
      {
        accessorKey: 'coin_id',
        header: 'Coingecko',
        cell: ({ getValue }) => (
          getValue() ? (
            <a href={`https://www.coingecko.com/en/coins/${getValue()}`} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          ) : (
            'N/A'
          )
        ),
        enableSorting: false
      }
    ],
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  )

  // Create table instance
  const table = useReactTable({
    data: prices,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
    <table className="price-table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th 
                key={header.id}
                className={header.column.columnDef.meta?.className || ''}
                style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <span>
                      {{
                        asc: ' ▲',
                        desc: ' ▼'
                      }[header.column.getIsSorted()] ?? ' ⬍'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={cell.column.columnDef.meta?.className || ''}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      <div className="pagination-info">
        Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        )}{' '}
        of {table.getFilteredRowModel().rows.length} results
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
      <div className="pagination-page-size">
        <label>
          Show{' '}
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          {' '}entries
        </label>
      </div>
    </div>
    </>
  )
}

export default AssetTable

