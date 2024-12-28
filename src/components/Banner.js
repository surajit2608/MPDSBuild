import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'

const Banner = ({ header, subheader, isPreview, featuredImage }) => {
  const { name, profileImage } = useSiteData()

  console.log('Banner: ', isPreview, featuredImage)

  return (
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
          {!!header && !!profileImage && (
            <img
              alt={name}
              width={140}
              height={140}
              className="profile"
              src={profileImage.childImageSharp.fluid.src}
            />
          )}
          {!!header && (
            <h1>{header}</h1>
          )}
          {!!subheader && (
            <p>{subheader}</p>
          )}
        </div>
      </div>
    </div>
  )
}

Banner.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  isPreview: PropTypes.bool,
  featuredImage: PropTypes.object,
}

export default Banner