import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import ActionBar from "../components/actionBar"
import Button from "../components/common/button"

class PortfolioPage extends Component {
  render() {
    const { data, items } = this.props
    const { title, text, image, cta } = data.acf

    return (
      <Layout>
        <section className="hero">
          <div className="wrapper container">
            <div className="col-1">
              <h1 className="heading">{title}</h1>
              <p className="text">{text}</p>
              <Button type="ghostery" label="Bekijk projecten" color="gray" />
            </div>
            <div className="col-2">
              <img
                className="portfolioHeroImage"
                src={image.source_url}
                alt={image.alt_text}
              />
            </div>
          </div>
          <div className="actionsBlob"></div>
          <ActionBar src="home" />
        </section>
        <div className="cards">
          <div className="container">
            {items.map(item => {
              const {
                title,
                acf,
                id,
                slug,
                date,
                tags = [{ name: "", id: "" }],
              } = item.node
              const { logo_klant = "", project_foto, resultaat } = acf
              return (
                <div key={id} className="card">
                  <Link className="link" to={`portfolio/${slug}`}>
                    <div className="upper">
                      <img
                        src={project_foto.source_url}
                        alt={project_foto.alt_text}
                      />
                    </div>
                    <div className="lower-1">
                      <h5>{title}</h5>
                      <p className="description">{`${resultaat.slice(
                        0,
                        55
                      )}...`}</p>
                    </div>
                    <div className="lower-2">
                      <div className="date">
                        <span>
                          {new Date(date)
                            .toLocaleDateString()
                            .replace(/\//g, "-")}
                        </span>
                      </div>
                      <div className="tags">
                        {tags.map(({ name, id }) => (
                          <span key={id} className={name.toLowerCase()}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
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
                logo_klant {
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
