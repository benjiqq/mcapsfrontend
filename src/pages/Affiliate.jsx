import React from 'react';
import './Home.css';

const Affiliate = () => {
    return (
        <div className="wrap" style={{ marginTop: '4rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', color: '#e6e6e6' }}>
                <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>LibertyRoam Partners</h1>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>Docs</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>Support</span>
                        <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Invite Partner</button>
                    </div>
                </header>

                <main style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Overview Cards */}
                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { label: 'Total Earnings', value: '$18,420' },
                            { label: 'Active Referrals', value: '1,284' },
                            { label: 'Conversion Rate', value: '6.3%' },
                            { label: 'Current Tier', value: 'Elite', color: 'var(--primary)' }
                        ].map((card, idx) => (
                            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{card.label}</div>
                                <div style={{ fontSize: '1.875rem', fontWeight: '600', marginTop: '0.5rem', color: card.color || 'white' }}>{card.value}</div>
                            </div>
                        ))}
                    </section>

                    {/* Partner Tier */}
                    <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Partner Tier</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { name: 'Starter', requirement: 'No stake required', commission: '10%', current: false },
                                { name: 'Pro', requirement: 'Stake 5,000 LR', commission: '20%', current: false },
                                { name: 'Elite', requirement: 'Stake 25,000 LR', commission: '30%', current: true },
                                { name: 'Sovereign', requirement: 'Stake 100,000 LR', commission: '40%', current: false },
                            ].map((tier, idx) => (
                                <div key={idx} style={{
                                    border: tier.current ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                    borderRadius: '1.25rem',
                                    padding: '1.5rem',
                                    background: tier.current ? 'rgba(255, 90, 0, 0.05)' : 'transparent'
                                }}>
                                    <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>{tier.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{tier.requirement}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '1rem' }}>{tier.commission}</div>
                                    <button style={{
                                        marginTop: '1.5rem',
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        background: tier.current ? 'var(--surface-hover)' : 'var(--primary)',
                                        color: 'white',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}>
                                        {tier.current ? 'Active' : 'Upgrade'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Referral Links */}
                    <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Referral Links</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'https://libertyroam.com/?ref=atlasnomad',
                                'https://libertyroam.com/europe?ref=atlasnomad'
                            ].map((link, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'var(--bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '0.75rem',
                                    padding: '0.75rem 1rem'
                                }}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{link}</div>
                                    <button style={{ background: 'var(--surface-hover)', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>Copy</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Performance Table */}
                    <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Recent Conversions</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                                <thead style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '1rem 0' }}>Date</th>
                                        <th style={{ textAlign: 'left' }}>Plan</th>
                                        <th style={{ textAlign: 'left' }}>Country</th>
                                        <th style={{ textAlign: 'left' }}>Commission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { date: 'Feb 12', plan: 'Global 10GB', country: 'Japan', commission: '$18' },
                                        { date: 'Feb 11', plan: 'Europe 5GB', country: 'Germany', commission: '$12' },
                                        { date: 'Feb 10', plan: 'Asia 20GB', country: 'Thailand', commission: '$22' },
                                    ].map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: idx === 2 ? 'none' : '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '1rem 0' }}>{row.date}</td>
                                            <td>{row.plan}</td>
                                            <td>{row.country}</td>
                                            <td style={{ color: 'var(--primary)', fontWeight: '600' }}>{row.commission}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Affiliate;
