import React, { Fragment } from "react"

function ProgressCircle({ percentage }) {
  return (
    <Fragment>
      <svg
        className="circle"
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="background"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          fill="transparent"
          r="97"
          cy="100"
          cx="100"
        ></circle>
        <circle
          className={percentage ? "fill" : "fill animated"}
          stroke="#fff"
          strokeWidth="4"
          fill="transparent"
          r="97"
          cy="100"
          cx="100"
          strokeDasharray="609"
          strokeDashoffset={percentage ? 609 - (609 * percentage) / 100 : "609"}
        ></circle>
      </svg>
    </Fragment>
  )
}

export default ProgressCircle
