import React from 'react'
import { toHTML, findImgPath } from '../utils'
import { PageTemplate } from '../../templates/page'

const PagePreview = ({ entry, getAsset, widgetFor }) => {
  const header = entry.getIn(['data', 'header']) || ''
  const subheader = entry.getIn(['data', 'subheader']) || ''
  const templateKey = entry.getIn(['data', 'templateKey'])
  const missionStatement = entry.getIn(['data', 'missionStatement']) || ''
  const shortBiography = entry.getIn(['data', 'shortBiography']) || ''
  const connectWithMe = entry.getIn(['data', 'connectWithMe']) || 'Connect with me'
  const discoverConnectExplore = entry.getIn(['data', 'discoverConnectExplore']) || 'Discover, Connect and Explore'
  const longBiography_MD = toHTML(entry.getIn(['data', 'longBiography_MD'])) || ''
  const featuredImage = {
    src: findImgPath(getAsset(entry.getIn(['data', 'featuredImage', 'src']))) || '',
    alt: entry.getIn(['data', 'featuredImage', 'alt']) || '',
    caption: entry.getIn(['data', 'featuredImage', 'caption']) || '',
  }
  const extraContent = toHTML(entry.getIn(['data', 'extraContent'])) || ''
  const pageContent = toHTML(entry.getIn(['data', 'body'])) || ''
  const learnMoreButton = {
    link: entry.getIn(['data', 'learnMoreButton', 'link']) || '/about/',
    label: entry.getIn(['data', 'learnMoreButton', 'label']) || 'Read More',
  }
  const profileButton = {
    link: entry.getIn(['data', 'profileButton', 'link']) || '/profile/',
    label: entry.getIn(['data', 'profileButton', 'label']) || 'View Profile',
  }
  const blogButton = {
    link: entry.getIn(['data', 'blogButton', 'link']) || '/blog/',
    label: entry.getIn(['data', 'blogButton', 'label']) || 'Visit My Blog',
  }
  const formText = {
    name: entry.getIn(['data', 'formText', 'name']) || '',
    email: entry.getIn(['data', 'formText', 'email']) || '',
    message: entry.getIn(['data', 'formText', 'message']) || '',
    submit: entry.getIn(['data', 'formText', 'submit']) || '',
  }

  return (
    <div className="londn">
      <PageTemplate
        name={''}
        jobTitle={''}
        location={''}
        profileImage={''}
        header={header}
        subheader={subheader}
        slug="preview"
        cssSlug="preview"
        templateKey={templateKey}
        missionStatement={missionStatement}
        shortBiography={shortBiography}
        connectWithMe={connectWithMe}
        discoverConnectExplore={discoverConnectExplore}
        longBiography_MD={longBiography_MD}
        featuredImage={featuredImage}
        extraContent={extraContent}
        pageContent={pageContent}
        isPreview={true}
        recentPosts={[]}
        learnMoreButton={learnMoreButton}
        profileButton={profileButton}
        blogButton={blogButton}
        inlineImages={[]}
        socialLinks={[]}
        formText={formText}
      />
    </div>
  )
}

export default PagePreview
