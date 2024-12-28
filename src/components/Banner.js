import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'

const Banner = ({ header, subheader, imageSrc }) => {
  const { name, profileImage } = useSiteData()

  return (
    <div className="pg-width">
      <div className="banner">

        <img
          width={1440}
          height={807}
          alt="Banner"
          className="bg"
          src={imageSrc}
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
  imageSrc: PropTypes.object,
}

export default Banner