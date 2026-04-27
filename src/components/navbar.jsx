import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/products", label: t("nav.products") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/blog", label: "Xidmətlərimiz" },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const isActive = (to) =>
    pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      <style>{`
        body {
          margin: 0;
        }

        .navbar {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 96%;
          max-width: 1200px;
          height: 64px;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          border-radius: 16px;
          background: rgba(6, 6, 8, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .navbar-logo {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.2rem;
          text-decoration: none;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 28px;
        }

        .nav-link {
          font-family: "DM Sans", sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          position: relative;
          transition: 0.25s;
        }

        .nav-link:hover {
          color: #fff;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          transition: 0.3s;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-cta {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 10px;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          transition: 0.2s;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .hamburger span {
          width: 22px;
          height: 2px;
          background: white;
        }

        .mobile-menu {
          position: fixed;
          top: 76px;
          left: 0;
          width: 100%;
          background: #0b0b0d;
          display: none;
          flex-direction: column;
          padding: 20px;
          gap: 16px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-16px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .mobile-menu.show {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .mobile-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.9rem;
        }

        .mobile-link.active {
          color: #fff;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .nav-cta { display: none; }
          .mobile-menu { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="navbar-logo">APRINT</Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${isActive(l.to) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <LangSwitcher />

          <Link to="/contact" className="nav-cta">
            {t("nav.order")}
          </Link>

          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${open ? "show" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`mobile-link ${isActive(l.to) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
