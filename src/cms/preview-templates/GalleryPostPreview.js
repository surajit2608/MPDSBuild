import React from 'react'
import { findImgPath } from '../utils'
import { GalleryPostTemplate } from '../../templates/gallery-post'

const GalleryPostPreview = ({ entry, getAsset, widgetFor }) => {
  const pageTitle = entry.getIn(['data', 'pageTitle']) || '(Gallery Title)'
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))),
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const content = entry.getIn(['data', 'excerpt']) || ''
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
        featuredImage={featuredImage}
        content={content}
        isPreview={true}
        profileButton={profileButton}
        blogButton={blogButton}
      />
    </div>
  )
}

export default GalleryPostPreview
