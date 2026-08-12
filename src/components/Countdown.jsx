import { useEffect, useState } from 'react'
import './Countdown.css'

/**
 * COUNTDOWN — days / hours / minutes / seconds to a fixed moment.
 *
 * `target` is an ISO string carrying its own offset (the events data writes
 * +05:30), so the same instant is counted down whether the visitor is in
 * Chennai or Chicago. One interval, cleared on unmount; the tick only sets
 * state when a displayed number actually changes, so a page sitting open
 * doesn't re-render four numerals a second for no reason.
 */

function partsFrom(ms) {
  const total = Math.max(0, ms)
  const seconds = Math.floor(total / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    done: total <= 0,
  }
}

const pad = (n) => String(n).padStart(2, '0')

function Countdown({ target, label = 'Begins in', endedLabel = 'This event has begun', compact = false, className = '' }) {
  const targetMs = new Date(target).getTime()
  const [parts, setParts] = useState(() => partsFrom(targetMs - Date.now()))

  useEffect(() => {
    if (Number.isNaN(targetMs)) return
    const id = setInterval(() => {
      const next = partsFrom(targetMs - Date.now())
      setParts((prev) =>
        prev.seconds === next.seconds &&
        prev.minutes === next.minutes &&
        prev.hours === next.hours &&
        prev.days === next.days &&
        prev.done === next.done
          ? prev
          : next,
      )
    }, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  if (Number.isNaN(targetMs)) return null

  if (parts.done) {
    return (
      <div className={`countdown countdown--done ${compact ? 'countdown--compact' : ''} ${className}`}>
        <span className="countdown__label">{endedLabel}</span>
      </div>
    )
  }

  const cells = [
    { value: parts.days, unit: parts.days === 1 ? 'Day' : 'Days', raw: true },
    { value: parts.hours, unit: 'Hours' },
    { value: parts.minutes, unit: 'Minutes' },
    { value: parts.seconds, unit: 'Seconds' },
  ]

  // one live region for assistive tech instead of four numerals announcing
  // themselves every second
  const spoken = `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes remaining`

  return (
    <div className={`countdown ${compact ? 'countdown--compact' : ''} ${className}`}>
      <span className="countdown__label">{label}</span>
      <div className="countdown__row" role="timer" aria-live="off">
        {cells.map((cell, i) => (
          <div className="countdown__cell" key={cell.unit}>
            <span className="countdown__value">{cell.raw ? cell.value : pad(cell.value)}</span>
            <span className="countdown__unit">{cell.unit}</span>
            {i < cells.length - 1 && <span className="countdown__sep" aria-hidden="true">:</span>}
          </div>
        ))}
      </div>
      <span className="sr-only">{spoken}</span>
    </div>
  )
}

export default Countdown
