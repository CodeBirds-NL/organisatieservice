import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Arrow from "../components/common/arrow"
import "../components/styles/templates/portfolio.scss"

class PortfolioPage extends Component {
  render() {
    const { data: items } = this.props
    console.log(items)

    return (
      <Layout>
        <div className="container">
          <div className="portfolioWrapper">
            <div className="contents">
              <h1 className="heading">Projecten</h1>
              <p className="text">
                I'm baby cloud bread next level poutine street art. Sunt
                excepteur quis squid truffaut do. Poutine culpa labore umami
                schlitz shoreditch lorem banh mi bicycle rights. Irure
                fingerstache raw denim meh.
              </p>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="container">
            {items.map(item => {
              const { title, acf, id, slug } = item.node
              const { logo_klant = "", project_foto } = acf
              return (
                <div key={id} className="card">
                  <Link className="link" to={`portfolio/${slug}`}>
                    <div className="upper">
                      <img
                        src={logo_klant.source_url}
                        alt={logo_klant.alt_text}
                      />
                    </div>
                    <div className="lower">
                      <h5>{title}</h5>
                      <p className="description">
                        Nieuwe corporate website voor startup. Lorem ipsum dadkj
                        sdafsaj lbalhd.
                      </p>
                      <button
                        className="btn underline withArrow"
                        to={`portfolio/${slug}`}
                      >
                        <span className="content">Lees meer</span>{" "}
                        <Arrow width="18px" color="#001010" />
                      </button>
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
        allWordpressPost {
          edges {
            node {
              id
              slug
              title
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
    render={data => <PortfolioPage data={data.allWordpressPost.edges} />}
  />
)
