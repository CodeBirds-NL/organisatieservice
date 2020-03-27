import React, { Component } from "react"
import { graphql } from "gatsby"
import ActionBar from "../components/actionBar"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/pages/homePage.scss"
import Hero from "../components/common/hero"

class HomePage extends Component {
  render() {
    const { title, acf } = this.props.data.allWordpressPage.edges[0].node
    return (
      <Layout>
        <SEO title={title} />
        <Hero
          buttonLabel={acf.hero_call_to_action}
          image={
            <img
              className="homeHeroImage"
              src={acf.hero_image.source_url}
              alt={acf.hero_image.alt_text}
            />
          }
          blobContent={<ActionBar src="home" />}
        >
          <h1 className="title">{acf.hero_title}</h1>
          <h1 className="subTitle">{acf.hero_subtitle}</h1>
          <p className="text">{acf.hero_text}</p>
        </Hero>
      </Layout>
    )
  }
}

export default HomePage

export const query = graphql`
  query HomePageQuery {
    allWordpressPage(filter: { slug: { eq: "home" } }) {
      edges {
        node {
          acf {
            hero_call_to_action
            hero_subtitle
            hero_text
            hero_title
            hero_image {
              source_url
              alt_text
            }
          }
          title
        }
      }
    }
  }
`
