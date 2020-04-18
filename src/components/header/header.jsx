import React, { useEffect, useState } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Hamburger from "./hamburger"
import "../styles/layout/header.scss"

const Header = props => {
  const [active, toggleActive] = useState(false)

  useEffect(() => {
    // on mobile devices render body fixed to allow for scrolling on offcanvas menu
    if (window.innerWidth <= 500) {
      active
        ? (document.body.style.position = "fixed")
        : (document.body.style.position = "unset")
    }
  }, [active])

  // background-color of header is set using props
  const { data, color = "white" } = props

  // get menu items
  const [...menuItems] = data.allWordpressMenusMenusItems.edges[0].node.items

  // get contact items
  const {
    adres,
    tel1,
    tel2,
    email,
  } = data.allWordpressPage.edges[0].node.acf.contactgegevens

  return (
    <header
      style={{ backgroundColor: `${color}` }}
      className={active ? "header open" : "header"}
    >
      <div className="left">
        <Hamburger onToggle={() => toggleActive(!active)} />
        <span className="brand">
          Organisatie<span className="bold">service</span>
          {/* <img src={logoUrl} alt={logoAlt} /> */}
        </span>
      </div>
      <div className="offCanvasMenu">
        <nav className="nav" role="navigation">
          <ul>
            {menuItems.map(item => (
              <li key={item.wordpress_id} className="menuItem">
                <Link to={item.slug === "home" ? "/" : `/${item.slug}`}>
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
    </header>
  )
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
    render={data => <Header color={props.headerColor} data={data} />}
  />
)
