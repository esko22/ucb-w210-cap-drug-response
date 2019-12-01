/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
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
    'minHeight' : '500px',
    'maxHeight' : '660px'
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
            <div className="space-100"></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/pharmacogenomics.png")}
            ></img>
            <h1>Compound Companion</h1>
            <div className="space-50"></div>
            <h2 className="h3-seo">Helping to deliver the <b>right treatment </b> to the <b>right patient </b>at the <b>right time.</b></h2>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
