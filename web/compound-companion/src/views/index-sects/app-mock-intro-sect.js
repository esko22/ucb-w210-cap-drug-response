import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

function AppMockIntroSection() {
  return (
    <>
      <div className="section section-why-we-do-3">
        <Container>
          <Row>
            <Col md="3">
              <h5><strong>How we help</strong></h5>
            </Col>
            <Col md="9">
              <Row>
                <Col md={{size:10, offset:2}}>
                  <div>
                    <img
                      alt="..."
                      src={require("assets/img/function-of-bw.png")}
                    ></img>
                  </div>
                  <div className="space-50"></div>
                  <div>
                    <h3>Predicting drug response </h3>
                    <p>Associating an individual's composition with how well a compound will react is vital to making personalized medicine a reality. In order to improve our ability to predict drug response when considering molecular profiles, we must learn the genetic features that are associated with both success and failure.</p>
                    <p>Compound Companion is a data centric platform that leverages machine learning to predict an individual's chance of responding to a drug based on an individual's multi-omic profile and diagnosed condition. Our hope is that our tools can help put the right information in the hands of those responsible for delivering the right treatment to the right patient. </p>
                  </div>
                </Col>

              </Row>
              <div className="space-100"></div>
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
                    <h3>Review patient predictions</h3>
                    <p>Once you have an individual's multi-omic profile on the platform, you can perform an analysis on the prediction results for the compounds loaded in your system. Our visualization tools will guide you in making the best decision possible for your patient.</p> 
                    <p>The system allows you to then record real world evidence for the individual and use it to improve the prediction algorithms moving forward.</p>
                    <Button color="info"  href="/patient">
                      Patient Demo
                    </Button>

                  </div>
                </Col>
              </Row>
              <div className="space-100"></div>
              <Row>
                <Col md="2"></Col>
                <Col md="6">
                  <div>
                    <h3>Recruit participants </h3>
                    <p>If you are recruiting for clinical trials for a new drug with no pre-exisitng data, you can use our search tools to find individuals on the platform that have responded well to drugs either related to a condition, genomic target or cellular pathway.</p>
                    <Button color="info"  href="/recruit">
                      Recruit Demo
                    </Button>
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
              <div className="space-100"></div>
              <Row>
                <Col md="2"></Col>
                <Col md="4">
                  <div>
                    <img
                      alt="..."
                      src={require("assets/img/port.png")}
                    ></img>
                  </div>
                </Col>
                <Col md="6">
                  <div>
                    <h3>Drug Performance</h3>
                    <p>Understanding how well drugs perform across your cohort is crucial. Our dashboard will allow you to see top level performance statistics based on prediction results and real world evidence.</p>
                    <Button color="info"  href="/portfolio">
                      Portfolio Demo
                    </Button>
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AppMockIntroSection;
