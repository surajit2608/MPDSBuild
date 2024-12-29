import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import moment from 'moment'
import { featuredImagePropTypes } from '../proptypes'

const Moment = moment().constructor

const PhotoCard = ({ count, image, slug, pageTitle, date, teaser, onClick }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <article ref={ref}>
      <img src={!!image ? image.square.childImageSharp.fluid.src : '/img/default-blog-thumb-01.webp'} alt={pageTitle} onClick={onClick} />
      <p>{teaser}</p>
    </article>
  )
}

export const postPropTypes = {
  count: PropTypes.number.isRequired,
  image: featuredImagePropTypes,
  slug: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Moment),
  teaser: PropTypes.string,
  onClick: PropTypes.func,
}

PhotoCard.propTypes = postPropTypes

export default PhotoCard
