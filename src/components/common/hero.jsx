import React from "react"
import Button from "./button"

const Hero = ({ background, image, children, buttonLabel, blobContent }) => {
  return (
    <section
      style={{ backgroundColor: background || "white" }}
      className="hero"
    >
      <div className="container wrapper">
        <div className="col-1">
          {children}
          <Button type="ghostery" label={buttonLabel} color="gray" />
        </div>
        <div className="col-2">{image}</div>
        <div className="actionsBlob"></div>
        {blobContent}
      </div>
    </section>
  )
}

export default Hero
