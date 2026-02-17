import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SubmitOrder.css';

const SubmitOrder = () => {
    const location = useLocation();
    const [packageId, setPackageId] = useState('kallur-digital-7days-1gb');
    const [quantity, setQuantity] = useState('1');
    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pkgId = params.get('packageId');
        if (pkgId) {
            setPackageId(pkgId);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        const formData = new URLSearchParams();
        formData.append('package_id', packageId);
        formData.append('quantity', quantity);
        if (brandName) formData.append('brand_settings_name', brandName);
        if (description) formData.append('description', description);
        formData.append('type', 'sim');

        try {
            const response = await fetch('http://localhost:9000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to place order');
            }

            setResult(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="submit-order-container">
            <div className="glass-card submit-order-card">
                <h1 className="brand-heading">Place New Order</h1>
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label>Package ID</label>
                        <input
                            type="text"
                            value={packageId}
                            onChange={(e) => setPackageId(e.target.value)}
                            placeholder="e.g., kallur-digital-7days-1gb"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Brand Name (Optional)</label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder="Brand Settings Name"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Order description..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-100"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>

                {error && (
                    <div className="alert alert-error">
                        <span className="icon">⚠️</span>
                        {error}
                    </div>
                )}

                {result && (
                    <div className="alert alert-success">
                        <div className="success-header">
                            <span className="icon">✅</span>
                            <h3>Order Placed Successfully</h3>
                        </div>
                        <div className="result-details">
                            <div className="result-row">
                                <span className="label">Order ID:</span>
                                <span className="value">{result.id || 'N/A'}</span>
                            </div>
                            <div className="result-row">
                                <span className="label">Code:</span>
                                <span className="value">{result.code || 'N/A'}</span>
                            </div>
                            <div className="result-row">
                                <span className="label">Package:</span>
                                <span className="value">{result.package || 'N/A'}</span>
                            </div>
                            <div className="result-row">
                                <span className="label">Status:</span>
                                <span className="value status-pill">{result.status || 'N/A'}</span>
                            </div>
                        </div>

                        {result.sims && result.sims.length > 0 && (
                            <div className="sim-details">
                                <h4>SIM DETAILS</h4>
                                {result.sims.map((sim, index) => (
                                    <div key={index} className="sim-card">
                                        <div className="result-row">
                                            <span className="label">ICCID:</span>
                                            <code className="value">{sim.iccid || 'N/A'}</code>
                                        </div>
                                        <div className="result-row">
                                            <span className="label">LPA:</span>
                                            <code className="value">{sim.lpa || 'N/A'}</code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmitOrder;
