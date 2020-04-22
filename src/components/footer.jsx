import React from "react"
import "./styles/layout/footer.scss"
import { StaticQuery, graphql } from "gatsby"

const Footer = ({ socials }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="copyright">
          <p>
            ©<span>{new Date().getFullYear()} </span>{" "}
            <span style={{ fontSize: 20 }} className="brand">
              Organisatie
              <span className="bold">service</span>
            </span>
          </p>
          <div className="vendor">
            Realisatie: <a href="https://codebirds.nl">CodeBirds</a>
          </div>
        </div>
        <div className="social">
          {Object.keys(socials).map(i => {
            const className = i.split("_")[0]
            return (
              <a key={i} href={socials[i]} className="link">
                <span className={className}></span>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(filter: { slug: { eq: "footer" } }) {
          edges {
            node {
              acf {
                linkedin_link
                facebook_link
                instagram_link
                twitter_link
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Footer socials={data.allWordpressPage.edges[0].node.acf} />
    )}
  />
)
