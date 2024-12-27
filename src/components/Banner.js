import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'
import PreviewableImage from './PreviewableImage'

const Banner = ({ isPreview, featuredImage }) => {
  const {
    name,
    jobTitle,
    profileImage,
  } = useSiteData()

  const nameParts = name.split(' ')

  console.log(profileImage)

  return (
    <section className="sec-hero-main">
      <div className="pg-width">
        <div className="banner">

          <img
            className="bg"
            src={isPreview ? featuredImage.src : featuredImage.m ? featuredImage.m.childImageSharp.fluid.src : featuredImage.d ? featuredImage.d.childImageSharp.fluid.src : null}
            alt={featuredImage.alt}
            width={1440}
            height={807}
          />

          <div className="content-box">
            {!!profileImage && (
              <img
                className="profile"
                src={profileImage.src}
                alt={profileImage.alt}
                width={140}
                height={140}
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