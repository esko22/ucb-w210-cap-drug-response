import React from "react";

// reactstrap components
import { Container, Row, Col} from "reactstrap";

// core components

function FeaturePrepHowSection() {
  return (
    <>
      <div className="section section-tabs">
      <Container>
        <Row>
            <Col md={{size:6, offset:2}}>
               <h3><strong>Modular feature preparation</strong></h3>
               <p>No condition or cancer is the same. Why build a model based on features that may have little or no impact on the condition at hand?</p>
               <p>CompoundCompanion allows you to build composable data pipelines based on pre-existing or internally developed scoring models to convert individual multi-omic modalities to support various models.</p>
            </Col>
            <Col md={{size:2, offset:1}}>
              <div>
                <img
                  alt="..."
                  src={require("assets/img/modules.png")}
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

export default FeaturePrepHowSection;
