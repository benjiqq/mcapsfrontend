import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './BuyPlanModal.css';

const BuyPlanModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="buy-plan-modal-overlay" onClick={onClose}>
            <div className="buy-plan-modal" onClick={(e) => e.stopPropagation()}>
                <div className="close" onClick={onClose}>×</div>

                <h1>Buy plan</h1>
                <div className="sub">Review plan details and select payment method.</div>

                <div className="card">
                    <div className="discount">-20%</div>

                    <div>
                        <div className="plan-title">1GB, 7 days</div>
                        <div className="meta">EUROPE+ · 5G</div>
                        <div className="meta">Best for: Messaging · Email · Maps · Browsing</div>
                    </div>

                    <div className="price">
                        <div className="old">$2.39</div>
                        <div className="new">$1.91</div>
                        <div className="ubi">153 UBI</div>
                    </div>
                </div>

                <div className="section-title">BEST FOR</div>

                <div className="grid">
                    <div className="item ok">Messaging</div>
                    <div className="item ok">Email</div>
                    <div className="item ok">Google Maps</div>
                    <div className="item ok">Browsing</div>
                    <div className="item no">Social apps</div>
                    <div className="item no">Audio streaming</div>
                    <div className="item no">Video streaming</div>
                </div>

                {!user ? (
                    <>
                        <div className="warn">Please log in to purchase this plan</div>
                        <button className="btn" onClick={handleLogin}>Log in to continue</button>
                    </>
                ) : (
                    <button className="btn">Purchase Plan</button>
                )}
            </div>
        </div>
    );
};

export default BuyPlanModal;
