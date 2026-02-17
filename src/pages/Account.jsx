import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyOrders } from '../api';
import './Account.css';

const Account = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getMyOrders();
            setOrders(response.data || []);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="account-page-wrapper">
            <div className="account-container">
                <header className="account-header">
                    <h1 className="brand-heading">My Orders</h1>
                    <p className="subtitle">View and manage your eSIM subscriptions</p>
                </header>

                {error && (
                    <div className="alert alert-error">
                        <span className="icon">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="orders-list">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading your orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="empty-state card glass-card">
                            <span className="icon">📦</span>
                            <p>No orders found. Start your journey with a new eSIM!</p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="order-card card glass-card">
                                <div className="order-main">
                                    <div className="order-info">
                                        <h3>{order.package || order.package_id}</h3>
                                        <p className="order-id">Order ID: #{order.id}</p>
                                    </div>
                                    <div className="order-status-price">
                                        <span className={`status-pill ${order.status === 'completed' ? 'status-completed' : 'status-pending'}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                        <div className="price">${order.price?.toFixed(2) || '0.00'}</div>
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <div className="date">Placed on {new Date(order.created_at).toLocaleDateString()}</div>
                                    {order.sims && order.sims.length > 0 && (
                                        <div className="iccid">ICCID: <code>{order.sims[0].iccid}</code></div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
