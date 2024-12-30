import React, { Fragment, useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
import Fonts from '../components/Fonts'
import Nav from '../components/Nav'
import { useSiteData } from '../hooks'
import { ThemeOptionsContext } from '../context/ThemeOptions'
import { getInitials } from '../utils'
import Footer from '../components/Footer'
import DynamicFavicon from '../components/DynamicFavicon'
import '../style/main.scss'

const NotFoundPage = () => {
  const [toggleNav, setToggleNav] = useState(false)
  const {
    name,
    themeOptions: { showThemeSwitcher, fontScheme: ssrFontScheme },
  } = useSiteData()
  const { colorScheme, setColorScheme, fontScheme, setFontScheme } = useContext(
    ThemeOptionsContext,
  )

  return (
    <Fragment>
      <Fonts
        fontScheme={typeof window === 'undefined' ? ssrFontScheme : fontScheme}
      />
      <Helmet bodyAttributes={{ class: 'frontend' }}>
        <html lang="en" className={`${colorScheme} ${fontScheme}`} />
        <title>Page Not Found</title>
        <meta name="robots" content="no-index, no-follow" />
        <meta
          name="description"
          content="Whoops! You entered a route that doesn&rsquo;t exist"
        />
        <link rel="icon" type="image/png" />
      </Helmet>

      <DynamicFavicon letter={getInitials(name)} bgcolor="#000" fontcolor="#fff" />
      <Nav
        name={name}
        toggleNav={toggleNav}
        setToggleNav={setToggleNav}
      />

      <div className="all-sections">
        <section className="sec-text-full">
          <div className="pg-width">
            <div className="content">
              <h2>Not Found</h2>
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </Fragment>
  )
}

export default NotFoundPage
