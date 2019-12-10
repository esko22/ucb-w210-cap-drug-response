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
            <Col md={{size:6}}>
              <div className="space-50"></div>
              <div>
                <img
                  alt="..."
                  src={require("assets/img/arch-pipe.png")}
                ></img>
              </div>
            </Col>
            <Col md={{size:5, offset:1}}>
               <h3><strong>Scalable processing pipeline</strong></h3>
               <p>The architecture is highly scalable and can scale to support a global audience with millions of healthcare providers and patients. In the entire process, the ML pipeline for training models and the execution are kept separate purposely so that models trained commercially or in done in academic institutions, with higher accuracy can uploaded in the model library and used as needed.  </p>
               <p>Several data prep processes are executed, in parallel in the PySpark compute engines pods. In all cases the data is written back into the data lake in processed folder. A patient’s data is pre-processed and kept ready for a physician to make the request for service. </p>
            </Col>
          </Row>
          <div className="space-50"></div>
        </Container>
      </div>
    </>
  );
}

export default UserDataHowSection;
