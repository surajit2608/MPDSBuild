import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { featuredImagePropTypes } from '../proptypes'
import { useRecentPosts, useSiteData } from '../hooks'
import { addTrailingSlash, seoProps } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import Layout from '../components/Layout'
import Banner from '../components/Banner'

export const PageTemplate = ({
  name,
  jobTitle,
  location,
  header,
  subheader,
  slug,
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
  socialLinks,
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

    <section className={templateKey === 'index-page' ? 'sec-intro-text' : 'sec-text-full'}>
      <div className="pg-width">
        <div className="content">

          {templateKey === 'profile-page' && (
            <Fragment>
              <h2>{name}</h2>
              <p class="title">{jobTitle}</p>
              <p class="location">{location}</p>
            </Fragment>
          )}

          {(templateKey === 'index-page' || templateKey === 'profile-page') && (
            <div
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          )}

          <div class="btn-row">
            {!!profileButton && (
              <Link className="btn-primary" to={addTrailingSlash(profileButton.link)}>
                {profileButton.label}
              </Link>
            )}
            {!!blogButton && (
              <Link className="btn-primary" to={addTrailingSlash(blogButton.link)}>
                {blogButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>

    {templateKey === 'profile-page' && (
      <section class="sec-three-box">
        <div class="pg-width">
          <div class="heading-row">
            <h3>{connectWithMe}</h3>
            <p>{discoverConnectExplore}</p>
          </div>
          <div class="all-boxes">
            {!!socialLinks && !!socialLinks.length && socialLinks.map((social) => (
              <div className="ech-box" key={uuidv4()}>
                <a href={Object.values(social)[0].url} target="_blank" className="sm-icon">
                  <img src={`/img/${Object.keys(social)[0].toLowerCase()}-color.svg`} alt={Object.keys(social)[0]} width="60" height="60" />
                </a>
                <p>{Object.keys(social)[0]}</p>
                <div class="btn-row">
                  <a href={Object.values(social)[0].url} target="_blank" class="btn-primary">Visit</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}
  </Fragment>
)

PageTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  templateKey: PropTypes.string.isRequired,
  slug: PropTypes.string,
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
      pageContent,
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
  const {
    name,
    jobTitle,
    location,
    socialLinks: { twitter, facebook, linkedin, pinterest, instagram },
  } = useSiteData()

  const socialLinks = [
    { Twitter: twitter },
    { Facebook: facebook },
    { LinkedIn: linkedin },
    { Pinterest: pinterest },
    { Instagram: instagram },
  ].filter(
    (item) =>
      !!Object.values(item)[0] &&
      !!Object.values(item)[0].url &&
      !!Object.values(item)[0].show,
  )

  const pageProps = {
    name,
    jobTitle,
    location,
    header,
    subheader,
    templateKey,
    slug,
    cssSlug: slug === '/' ? 'home' : slug.split('/').join('-'),
    missionStatement,
    shortBiography,
    connectWithMe,
    discoverConnectExplore,
    longBiography_MD,
    pageContent,
    // null out the featured image if empty to prevent erroneous proptype warnings
    featuredImage: !!featuredImage && !!featuredImage.src ? featuredImage : null,
    extraContent: data.markdownRemark.html,
    recentPosts: showRecentPosts ? recentPosts : [],
    inlineImages,
    learnMoreButton,
    profileButton,
    blogButton,
    socialLinks,
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
        pageContent
        missionStatement
        showRecentPosts
        learnMoreButton {
          link
          label
        }
        profileButton {
          link
          label
        }
        blogButton {
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
                maxWidth: 1440
                maxHeight: 450
                quality: 100
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
