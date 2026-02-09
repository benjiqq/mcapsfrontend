import React from 'react'
import './Login.css'

const TwitterAuth = () => {
    const handleTwitterLogin = () => {
        // Redirect to backend OAuth login endpoint
        window.location.href = 'https://api.mcaps.com/auth/login'
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Connect to X</h1>
                    <p>Link your X (Twitter) account to access personalized features</p>
                </div>

                <div className="login-content" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <button
                        onClick={handleTwitterLogin}
                        style={{
                            backgroundColor: '#1DA1F2',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a91da'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1DA1F2'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        Authorize X App
                    </button>
                </div>

                <div className="login-footer">
                    <p>You will be redirected to X to authorize the application</p>
                </div>
            </div>
        </div>
    )
}

export default TwitterAuth
