import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import ActionBar from "../components/actionBar"
import Layout from "../components/layout"
import Hero from "../components/common/hero"
import SEO from "../components/seo"
import "../components/styles/pages/homePage.scss"
import Arrow from "../components/common/arrow"

class HomePage extends Component {
  showLogos = range => {
    const { edges: posts } = this.props.data.allWordpressPost
    const ids = range.map(i => i.wordpress_id)

    // check if wordpress id of post matches the range (acf field logos)
    const filtered = posts.filter(({ node: p }) => ids.includes(p.wordpress_id))
    return filtered.map(({ node: p }) => (
      <div key={p.wordpress_id} className="logo">
        <Link to={`/portfolio/${p.slug}`}>
          <img src={p.acf.logo_klant.source_url} alt={p.title}></img>
        </Link>
      </div>
    ))
  }

  render() {
    const { title, acf } = this.props.data.allWordpressPage.edges[0].node
    return (
      <Layout>
        <SEO title={title} />
        <Hero
          minHeight="calc(100vh - 105px)"
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
        <section id="about">
          <div className="container">
            <div className="col-1">
              <div className="laptop">
                <video
                  className="video-bg"
                  autoPlay
                  muted
                  loop
                  type="video/mp4"
                  src={acf.about.video.source_url}
                ></video>
                <div className="base"></div>
              </div>
            </div>
            <div className="col-2">
              <h2 className="subHeading">{acf.about.title}</h2>
              <p className="text">{acf.about.text}</p>
              <Link to="/about" className="btn underline withArrow">
                <span className="content">Meer informatie</span>{" "}
                <Arrow width="18px" color="#fff" />
              </Link>
            </div>
          </div>
        </section>
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
              alt_text
              source_url
            }
          }
          slug
          wordpress_id
        }
      }
    }
  }
`
