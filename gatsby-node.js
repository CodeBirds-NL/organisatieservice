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
              link_website
              link_label
              resultaat
              titel
              vraag
              logo_klant {
                alt_text
                source_url
              }
              logo_klant_white {
                alt_text
                source_url
              }
              project_foto {
                alt_text
                source_url
              }
              highlights
              steps {
                stap
              }
            }
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
  const { allWordpressPost } = result.data

  const portfolioTemplate = path.resolve(`./src/templates/post.jsx`)

  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/portfolio/${edge.node.slug}`,
      component: slash(portfolioTemplate),
      context: edge.node,
    })
  })
}
