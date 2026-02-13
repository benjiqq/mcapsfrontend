import React from 'react';
import { NavLink } from 'react-router-dom';

function PublicSidebar() {
    return (
        <aside className="public-sidebar">
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    end
                >
                    <span className="nav-icon">🏠</span>
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="nav-icon">ℹ️</span>
                    About
                </NavLink>
            </nav>
        </aside>
    );
}

export default PublicSidebar;
