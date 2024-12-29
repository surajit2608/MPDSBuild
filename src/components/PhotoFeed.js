import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import PhotoCard from './PhotoCard'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { addTrailingSlash } from '../utils'
import { featuredImagePropTypes } from '../proptypes'

const Moment = moment().constructor

const PhotoFeed = ({ isPreview, posts }) => {
  const [activePost, setActivePost] = useState(null)
  const [isLightboxActive, setIsLightboxActive] = useState(false)

  const handleClick = (post) => {
    setActivePost(post)
    setIsLightboxActive(true)
  }

  const handleClose = () => {
    setIsLightboxActive(false)
    setActivePost(null)
  }

  const handleNavigation = (direction) => {
    const currentIndex = posts.findIndex(({ image, slug, pageTitle, date, teaser }) => image.d.childImageSharp.fluid.src === activePost.image.d.childImageSharp.fluid.src)
    const newIndex = direction === 'left' ? (currentIndex === 0 ? posts.length - 1 : currentIndex - 1) : (currentIndex === posts.length - 1 ? 0 : currentIndex + 1)
    setActivePost(posts[newIndex])
  }

  return (
    <Fragment>
      {!isPreview &&
        !!posts &&
        !!posts.length &&
        posts.map(({ image, slug, pageTitle, date, teaser }, index) => {
          return (
            <PhotoCard
              date={date}
              count={index}
              image={image}
              key={uuidv4()}
              teaser={teaser}
              pageTitle={pageTitle}
              slug={addTrailingSlash(slug)}
              onClick={() => handleClick({ image, slug, pageTitle, date, teaser })}
            />
          )
        })}
      {!isPreview && (!posts || !posts.length) && (
        <div>No posts yet. Please check back again soon!</div>
      )}
      {!!isPreview && (
        <div>Your posts will appear here in reverse chronological order</div>
      )}

      {isLightboxActive && (
        <section className="lightbox-container active">
          <span className="material-symbols-outlined material-icons lightbox-btn left" onClick={() => handleNavigation('left')}>{'<'}</span>
          <span className="material-symbols-outlined material-icons lightbox-btn right" onClick={() => handleNavigation('right')}>{'>'}</span>
          <span id="close" className="close material-icons material-symbols-outlined" onClick={handleClose}>X</span>
          <div className="lightbox-image-wrapper">
            <img alt={activePost.pageTitle} className="lightbox-image" src={activePost.image.d.childImageSharp.fluid.src} />
            {!!activePost.teaser && (
              <p>{activePost.teaser}</p>
            )}
          </div>
        </section>
      )}
    </Fragment>
  )
}

PhotoFeed.propTypes = {
  isPreview: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      image: featuredImagePropTypes,
      slug: PropTypes.string,
      pageTitle: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Moment),
      teaser: PropTypes.string,
    }),
  ),
}

export default PhotoFeed
