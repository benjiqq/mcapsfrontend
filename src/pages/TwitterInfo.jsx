import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const TwitterInfo = () => {
    const { user } = useAuth()

    return (
        <div style={{ padding: '20px' }}>
            <h1>X Account Info</h1>
            <div style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                maxWidth: '400px'
            }}>
                <h3>Connected Account</h3>
                {user && user.isXUser ? (
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Username:</strong> @{user.username}</p>
                        {/* Add more X info fields here as they become available */}
                    </div>
                ) : (
                    <p>No X account connected.</p>
                )}
            </div>
        </div>
    )
}

export default TwitterInfo
