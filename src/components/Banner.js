import React from 'react'
import PropTypes from 'prop-types'

const Banner = ({ name, jobTitle }) => {

  const nameParts = name.split(' ')

  return (
    <section className="sec-hero-main">
      <div className="pg-width">
        <div className="banner">
          <img className="bg" src="/img/pic-executive-main-banner-01.webp" alt="{{client_name}}, {{job_title}}" width="1440" height="807" />
          <div className="content-box">
            <img className="profile" src="/img/default-profile-male.svg" alt="{{client_name}}, {{job_title}}" width="140" height="140" />
            <h1>{nameParts[0]} <span>{nameParts.slice(1).join(' ')}</span></h1>
            <p>{jobTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

Banner.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
}

export default Banner