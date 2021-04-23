import { graphql } from "gatsby"

export const heroImageFragment = graphql`
  fragment heroImageFragment on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export const serviceIconFragment = graphql`
  fragment serviceIconFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        fixed(width: 96) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`

export const logoFragment = graphql`
  fragment logoFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export const whiteLogoFragment = graphql`
  fragment whiteLogoFragment on wordpress__wp_media {
    localFile {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`

export const galleryImage = graphql`
  fragment galleryImage on wordpress__wp_media {
    alt_text
    localFile {
      childImageSharp {
        fluid(maxWidth: 1600, quality: 95) {
          ...GatsbyImageSharpFluid
          presentationWidth
        }
      }
    }
  }
`
