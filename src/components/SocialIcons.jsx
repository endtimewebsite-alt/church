import { site } from '../data/siteContent'
import './SocialIcons.css'

/**
 * The ministry's social channels as marks rather than words. Inline SVG (not an
 * icon font or a remote sprite) so they inherit the gold on hover, scale
 * cleanly on a phone, and cost nothing to load.
 *
 * `size`: 'sm' | 'md' | 'lg'. `labels` prints the channel name beside the mark.
 */

const icons = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8.7v3h2.4V19h3v-7.5h2.4l.4-3H14z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  youtube: (
    <>
      <path
        d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10.2 15.1V8.9l5.2 3.1-5.2 3.1z" />
    </>
  ),
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.3.1-.5.2-.7l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.9.8 2.3.6 2.7.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2l-.5-.2z" />
  ),
}

const channels = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'whatsapp', label: 'WhatsApp' },
]

function SocialIcons({ size = 'md', labels = false, className = '' }) {
  const list = channels.filter((c) => site.social[c.key])

  return (
    <ul className={`socials socials--${size} ${labels ? 'socials--labelled' : ''} ${className}`}>
      {list.map(({ key, label }) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noreferrer"
            className={`socials__link socials__link--${key}`}
            aria-label={`${label} — ${site.name}`}
          >
            <span className="socials__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                {icons[key]}
              </svg>
            </span>
            {labels && <span className="socials__label">{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialIcons
