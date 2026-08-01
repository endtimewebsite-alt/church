import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/siteContent'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Reveal from '../components/motion/Reveal'
import Arrow from '../components/Arrow'
import HeroLogo from '../components/HeroLogo'
import qrImage from '../assets/images/site/qr-code.jpg'
import './Forms.css'
import './Home.css'

const initial = { name: '', email: '', subject: '', message: '', status: '' }

function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setForm((f) => ({ ...f, status: 'submitting' }))
    setSent(false)
    setError(false)

    try {
      const response = await fetch('https://formsubmit.co/ajax/etpm2020forchrist@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject || `Contact Message from ${form.name}`,
          message: form.message,
          _captcha: 'false',
        }),
      })

      if (response.ok) {
        setForm({ name: '', email: '', subject: '', message: '', status: 'success' })
        setSent(true)
      } else {
        setError(true)
        setForm((f) => ({ ...f, status: 'error' }))
      }
    } catch (err) {
      console.error(err)
      setError(true)
      setForm((f) => ({ ...f, status: 'error' }))
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | {site.name}</title>
        <meta name="description" content={`Get in touch with ${site.name}. We would love to hear from you.`} />
        <meta property="og:title" content={`Contact Us | ${site.name}`} />
        <meta property="og:description" content={`Get in touch with ${site.name}. We would love to hear from you.`} />
      </Helmet>

      <div className="fpage">
        {/* Fixed banner */}
        <section className="fbanner">
          <HeroLogo />
          <div className="fbanner__bg" aria-hidden="true" />
          <div className="fbanner__scrim" aria-hidden="true" />
          <Ambient rays dust tone="dark" />
          <div className="container fbanner__inner">
            <span className="eyebrow eyebrow--center">Contact</span>
            <h1>Get in Touch</h1>
            <Ornament center />
          </div>
        </section>

        {/* Overlapping panel */}
        <section className="fpanel">
          <div className="container">
            <Reveal className="fpanel__intro">
              <p className="lede">
                We would love to hear from you — for prayer, ministry enquiries, or a word of encouragement.
              </p>
              <p className="fpanel__note">Reach us directly or send a message below.</p>
            </Reveal>

            <div className="contact-grid">
              <Reveal variant="left" className="contact-info">
                <div className="contact-info__row">
                  <span className="contact-info__label">Phone</span>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Location</span>
                  <span>{site.address}</span>
                </div>
                <div className="contact-info__row">
                  <span className="contact-info__label">Follow</span>
                  <span className="contact-info__social">
                    <a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
                    <a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
                    <a href={site.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
                  </span>
                </div>
              </Reveal>

              <Reveal variant="right" className="contact-form-wrap">
                <form className="fform" onSubmit={handleSubmit}>
                  <div className="fform__row">
                    <label>
                      Your Name
                      <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
                    </label>
                    <label>
                      Your Email
                      <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
                    </label>
                  </div>
                  <label>
                    Subject
                    <input type="text" required value={form.subject} onChange={update('subject')} placeholder="Subject" />
                  </label>
                  <label>
                    Message
                    <textarea rows="6" value={form.message} onChange={update('message')} placeholder="Your message" />
                  </label>
                  <div className="fform__actions">
                    <button type="submit" className="btn btn-primary" disabled={form.status === 'submitting'}>
                      {form.status === 'submitting' ? 'Sending…' : 'Send Message'} <Arrow />
                    </button>
                  </div>
                  <AnimatePresence>
                    {sent && (
                      <motion.p
                        className="fform__success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Thank you — your message has been sent directly to our email!
                      </motion.p>
                    )}
                    {error && (
                      <motion.p
                        className="fform__error"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ color: '#a93226', textAlign: 'right', marginTop: '6px', fontWeight: 600, fontSize: '14px' }}
                      >
                        Something went wrong. Please try again or email us directly at etpm2020forchrist@gmail.com.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ GIVING / PAYMENT ═══════════════ */}
        <section className="section section-soft hgiving section-scripture-bg" data-chapter="IX" data-chapter-label="Giving">
          <Ambient rays dust tone="gold" />
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            
            {/* Custom Styled Heading */}
            <div className="section-head" style={{ marginBottom: '72px', position: 'relative' }}>
              <span className="eyebrow eyebrow--center"><em className="chapter">IX</em> Support the Ministry</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 92px)', fontWeight: '400', letterSpacing: '0.03em', color: 'var(--white)', marginTop: '20px', textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
                PARTNER <span style={{ fontStyle: 'italic', color: 'var(--gold)', textTransform: 'lowercase', letterSpacing: '0.05em' }}>with us</span>
              </h2>
              <Ornament center />
              <p style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(24px, 3vw, 32px)', 
                color: 'rgba(255, 255, 255, 0.9)', 
                maxWidth: '720px', 
                margin: '36px auto 0', 
                lineHeight: '1.3',
                letterSpacing: '0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)' 
              }}>
                Your seed helps us take the <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>prophetic voice</span> across the nations.
              </p>
            </div>

            <div className="hgiving__grid">
              {/* Left Side: Account Details */}
              <div className="card card--stone hgiving__card">
                <span className="eyebrow" style={{ marginBottom: '12px' }}>Direct Transfer</span>
                <h3 style={{ color: 'var(--white)', marginBottom: '8px', fontSize: '28px' }}>Bank Account</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '40px', maxWidth: '340px' }}>
                  For international or domestic wire transfers directly to the ministry.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Row: Bank */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Bank</span>
                    <span style={{ color: 'var(--gold-light)', fontSize: '20px', fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '0.02em' }}>State Bank of India</span>
                  </div>
                  
                  {/* Row: Account Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Acc Name</span>
                    <span style={{ color: 'var(--white)', fontSize: '15px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>DANIEL BENNET</span>
                  </div>

                  {/* Row: Account No */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px', alignItems: 'baseline', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Acc No.</span>
                    <span style={{ color: 'var(--gold)', fontSize: '20px', fontWeight: '500', letterSpacing: '0.1em' }}>20190093101</span>
                  </div>

                  {/* Grid: Codes & Branch */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingTop: '12px' }}>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>IFSC Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>SBIN0005200</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Branch Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>005200</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>MICR Code</span>
                      <span style={{ color: 'var(--white)', fontSize: '14px', letterSpacing: '0.08em', fontWeight: '500' }}>600002119</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Branch</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.5', display: 'block' }}>Porur, Chennai<br/>Tamil Nadu, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code */}
              <div className="card card--stone hgiving__card hgiving__qr-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="eyebrow" style={{ marginBottom: '12px' }}>Digital Giving</span>
                <h3 style={{ color: 'var(--white)', marginBottom: '8px', fontSize: '28px' }}>Scan to Give</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '40px', maxWidth: '280px' }}>
                  Use any UPI or mobile payment app to scan and give instantly.
                </p>
                <div className="hgiving__qr-image-wrapper">
                  <img src={qrImage} alt="Scan to Give" className="hgiving__qr-image" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
