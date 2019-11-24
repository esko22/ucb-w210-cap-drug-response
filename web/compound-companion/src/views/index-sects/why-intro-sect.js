import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function WhyIntroSection() {
  return (
    <>
      <div className="section section-tabs">
        <Container>
        <Row>
        <Col md="6">
              <div>
                <h2>One size fits all approach... </h2>
              </div>
            </Col>
            <Col md="6">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/otfa_1_bw.png")}
                ></img>
              </div>
            </Col>
          </Row>
          <div className="space-100"></div>
          <Row>
            <Col md="6">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/otfa_bw.png")}
                ></img>
              </div>
            </Col>
            <Col md="6">
              <div>
                <h2>We beleive the future State... </h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WhyIntroSection;
