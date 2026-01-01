import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'
import { datapoints } from './datapoints'
import { useVisibility } from '../contexts/VisibilityContext'
import './Settings.css'

function Settings() {
  // Get visibility context
  const { visibleDatapoints, toggleVisibility } = useVisibility()

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 120
      },
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        size: 80
      },
      {
        accessorKey: 'source',
        header: 'Source',
        size: 120
      },
      {
        accessorKey: 'sourceKey',
        header: 'Source Key',
        size: 100
      },
      {
        accessorKey: 'coinId',
        header: 'Coin ID',
        size: 120
      },
      {
        id: 'show',
        header: 'Show in Dashboard',
        size: 140,
        cell: (info) => (
          <input
            type="checkbox"
            checked={visibleDatapoints[info.row.original.id] || false}
            onChange={() => toggleVisibility(info.row.original.id)}
            className="visibility-checkbox"
          />
        )
      }
    ],
    [visibleDatapoints]
  )

  // Create table instance
  const table = useReactTable({
    data: datapoints,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-content">
          <div className="datapoints-section">
            <h2>Datapoints Configuration</h2>
            <table className="datapoints-table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-info">
              Total datapoints: {datapoints.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

