import { Link } from 'react-router-dom'
import { site } from '../data/siteContent'
import Reveal from './motion/Reveal'
import Ornament from './motion/Ornament'
import SocialIcons from './SocialIcons'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      {/* candle glow rising from the floor of the last hall */}
      <div className="site-footer__candle" aria-hidden="true" />
      <div className="site-footer__motes" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      <div className="container">
        {/* ── closing scene ── */}
        <Reveal variant="blur" className="site-footer__closing">
          <span className="site-footer__seal" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="54" height="54">
              <defs>
                <linearGradient id="ft-gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--accent-light)" />
                  <stop offset="1" stopColor="var(--accent-deep)" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="none" stroke="url(#ft-gold)" strokeWidth="1" opacity="0.7" />
              <circle cx="32" cy="32" r="25" fill="none" stroke="url(#ft-gold)" strokeWidth="0.5" opacity="0.4" />
              <path d="M32 15v34M22 26h20" stroke="url(#ft-gold)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <blockquote className="site-footer__verse">
            “The Lord bless thee, and keep thee: the Lord make his face shine upon thee.”
          </blockquote>

          <Ornament center />
        </Reveal>

        {/* ── details ── */}
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__name" style={{ textTransform: 'uppercase' }}>{site.name}</span>
            <p>
              {site.tagline}<br/>
              <em>Bringing revival to the nations</em>
            </p>
            <h4 style={{ marginTop: '32px', marginBottom: '-14px' }}>FOLLOW US ON</h4>
            <SocialIcons size="md" className="site-footer__social" />
          </div>

          <div>
            <h4>Explore</h4>
            <nav className="site-footer__links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/events">Events</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/invite">Invite the Prophet</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="site-footer__links">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                {site.email}
              </a>
            </div>
            <address className="site-footer__address" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '20px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginTop: '2px', flexShrink: 0 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {site.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-row">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link to="/studio" className="site-footer__credit">Design &amp; Build Notes</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
