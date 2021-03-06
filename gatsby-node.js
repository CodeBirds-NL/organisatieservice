const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            id
            slug
            title
            acf {
              aanpak
              aanpak_title
              link_website
              link_label
              resultaat
              resultaat_title
              titel
              vraag
              hero_buttons {
                label
                link
              }
              project_foto {
                alt_text
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
              highlights
              steps {
                stap
              }
            }
          }
        }
      }
      allWordpressPage(filter: { template: { eq: "service.php" } }) {
        edges {
          node {
            wordpress_id
            slug
            template
            title
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPost, allWordpressPage } = result.data

  const portfolioTemplate = path.resolve(`./src/templates/post.jsx`)
  const serviceTemplate = path.resolve(`./src/templates/service.jsx`)

  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/portfolio/${edge.node.slug}`,
      component: slash(portfolioTemplate),
      context: edge.node,
    })
  })

  allWordpressPage.edges.forEach(edge => {
    createPage({
      path: `/diensten/${edge.node.slug}`,
      component: slash(serviceTemplate),
      context: { ...edge.node },
    })
  })
}
