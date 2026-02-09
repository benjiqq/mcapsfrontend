import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const TwitterInfo = () => {
    const { user } = useAuth()
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFollowers = async () => {
            if (user && user.isXUser && user.id) {
                setLoading(true)
                try {
                    const response = await fetch(`https://api.mcaps.com/x/followers/${user.id}`)
                    if (!response.ok) {
                        throw new Error('Failed to fetch followers')
                    }
                    const data = await response.json()
                    setFollowers(data.data || [])
                } catch (err) {
                    console.error("Error fetching followers:", err)
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchFollowers()
    }, [user])

    return (
        <div style={{ padding: '20px' }}>
            <h1>X Account Info</h1>
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                maxWidth: '600px'
            }}>
                <h3>Connected Account</h3>
                {user && user.isXUser ? (
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Username:</strong> @{user.username}</p>

                        <h4 style={{ marginTop: '20px' }}>Recent Followers</h4>
                        {loading && <p>Loading followers...</p>}
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                        {!loading && !error && (
                            <div>
                                <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                                    Showing {followers.length} most recent followers
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                                    {followers.map(follower => (
                                        <li key={follower.id} style={{
                                            padding: '10px',
                                            borderBottom: '1px solid #ddd',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            backgroundColor: 'white',
                                            marginBottom: '5px',
                                            borderRadius: '4px'
                                        }}>
                                            {follower.profile_image_url &&
                                                <img
                                                    src={follower.profile_image_url}
                                                    alt={follower.name}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                />
                                            }
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{follower.name}</div>
                                                <div style={{ color: '#536471', fontSize: '14px' }}>@{follower.username}</div>
                                                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                                    {follower.public_metrics?.followers_count?.toLocaleString()} followers
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {followers.length === 0 && <p>No followers found.</p>}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>No X account connected.</p>
                )}
            </div>
        </div>
    )
}

export default TwitterInfo
