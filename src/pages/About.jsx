import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PublicLayout from '../components/PublicLayout';
import './Home.css'; // Reusing Home styles for header/layout

function About() {
    return (
        <div className="wrap" style={{ marginTop: '4rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', color: '#e6e6e6' }}>
                <h1>About</h1>
                <p>Global connectivity made simple.</p>
            </div>
        </div>
    );
}

export default About;
