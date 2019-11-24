import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

function DataProcHowSection() {
  return (
    <>
      <div className="section section-tabs">
        <Container>
        <Button
              className="btn-icon btn-round"
              color="default"
        >1</Button>

        <Row>
            <Col md="2"></Col>
            <Col md="4">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/recruit.png")}
                ></img>
              </div>
            </Col>
            <Col md="6">
              <div>
                <h2>Match Patients </h2>
              </div>
            </Col>
          </Row>
          <div className="space-100"></div>
          <Row>
            <Col md="2"></Col>
            <Col md="6">
              <div>
                <h2>Recruit Participants </h2>
              </div>
            </Col>
            <Col md="4">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/recruit2.png")}
                ></img>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
}

export default DataProcHowSection;
