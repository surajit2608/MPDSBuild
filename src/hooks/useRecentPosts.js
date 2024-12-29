import { useStaticQuery, graphql } from 'gatsby'
import { getValidDates } from '../utils'

export default () => {
  const data = useStaticQuery(
    graphql`
      query QueryRecentPosts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              published: { eq: true }
            }
          }
          limit: 4
        ) {
          edges {
            node {
              fields {
                slug
                gitAuthorTime
                gitCreatedTime
              }
              frontmatter {
                date(formatString: "MMM D, YYYY")
                pageTitle
                teaser
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
                }
              }
            }
          }
        }
      }
    `,
  )
  if (
    data &&
    data.allMarkdownRemark &&
    data.allMarkdownRemark.edges &&
    data.allMarkdownRemark.edges.length > 0
  ) {
    return data.allMarkdownRemark.edges.map(({ node }) => {
      const {
        frontmatter: { featuredImage, pageTitle, date: userDate, teaser },
        fields: { slug, gitAuthorTime, gitCreatedTime },
      } = node
      const { date, dateModified } = getValidDates(
        userDate,
        gitAuthorTime,
        gitCreatedTime,
      )
      return {
        image: !!featuredImage ? featuredImage : null,
        slug,
        pageTitle,
        date,
        dateModified,
        teaser
      }
    })
  } else {
    return []
  }
}
