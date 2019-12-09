import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

function DataProcHowSection() {
  return (
    <>
      <div className="section section-tabs">
        <Container>
        <Row>
            <Col md={{size:6, offset:2}}>
               <h3><strong>Multi-omic data storage</strong></h3>
               <p>CompoundCompanion runs on data. In order to train models and perform predictions, obtaining various multi-omic data sets is essential. </p>
               <p>This can be done through uploading or integrating with our preferred sequencing labs. HIPAA compliance is top of mind for us. We ensure patient and sample information is encrypted, de-identified and stored securely.</p>
            </Col>
            <Col md={{size:2, offset:1}}>
              <div>
                <img
                  alt="..."
                  src={require("assets/img/sec_cloud.png")}
                ></img>
              </div>
            </Col>
          </Row>
          <div className="space-50"></div>
        </Container>
      </div>
    </>
  );
}

export default DataProcHowSection;
