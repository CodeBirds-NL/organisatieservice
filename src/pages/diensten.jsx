import React, { Component } from "react"
import Hero from "../components/common/hero"
import Layout from "../components/layout"
import { StaticQuery, Link } from "gatsby"
import ActionBarParent from "../components/actionBar"
import "../components/styles/pages/diensten.scss"

class Diensten extends Component {
  render() {
    const { title, text, image, cta } = this.props.data.acf.services_page
    return (
      <Layout>
        <Hero
          buttonLabel={cta}
          image={
            <img
              className="portfolioHeroImage"
              src={image.source_url}
              alt={image.alt_text}
            />
          }
          blobContent={<ActionBarParent src="diensten" />}
        >
          <h1 className="title">{title}</h1>
          <p className="text">{text}</p>
          <div className="buttonGroup">
            <a href="#" className="btn ghostery gray">
              {cta}
            </a>
            <Link to="/contact" className="btn underline ml-2">
              Contact
            </Link>
          </div>
        </Hero>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(filter: { slug: { eq: "diensten" } }) {
          edges {
            node {
              acf {
                services_page {
                  title
                  text
                  cta
                  image {
                    source_url
                    alt_text
                  }
                  services {
                    cta
                    text
                    title
                    image {
                      alt_text
                      source_url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Diensten data={data.allWordpressPage.edges[0].node} />}
  />
)
