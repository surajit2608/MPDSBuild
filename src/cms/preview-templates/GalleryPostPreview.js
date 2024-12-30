import React from 'react'
import { findImgPath } from '../utils'
import { GalleryPostTemplate } from '../../templates/gallery-post'

const GalleryPostPreview = ({ entry, getAsset, widgetFor }) => {
  const pageTitle = entry.getIn(['data', 'pageTitle']) || ''
  const content = entry.getIn(['data', 'teaser']) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))) || '/img/pic-executive-banner-blog-01.webp',
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const profileButton = {
    link: entry.getIn(['data', 'profileButton', 'link']) || '/profile/',
    label: entry.getIn(['data', 'profileButton', 'label']) || 'View Profile',
  }
  const blogButton = {
    link: entry.getIn(['data', 'blogButton', 'link']) || '/blog/',
    label: entry.getIn(['data', 'blogButton', 'label']) || 'Visit My Blog',
  }

  return (
    <div className="londn">
      <GalleryPostTemplate
        pageTitle={pageTitle}
        name={''}
        profileImage={''}
        date={''}
        dateModified={''}
        content={content}
        featuredImage={featuredImage}
        isPreview={true}
        inlineImages={[]}
        profileButton={profileButton}
        blogButton={blogButton}
      />
    </div>
  )
}

export default GalleryPostPreview
