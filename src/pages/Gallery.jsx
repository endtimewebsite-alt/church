import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { categories, galleryImages } from '../data/gallery'
import Reveal from '../components/motion/Reveal'
import Ornament from '../components/motion/Ornament'
import HeroLogo from '../components/HeroLogo'
import Lightbox from '../components/Lightbox'
import './Gallery.css'

const ALL = 'all'

function Gallery() {
  const [filter, setFilter] = useState(ALL)
  const [index, setIndex] = useState(null)

  // the visible set — the lightbox indexes into this, so arrow keys walk the
  // category the visitor is actually looking at rather than all 130 frames
  const photos = useMemo(
    () => (filter === ALL ? galleryImages : categories.find((c) => c.id === filter)?.photos || []),
    [filter],
  )
  const active = categories.find((c) => c.id === filter)

  const open = index !== null

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )

  function chooseFilter(id) {
    setFilter(id)
    setIndex(null)
  }

  return (
    <>
      <title>Gallery | End Time Prophetic Ministries</title>
      <meta name="description" content="Photographs from the meetings, crusades and conferences of End Time Prophetic Ministries." />
      <meta property="og:title" content="Gallery | End Time Prophetic Ministries" />
      <meta property="og:description" content="Photographs from the meetings, crusades and conferences of End Time Prophetic Ministries." />

      <section className="page-hero">
        <HeroLogo />
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--center">Gallery</span>
            <h1>Moments of Worship &amp; Ministry</h1>
            <Ornament center />
            <div className="page-hero__bg-text" aria-hidden="true">Gallery</div>
          </Reveal>
        </div>
      </section>

      <section className="gal-hall">
        <div className="gal-hall__inner">
          {/* ── the categories ── */}
          <nav className="gal-filters" aria-label="Photograph categories">
            <button
              type="button"
              className={`gal-filter ${filter === ALL ? 'is-active' : ''}`}
              onClick={() => chooseFilter(ALL)}
            >
              <span>All</span>
              <em>{galleryImages.length}</em>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`gal-filter ${filter === c.id ? 'is-active' : ''}`}
                onClick={() => chooseFilter(c.id)}
              >
                <span>{c.label}</span>
                <em>{c.photos.length}</em>
              </button>
            ))}
          </nav>

          <div className="gal-ledger">
            <span>{active ? active.label : 'The Wall'}</span>
            <span className="gal-ledger__rule" aria-hidden="true" />
            <span className="gal-ledger__count">
              {String(photos.length).padStart(2, '0')} Photographs
            </span>
          </div>

          {active?.blurb && <p className="gal-blurb">{active.blurb}</p>}

          {/* keyed on the filter so switching categories re-runs the entrance
              and React does not try to reuse tiles across two different sets */}
          <div className="gal-wall" key={filter}>
            {photos.map((img, i) => (
              <div className="gal-cell" key={img.id}>
                <button
                  className="gal-frame"
                  onClick={() => setIndex(i)}
                  aria-label={`Open photograph ${i + 1} of ${photos.length}`}
                >
                  <img src={img.thumb} alt={img.alt} loading="lazy" decoding="async" />
                  <span className="gal-frame__wash" aria-hidden="true" />
                  <span className="gal-frame__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="gal-frame__view" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                    View
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <Lightbox
            images={photos}
            index={index}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
