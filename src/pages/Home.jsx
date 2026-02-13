import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

function Home() {
    const { user, logout } = useAuth();

    // Default to a placeholder if user is null (though protected route should prevent this)
    const email = user?.email || 'magnusvig@toolbase.ai';

    return (
        <div className="home-container">
            <header className="account-topbar">
                <div className="brand">encryptSIM</div>
                <nav className="account-nav">
                    <div>My encryptSIM</div>
                    <div>Buy</div>
                    <div className="avatar">U</div>
                </nav>
            </header>

            <main className="home-wrap">

                <aside className="account-sidebar">
                    <a href="#">Dashboard</a>
                    <a href="#">Orders</a>
                    <a href="#">Address</a>
                    <a href="#">Account details</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Log out</a>
                </aside>

                <section className="account-content">
                    <h1>My account</h1>

                    <p>
                        Hello <strong>{email}</strong>
                        (not {email}?
                        <span className="accent" onClick={logout} style={{ cursor: 'pointer', marginLeft: '5px' }}>Log out</span>)
                    </p>

                    <p>
                        From your account dashboard you can view your
                        <span className="accent"> recent orders</span>,
                        manage your
                        <span className="accent"> billing address</span>,
                        and
                        <span className="accent"> edit your password and account details</span>.
                    </p>
                </section>

            </main>
        </div>
    );
}

export default Home;
