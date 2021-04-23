import React, { useEffect } from "react"
import Header from "./header/header"
import Footer from "./footer"
import "./styles/layout/normalize.css"
import "./styles/layout/reset.css"
import "./styles/layout/layout.scss"

const Layout = props => {
  useEffect(() => {
    if (typeof window === "undefined") return

    const scrollTo = e => {
      e.preventDefault()

      const yOffset = -80
      const target = document.querySelector(e.target.getAttribute("href"))
      if (!target) return

      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", scrollTo)

      return () => {
        anchor.removeEventListener("click", scrollTo)
      }
    })
  }, [])

  return (
    <React.Fragment>
      <Header headerColor={props.headerColor} />
      <div className="contentWrapper">{props.children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
