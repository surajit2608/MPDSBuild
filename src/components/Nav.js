/* eslint react/jsx-no-target-blank: 0 */ // --> OFF

import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { useNavPages, useSiteData } from '../hooks'

const NavLink = ({ slug, name }) => {
  return (
    <li>
      <Link to={slug}>{name}</Link>
    </li>
  )
}

NavLink.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const SocialLink = ({ slug, name }) => (
  <a className="social-link" rel="noopener" target="_blank" href={slug}>
    {name}
  </a>
)

SocialLink.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const Nav = ({ toggleNav, setToggleNav, siteName }) => {
  const navPages = useNavPages()
  const {
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
  } = useSiteData()
  const socialLinks = [
    // get any social sites that we have
    { Twitter: twitter },
    { Facebook: facebook },
    { LinkedIn: linkedin },
    { Pinterest: pinterest },
    { Instagram: instagram },
  ].filter(
    (item) =>
      !!Object.values(item)[0] &&
      !!Object.values(item)[0].url &&
      !!Object.values(item)[0].show,
  )

  return (
    <Fragment>
      {/* <button
        className="nav-burger"
        onClick={() => setToggleNav(!toggleNav)}
        aria-label="Open or close menu"
      >
        <div className="hamburger hamburger--collapse">
          <div className="hamburger-box">
            <div className="hamburger-inner" />
          </div>
        </div>
      </button>
      <nav id="swup" className="site-head-left">
        <ul className="nav">
          {!!navPages &&
            navPages.length > 1 &&
            navPages.map((page) => (
              <NavLink slug={page.slug} name={page.label} key={uuidv4()} />
            ))}
        </ul>
      </nav>
      <div className="site-head-center">
        <Link className="site-head-logo" to={`/`}>
          {siteName}
        </Link>
      </div>
      <div className="site-head-right">
        <div className="social-links">
          {!!socialLinks &&
            !!socialLinks.length &&
            socialLinks.map((social) => (
              <SocialLink
                slug={Object.values(social)[0].url}
                name={Object.keys(social)[0]}
                key={uuidv4()}
              />
            ))}
        </div>
      </div> */}


      <input id="menu__toggle" type="checkbox" />
      <nav className="mob-menu-pnl">
        <div className="heading-row">
          <Link className="logo-title" to={`/`}>
            <span className="logo">CV</span>
            <span className="title">{siteName}</span>
          </Link>
          <label className="mobile-menu" for="menu__toggle">X</label>
        </div>
        <nav>
          <ul>
            {!!navPages &&
              navPages.length > 1 &&
              navPages.map((page) => (
                <NavLink slug={page.slug} name={page.label} key={uuidv4()} />
              ))}
          </ul>
        </nav>
      </nav>
      <label className="overlay-bg" for="menu__toggle"></label>

      <header>
        <div className="pg-width">
          <Link className="logo-title" to={`/`}>
            <span className="logo">CV</span>
            <span className="title">{siteName}</span>
          </Link>
          <nav>
            <ul>
              {!!navPages &&
                navPages.length > 1 &&
                navPages.map((page) => (
                  <NavLink slug={page.slug} name={page.label} key={uuidv4()} />
                ))}
            </ul>
            <label className="mobile-menu" for="menu__toggle">
              <svg className="icn-mob-menu" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 41 41">
                <g transform="translate(-866.5 -256.5)">
                  <path className="cls-1" d="M34,0H6A6,6,0,0,0,0,6V34a6,6,0,0,0,6,6H34a6,6,0,0,0,6-6V6A6,6,0,0,0,34,0Z" transform="translate(867 257)" />
                  <path className="cls-2" d="M28.8,26.565H19.741a1.941,1.941,0,1,0,0,3.882H28.8a1.941,1.941,0,0,0,0-3.882Z" transform="translate(867 257)" />
                  <path className="cls-3" d="M28.93,18.283H15.341a1.941,1.941,0,1,0,0,3.882H28.93a1.941,1.941,0,1,0,0-3.882Z" transform="translate(867 257)" />
                  <path className="cls-4" d="M29.059,10H10.941a1.941,1.941,0,1,0,0,3.882H29.059a1.941,1.941,0,1,0,0-3.882Z" transform="translate(867 257)" />
                </g>
              </svg>
            </label>
          </nav>
        </div>
      </header>
    </Fragment>
  )
}

Nav.propTypes = {
  toggleNav: PropTypes.bool.isRequired,
  siteName: PropTypes.string.isRequired,
}

export default Nav
