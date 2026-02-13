import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './BuyPlanModal.css';

const BuyPlanModal = ({ isOpen, onClose, selectedPackage }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!isOpen || !selectedPackage) return null;

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="buy-plan-modal-overlay" onClick={onClose}>
            <div className="buy-plan-modal" onClick={(e) => e.stopPropagation()}>
                <div className="close" onClick={onClose}>×</div>

                <h1>Buy plan</h1>
                <div className="sub">Review plan details and select payment method.</div>

                <div className="card" style={{ borderLeft: selectedPackage.gradient_start ? `6px solid ${selectedPackage.gradient_start}` : 'none' }}>
                    <div className="d-flex gap-4 align-items-center mb-0 w-100">
                        {selectedPackage.operator_image && (
                            <img
                                src={selectedPackage.operator_image.url}
                                alt={selectedPackage.operator_title}
                                className="operator-logo"
                                style={{ width: '64px', height: '64px' }}
                            />
                        )}
                        <div className="flex-grow-1">
                            <div className="plan-title">{selectedPackage.title}</div>
                            <div className="meta">{selectedPackage.country_title} ({selectedPackage.country_code}) • {selectedPackage.type.toUpperCase()}</div>
                        </div>
                        <div className="price">
                            <div className="new">${selectedPackage.price}</div>
                            <div className="ubi">+{Math.round(selectedPackage.price * 10)} LIB</div>
                        </div>
                    </div>
                </div>

                <div className="section-title">NETWORKS</div>
                <div className="mb-4">
                    {selectedPackage.networks && selectedPackage.networks.split(', ').map((net, i) => (
                        <span key={i} className="network-badge">{net}</span>
                    )) || <span className="network-badge">Standard Networks</span>}
                </div>

                <div className="section-title">PLAN FEATURES</div>
                <div className="grid">
                    {selectedPackage.info && selectedPackage.info.map((item, i) => (
                        <div key={i} className="item ok">{item}</div>
                    ))}
                    {!selectedPackage.info && (
                        <>
                            <div className="item ok">Data Only</div>
                            <div className="item ok">High Speed</div>
                        </>
                    )}
                </div>

                {!user ? (
                    <div className="d-flex flex-column gap-3">
                        <div className="warn">Please log in to purchase this plan</div>
                        <button className="btn" onClick={handleLogin}>Log in to continue</button>
                    </div>
                ) : (
                    <button className="btn">Purchase Plan</button>
                )}
            </div>
        </div>
    );
};

export default BuyPlanModal;
