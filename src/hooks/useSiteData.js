import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const query = useStaticQuery(
    graphql`
      query SiteDataQuery {
        markdownRemark(frontmatter: { templateKey: { eq: "site-data" } }) {
          frontmatter {
            name
            jobTitle
            siteName
            location
            profileImage {
              src {
                childImageSharp {
                  original {
                    height
                    width
                  }
                  fluid(maxWidth: 1440) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                }
              }
              alt
            }
            siteUrl
            socialLinks {
              twitter {
                url
                label
                show
              }
              facebook {
                url
                label
                show
              }
              linkedin {
                url
                label
                show
              }
              pinterest {
                url
                label
                show
              }
              instagram {
                url
                label
                show
              }
            }
            themeOptions {
              colorScheme
              fontScheme
              showThemeSwitcher
            }
            fallbackImage {
              childImageSharp {
                original {
                  height
                  width
                }
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid_withWebp
                  originalName
                }
              }
            }
          }
        }
      }
    `,
  )
  return query.markdownRemark.frontmatter
}
