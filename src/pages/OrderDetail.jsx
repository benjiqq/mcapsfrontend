import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../api';

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const fetchOrderDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getOrder(orderId, 'sims,status');
            setOrder(response.data || response); // Airalo API often returns { data: ... }
        } catch (err) {
            setError('Failed to fetch order details. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch (e) {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <div className="container py-5 mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-secondary">Fetching order details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 mt-5">
                <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/orders')}>
                    Back to Orders
                </button>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="container py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <button className="btn btn-link text-decoration-none text-secondary ps-0 mb-2" onClick={() => navigate('/admin/orders')}>
                        <i className="bi bi-chevron-left me-1"></i> Back to Orders
                    </button>
                    <h1 className="display-6 fw-bold text-light mb-1">Order Details</h1>
                    <p className="text-secondary">Order ID: <code className="text-info">{order.id}</code></p>
                </div>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={fetchOrderDetail}
                    disabled={isLoading}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i> Refresh
                </button>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card bg-dark border-secondary border-opacity-25 shadow-sm mb-4">
                        <div className="card-header border-secondary border-opacity-25 bg-transparent">
                            <h5 className="mb-0 text-light">Order Summary</h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-sm-4 text-secondary">Status</div>
                                <div className="col-sm-8">
                                    <span className={`badge rounded-pill ${(order.status?.slug === 'completed' || order.status === 'completed') ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-50' :
                                        'bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-50'
                                        }`}>
                                        {typeof order.status === 'object' ? order.status?.name : (order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : '-')}
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-4 text-secondary">Date</div>
                                <div className="col-sm-8 text-light">{formatDate(order.created_at)}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-4 text-secondary">Price</div>
                                <div className="col-sm-8 text-light">${order.price?.toFixed(2) || '0.00'}</div>
                            </div>
                            <div className="row mb-0">
                                <div className="col-sm-4 text-secondary">Quantity</div>
                                <div className="col-sm-8 text-light">{order.quantity || 1}</div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-dark border-secondary border-opacity-25 shadow-sm">
                        <div className="card-header border-secondary border-opacity-25 bg-transparent">
                            <h5 className="mb-0 text-light">Package Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-sm-4 text-secondary">Package ID</div>
                                <div className="col-sm-8 text-info">{order.package_id}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-4 text-secondary">Title</div>
                                <div className="col-sm-8 text-light">{order.package || 'N/A'}</div>
                            </div>
                            <div className="row mb-0">
                                <div className="col-sm-4 text-secondary">Description</div>
                                <div className="col-sm-8 text-secondary small">{order.description || 'No description provided'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card bg-dark border-secondary border-opacity-25 shadow-sm">
                        <div className="card-header border-secondary border-opacity-25 bg-transparent">
                            <h5 className="mb-0 text-light">SIM Details</h5>
                        </div>
                        <div className="card-body">
                            {order.sims && order.sims.length > 0 ? (
                                order.sims.map((sim, index) => (
                                    <div key={sim.iccid || index} className={index > 0 ? 'mt-4 pt-4 border-top border-secondary border-opacity-25' : ''}>
                                        <div className="mb-2">
                                            <label className="text-secondary small d-block mb-1">ICCID</label>
                                            <code className="text-warning d-block p-2 bg-black bg-opacity-25 rounded border border-secondary border-opacity-25">{sim.iccid}</code>
                                        </div>
                                        <div className="mb-2">
                                            <label className="text-secondary small d-block mb-1">LPA / Activation Code</label>
                                            <div className="text-light small text-break">{sim.lpa || sim.activation_code || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <label className="text-secondary small d-block mb-1">Status</label>
                                            <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25">
                                                {sim.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-secondary">
                                    <i className="bi bi-info-circle mb-2 d-block fs-4"></i>
                                    No SIM details available yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
