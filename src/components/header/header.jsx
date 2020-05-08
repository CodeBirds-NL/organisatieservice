import React, { useEffect, useState, useRef } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import ActionBar from "../actionBar"
import Hamburger from "./hamburger"
import "../styles/layout/header.scss"

const Header = props => {
  const [active, toggleActive] = useState(false)
  const [actionBar, showActionBar] = useState(false)
  const [stickyHeader, toggleStickyHeader] = useState(false)
  const [stickyActive, toggleStickyActive] = useState(0)
  const [page, setPage] = useState(null)
  const ref = useRef(null)

  function handleClickOutsideMenu({ target }) {
    // don't respond to clicks on hamburger icon
    if (target.closest("#nav-icon")) return
    console.log(target)
    console.log(ref.current)

    if (ref.current && !ref.current.contains(target)) {
      toggleActive(false)
      toggleStickyActive(false)
    }
  }

  useEffect(() => {
    // on mobile devices render body fixed to allow for scrolling on offcanvas menu
    if (window.innerWidth <= 500) {
      active
        ? (document.body.style.position = "fixed")
        : (document.body.style.position = "unset")
    }

    // add scroll event listener to window upon mount
    window.onscroll = () => {
      if (window.scrollY > 600) {
        toggleStickyHeader(true)
      } else {
        return toggleStickyHeader(false) && stickyHeader
      }
    }

    // listen for clicks on body when header is opened
    document.addEventListener("click", handleClickOutsideMenu, true)
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu, true)
    }
  })

  useEffect(() => {
    // if page is contactpage, diff styles apply for offcanvasmenu and hamburger icon
    if (window.location.pathname.includes("contact")) {
      setPage("contact")
    }
  }, [page])

  const toggleMenu = (e, src) => {
    if (src === "stickyHeader") return toggleStickyActive(!stickyActive)
    toggleActive(!active)
  }

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

  const {
    source_url,
    alt_text,
  } = data.allWordpressPage.edges[0].node.acf.logo_black

  const offCanvasMenu = () => {
    return (
      <div
        ref={ref}
        className={
          page === "contact" ? "offCanvasMenu contact" : "offCanvasMenu"
        }
      >
        <nav className="nav" role="navigation">
          <ul>
            {menuItems.map(item => (
              <li key={item.wordpress_id} className="menuItem">
                <Link
                  activeClassName="active"
                  to={item.slug === "home" ? "/" : `/${item.slug}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="contactInfo">
          <span className="logoBlack">
            <img src={source_url} alt={alt_text} />
          </span>
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
    )
  }

  return (
    <React.Fragment>
      <header
        style={{ backgroundColor: `${color}` }}
        className={active ? "header open" : "header"}
      >
        <div className="inner">
          <div className="left">
            <Hamburger
              page={page}
              onToggle={e => toggleMenu(e, "regularHeader")}
            />
            <span className="brand">
              Organisatie<span className="bold">service</span>
            </span>
          </div>
        </div>
        {offCanvasMenu()}
      </header>
      {actionBar ? (
        <ActionBar action="main" unmountMe={() => showActionBar(false)} />
      ) : (
        <div
          className={
            stickyHeader
              ? stickyActive
                ? "stickyHeader show open"
                : "stickyHeader show"
              : "stickyHeader"
          }
        >
          <div className="inner">
            <div className="left">
              <Hamburger
                page={page}
                onToggle={e => toggleMenu(e, "stickyHeader")}
              />
              <span className="brand">
                Organisatie<span className="bold">service</span>
              </span>
            </div>
            <button
              onClick={() => showActionBar(true)}
              className="btn ghostery gray openActionBar"
            >
              Direct Contact
            </button>
          </div>
          {offCanvasMenu()}
        </div>
      )}
    </React.Fragment>
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
                logo_black {
                  source_url
                  alt_text
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
