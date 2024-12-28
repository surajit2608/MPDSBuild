import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { featuredImagePropTypes } from '../proptypes'
import { useRecentPosts } from '../hooks'
import { seoProps } from '../utils'
import PageHeader from '../components/PageHeader'
import ShortBiography from '../components/ShortBiography'
import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import ExtraContent from '../components/ExtraContent'
import PostFeed from '../components/PostFeed'
import PreviewableImage from '../components/PreviewableImage'
import HTMLContent from '../components/HTMLContent'
import Banner from '../components/Banner'

export const PageTemplate = ({
  header,
  subheader,
  cssSlug,
  templateKey,
  missionStatement,
  shortBiography,
  connectWithMe,
  discoverConnectExplore,
  longBiography_MD,
  featuredImage,
  extraContent,
  pageContent,
  isPreview,
  recentPosts,
  learnMoreButton,
  profileButton,
  blogButton,
  inlineImages,
  formText,
}) => (
  <Fragment>
    {!!featuredImage && (
      <section className={templateKey === 'index-page' ? 'sec-hero-main' : 'sec-hero-sml'}>
        <Banner
          header={header}
          subheader={subheader}
          isPreview={isPreview}
          featuredImage={featuredImage}
        />
      </section>
    )}

    <section className={templateKey === 'index-page' ? 'sec-intro-text' : templateKey === 'gallery-page' ? 'sec-picture-list' : 'sec-text-full'}>
      <div className="pg-width">
        <div className="content">

          {/* <PageHeader
            header={header}
            subheader={subheader}
            missionStatement={missionStatement}
          />
          <section className="post-content-body">
            {templateKey !== 'index-page' && !!featuredImage && (
              <figure className="gatsby-resp-image-card-full">
                <PreviewableImage
                  isPreview={isPreview}
                  src={
                    isPreview
                      ? featuredImage.src
                      : { m: featuredImage.m, d: featuredImage.d }
                  }
                  alt={featuredImage.alt}
                  caption={featuredImage.caption}
                />
              </figure>
            )}
            {!!shortBiography && (
              <ShortBiography
                learnMoreButton={learnMoreButton}
                shortBiography={shortBiography}
                image={featuredImage}
                isPreview={isPreview}
              />
            )}
            {!!longBiography_MD && (
              <HTMLContent
                className="gatsby-resp-image-card"
                content={longBiography_MD}
                inlineImages={inlineImages}
              />
            )}
            {templateKey === 'contact-page' && !!formText && (
              <ContactForm formText={formText} isPreview={isPreview} />
            )}
            {templateKey === 'gallery-page' && !!formText && (
              <ContactForm formText={formText} isPreview={isPreview} />
            )}
            {!!recentPosts && !!recentPosts.length && (
              <Fragment>
                <hr />
                <h2>Recent Blog Posts</h2>
                <PostFeed isPreview={isPreview} posts={recentPosts} />
              </Fragment>
            )}
            {!!extraContent && (
              <ExtraContent
                content={extraContent}
                page={templateKey}
                inlineImages={inlineImages}
              />
            )}
            {!!pageContent && (
              <ExtraContent
                content={pageContent}
                page={templateKey}
                inlineImages={inlineImages}
              />
            )}
          </section> */}

        </div>
      </div>
    </section>
  </Fragment>
)

PageTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  templateKey: PropTypes.string.isRequired,
  cssSlug: PropTypes.string.isRequired,
  missionStatement: PropTypes.string,
  shortBiography: PropTypes.string,
  connectWithMe: PropTypes.string,
  discoverConnectExplore: PropTypes.string,
  featuredImage: featuredImagePropTypes,
  extraContent: PropTypes.string,
  pageContent: PropTypes.string,
  learnMoreButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  profileButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  blogButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  isPreview: PropTypes.bool,
  recentPosts: PropTypes.array,
  inlineImages: PropTypes.array,
  formText: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }),
}

const Page = ({ data }) => {
  const {
    frontmatter: {
      header,
      subheader,
      templateKey,
      missionStatement,
      shortBiography,
      connectWithMe,
      discoverConnectExplore,
      longBiography_MD,
      featuredImage,
      showRecentPosts,
      learnMoreButton,
      profileButton,
      blogButton,
      formText,
    },
    fields: { inlineImages, slug },
  } = data.markdownRemark
  const recentPosts = useRecentPosts()
  const pageProps = {
    header,
    subheader,
    templateKey,
    cssSlug: slug === '/' ? 'home' : slug.split('/').join('-'),
    missionStatement,
    shortBiography,
    connectWithMe,
    discoverConnectExplore,
    longBiography_MD,
    // null out the featured image if empty to prevent erroneous proptype warnings
    featuredImage: !!featuredImage && !!featuredImage.src ? featuredImage : null,
    extraContent: data.markdownRemark.html,
    pageContent: data.markdownRemark.html,
    recentPosts: showRecentPosts ? recentPosts : [],
    inlineImages,
    learnMoreButton,
    profileButton,
    blogButton,
    formText,
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <PageTemplate {...pageProps} />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query PageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
        inlineImages {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_withWebp
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
      html
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
        shortBiography
        connectWithMe
        discoverConnectExplore
        longBiography_MD
        missionStatement
        showRecentPosts
        learnMoreButton {
          link
          label
        }
        featuredImage {
          src {
            childImageSharp {
              fluid {
                originalName
              }
              original {
                height
                width
              }
            }
          }
          d: src {
            childImageSharp {
              fluid(
                maxWidth: 1200
                maxHeight: 450
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          m: src {
            childImageSharp {
              fluid(
                maxWidth: 900
                maxHeight: 506
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          square: src {
            childImageSharp {
              fluid(
                maxWidth: 420
                maxHeight: 360
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
              original {
                height
                width
              }
            }
          }
          alt
          caption
        }
        formText {
          name
          email
          message
          submit
        }
      }
    }
  }
`
