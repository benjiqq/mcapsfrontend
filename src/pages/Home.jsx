import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import BuyPlanModal from '../components/BuyPlanModal';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleAuthAction = () => {
        if (user) {
            logout();
        } else {
            navigate('/login');
        }
    };

    const handleOpenModal = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchPackages = async () => {
            try {
                // Determine if we are running locally to decide on the API URL or use the proxy
                // For now, hardcoding the import from api.js which uses localhost:8000
                const { getPackages } = await import('../api');
                const data = await getPackages(10);

                // Flatten the nested structure: data -> countries -> operators -> packages
                const flattenedPackages = [];
                if (data && data.data) {
                    data.data.forEach(country => {
                        country.operators.forEach(operator => {
                            operator.packages.forEach(pkg => {
                                flattenedPackages.push({
                                    ...pkg,
                                    country_code: country.country_code,
                                    country_title: country.title,
                                    operator_title: operator.title,
                                    operator_type: operator.type,
                                    operator_image: operator.image,
                                    gradient_start: operator.gradient_start,
                                    gradient_end: operator.gradient_end,
                                    other_info: operator.other_info,
                                    info: operator.info,
                                    networks: operator.coverages.flatMap(c => c.networks.map(n => n.name)).join(', ')
                                });
                            });
                        });
                    });
                }
                setPackages(flattenedPackages);
            } catch (error) {
                console.error("Failed to load packages", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Content of the home page (Plans)
    const homeContent = (
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-lg-10">
                    <div className="badge bg-primary mb-3 py-2 px-3 rounded-pill" style={{ letterSpacing: '2px', fontWeight: '800' }}>STORE</div>
                    <h1 className="massive-title mb-4">Pick your plan</h1>
                    <p className="lead text-white mb-5" style={{ fontSize: '1.4rem', fontWeight: '500', opacity: 0.9 }}>
                        Browse by country and pay with card, crypto, or credits.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border text-primary" style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.4rem' }} role="status">
                        <span className="visually-hidden">Loading plans...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {packages.map((pkg, index) => (
                        <div className="col-md-6" key={pkg.id || index}>
                            <div
                                className="plan-card"
                                onClick={() => handleOpenModal(pkg)}
                                style={{
                                    borderLeft: pkg.gradient_start ? `6px solid ${pkg.gradient_start}` : 'none'
                                }}
                            >
                                {pkg.gradient_start && (
                                    <div className="glass-glow" style={{ background: `radial-gradient(circle at top right, ${pkg.gradient_start}22, transparent)` }} />
                                )}
                                <div className="d-flex gap-4 align-items-start position-relative">
                                    {pkg.operator_image && (
                                        <img
                                            src={pkg.operator_image.url}
                                            alt={pkg.operator_title}
                                            className="operator-logo"
                                        />
                                    )}
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h3 className="h4 mb-1" style={{ fontWeight: '700' }}>{pkg.title}</h3>
                                                <div className="meta-text text-uppercase tracking-wider">
                                                    {pkg.country_title} ({pkg.country_code}) • {pkg.type} • {pkg.data}
                                                </div>
                                            </div>
                                            <div className="price-tag">
                                                <span className="currency">$</span>
                                                <span className="amount">{pkg.price}</span>
                                            </div>
                                        </div>

                                        {pkg.networks && (
                                            <div className="network-labels mb-3">
                                                {pkg.networks.split(', ').map((net, i) => (
                                                    <span key={i} className="network-badge">{net}</span>
                                                ))}
                                            </div>
                                        )}

                                        {pkg.info && pkg.info.length > 0 && (
                                            <ul className="feature-list list-unstyled mb-3">
                                                {pkg.info.map((item, i) => (
                                                    <li key={i} className="mb-2">
                                                        <span className="check">✓</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {pkg.other_info && (
                                            <div className="other-info mt-auto">
                                                {pkg.other_info}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && packages.length === 0 && (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>No plans available at the moment.</div>
            )}
        </div>
    );

    return (
        <div className="page-wrap">
            {homeContent}
            <BuyPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedPackage={selectedPackage}
            />
        </div>
    );
}

export default Home;
