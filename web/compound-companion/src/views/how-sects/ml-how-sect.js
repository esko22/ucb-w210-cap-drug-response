import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

function MLHowSection() {
  return (
    <>
     <div className="section section-why-we-do-2">
      <Container>
        <Row>
            <Col md={{size:2, offset:2}}>
              <div>
                <img
                  alt="..."
                  src={require("assets/img/stack_layers.png")}
                ></img>
              </div>
            </Col>
            <Col md={{size:6, offset:1}}>
               <h3><strong>Layered learning approach</strong></h3>
               <p>Using layers of advanced machine learning techniques, we can now select the most responsive list of drugs estimated to show positive response to a drug or set of drugs. Using Copy Number Alterations, Mutations and drug target information, we can now predict the log of IC50 (molecular concentration for 50% cell inhibition) for a selected pathway, cancer type and set of drugs.</p>
            </Col>
          </Row>
          <div className="space-50"></div>
        </Container>
      </div>
    </>
  );
}

export default MLHowSection;
