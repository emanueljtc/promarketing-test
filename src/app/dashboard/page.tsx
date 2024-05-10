'use client';

import React from 'react';
import './style.css';
import { Tabs } from '../components';

const DashboardPage = () => {
  return (
    <section className="dashboard">
      <div className="w-11/12 md:w-2/3 h-full m-auto  flex flex-col justify-center md:items-center ">
        <Tabs />
      </div>
    </section>
  );
};

export default DashboardPage;

