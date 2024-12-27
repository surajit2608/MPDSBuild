import React, { Fragment, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Footer from './Footer'
import Fonts from './Fonts'
import { ThemeOptionsContext } from '../context/ThemeOptions'
import { useSiteData } from '../hooks'
import SEO, { seoPropTypes } from './SEO'

import '../style/main.scss'


const Layout = ({ seoProps, children }) => {
  const [toggleNav, setToggleNav] = useState(false)
  const {
    fontScheme,
  } = useContext(ThemeOptionsContext)
  const {
    name,
    jobTitle,
    siteName,
    themeOptions: { showThemeSwitcher, fontScheme: ssrFontScheme },
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
  } = useSiteData()

  const socialLinks = [
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

      <Nav
        siteName={siteName}
        toggleNav={toggleNav}
        setToggleNav={setToggleNav}
      />

      <div className="all-sections">
        {children}
      </div>

      <Footer />

    </Fragment>
  )
}

Layout.propTypes = {
  seoProps: PropTypes.shape(seoPropTypes).isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
