import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PublicLayout from '../components/PublicLayout';
import './Home.css'; // Reusing Home styles for header/layout

function About() {
    const { user } = useAuth();

    const content = (
        <div style={{ padding: '0 2rem', color: '#e6e6e6' }}>
            <h1>About LibertyRoam</h1>
            <p>Global connectivity made simple.</p>
        </div>
    );

    return (
        <React.Fragment>
            <header className="top">
                <div className="brand">libertyroam</div>
            </header>
            <div className="wrap">
                {user ? (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {content}
                    </div>
                ) : (
                    <PublicLayout>
                        {content}
                    </PublicLayout>
                )}
            </div>
        </React.Fragment>
    );
}

export default About;
