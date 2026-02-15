import React from 'react';

const Admin = () => {
    // Mock Data for Dashboard
    const stats = [
        { title: 'Orders Today', value: '42', color: 'primary' },
        { title: 'Revenue (Fiat)', value: '$1,250.00', color: 'success' },
        { title: 'Revenue (Crypto)', value: '0.45 BTC', color: 'info' },
        { title: 'Pending Airalo Fulfillments', value: '7', color: 'warning' },
        { title: 'Failed Webhooks', value: '0', color: 'danger' },
        { title: 'Estimated Margin', value: '24%', color: 'success' },
        { title: 'Upcoming Airalo Bill', value: '~$850.00', color: 'secondary' }
    ];

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="massive-title mb-0">Dashboard Overview</h1>
                <div className="badge bg-primary py-2 px-3 rounded-pill" style={{ letterSpacing: '2px', fontWeight: '800' }}>ADMIN</div>
            </div>

            <div className="row g-4">
                {stats.map((stat, index) => (
                    <div className="col-md-4 col-lg-3" key={index}>
                        <div className={`card bg-dark text-light border-0 shadow-sm h-100 p-3`} style={{
                            backgroundColor: '#1e293b !important',
                            borderRadius: '16px',
                            borderLeft: `6px solid var(--bs-${stat.color})`
                        }}>
                            <div className="card-body">
                                <h6 className="text-uppercase text-muted mb-2" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px' }}>
                                    {stat.title}
                                </h6>
                                <h3 className="mb-0" style={{ fontWeight: '800' }}>{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <div className="card bg-dark text-light border-0 shadow-sm p-4" style={{ backgroundColor: '#1e293b !important', borderRadius: '16px' }}>
                        <h4 className="mb-4" style={{ fontWeight: '700' }}>Quick Actions</h4>
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-primary rounded-pill px-4">Manage Users</button>
                            <button className="btn btn-outline-primary rounded-pill px-4">View Orders</button>
                            <button className="btn btn-outline-primary rounded-pill px-4">System Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
