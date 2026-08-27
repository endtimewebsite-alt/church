import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { site, events } from '../data/siteContent'
import Ambient from '../components/motion/Ambient'
import Ornament from '../components/motion/Ornament'
import Reveal from '../components/motion/Reveal'
import Magnetic from '../components/motion/Magnetic'
import Countdown from '../components/Countdown'
import Arrow from '../components/Arrow'
import HeroLogo from '../components/HeroLogo'
import Lightbox from '../components/Lightbox'
import conferencePosterImg from '../assets/images/posters/WhatsApp Image 2026-08-26 at 19.16.30.jpeg'
import './Forms.css'
import './Events.css'

/* Posters live beside the event data by id, so adding an event is a data edit
   plus one poster import rather than a new page. */
const posters = {
  'misphacha-2026': conferencePosterImg,
}

function isUpcoming(event) {
  return new Date(event.end || event.start).getTime() > Date.now()
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 12V8H4v4M20 12v6H4v-6M20 12H4M16 6V4H8v2" />
    </svg>
  )
}

function EventCard({ event, onPoster }) {
  const poster = posters[event.id]
  const upcoming = isUpcoming(event)

  const meta = [
    { icon: <CalendarIcon />, label: 'Date & Time', value: event.dateLabel, sub: event.timeLabel },
    { icon: <ClockIcon />, label: 'Registration Closes', value: event.registrationClosesLabel, sub: 'Register before this date' },
    { icon: <PinIcon />, label: 'Venue', value: event.venue, sub: event.venueAddress },
    { icon: <TicketIcon />, label: 'Registration', value: event.fee, sub: event.seats },
  ].filter((m) => m.value)

  return (
    <Reveal className={`ev-card ${upcoming ? '' : 'ev-card--past'}`}>
      <div className="ev-card__media">
        {poster && (
          <button type="button" className="ev-card__poster" onClick={() => onPoster(poster)}>
            <img src={poster} alt={`${event.title} poster`} loading="lazy" />
            <span className="ev-card__zoom">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
              Expand Poster
            </span>
          </button>
        )}
      </div>

      <div className="ev-card__body">
        <span className={`ev-card__status ${upcoming ? 'is-upcoming' : 'is-past'}`}>
          {upcoming ? 'Upcoming' : 'Concluded'}
        </span>
        <h2 className="ev-card__title">{event.title}</h2>
        {event.theme && <p className="ev-card__theme">{event.theme}</p>}

        {event.scripture && (
          <blockquote className="ev-card__scripture">
            {event.scripture}
            <cite>— {event.scriptureRef}</cite>
          </blockquote>
        )}

        {upcoming && (
          <div className="ev-card__countdown">
            <Countdown target={event.start} label="Begins in" endedLabel="This event has begun" />
          </div>
        )}

        <div className="ev-card__meta">
          {meta.map((m) => (
            <div className="ev-meta" key={m.label}>
              <span className="ev-meta__icon" aria-hidden="true">{m.icon}</span>
              <div>
                <span className="ev-meta__label">{m.label}</span>
                <span className="ev-meta__value">{m.value}</span>
                {m.sub && <span className="ev-meta__sub">{m.sub}</span>}
              </div>
            </div>
          ))}
        </div>

        {event.sessions?.length > 0 && (
          <div className="ev-card__sessions">
            <h3>Conference Focus &amp; Sessions</h3>
            <ul>
              {event.sessions.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong>
                  {s.note && <> — {s.note}</>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {upcoming && (
          <div className="ev-card__actions">
            <Magnetic>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-primary">
                Call &amp; Register: {site.phone} <Arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn btn-outline">
                Enquire <Arrow />
              </Link>
            </Magnetic>
          </div>
        )}
      </div>
    </Reveal>
  )
}

function Events() {
  const [lightbox, setLightbox] = useState(null)

  const upcoming = events.filter(isUpcoming)
  const past = events.filter((e) => !isUpcoming(e))
  const next = upcoming[0]

  return (
    <>
      <title>{`Events | ${site.name}`}</title>
      <meta name="description" content={`Upcoming conferences and meetings with Prophet Daniel Bennet — ${site.name}.`} />
      <meta property="og:title" content={`Events | ${site.name}`} />
      <meta property="og:description" content="Upcoming conferences, meetings and prophetic training with Prophet Daniel Bennet." />

      <div className="fpage ev-page">
        {/* ── banner ── */}
        <section className="fbanner">
          <HeroLogo />
          <div className="fbanner__bg" aria-hidden="true" />
          <div className="fbanner__scrim" aria-hidden="true" />
          <Ambient rays dust tone="dark" />
          <div className="container fbanner__inner">
            <span className="eyebrow eyebrow--center">Gather With Us</span>
            <h1>Events</h1>
            <Ornament center />
          </div>
        </section>

        {/* ── the next event, with the clock running ── */}
        {next && (
          <section className="ev-next">
            <div className="container ev-next__inner">
              <span className="eyebrow eyebrow--center">Next Gathering</span>
              <h2 className="ev-next__title">{next.title}</h2>
              <p className="ev-next__when">
                {next.dateLabel} · {next.timeLabel} · {next.venue}
              </p>
              <Countdown
                target={next.start}
                label="Begins in"
                endedLabel="The gathering has begun"
                className="countdown--center"
              />
            </div>
          </section>
        )}

        {/* ── the list ── */}
        <section className="section ev-list">
          <div className="container">
            {upcoming.length === 0 && past.length === 0 && (
              <p className="ev-empty">
                No events are scheduled just now. Follow us or <Link to="/contact">get in touch</Link> and we will
                let you know as soon as the next gathering is announced.
              </p>
            )}

            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} onPoster={setLightbox} />
            ))}

            {past.length > 0 && (
              <>
                <h2 className="ev-list__heading">Past Gatherings</h2>
                {past.map((event) => (
                  <EventCard key={event.id} event={event} onPoster={setLightbox} />
                ))}
              </>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox} alt="Event poster" onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  )
}

export default Events
