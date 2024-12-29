import React, { Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, HTMLContent } from '../components'
import { useSiteData } from '../hooks'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps, getValidDates, addTrailingSlash } from '../utils'
import Banner from '../components/Banner'

const Moment = moment().constructor

export const BlogPostTemplate = ({
  pageTitle,
  name,
  date,
  dateModified,
  content,
  featuredImage,
  isPreview,
  inlineImages,
  profileButton,
  blogButton,
}) => {
  const featuredImageSrc = isPreview ? featuredImage.src : !!featuredImage && !!featuredImage.d && !!featuredImage.d.childImageSharp && !!featuredImage.d.childImageSharp.fluid && !!featuredImage.d.childImageSharp.fluid.src ? featuredImage.d.childImageSharp.fluid.src : '/img/pic-executive-banner-blog-01.webp'

  return (
    <Fragment>
      <section className="sec-article-pic">
        <Banner
          header={''}
          subheader={''}
          imageSrc={featuredImageSrc}
          imageAlt={featuredImage.alt}
        />
      </section>

      <section className="sec-article-full">
        <div className="pg-width">
          <article className="content">
            <div class="btn-row">
              <Link to="/blog/" className="btn-back">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.199584 7.46322L6.59973 0.26186C6.9343 -0.0787819 7.42011 -0.0758913 7.731 0.205599C8.0419 0.487085 8.0687 1.02612 7.78725 1.33707L2.57464 7.2007H23.2C23.6418 7.2007 24 7.55892 24 8.00085C24 8.44277 23.6418 8.801 23.2 8.801H2.57464L7.78725 14.6646C8.0687 14.9756 8.03263 15.5047 7.731 15.7961C7.41698 16.0994 6.88117 16.0508 6.59973 15.7398L0.199584 8.53843C-0.0831038 8.14319 -0.0494198 7.80829 0.199584 7.46322Z" fill="#3171B3"></path>
                </svg>
                <span>View all posts</span>
              </Link>
            </div>

            <h1>{pageTitle}</h1>
            {!!date && (
              <p className="date">{date.format('MMM D, YYYY')}</p>
            )}

            <HTMLContent
              content={content}
              inlineImages={inlineImages}
            />

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
          </article>
        </div>
      </section>
    </Fragment>
  )
}

const BlogPost = ({ data }) => {
  const { name } = useSiteData()
  const {
    pageTitle,
    featuredImage,
    date: userDate,
    profileButton,
    blogButton,
  } = data.markdownRemark.frontmatter
  const {
    gitAuthorTime,
    gitCreatedTime,
    inlineImages,
  } = data.markdownRemark.fields
  const { date, dateModified } = getValidDates(
    userDate,
    gitAuthorTime,
    gitCreatedTime,
  )
  const pageProps = {
    pageTitle,
    name,
    date,
    dateModified,
    featuredImage,
    content: data.markdownRemark.html,
    inlineImages,
    profileButton,
    blogButton,
  }
  return (
    <Layout seoProps={seoProps(data)}>
      <BlogPostTemplate {...pageProps} />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Moment).isRequired,
  dateModified: PropTypes.instanceOf(Moment).isRequired,
  content: PropTypes.string.isRequired,
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
  inlineImages: PropTypes.array,
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
        inlineImages {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_withWebp
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        profileButton {
          link
          label
        }
        blogButton {
          link
          label
        }
        date(formatString: "MMM D, YYYY")
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
              fluid(maxWidth: 720, maxHeight: 270, quality: 100, cropFocus: CENTER) {
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
              fluid(maxWidth: 1440, maxHeight: 270, quality: 100, cropFocus: CENTER) {
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
  }
`
