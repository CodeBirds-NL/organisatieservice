module.exports = {
  siteMetadata: {
    title: `Organisatieservice`,
    description: `Dé specialist in wat jij nodig hebt!`,
    url: "https://organisatieservice.nl",
    image: "/seo_image.webp",
    author: `@codebirds`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-102645065-4",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `organisatieservice`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'dev-gatbsyjswp.pantheonsite.io' or 'www.example-site.com'
         */
        baseUrl: `os.codebirds.nl/wp`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/media",
          "**/categories",
          "**/tags",
          "**/taxonomies",
          "**/users",
          "**/menus",
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
