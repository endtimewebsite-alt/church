/**
 * GALLERY — the ministry's photographs, grouped into the categories the client
 * supplied them in (assets/images/section1 … section7).
 *
 * Each section folder holds the full-size frames the lightbox opens; its
 * `thumbs/` subfolder holds the 700px tiles the grid paints. Both are picked up
 * by glob, so adding a photograph to a folder (and re-running the thumbnail
 * step) puts it on the page — no import list to maintain.
 *
 * ─── TODO(client) ────────────────────────────────────────────────────────
 * `label` and `blurb` below are working titles, written from what is visible
 * in each set of photographs. Replace them with the ministry's own names for
 * these gatherings — it is a one-line edit per category and nothing else needs
 * to change.
 * ─────────────────────────────────────────────────────────────────────────
 */

const fulls = import.meta.glob('../assets/images/section*/*.{jpg,jpeg,JPG,JPEG}', {
  eager: true,
  import: 'default',
})
const thumbs = import.meta.glob('../assets/images/section*/thumbs/*.jpg', {
  eager: true,
  import: 'default',
})

export const categoryMeta = [
  {
    id: 'section1',
    label: 'Church Meetings',
    blurb: 'Ministering from the pulpit — the Word opened before a gathered congregation.',
  },
  {
    id: 'section2',
    label: 'Crusades & Open-Air Gatherings',
    blurb: 'Night crusades and village meetings where the whole community came out to pray.',
  },
  {
    id: 'section3',
    label: 'International Ministry',
    blurb: 'Carrying the prophetic voice across borders — platforms, pulpits and people abroad.',
  },
  {
    id: 'section4',
    label: 'Prayer & Impartation',
    blurb: 'Hands lifted, hands laid on — houses and halls given over to prayer.',
  },
  {
    id: 'section5',
    label: 'Conferences',
    blurb: 'Full halls, long sessions, and the practical work behind a large gathering.',
  },
  {
    id: 'section6',
    label: 'Revival Services',
    blurb: 'Evenings of worship and the Word in local churches.',
  },
  {
    id: 'section7',
    label: 'Church Visits',
    blurb: 'Ministering alongside local pastors in the churches that opened their doors.',
  },
]

/** 'section3' out of '../assets/images/section3/thumbs/04.jpg' */
function sectionOf(path) {
  const m = path.match(/\/(section\d+)\//)
  return m ? m[1] : null
}

/** WhatsApp names sort by the timestamp in them, which is the order they were taken */
function byPath([a], [b]) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

const fullsBySection = {}
for (const [path, url] of Object.entries(fulls).sort(byPath)) {
  const id = sectionOf(path)
  // the thumbs/ files also match the fulls glob — keep them out
  if (!id || path.includes('/thumbs/')) continue
  ;(fullsBySection[id] ||= []).push(url)
}

const thumbsBySection = {}
for (const [path, url] of Object.entries(thumbs).sort(byPath)) {
  const id = sectionOf(path)
  if (!id) continue
  ;(thumbsBySection[id] ||= []).push(url)
}

export const categories = categoryMeta
  .map((meta) => {
    const full = fullsBySection[meta.id] || []
    const thumb = thumbsBySection[meta.id] || []
    return {
      ...meta,
      photos: full.map((src, i) => ({
        id: `${meta.id}-${i + 1}`,
        // fall back to the full frame if a thumbnail is missing, so a new
        // photograph still shows rather than leaving a hole in the grid
        thumb: thumb[i] || src,
        full: src,
        alt: `${meta.label} — photograph ${i + 1}`,
      })),
    }
  })
  .filter((c) => c.photos.length > 0)

/** Every photograph, in category order — what the "All" filter shows. */
export const galleryImages = categories.flatMap((c) =>
  c.photos.map((p) => ({ ...p, category: c.id, categoryLabel: c.label })),
)

export const galleryCount = galleryImages.length
