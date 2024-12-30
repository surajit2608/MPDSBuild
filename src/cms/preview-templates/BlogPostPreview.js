import React from 'react'
import { toHTML, findImgPath } from '../utils'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, getAsset, widgetFor }) => {
  const pageTitle = entry.getIn(['data', 'pageTitle']) || ''
  const date = entry.getIn(['data', 'date']) || ''
  const dateModified = entry.getIn(['data', 'dateModified']) || ''
  const content = toHTML(entry.getIn(['data', 'body'])) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))) || '/img/pic-executive-banner-blog-01.webp',
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const profileButton = {
    link: entry.getIn(['data', 'profileButton', 'link']) || '/profile/',
    label: entry.getIn(['data', 'profileButton', 'label']) || 'View Profile',
  }
  const buttonBlog = {
    link: entry.getIn(['data', 'buttonBlog', 'link']) || '/blog/',
    label: entry.getIn(['data', 'buttonBlog', 'label']) || 'Visit My Blog',
  }

  return (
    <div className="londn">
      <BlogPostTemplate
        pageTitle={pageTitle}
        name={''}
        profileImage={''}
        date={date}
        dateModified={dateModified}
        content={content}
        featuredImage={featuredImage}
        isPreview={true}
        inlineImages={[]}
        profileButton={profileButton}
        buttonBlog={buttonBlog}
      />
    </div>
  )
}

export default BlogPostPreview
