const generateFavicons = sizes => {
  return sizes.map(size => {
    return {
      src: `favicons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    }
  })
}

const dropUnusedMediaNormalizer = {
  name: "dropUnusedMediaNormalizer",
  normalizer: function({ entities }) {
    return entities.filter(
      e => !(e.__type === "wordpress__wp_media" && !e.post)
    )
  },
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
        baseUrl: `organisatieservice.nl/wp`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: ["**/posts", "**/pages", "**/media", "**/menus"],
        normalizers: normalizers => [dropUnusedMediaNormalizer, ...normalizers],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
