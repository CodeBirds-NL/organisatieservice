import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ActionBarParent from "../components/actionBar"
import SEO from "../components/seo"
import "../components/styles/pages/homePage.scss"
import Arrow from "../components/common/arrow"
import TopWave from "../components/common/topWave"
import BottomWave from "../components/common/bottomWave"

class HomePage extends Component {
  state = {
    heroBtnClicked: false,
  }

  handleHeroBtnClick = () => {
    this.setState({ heroBtnClicked: true })
  }

  showLogos = range => {
    const { edges: posts } = this.props.data.allWordpressPost
    const ids = range.map(i => i.wordpress_id)

    // check if wordpress id of post matches the range (acf field logos)
    const filtered = posts.filter(({ node: p }) => ids.includes(p.wordpress_id))
    return filtered.map(({ node: p }) => (
      <div key={p.wordpress_id} className="logo">
        <Link to={`/portfolio/${p.slug}`}>
          <Img
            fluid={p.acf.logo_klant.localFile.childImageSharp.fluid}
            alt={p.title}
          />
        </Link>
      </div>
    ))
  }

  render() {
    const { title, acf } = this.props.data.allWordpressPage.edges[0].node
    return (
      <Layout>
        <SEO title={title} />
        <div className="home">
          <ActionBarParent
            // this template component includes the hero section
            acf={acf}
            active={this.state.heroBtnClicked}
            src="home"
          />
          <TopWave fill="#f1f1f1" />
          <section id="services">
            <div className="container">
              <div className="upper">
                <h2 className="subHeading">{acf.services_title}</h2>
                <p className="text">{acf.services_text}</p>
              </div>
              <div className="servicesGrid">
                {acf.services.map((i, index) => (
                  <div key={index} className="service">
                    <div className="imageBox">
                      <Img
                        fixed={i.icon.localFile.childImageSharp.fixed}
                        alt={i.icon.alt_text}
                      />
                    </div>
                    <h5>{i.title}</h5>
                    <h6>{i.subTitle}</h6>
                    <p className="text">{i.text}</p>
                    <Link
                      to={`/diensten/#${i.title
                        .toLowerCase()
                        .split(" ")
                        .join("")}`}
                      className="btn underline withArrow"
                    >
                      {i.cta} <Arrow width="18px" color="#001010" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <BottomWave fill="#f1f1f1" />
          <section id="references">
            <div className="container">
              <h2 className="subHeading">{acf.references.title}</h2>
              <p className="text">{acf.references.text}</p>
              <Link to="/portfolio" className="btn underline withArrow">
                <span className="content">Alle projecten</span>{" "}
                <Arrow width="18px" color="#001010" />
              </Link>
              <div className="gallery">
                {this.showLogos(acf.references.logos)}
              </div>
            </div>
          </section>
        </div>
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
              ...heroImageFragment
              alt_text
            }
            references {
              title
              text
              logos {
                wordpress_id
              }
            }
            about {
              title
              text
              video {
                source_url
              }
            }
            services_title
            services_text
            services {
              cta
              text
              title
              subTitle
              icon {
                ...serviceIconFragment
                alt_text
              }
            }
          }
          title
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          acf {
            logo_klant {
              ...logoFragment
              alt_text
            }
          }
          slug
          wordpress_id
        }
      }
    }
  }
`
