import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (user) {
            logout();
        } else {
            navigate('/login');
        }
    };

    return (
        <React.Fragment>
            <header className="top">
                <div className="brand">libertyroam</div>
                <button className="login-btn" onClick={handleAuthAction}>
                    {user ? 'Log out' : 'Log in'}
                </button>
            </header>

            <div className="wrap">

                <aside className="leftcard">
                    <h3>Need data?</h3>
                    <p>Stay connected anywhere in the world.</p>
                    <ul>
                        <li>Instant activation</li>
                        <li>Global coverage</li>
                        <li>Pay as you go</li>
                    </ul>
                    <button className="cta">Get Started</button>
                </aside>

                <main className="main">
                    <div className="sub">STORE</div>
                    <h1>Pick your plan</h1>
                    <div className="sub">
                        Browse by country and pay with card, crypto, or credits.
                    </div>

                    <div className="plan">
                        <div>
                            <h3>1GB, 7 days</h3>
                            <div className="meta">HK • 5G — Messaging · Email · Maps · Browsing</div>
                        </div>
                        <div className="price">
                            <div className="discount">-20%</div>
                            <div className="old">$3.08</div>
                            <div className="new">$2.46</div>
                        </div>
                    </div>

                    <div className="plan">
                        <div>
                            <h3>2GB, 15 days</h3>
                            <div className="meta">HK • 5G — Messaging · Email · Maps · Browsing</div>
                        </div>
                        <div className="price">
                            <div className="discount">-20%</div>
                            <div className="old">$5.33</div>
                            <div className="new">$4.26</div>
                        </div>
                    </div>

                    <div className="plan">
                        <div>
                            <h3>3GB, 30 days</h3>
                            <div className="meta">HK • 5G — Messaging · Email · Maps · Browsing</div>
                        </div>
                        <div className="price">
                            <div className="discount">-20%</div>
                            <div className="old">$7.58</div>
                            <div className="new">$6.06</div>
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

export default Home;
