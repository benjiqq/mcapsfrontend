import React from 'react';

const Admin = () => {
    return (
        <div className="container mt-5">
            <div className="card bg-dark text-light border-secondary">
                <div className="card-header border-secondary">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="card-body">
                    <p>Welcome to the admin panel. Here you can manage the application settings and users.</p>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card bg-secondary text-white mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Users</h5>
                                    <p className="card-text">Total users: --</p>
                                    <button className="btn btn-outline-light btn-sm">Manage</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-secondary text-white mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Assets</h5>
                                    <p className="card-text">Total assets: --</p>
                                    <button className="btn btn-outline-light btn-sm">Manage</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-secondary text-white mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Settings</h5>
                                    <p className="card-text">System configuration</p>
                                    <button className="btn btn-outline-light btn-sm">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
