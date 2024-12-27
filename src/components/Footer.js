import React from 'react'
import PropTypes from 'prop-types'
import { useSiteData } from '../hooks'
import { v4 as uuidv4 } from 'uuid'

const SocialLink = ({ slug, name }) => (
  <a className="smi" rel="noopener" target="_blank" href={slug}>
    {name}
  </a>
)

SocialLink.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const Footer = () => {
  const {
    siteName,
    location,
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
  } = useSiteData()

  const socialLinks = [
    { Twitter: twitter },
    { Facebook: facebook },
    { LinkedIn: linkedin },
    { Pinterest: pinterest },
    { Instagram: instagram },
  ].filter(
    (item) =>
      !!Object.values(item)[0] &&
      !!Object.values(item)[0].url &&
      !!Object.values(item)[0].show,
  )

  return (
    <footer>
      <div className="pg-width">
        <div className="three-col">
          <div className="col">
            <p>{siteName}<span>{location}</span></p>
          </div>
          <div className="col">
            <p>Get In Touch<span>Let’s connect</span></p>
            {!!socialLinks && !!socialLinks.length && socialLinks.map((social) => (
              <SocialLink
                key={uuidv4()}
                name={Object.keys(social)[0]}
                slug={Object.values(social)[0].url}
              />
            ))}
          </div>
          <div className="col">
            <p className="sml">© {new Date().getFullYear()} {siteName},<br />All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer