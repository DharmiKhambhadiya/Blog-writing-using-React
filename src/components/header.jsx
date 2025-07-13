import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./logout";
import "./css/header.css";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  // Close sidebar on outside click
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  // Close sidebar on navigation
  const handleNav = (slug) => {
    navigate(slug);
    setSidebarOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="header-nav-responsive">
        {/* Hamburger menu for mobile */}
        <button
          className="hamburger-menu"
          aria-label="Open sidebar menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
        {/* Centered project name */}
        <div className="header-title-center">
          <img
            src="/logo.svg"
            alt="BlogNest Logo"
            className="hero-logo-left"
            style={{ marginRight: 10 }}
          />
          <span className="header-project-name">BlogNest</span>
        </div>
        {/* Desktop nav (hidden on mobile) */}
        <ul className="header-nav-desktop">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button onClick={() => handleNav(item.slug)} className="nav-btn">
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
        {/* Sidebar overlay */}
        {sidebarOpen && <div className="sidebar-overlay" />}
        {/* Sidebar */}
        <aside
          className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}
          ref={sidebarRef}
        >
          <button
            className="sidebar-close-btn"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
          <div className="sidebar-title">
            <img
              src="/logo.svg"
              alt="BlogNest Logo"
              className="hero-logo-left"
              style={{ marginRight: 10 }}
            />
            <span className="header-project-name">BlogNest</span>
          </div>
          <ul className="sidebar-nav-list">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => handleNav(item.slug)} className="nav-btn sidebar-nav-btn">
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </aside>
      </nav>
    </header>
  );
}

export default Header;
