import { Link } from 'react-router-dom'
import logoMark from '../assets/images/site/logo-mark.png'
import { site } from '../data/siteContent'
import './HeroLogo.css'

function HeroLogo() {
  return (
    <Link to="/" className="hero-top-logo" aria-label={site.name}>
      <img className="hero-top-logo__mark" src={logoMark} alt="" />
      <span className="hero-top-logo__text">
        <span className="hero-top-logo__line1">End Time Prophetic</span>
        <span className="hero-top-logo__line2">Ministries</span>
      </span>
    </Link>
  )
}

export default HeroLogo
