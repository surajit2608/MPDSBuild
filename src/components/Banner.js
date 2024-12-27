import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'

const Banner = ({ isPreview, featuredImage }) => {
  const {
    name,
    jobTitle,
    themeOptions: { showThemeSwitcher, fontScheme: ssrFontScheme },
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
  } = useSiteData()

  const nameParts = name.split(' ')

  return (
    <section className="sec-hero-main">
      <div className="pg-width">
        <div className="banner">
          <img
            className="bg"
            src={
              isPreview
                ? featuredImage.src
                : { m: featuredImage.m, d: featuredImage.d }
            }
            alt={featuredImage.alt}
            width={1440}
            height={807}
          />
          <div className="content-box">
            <img
              className="profile"
              src="/img/default-profile-male.svg"
              alt={featuredImage.alt}
              width={140}
              height={140}
            />
            <h1>{nameParts[0]} <span>{nameParts.slice(1).join(' ')}</span></h1>
            <p>{jobTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

Banner.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  featuredImage: PropTypes.object.isRequired,
}

export default Banner