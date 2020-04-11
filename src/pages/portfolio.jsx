import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
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
            <img
              className="portfolioHeroImage"
              src={image.source_url}
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
        <section className="cards">
          <div className="container">
            {items.map(item => {
              const { project_foto, logo_klant_white, titel } = item.node.acf
              return (
                <div key={item.node.id} className="card">
                  <Link className="link" to={`portfolio/${item.node.slug}`}>
                    <img
                      src={project_foto.source_url}
                      alt={project_foto.alt_text}
                    />
                    <div className="logo">
                      <img
                        src={logo_klant_white.source_url}
                        alt={logo_klant_white.alt_text}
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
                  alt_text
                  source_url
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
              tags {
                name
                id
              }
              acf {
                aanpak
                link_website
                resultaat
                titel
                vraag
                logo_klant_white {
                  alt_text
                  source_url
                }
                project_foto {
                  alt_text
                  source_url
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
