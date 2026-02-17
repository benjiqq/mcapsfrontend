import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPackages } from '../api';

const Packages = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getPackages(100);
            setPackages(response.data || []);
        } catch (err) {
            setError('Failed to fetch packages. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOrder = (pkg) => {
        navigate(`/admin/submit-order?packageId=${pkg.id}`);
    };

    return (
        <div className="container py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="display-5 fw-bold text-light mb-1">Available Packages</h1>
                    <p className="text-secondary">View and order eSIM packages</p>
                </div>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={fetchPackages}
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
                                <th>Operator</th>
                                <th>Title</th>
                                <th>Data</th>
                                <th>Validity</th>
                                <th>Price</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {isLoading && packages.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : packages.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-secondary">
                                        No packages found.
                                    </td>
                                </tr>
                            ) : (
                                packages.map((pkg) => (
                                    <tr key={pkg.id} className="align-middle">
                                        <td>
                                            <code className="text-info">{pkg.id}</code>
                                        </td>
                                        <td>
                                            <div className="text-light">{pkg.operator || 'N/A'}</div>
                                        </td>
                                        <td>
                                            <div className="fw-medium text-light">{pkg.title || 'Unknown'}</div>
                                        </td>
                                        <td>
                                            <span className="badge bg-secondary bg-opacity-25 text-secondary-emphasis border border-secondary border-opacity-25">
                                                {pkg.data || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">
                                            {pkg.validity || 'N/A'}
                                        </td>
                                        <td className="text-light fw-bold">
                                            ${pkg.price?.toFixed(2) || '0.00'}
                                        </td>
                                        <td className="text-end">
                                            <button
                                                className="btn btn-primary btn-sm px-4 rounded-pill"
                                                onClick={() => handleOrder(pkg)}
                                            >
                                                Order
                                            </button>
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

export default Packages;
