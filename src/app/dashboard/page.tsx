'use client';

import React from 'react';
import { Button } from '../components';
import { signOut } from 'next-auth/react';
import './style.css';


const DashboardPage = () => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <section className="dashboard">
      <h1 className="title">Dashboard</h1>
      <Button title="Logout" onClick={handleLogout} type="button" />
    </section>
  );
};

export default DashboardPage;

