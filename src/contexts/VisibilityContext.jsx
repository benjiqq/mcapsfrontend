import { createContext, useState, useContext, useEffect } from 'react'
import { datapoints } from '../pages/datapoints'

// Key for localStorage
const VISIBILITY_STORAGE_KEY = 'dashboard_visibility_settings'

// Create the visibility context
const VisibilityContext = createContext()

// Get initial visibility settings from localStorage or use defaults
const getInitialVisibility = () => {
  try {
    const stored = localStorage.getItem(VISIBILITY_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load visibility settings from localStorage:', error)
  }
  
  // Default: all datapoints visible
  return datapoints.reduce((acc, dp) => {
    acc[dp.id] = true
    return acc
  }, {})
}

// Provider component that wraps the app
export function VisibilityProvider({ children }) {
  const [visibleDatapoints, setVisibleDatapoints] = useState(getInitialVisibility())

  // Save to localStorage whenever visibility changes
  useEffect(() => {
    try {
      localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(visibleDatapoints))
    } catch (error) {
      console.error('Failed to save visibility settings to localStorage:', error)
    }
  }, [visibleDatapoints])

  // Toggle visibility for a datapoint
  const toggleVisibility = (datapointId) => {
    setVisibleDatapoints(prev => ({
      ...prev,
      [datapointId]: !prev[datapointId]
    }))
  }

  // Get all visible datapoints
  const getVisibleDatapoints = () => {
    return datapoints.filter(dp => visibleDatapoints[dp.id])
  }

  return (
    <VisibilityContext.Provider
      value={{
        visibleDatapoints,
        toggleVisibility,
        getVisibleDatapoints
      }}
    >
      {children}
    </VisibilityContext.Provider>
  )
}

// Custom hook to use the visibility context
export function useVisibility() {
  const context = useContext(VisibilityContext)
  if (!context) {
    throw new Error('useVisibility must be used within VisibilityProvider')
  }
  return context
}

