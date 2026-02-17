import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getOrders(50, 1, 'sims,status');
            setOrders(response.data || []);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
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

    return (
        <div className="container py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="display-5 fw-bold text-light mb-1">Order History</h1>
                    <p className="text-secondary">View and manage your past eSIM orders</p>
                </div>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={fetchOrders}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Refreshing...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Refresh
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}

            <div className="card bg-dark border-secondary border-opacity-25 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                        <thead className="table-light text-dark">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Package</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>ICCID</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {isLoading && orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-secondary">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="align-middle">
                                        <td>
                                            <Link to={`/admin/orders/${order.id}`} className="text-decoration-none">
                                                <code className="text-info">{order.id}</code>
                                            </Link>
                                        </td>
                                        <td className="text-secondary small">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td>
                                            <div className="fw-medium text-light">{order.package || order.package_id || 'Unknown'}</div>
                                            {order.description && (
                                                <div className="small text-secondary">{order.description}</div>
                                            )}
                                        </td>
                                        <td className="text-light">
                                            ${order.price?.toFixed(2) || '0.00'}
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill ${(order.status?.slug === 'completed' || order.status === 'completed') ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-50' :
                                                    'bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-50'
                                                }`}>
                                                {typeof order.status === 'object' ? order.status?.name : (order.status || '-')}
                                            </span>
                                        </td>
                                        <td>
                                            {order.sims && order.sims.length > 0 ? (
                                                <code className="text-warning small text-break">{order.sims[0].iccid}</code>
                                            ) : (
                                                <span className="text-secondary">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
