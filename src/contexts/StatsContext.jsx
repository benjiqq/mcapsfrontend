import { createContext, useContext, useState } from 'react'

const StatsContext = createContext()

export function StatsProvider({ children }) {
  const [totalCount, setTotalCount] = useState(0)

  const value = {
    totalCount,
    setTotalCount
  }

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within StatsProvider')
  }
  return context
}
