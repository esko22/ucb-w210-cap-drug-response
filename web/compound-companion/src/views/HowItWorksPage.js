import React, { useState, useEffect }  from "react";
// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import HowItWorksPageHeader from "components/Headers/HowItWorksPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

import DataProcHowSection from "./how-sects/data-proc-how-sect.js"
import UserDataHowSection from "./how-sects/user-data-how-sect.js"
import MLHowSection from "./how-sects/ml-how-sect.js"
import FeaturePrepHowSection from "./how-sects/feature-prep-how-sect.js"

function HowItWorksPage() {

  useEffect(() => {

    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });


  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <HowItWorksPageHeader />
        <div className="section section-about-us">
          <Container>
          <Row>
                <Col md={{size:4}}>
                <div>
                    <img
                      alt="..."
                      src={require("assets/img/molecular.png")}
                    ></img>
                  </div>
                </Col>
                <Col md={{size:7, offset:1}}>
                  <div>
                  <h2 className="title"><strong>Molecular level match making</strong></h2>
                  <p>Systematic study of genomic alterations and drug sensitivies have shown great promise in predicting response of a specific cell line to a specific drug. With extensive genomic sequencing data available for almost all types of cancers, valuable insights can be generated about the relationship between genomic alterations and drug responses.</p> 
                  <p>CompoudCompanion is a tool designed to explore, quantify and predict drug responses with available molecular level data.</p>
                  </div>
                </Col>
              </Row>
          </Container>
        </div>
        <DataProcHowSection />
        <UserDataHowSection />
        <FeaturePrepHowSection />
        <MLHowSection />
        <DefaultFooter />
      </div>
    </>
  );
}

export default HowItWorksPage;
