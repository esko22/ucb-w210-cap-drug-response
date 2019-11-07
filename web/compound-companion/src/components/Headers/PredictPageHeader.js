/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function PredictPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  let inlineStyle = {
    'minHeight' : '70px'
  };

  return (
    <>
      <div className="page-header clear-filter" style={inlineStyle} filter-color="blue">
        <div
          className="page-header-image"
          style={{
            // backgroundImage: "url(" + require("assets/img/dna-water.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
      </div>
    </>
  );
}

export default PredictPageHeader;
