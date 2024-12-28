import React, { Fragment, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Footer from './Footer'
import Fonts from './Fonts'
import { ThemeOptionsContext } from '../context/ThemeOptions'
import { useSiteData } from '../hooks'
import SEO, { seoPropTypes } from './SEO'

import '../style/main.scss'
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

  useEffect(() => {
    faviconLetter("#000", "#fff", getInitials(siteName))
  }, [])

  const faviconLetter = (bgcolor, fontcolor, letter) => {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      size = 32,
      roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined") {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 6;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (stroke) {
          ctx.stroke();
        }
        if (fill) {
          ctx.fill();
        }
      };

    canvas.width = canvas.height = size;
    ctx.save();
    ctx.fillStyle = bgcolor;
    roundRect(ctx, 0, 0, size, size, 8, true, false);
    ctx.font = "16px Calibri";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fontcolor;
    ctx.fillText(letter.toUpperCase(), size / 2, (size / 2) + 2);
    ctx.restore();

    document.querySelector("link[rel='shortcut icon']").setAttribute('href', canvas.toDataURL("img/png"));
  }

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
