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
                packages.map((pkg, index) => (
                    <div
                        className="plan"
                        key={pkg.id || index}
                        onClick={() => handleOpenModal(pkg)}
                        style={{
                            borderLeft: pkg.gradient_start ? `6px solid ${pkg.gradient_start}` : 'none',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {pkg.gradient_start && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '120px',
                                height: '120px',
                                background: `radial-gradient(circle at top right, ${pkg.gradient_start}33, transparent)`,
                                pointerEvents: 'none'
                            }} />
                        )}
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', width: '100%' }}>
                            {pkg.operator_image && (
                                <img
                                    src={pkg.operator_image.url}
                                    alt={pkg.operator_title}
                                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #333' }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{pkg.title}</h3>
                                        <div className="meta" style={{ fontSize: '1rem', fontWeight: '500' }}>
                                            {pkg.country_title} ({pkg.country_code}) • {pkg.type.toUpperCase()} • {pkg.data} Data
                                        </div>
                                    </div>
                                    <div className="price">
                                        <div className="new" style={{ fontSize: '2rem' }}>${pkg.price}</div>
                                    </div>
                                </div>

                                {pkg.networks && (
                                    <div style={{ fontSize: '0.9rem', marginTop: '12px', color: '#ff9500', fontWeight: 'bold' }}>
                                        {pkg.networks}
                                    </div>
                                )}

                                {pkg.info && pkg.info.length > 0 && (
                                    <ul style={{ paddingLeft: '1.2rem', margin: '12px 0', fontSize: '0.9rem', color: '#aaa', lineHeight: '1.5' }}>
                                        {pkg.info.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {pkg.other_info && (
                                    <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#888', marginTop: '8px' }}>
                                        {pkg.other_info}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}

            {!loading && packages.length === 0 && (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>No plans available at the moment.</div>
            )}
        </div>
    );

    return (
        <React.Fragment>
            <header className="top-nav px-4">
                <div className="brand">libertyroam</div>
                <button className="btn btn-outline-light btn-sm px-4 rounded-pill" style={{ fontWeight: '600' }} onClick={handleAuthAction}>
                    {user ? 'Log out' : 'Log in'}
                </button>
            </header>

            <div className="page-wrap">
                {homeContent}
            </div>
            <BuyPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedPackage={selectedPackage}
            />
        </React.Fragment>
    );
}

export default Home;
