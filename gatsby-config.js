const generateFavicons = sizes => {
  return sizes.map(size => {
    return {
      src: `favicons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    }
  })
}

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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/src/fonts/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `organisatieservice`,
        short_name: "Organisatieservice",
        background_color: `#ffffff`,
        theme_color: `#007be0`,
        start_url: `/`,
        display: `minimal-ui`,
        // Icons Hybrid mode -> to workaround Apache issue with default /icons directory
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        icons: generateFavicons([48, 72, 96, 144, 192, 256, 384, 512]),
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'dev-gatbsyjswp.pantheonsite.io' or 'www.example-site.com'
         */
        baseUrl: `organisatieservice.nl/wp`,
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
