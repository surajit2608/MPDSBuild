import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, PhotoFeed } from '../components'
import { postPropTypes } from '../components/PhotoCard'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps, getValidDates, addTrailingSlash } from '../utils'
import Banner from '../components/Banner'

export const GalleryArchiveTemplate = ({
  header,
  subheader,
  posts,
  featuredImage,
  isPreview,
  profileButton,
  blogButton
}) => {
  const hasFeaturedImage = !!featuredImage && !!featuredImage.src
  return (
    <Fragment>
      <section className="sec-hero-sml">
        <Banner
          header={header}
          subheader={subheader}
          isPreview={hasFeaturedImage ? isPreview : true}
          featuredImage={hasFeaturedImage ? featuredImage : { src: '/img/pic-executive-banner-gallery-01.webp' }}
        />
      </section>

      <section className="sec-picture-list">
        <div className="pg-width">
          <div className="content">
            <div className="all-pics">
              <PhotoFeed isPreview={isPreview} posts={posts} />
            </div>
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
    </Fragment>
  )
}

const GalleryArchive = ({ data }) => {
  const { header, subheader, featuredImage, profileButton, blogButton } = data.markdownRemark.frontmatter
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const {
      frontmatter: { featuredImage, pageTitle, date: userDate },
      fields: { slug, gitAuthorTime, gitCreatedTime },
    } = node
    const { date } = getValidDates(userDate, gitAuthorTime, gitCreatedTime)
    return {
      image: !!featuredImage ? featuredImage : null,
      slug,
      pageTitle,
      date,
      content: node.html,
    }
  })
  const pageProps = {
    header,
    subheader,
    featuredImage,
    posts,
    profileButton,
    blogButton
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <GalleryArchiveTemplate {...pageProps} />
    </Layout>
  )
}

GalleryArchiveTemplate.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropTypes)),
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
  profileButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default GalleryArchive

export const pageQuery = graphql`
  query GalleryArchiveTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "gallery-archive" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
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
                maxHeight: 270
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
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "gallery-post" }
          published: { eq: true }
        }
      }
    ) {
      edges {
        node {
          html
          fields {
            slug
            gitAuthorTime
            gitCreatedTime
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            pageTitle
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
              m: src {
                childImageSharp {
                  fluid(maxWidth: 500, maxHeight: 664, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
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
                  fluid(maxWidth: 1000, maxHeight: 664, cropFocus: CENTER) {
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
            }
          }
        }
      }
    }
  }
`
