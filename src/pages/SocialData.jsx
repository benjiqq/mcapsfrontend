import { useState, useEffect } from 'react'
import './SocialData.css'

function SocialData() {
  const [xUser, setXUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load X user info from localStorage
  useEffect(() => {
    const username = localStorage.getItem('x_username')
    const userId = localStorage.getItem('x_user_id')
    
    if (username && userId) {
      setXUser({ username, userId })
      fetchUserData(userId)
    }

    // Listen for login events to update the display
    const handleLogin = () => {
      const username = localStorage.getItem('x_username')
      const userId = localStorage.getItem('x_user_id')
      if (username && userId) {
        setXUser({ username, userId })
        fetchUserData(userId)
      }
    }

    window.addEventListener('x-user-login', handleLogin)
    
    return () => {
      window.removeEventListener('x-user-login', handleLogin)
    }
  }, [])

  // Fetch user details and timeline from backend
  const fetchUserData = async (userId) => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch user details (followers, etc)
      const userResponse = await fetch(`/x/user/${userId}`)
      
      // Handle 401 - token expired or backend restarted
      if (userResponse.status === 401) {
        setError('Session expired. Please log out and log back in with X.')
        setLoading(false)
        return
      }
      
      // Handle 429 - rate limit
      if (userResponse.status === 429) {
        setError('Twitter API rate limit reached. Please wait 10-15 minutes and try again.')
        setLoading(false)
        return
      }
      
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUserDetails(userData.data)
      } else {
        throw new Error('Failed to fetch user details')
      }

      // Fetch timeline
      const timelineResponse = await fetch(`/x/timeline/${userId}?max_results=10`)
      
      if (timelineResponse.status === 401) {
        setError('Session expired. Please log out and log back in with X.')
        setLoading(false)
        return
      }
      
      if (timelineResponse.status === 429) {
        setError('Twitter API rate limit reached. Please wait 10-15 minutes and try again.')
        setLoading(false)
        return
      }
      
      if (timelineResponse.ok) {
        const timelineData = await timelineResponse.json()
        setTimeline(timelineData.data || [])
      }
    } catch (err) {
      console.error('Error fetching X data:', err)
      setError('Failed to load social data. Please try refreshing the page.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="social-data-page">
      <div className="social-header">
        <h1>Social Data</h1>
        <p className="social-subtitle">View your connected social media accounts</p>
      </div>

      <div className="social-content">
        {xUser ? (
          <div className="social-section">
            <div className="social-section-header">
              <span className="social-icon">𝕏</span>
              <h2>X (Twitter) Account</h2>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your X data...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <div className="error-icon">
                  {error.includes('rate limit') ? '⏱️' : '⚠️'}
                </div>
                <p>{error}</p>
                {error.includes('Session expired') && (
                  <button 
                    onClick={() => {
                      localStorage.removeItem('x_username')
                      localStorage.removeItem('x_user_id')
                      window.location.reload()
                    }}
                    className="error-action-button"
                  >
                    Clear Session
                  </button>
                )}
                {error.includes('rate limit') && (
                  <div className="rate-limit-info">
                    <p>Twitter limits API requests to prevent abuse. Your limit will reset in about 15 minutes.</p>
                    <button 
                      onClick={() => fetchUserData(xUser.userId)}
                      className="error-action-button"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="social-card">
                  <div className="social-card-content">
                    <div className="info-row">
                      <span className="info-label">Username</span>
                      <span className="info-value">@{xUser.username}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">User ID</span>
                      <span className="info-value">{xUser.userId}</span>
                    </div>
                    
                    {userDetails && (
                      <>
                        <div className="info-row">
                          <span className="info-label">Followers</span>
                          <span className="info-value">
                            {userDetails.public_metrics?.followers_count?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Following</span>
                          <span className="info-value">
                            {userDetails.public_metrics?.following_count?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Tweets</span>
                          <span className="info-value">
                            {userDetails.public_metrics?.tweet_count?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Account Created</span>
                          <span className="info-value">
                            {new Date(userDetails.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="info-row">
                      <span className="info-label">Status</span>
                      <span className="info-value status-connected">
                        <span className="status-dot"></span>
                        Connected
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Profile URL</span>
                      <a 
                        href={`https://twitter.com/${xUser.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-link"
                      >
                        twitter.com/{xUser.username}
                      </a>
                    </div>
                  </div>

                  {userDetails?.description && (
                    <div className="social-card-footer">
                      <div className="footer-note">
                        <span className="note-icon">📝</span>
                        <span className="note-text">{userDetails.description}</span>
                      </div>
                    </div>
                  )}
                </div>

                {timeline.length > 0 && (
                  <div className="timeline-section">
                    <h3>Recent Tweets</h3>
                    <div className="timeline-list">
                      {timeline.map((tweet) => (
                        <div key={tweet.id} className="tweet-card">
                          <div className="tweet-text">{tweet.text}</div>
                          <div className="tweet-footer">
                            <span className="tweet-date">
                              {new Date(tweet.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {tweet.public_metrics && (
                              <div className="tweet-metrics">
                                <span className="metric">
                                  ❤️ {tweet.public_metrics.like_count}
                                </span>
                                <span className="metric">
                                  🔁 {tweet.public_metrics.retweet_count}
                                </span>
                                <span className="metric">
                                  💬 {tweet.public_metrics.reply_count}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="social-empty-state">
            <div className="empty-state-icon">🔌</div>
            <h2>No Social Accounts Connected</h2>
            <p>Connect your X (Twitter) account to access social data features</p>
            <div className="empty-state-help">
              <p>Go to the sidebar and click "Login with X" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialData

