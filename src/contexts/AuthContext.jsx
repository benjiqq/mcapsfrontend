import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children, googleClientId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [idToken, setIdToken] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedIdToken = localStorage.getItem('idToken')
    const storedXUser = localStorage.getItem('x_username')

    if (storedUser && storedIdToken) {
      try {
        setUser(JSON.parse(storedUser))
        setIdToken(storedIdToken)
      } catch (e) {
        console.error('Error parsing stored user:', e)
        localStorage.removeItem('user')
        localStorage.removeItem('idToken')
      }
    } else if (storedXUser) {
      // Mock user for X login if that's the only one we have
      setUser({
        id: localStorage.getItem('x_user_id'),
        name: `@${storedXUser}`,
        username: storedXUser,
        isXUser: true
      })
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const token = credentialResponse.credential
      const parts = token.split('.')
      const payload = JSON.parse(atob(parts[1]))

      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        loginTime: new Date().toISOString(),
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('idToken', token)

      setUser(userData)
      setIdToken(token)

      console.log('User logged in:', userData)
    } catch (error) {
      console.error('Error processing login:', error)
    }
  }

  const handleLoginError = () => {
    console.error('Login failed')
  }

  const handleXLoginSuccess = (username, userId) => {
    const userData = {
      id: userId,
      name: `@${username}`,
      username: username,
      isXUser: true,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem('x_username', username)
    localStorage.setItem('x_user_id', userId)
    localStorage.setItem('user', JSON.stringify(userData))

    setUser(userData)
    console.log('X User logged in:', userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('idToken')
    localStorage.removeItem('x_username')
    localStorage.removeItem('x_user_id')
    setUser(null)
    setIdToken(null)
  }

  const value = {
    user,
    loading,
    idToken,
    handleLoginSuccess,
    handleLoginError,
    handleXLoginSuccess,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

