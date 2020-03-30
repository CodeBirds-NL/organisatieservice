import React from "react"

const Hero = ({
  minHeight = "auto",
  background,
  image,
  children,
  blobContent,
}) => {
  return (
    <section
      style={{ backgroundColor: background || "white", minHeight }}
      className="hero"
    >
      <div className="container wrapper">
        <div className="col-1">{children}</div>
        <div className="col-2">{image}</div>
        <div className="actionsBlob"></div>
        {blobContent}
      </div>
    </section>
  )
}

export default Hero
