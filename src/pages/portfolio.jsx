import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ActionBarParent from "../components/actionBar"
import Hero from "../components/common/hero"
import "../components/styles/templates/portfolio.scss"
import TopWave from "../components/common/topWave"
import Arrow from "../components/common/arrow"

class PortfolioPage extends Component {
  render() {
    const { data, items } = this.props
    const { title, text, image, cta } = data.acf

    return (
      <Layout>
        <Hero
          image={
            <Img
              className="portfolioHeroImage"
              fluid={image.localFile.childImageSharp.fluid}
              alt={image.alt_text}
            />
          }
          blobContent={<ActionBarParent src="portfolio" />}
        >
          <h1 className="title">{title}</h1>
          <p className="text">{text}</p>
          <a href="#projecten" className="btn underline withArrow">
            {cta} <Arrow width="18px" color="#001010" />
          </a>
        </Hero>
        <TopWave />
        <section id="projecten" className="cards">
          <div className="container">
            {items.map(item => {
              const { project_foto, logo_klant_white, titel } = item.node.acf
              return (
                <div key={item.node.id} className="card">
                  <Link className="link" to={`/portfolio/${item.node.slug}`}>
                    <Img
                      fluid={project_foto.localFile.childImageSharp.fluid}
                      alt={project_foto.alt_text}
                      className="img"
                      style={{ position: "absolute" }}
                    />
                    <div className="logo">
                      <Img
                        fixed={logo_klant_white.localFile.childImageSharp.fixed}
                        alt={logo_klant_white.alt_text}
                        className="img"
                      />
                      <div className="overlay"></div>
                      <div className="info">
                        <h3>
                          Project: <span>{titel}</span>
                        </h3>
                        <button className="btn ghostery white">
                          Bekijk project
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(filter: { slug: { eq: "portfolio" } }) {
          edges {
            node {
              acf {
                title
                text
                cta
                image {
                  ...heroImageFragment
                  alt_text
                }
              }
            }
          }
        }
        allWordpressPost {
          edges {
            node {
              id
              slug
              title
              date
              acf {
                aanpak
                link_website
                resultaat
                titel
                vraag
                logo_klant_white {
                  ...whiteLogoFragment
                  alt_text
                }
                project_foto {
                  ...heroImageFragment
                  alt_text
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <PortfolioPage
        data={data.allWordpressPage.edges[0].node}
        items={data.allWordpressPost.edges}
      />
    )}
  />
)
