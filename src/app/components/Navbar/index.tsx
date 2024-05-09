'use client';
import Link from 'next/link';
import React from 'react';
import './style.css';
import { signOut } from 'next-auth/react';
const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <header className="header">
        <div className="content_items">
          <Link className="title_nav" href="/dashboard">
            Promarketing
          </Link>
          <div className="hidden md:block">
            <nav>
              <ul className="flex space-x-4">
                <li className="link_pages" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </nav>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="hamburger_btn"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  v-if="isOpen"
                  fill-rule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
                <path
                  v-if="!isOpen"
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } px-2 pt-2 pb-4 animate-fade-down`}
        >
          <p className="link_nav" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </header>
    </>
  );
};

export default NavBar;

