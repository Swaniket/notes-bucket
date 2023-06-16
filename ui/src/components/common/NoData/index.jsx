import React from "react";
import "./index.css";

function NoData({ svgImage, helperText }) {
  return (
    <>
      <div style={{ padding: "40px" }}>
        <span className="svg-wrapper">
          <img src={svgImage} className="svg-styles" />
        </span>
        <h5 className="no-notes-text">{helperText}</h5>
      </div>
    </>
  );
}

export default NoData;
