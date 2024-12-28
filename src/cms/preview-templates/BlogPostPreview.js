import React from 'react'
import { toHTML, findImgPath } from '../utils'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, getAsset, widgetFor }) => {
  const pageTitle = entry.getIn(['data', 'pageTitle']) || '(Article Title)'
  const date = entry.getIn(['data', 'date']) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))),
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const content = toHTML(entry.getIn(['data', 'body']))
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
      <BlogPostTemplate
        pageTitle={pageTitle}
        date={date}
        featuredImage={featuredImage}
        content={content}
        isPreview={true}
        profileButton={profileButton}
        blogButton={blogButton}
      />
    </div>
  )
}

export default BlogPostPreview
