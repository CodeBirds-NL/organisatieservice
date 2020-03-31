import React from "react"
import "./styles/layout/footer.scss"

const Footer = () => {
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
          <span className="linkedin"></span>
          <span className="facebook"></span>
          <span className="twitter"></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
