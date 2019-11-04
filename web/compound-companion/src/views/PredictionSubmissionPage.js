import React from "react";
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
import PredictPageHeader from "components/Headers/PredictPageHeader.js";
import drugs from "../data/drugs.json";


function PredictionSubmissionPage() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PredictPageHeader />
        <div className="section">
        <Container>
          <Row>
            <Col md="12">
            <div>
                <select>
                    {drugs.map((drug) => <option key={drug.DRUG_ID} value={drug.DRUG_ID}>{drug.TARGET}</option>)}
                </select>
                </div>            
                </Col>
            </Row>
        </Container>
        </div>
      </div>
    </>
  );
}

export default PredictionSubmissionPage;
