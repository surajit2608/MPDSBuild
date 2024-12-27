import React, { Fragment, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Fonts from './Fonts'
import { Link } from 'gatsby'
import { v4 as uuidv4 } from 'uuid'
import ThemeSwitcher from './ThemeSwitcher'
import { ThemeOptionsContext } from '../context/ThemeOptions'
import { useSiteData } from '../hooks'
import SEO, { seoPropTypes } from './SEO'

// import '../style/all.sass'
import '../style/main.scss'


const SocialLink = ({ slug, name }) => (
  <a className="smi" rel="noopener" target="_blank" href={slug}>
    {name}
  </a>
)

SocialLink.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const Layout = ({ seoProps, children }) => {
  const [toggleNav, setToggleNav] = useState(false)
  const {
    colorScheme,
    setColorScheme,
    fontScheme,
    setFontScheme,
    previewOpen,
    setPreviewOpen,
  } = useContext(ThemeOptionsContext)
  const {
    name,
    siteName,
    themeOptions: { showThemeSwitcher, fontScheme: ssrFontScheme },
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
      <Fonts
        fontScheme={typeof window === 'undefined' ? ssrFontScheme : fontScheme}
      />
      <SEO {...seoProps} />
      {/* <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <Nav
              toggleNav={toggleNav}
              setToggleNav={setToggleNav}
              siteName={siteName}
            />
            {!!showThemeSwitcher && (
              <ThemeSwitcher
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                fontScheme={fontScheme}
                setFontScheme={setFontScheme}
                previewOpen={previewOpen}
                setPreviewOpen={setPreviewOpen}
              />
            )}
          </div>
        </header>

        <main id="site-main" className="site-main">
          <div id="swup" className="transition-fade">
            {children}
          </div>
        </main>

        <footer className="site-foot">
          &copy; {new Date().getFullYear()} <Link to={`/`}>{name}</Link>, all
          rights reserved.
        </footer>
      </div> */}



      <Nav
        toggleNav={toggleNav}
        setToggleNav={setToggleNav}
        siteName={siteName}
      />

      <div className="all-sections">
        <section className="sec-hero-main">
          <div className="pg-width">
            <div className="banner">
              <img className="bg" src="/img/pic-executive-main-banner-01.webp" alt="{{client_name}}, {{job_title}}" width="1440" height="807" />
              <div className="content-box">
                <img className="profile" src="/img/default-profile-male.svg" alt="{{client_name}}, {{job_title}}" width="140" height="140" />
                <h1>Chandler <span>Villacruz</span></h1>
                <p>Senior Marketing Manager</p>
              </div>
            </div>
          </div>
        </section>
        <section className="sec-intro-text">
          <div className="pg-width">
            <div className="content">
              {children}
              {/* <p>Since joining the web-based restaurant review company in its startup phase, <strong>Chandler Villacruz</strong> has spearheaded <em>market research</em> activities that have allowed the firm to build <i>effective advertising</i> campaigns and achieve sound <b><a>business growth</a></b>.</p>
              <div className="btn-row">
                <Link to={`/profile`} className="btn-primary">View Profile</Link>
                <Link to={`/blog`} className="btn-primary">Visit My Blog</Link>
              </div> */}
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="pg-width">
          <div className="three-col">
            <div className="col">
              <p>{siteName}<span>San Francisco, California, USA</span></p>
            </div>
            <div className="col">
              <p>Get In Touch<span>Let’s connect</span></p>
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
            <div className="col">
              <p className="sml">© {new Date().getFullYear()} {siteName},<br />All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

Layout.propTypes = {
  seoProps: PropTypes.shape(seoPropTypes).isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
