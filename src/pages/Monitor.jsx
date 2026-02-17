import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Monitor = () => {
    const { user } = useAuth();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch('http://localhost:9000/balance');
                if (response.ok) {
                    const data = await response.json();
                    const balanceData = data?.data?.balances?.availableBalance;
                    if (balanceData) {
                        setBalance(`${balanceData.amount} ${balanceData.currency || 'USD'}`);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch balance:", error);
            }
        };

        if (user) {
            fetchBalance();
        }
    }, [user]);

    return (
        <div className="container py-5">
            <h1 className="massive-title mb-4">Monitor</h1>

            <div className="row">
                <div className="col-md-6">
                    <div className="card p-4 border-0 shadow-sm" style={{
                        background: 'var(--surface)',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        transition: 'all 0.3s ease'
                    }}>
                        <h4 className="text-muted mb-3 font-weight-normal" style={{ fontSize: '0.9rem' }}>Current Balance</h4>
                        {balance ? (
                            <h3 className="text-white font-weight-bold mb-0">{balance}</h3>
                        ) : (
                            <p className="text-muted">Loading balance...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Monitor;
