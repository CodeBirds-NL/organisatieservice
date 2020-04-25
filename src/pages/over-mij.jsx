import React, { Component } from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Hero from "../components/common/hero"
import "../components/styles/pages/about.scss"
import TopWave from "../components/common/topWave"
import ActionBarParent from "../components/actionBar"

class AboutPage extends Component {
  showLogos = _ => {
    const [...posts] = this.props.references
    // show latest 4 references
    const filtered = posts.filter((p, index) => index < 4)
    return filtered.map(({ node: p }) => (
      <div key={p.wordpress_id} className="logo">
        <Link to={`/portfolio/${p.slug}`}>
          <img src={p.acf.logo_klant.source_url} alt={p.title}></img>
        </Link>
      </div>
    ))
  }

  render() {
    const {
      title,
      text,
      image,
      video,
      highlights,
      highlights_title,
      references_title,
    } = this.props.data.acf.about

    return (
      <Layout>
        <Hero
          image={
            <img
              className="aboutHeroImage"
              src={image.source_url}
              alt={image.alt_text}
            />
          }
          blobContent={<ActionBarParent src="about" />}
        >
          <h1 className="title">{title}</h1>
          <p className="text">{text}</p>
          <div className="buttonGroup">
            <a href="#video" className="btn ghostery gray">
              Bekijk video
            </a>
            <Link to="/contact" className="btn ghostery right">
              Contact
            </Link>
          </div>
        </Hero>
        <TopWave />
        <section id="video">
          <div className="container">
            <div className="col-1">
              <video
                className="aboutVideo"
                src={video.source_url}
                alt={video.alt_text}
                autoPlay
                muted
                type="video/mp4"
                loop
              />
            </div>
            <div className="col-2">
              <div className="skills">
                <h2 className="subHeading">{highlights_title}</h2>
                <ul>
                  {highlights.map(({ content }) => (
                    <li key={content}>{content}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="references" className="about">
          <div className="container">
            <h2 className="subHeading">{references_title}</h2>
            <div className="gallery">{this.showLogos()}</div>
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
        allWordpressPage(filter: { slug: { eq: "over-mij" } }) {
          edges {
            node {
              acf {
                about {
                  highlights {
                    content
                  }
                  highlights_title
                  text
                  title
                  image {
                    source_url
                    alt_text
                  }
                  video {
                    alt_text
                    source_url
                  }
                  references_title
                }
              }
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
    `}
    render={data => (
      <AboutPage
        references={data.allWordpressPost.edges}
        data={data.allWordpressPage.edges[0].node}
      />
    )}
  />
)
