import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const TwitterInfo = () => {
    const { user } = useAuth()
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [loadingFollowers, setLoadingFollowers] = useState(false)
    const [loadingFollowing, setLoadingFollowing] = useState(false)
    const [errorFollowers, setErrorFollowers] = useState(null)
    const [errorFollowing, setErrorFollowing] = useState(null)
    const [activeTab, setActiveTab] = useState('followers') // 'followers' or 'following'

    useEffect(() => {
        const fetchFollowers = async () => {
            if (user && user.isXUser && user.id) {
                setLoadingFollowers(true)
                try {
                    const response = await fetch(`https://api.mcaps.com/x/followers/${user.id}`)
                    if (!response.ok) {
                        throw new Error('Failed to fetch followers')
                    }
                    const data = await response.json()
                    setFollowers(data.data || [])
                } catch (err) {
                    console.error("Error fetching followers:", err)
                    setErrorFollowers(err.message)
                } finally {
                    setLoadingFollowers(false)
                }
            }
        }

        const fetchFollowing = async () => {
            if (user && user.isXUser && user.id) {
                setLoadingFollowing(true)
                try {
                    const response = await fetch(`https://api.mcaps.com/x/following/${user.id}`)
                    if (!response.ok) {
                        throw new Error('Failed to fetch following')
                    }
                    const data = await response.json()
                    setFollowing(data.data || [])
                } catch (err) {
                    console.error("Error fetching following:", err)
                    setErrorFollowing(err.message)
                } finally {
                    setLoadingFollowing(false)
                }
            }
        }

        if (user && user.isXUser) {
            fetchFollowers()
            fetchFollowing()
        }
    }, [user])

    const UserList = ({ users, loading, error, emptyMessage }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
        if (!users || users.length === 0) return <p>{emptyMessage}</p>

        return (
            <div>
                <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                    Showing {users.length} most recent
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                    {users.map(u => (
                        <li key={u.id} style={{
                            padding: '10px',
                            borderBottom: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: 'white',
                            marginBottom: '5px',
                            borderRadius: '4px'
                        }}>
                            {u.profile_image_url &&
                                <img
                                    src={u.profile_image_url}
                                    alt={u.name}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            }
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{u.name}</div>
                                <div style={{ color: '#536471', fontSize: '14px' }}>@{u.username}</div>
                                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                    {u.public_metrics?.followers_count?.toLocaleString()} followers
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

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

                        <div style={{ marginTop: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px', display: 'flex', gap: '20px' }}>
                            <button
                                onClick={() => setActiveTab('followers')}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === 'followers' ? '2px solid #1DA1F2' : 'none',
                                    fontWeight: activeTab === 'followers' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    padding: '5px 0'
                                }}
                            >
                                Followers
                            </button>
                            <button
                                onClick={() => setActiveTab('following')}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === 'following' ? '2px solid #1DA1F2' : 'none',
                                    fontWeight: activeTab === 'following' ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    padding: '5px 0'
                                }}
                            >
                                Following
                            </button>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            {activeTab === 'followers' ? (
                                <UserList
                                    users={followers}
                                    loading={loadingFollowers}
                                    error={errorFollowers}
                                    emptyMessage="No followers found."
                                />
                            ) : (
                                <UserList
                                    users={following}
                                    loading={loadingFollowing}
                                    error={errorFollowing}
                                    emptyMessage="Not following anyone yet."
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No X account connected.</p>
                )}
            </div>
        </div>
    )
}

export default TwitterInfo
