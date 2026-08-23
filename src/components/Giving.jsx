import { useState } from 'react'
import Ambient from './motion/Ambient'
import FlyImage from './motion/FlyImage'
import Ornament from './motion/Ornament'
import { giving } from '../data/siteContent'
import qrImage from '../assets/images/site/qr-code.jpg'
import portraitImage from '../assets/images/site/partner-portrait.jpeg'
import gpayLogo from '../assets/images/site/gpay.png'
import phonepeLogo from '../assets/images/site/phonepe.svg'
import paytmLogo from '../assets/images/site/paytm.svg'
import upiLogo from '../assets/images/site/upi.png'
import './Giving.css'

/**
 * GIVING — the single source for the ministry's transfer details.
 *
 * Home and Contact both showed this block, previously as two copies of the same
 * 90 lines of inline styles; a change to the account number had to be made
 * twice. Now both render this, and the numbers themselves live in
 * `siteContent.giving`.
 *
 * Three panels: a domestic transfer, an international transfer (SWIFT/MICR),
 * and the UPI/G-Pay column. Every value is copy-to-clipboard, because an
 * account number read off a phone screen is an account number typed wrong.
 */

function CopyRow({ label, value, feature, highlight, mono, wide }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked (insecure origin / denied) — the value is on screen */
    }
  }

  return (
    <div className={`give-row ${wide ? 'give-row--wide' : ''}`}>
      <span className="give-row__label">{label}</span>
      <button
        type="button"
        onClick={copy}
        className={`give-row__value ${feature ? 'is-feature' : ''} ${highlight ? 'is-highlight' : ''} ${mono ? 'is-mono' : ''}`}
        title={`Copy ${label}`}
      >
        <span>{value}</span>
        <span className={`give-row__copy ${copied ? 'is-copied' : ''}`} aria-hidden="true">
          {copied ? (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 012-2h10" />
            </svg>
          )}
        </span>
        <span className="sr-only">{copied ? 'Copied' : `Copy ${label}`}</span>
      </button>
    </div>
  )
}

function AccountPanel({ account }) {
  return (
    <div className="card give-card">
      <span className="eyebrow give-card__eyebrow">{account.eyebrow}</span>
      <h3 className="give-card__title">{account.title}</h3>
      <p className="give-card__note">{account.note}</p>
      <div className="give-card__rows">
        {account.rows.map((row) => (
          <CopyRow key={`${account.id}-${row.label}`} {...row} />
        ))}
      </div>
    </div>
  )
}

function Giving({ chapter = 'IX' }) {
  return (
    <section className="section hgiving" data-chapter={chapter} data-chapter-label="Giving">
      <Ambient rays dust tone="gold" />
      <div className="container give-container">
        <div className="give-intro-grid">
          <div className="give-intro-figure">
            <FlyImage className="give-intro-frame" src={portraitImage} alt="Partner with us" from="left" speed={78} />
          </div>
          <div className="section-head give-head give-head--left">
            <h2 className="give-head__title">
              PARTNER <span className="give-head__title-em">with us</span>
            </h2>
            <Ornament center={false} />
            <p className="give-head__lede" style={{ textTransform: 'uppercase' }}>
              Your seed helps us take the <em>prophetic voice</em> across the nations.
            </p>
          </div>
        </div>

        <div className="give-grid">
          {giving.accounts.map((account) => (
            <AccountPanel key={account.id} account={account} />
          ))}

          <div className="card give-card give-card--digital">
            <span className="eyebrow give-card__eyebrow">Digital Giving</span>
            <h3 className="give-card__title">UPI</h3>
            <p className="give-card__note">Scan the code to give via any UPI app.</p>

            <div className="give-qr">
              <img src={qrImage} alt="UPI QR code for giving to End Time Prophetic Ministries" width="220" height="220" loading="lazy" />
            </div>

            <div className="give-card__logos">
              <img src={gpayLogo} alt="Google Pay" className="give-app-logo" />
              <img src={phonepeLogo} alt="PhonePe" className="give-app-logo" />
              <img src={paytmLogo} alt="Paytm" className="give-app-logo" style={{ transform: 'scale(1.2)' }} />
              <img src={upiLogo} alt="Other UPI Apps" className="give-app-logo" style={{ transform: 'scale(1.3)' }} />
            </div>
          </div>
        </div>

        <p className="give-footnote">
          Please mention your name and purpose in the transfer remarks so the offering can be acknowledged.<br/>
          Kindly send your Transaction details to this WhatsApp number: <strong>9342523393</strong>
        </p>
      </div>
    </section>
  )
}

export default Giving
