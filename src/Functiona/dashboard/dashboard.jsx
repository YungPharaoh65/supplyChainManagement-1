// src/components/Dashboard.jsx
import React from 'react';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        {/* Navbar or Header component */}
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          {/* Sidebar component */}
        </aside>
        <main className="dashboard-main">
          {/* Main dashboard content */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
