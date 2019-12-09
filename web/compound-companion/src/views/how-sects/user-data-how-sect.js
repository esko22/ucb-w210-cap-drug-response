import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

function UserDataHowSection() {
  return (
    <>
      <div className="section section-why-we-do-3">
      <Container>
        <Row>
            <Col md={{size:2, offset:2}}>
              <div>
                <img
                  alt="..."
                  src={require("assets/img/pipeline.png")}
                ></img>
              </div>
            </Col>
            <Col md={{size:6, offset:1}}>
               <h3><strong>Scalable processing pipeline</strong></h3>
            </Col>
          </Row>
          <div className="space-50"></div>
        </Container>
      </div>
    </>
  );
}

export default UserDataHowSection;
