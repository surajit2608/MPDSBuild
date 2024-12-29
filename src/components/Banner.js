import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'

const Banner = ({ header, subheader, imageSrc, imageAlt, profileImage }) => {
  return (
    <div className="pg-width">
      <div className="banner">

        <img
          width={1440}
          height={807}
          className="bg"
          alt={imageAlt}
          src={imageSrc}
        />

        <div className="content-box">
          {!!header && !!profileImage && !!profileImage.src && !!profileImage.src.childImageSharp && !!profileImage.src.childImageSharp.fluid && !!profileImage.src.childImageSharp.fluid.src && (
            <img
              width={140}
              height={140}
              className="profile"
              alt={!!profileImage && profileImage.alt}
              src={profileImage.src.childImageSharp.fluid.src}
            />
          )}
          {!!header && (
            <h1>{header.split(' ')[0]} {header.split(' ')[1] && (<span>{header.split(' ')[1]}</span>)}</h1>
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
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  profileImage: PropTypes.object
}

export default Banner