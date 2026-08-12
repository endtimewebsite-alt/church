import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import './Lightbox.css'

/**
 * LIGHTBOX — one full-frame viewer for the gallery, the events posters and the
 * conference poster on the home page.
 *
 * Rendered through a portal on <body>, and that is not cosmetic. Layout wraps
 * every route in a motion.div that animates `filter`; a filtered element
 * becomes the containing block for `position: fixed` descendants, so an
 * in-tree overlay resolves `inset: 0` against the whole scrolled document
 * instead of the viewport. That is exactly what was happening here — the
 * backdrop was ~16,000px tall and the photograph was centred thousands of
 * pixels below the fold, so clicking a tile appeared to open nothing.
 * <Cinema /> already carries the same portal for the same reason.
 *
 * Pass `images` (array of { id, full, alt }) plus `index` for a browsable set,
 * or a single `src`/`alt` for a one-off poster.
 */
function Lightbox({ images, index, src, alt = '', onClose, onNext, onPrev }) {
  const reduce = useReducedMotion()
  const browsable = Array.isArray(images) && images.length > 1
  const current = images ? images[index] : null
  const imageSrc = current ? current.full : src
  const imageAlt = current ? current.alt : alt

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.()
      else if (browsable && e.key === 'ArrowRight') onNext?.()
      else if (browsable && e.key === 'ArrowLeft') onPrev?.()
    },
    [browsable, onClose, onNext, onPrev],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    // the page behind must not scroll while the viewer holds the screen
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [handleKey])

  if (!imageSrc || typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      className="lightbox"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={imageAlt || 'Photograph'}
    >
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>&times;</button>

      {browsable && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous"
          onClick={(e) => { e.stopPropagation(); onPrev?.() }}
        >‹</button>
      )}

      <motion.img
        key={current?.id || imageSrc}
        src={imageSrc}
        alt={imageAlt}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {browsable && (
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next"
          onClick={(e) => { e.stopPropagation(); onNext?.() }}
        >›</button>
      )}

      {browsable && (
        <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
          <span><b>{String(index + 1).padStart(2, '0')}</b> / {String(images.length).padStart(2, '0')}</span>
          <span className="lightbox__rail" aria-hidden="true">
            <span style={{ width: `${((index + 1) / images.length) * 100}%` }} />
          </span>
          <span className="lightbox__hint">← → to move · Esc to close</span>
        </div>
      )}
    </motion.div>,
    document.body,
  )
}

export default Lightbox
