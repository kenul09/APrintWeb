import { Link } from "react-router-dom";

/* ICONS */
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.3 8.3 0 0 1-3.8-.9L3 21l1.9-5.7a8.3 8.3 0 0 1-.9-3.8 8.5 8.5 0 0 1 17 0z" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          position: relative;
          z-index: 5;
          isolation: isolate;
          background: linear-gradient(180deg, rgba(8, 8, 12, 0.96), #060608);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 72px 56px 32px;
          margin-top: auto;
        }

        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "DM Sans", sans-serif;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
        }

        .footer-brand {
          font-size: 1.4rem;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-description {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .footer-col-title {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .footer-link,
        .footer-text {
          display: block;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 12px;
        }

        .footer-link {
          text-decoration: none;
          transition: 0.2s;
        }

        .footer-link:hover {
          color: #fff;
          transform: translateX(4px);
        }

        .social-list {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          transition: 0.25s;
        }

        .social-btn:hover {
          border-color: #8b5cf6;
          background: rgba(139,92,246,0.15);
          color: #a78bfa;
          transform: translateY(-3px);
          box-shadow: 0 0 12px rgba(139,92,246,0.4);
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 40px 0 20px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        @media (max-width: 992px) {
          .footer {
            padding: 56px 24px 24px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <Link to="/" className="footer-brand">
                APRINT
              </Link>

              <p className="footer-description">
                Bakının ən peşəkar çap xidməti.
                <br />
                Brendinizi canlandırırıq.
              </p>

              <div className="social-list">
                <a
                  href="https://instagram.com/a_print_poliqrafiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://facebook.com/aprint.az"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://wa.me/994557505533?text=Salam%20m%C9%99n%20sifari%C5%9F%20etm%C9%99k%20ist%C9%99yir%C9%99m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Səhifələr</div>
              <Link to="/" className="footer-link">Ana səhifə</Link>
              <Link to="/products" className="footer-link">Məhsullar</Link>
              <Link to="/services" className="footer-link">Xidmətlər</Link>
              <Link to="/portfolio" className="footer-link">Portfolio</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/about" className="footer-link">Haqqımızda</Link>
            </div>

            <div>
              <div className="footer-col-title">Xidmətlər</div>
              <span className="footer-text">Flayer</span>
              <span className="footer-text">Banner</span>
              <span className="footer-text">Roll-up</span>
              <span className="footer-text">Vizit kart</span>
              <span className="footer-text">Stiker</span>
            </div>

            <div>
              <div className="footer-col-title">Əlaqə</div>
              <span className="footer-text">📍 Bakı, Azərbaycan</span>
              <span className="footer-text">📞 +994 55 750 55 33</span>
              <span className="footer-text">📧 info@aprint.az</span>
              <span className="footer-text">🕐 09:00 — 21:00</span>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <span>© 2026 Aprint.az Bütün hüquqlar qorunur.</span>
            <span>Bakı, Azərbaycan</span>
          </div>
        </div>
      </footer>
    </>
  );
}
