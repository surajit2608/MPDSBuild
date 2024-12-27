import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'

const Banner = ({ isPreview, featuredImage }) => {
  const {
    name,
    jobTitle,
    profileImage,
  } = useSiteData()

  const nameParts = name.split(' ')

  return (
    <section className="sec-hero-main">
      <div className="pg-width">
        <div className="banner">

          <img
            width={1440}
            height={807}
            className="bg"
            alt={featuredImage.alt}
            src={isPreview ? featuredImage.src : featuredImage.d ? featuredImage.d.childImageSharp.fluid.src : featuredImage.m ? featuredImage.m.childImageSharp.fluid.src : null}
          />

          <div className="content-box">
            {!!profileImage && (
              <img
                alt={name}
                width={140}
                height={140}
                className="profile"
                src={profileImage.childImageSharp.fluid.src}
              />
            )}
            <h1>{nameParts[0]} <span>{nameParts.slice(1).join(' ')}</span></h1>
            <p>{jobTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

Banner.propTypes = {
  isPreview: PropTypes.bool,
  featuredImage: PropTypes.object,
}

export default Banner