import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import moment from 'moment'
import { featuredImagePropTypes } from '../proptypes'

const Moment = moment().constructor

const PhotoCard = ({ count, image, slug, pageTitle, date, teaser, onClick }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <article ref={ref} onClick={onClick}>
      <img src={!!image && !!image.square && !!image.square.childImageSharp && !!image.square.childImageSharp.fluid && !!image.square.childImageSharp.fluid.src ? image.square.childImageSharp.fluid.src : '/img/default-blog-thumb-01.webp'} alt={image.alt} />
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
