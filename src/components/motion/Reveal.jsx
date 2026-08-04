import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -44 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, y: 28, filter: 'blur(18px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
}

const VEIL_CLIP = { hidden: { clipPath: 'inset(100% 0 0 0)' }, show: { clipPath: 'inset(0% 0 0 0)' } }
const TRANSITION = { duration: 2.0, ease: [0.16, 1, 0.3, 1] }

/**
 * Reveals children into view once on scroll — slow and reverent, no bounce.
 * `variant`: up | down | left | right | scale | blur | veil. `delay` staggers.
 */
function Reveal({ children, delay = 0, variant = 'up', className, as = 'div' }) {
  const reduce = useReducedMotion()
  const [entered, setEntered] = useState(false)
  const MotionTag = motion[as] || motion.div

  if (variant === 'veil') {
    /* The curtain clip can't live on the element whileInView observes: a
       fully-closed clip-path (inset(100%), zero rendered area) makes
       Chromium's IntersectionObserver stop re-checking that element, so the
       "once it enters, reveal" trigger never fires again — the image stays
       invisible forever (confirmed via a raw IntersectionObserver: entries
       stop dead after the first, below-the-fold, callback). The outer element
       here only ever animates opacity/y (proven safe by every other variant);
       the clip-path lives on an inner element gated by onViewportEnter. */
    return (
      <MotionTag
        className={className}
        initial={reduce ? false : { opacity: 0, y: 60 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        onViewportEnter={() => setEntered(true)}
        transition={{ ...TRANSITION, delay }}
      >
        <motion.div
          initial={reduce ? false : VEIL_CLIP.hidden}
          animate={reduce || entered ? VEIL_CLIP.show : VEIL_CLIP.hidden}
          transition={{ ...TRANSITION, delay }}
        >
          {children}
        </motion.div>
      </MotionTag>
    )
  }

  const v = VARIANTS[variant] || VARIANTS.up

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : v.hidden}
      whileInView={reduce ? undefined : v.show}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ ...TRANSITION, delay }}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
