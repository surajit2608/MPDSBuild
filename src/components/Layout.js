import React, { Fragment, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Footer from './Footer'
import Fonts from './Fonts'
import { ThemeOptionsContext } from '../context/ThemeOptions'
import { useSiteData } from '../hooks'
import SEO, { seoPropTypes } from './SEO'

import '../style/main.scss'
import DynamicFavicon from './DynamicFavicon'
import { getInitials } from '../utils'


const Layout = ({ seoProps, children }) => {
  const [toggleNav, setToggleNav] = useState(false)
  const {
    fontScheme,
  } = useContext(ThemeOptionsContext)
  const {
    siteName,
    themeOptions: { showThemeSwitcher, fontScheme: ssrFontScheme },
  } = useSiteData()

  return (
    <Fragment>
      <DynamicFavicon letter={getInitials(siteName)} bgcolor="#000" fontcolor="#fff" />
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
