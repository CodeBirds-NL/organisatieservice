import React, { Component } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Hamburger from "./hamburger"
import "../styles/layout/header.css"

class Header extends Component {
  state = { active: false }

  handleToggle = _ => {
    this.setState(() => ({ active: !this.state.active }))
    document.body.style.transfrom = "translateX(400px)"
  }

  render() {
    const { data } = this.props
    const { active } = this.state
    // get menu items
    const [...menuItems] = data.allWordpressMenusMenusItems.edges[0].node.items
    // get contact items
    const {
      adres,
      tel1,
      tel2,
      email,
    } = data.allWordpressPage.edges[0].node.acf.contactgegevens
    // get logo details
    const {
      source_url: logoUrl,
      alt_text: logoAlt,
    } = data.allWordpressPage.edges[0].node.site_logo_src

    return (
      <header className={active ? "header open" : "header"}>
        <div className="left">
          <Hamburger onToggle={this.handleToggle} />
          <span className="brand">
            Organisatieservice
            {/* <img src={logoUrl} alt={logoAlt} /> */}
          </span>
        </div>
        <div className="offCanvasMenu">
          <nav className="nav" role="nav">
            <ul>
              {menuItems.map(item => (
                <li key={item.wordpress_id} className="menuItem">
                  <Link to={item.slug === "home" ? "/" : item.slug}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="contactInfo">
            <ul>
              <li dangerouslySetInnerHTML={{ __html: adres }} />
              <li>
                <a href={`tel:${tel1}`}>{tel1}</a>
              </li>
              <li>
                <a href={`tel:${tel2}`}>{tel2}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="logo">
          <img src={logoUrl} alt={logoAlt} />
        </div>
        <div className="menuWrapper">
          <div className="menu">
            <ul>
              {menuItems.map(item => (
                <li key={item.wordpress_id} className="menuItem">
                  <Link to={item.slug === "home" ? "/" : item.slug}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="contactInfo">
            <ul>
              <li dangerouslySetInnerHTML={{ __html: adres }} />
              <li>
                <a href={`tel:${tel1}`}>{tel1}</a>
              </li>
              <li>
                <a href={`tel:${tel2}`}>{tel2}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>
        </div> */}
      </header>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressMenusMenusItems {
          edges {
            node {
              name
              items {
                menu_order
                title
                slug
                wordpress_id
              }
            }
          }
        }
        allWordpressPage(filter: { slug: { eq: "header" } }) {
          edges {
            node {
              acf {
                contactgegevens {
                  adres
                  tel1
                  tel2
                  email
                }
              }
              site_logo_src {
                source_url
                alt_text
              }
            }
          }
        }
      }
    `}
    render={data => <Header data={data} />}
  />
)
