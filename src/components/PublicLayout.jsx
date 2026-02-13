import React from 'react';
import PublicSidebar from './PublicSidebar';
import './PublicLayout.css';

function PublicLayout({ children }) {
    return (
        <div className="public-layout">
            <PublicSidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default PublicLayout;
