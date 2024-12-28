import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PhotoCard from './PhotoCard'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { addTrailingSlash } from '../utils'
import { featuredImagePropTypes } from '../proptypes'

const Moment = moment().constructor

const PhotoFeed = ({ isPreview, posts }) => (
  <Fragment>
    {!isPreview &&
      !!posts &&
      !!posts.length &&
      posts.map(({ image, slug, pageTitle, date, teaser }, index) => {
        return (
          <PhotoCard
            key={uuidv4()}
            count={index}
            image={image}
            slug={addTrailingSlash(slug)}
            pageTitle={pageTitle}
            date={date}
            teaser={teaser}
          />
        )
      })}
    {!isPreview && (!posts || !posts.length) && (
      <div>No posts yet. Please check back again soon!</div>
    )}
    {!!isPreview && (
      <div>Your posts will appear here in reverse chronological order</div>
    )}
  </Fragment>
)

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
