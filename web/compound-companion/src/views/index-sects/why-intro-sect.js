import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function WhyIntroSection() {
  return (
    <>
      <div className="section ">
        <Container>
        <Row>
          <Col md={{size:4}}>
          <div>
                <img
                  alt="..."
                  src={require("assets/img/off-target.png")}
                ></img>
              </div>
          </Col>
          <Col md={{size:6, offset:2}}>
            <div>
                <p className="why-hero-quote">
                  " Currently, an estimated <strong>90 percent</strong> of potential <strong>medicines</strong> entering clinical trials <strong>fail</strong> to demonstrate the necessary efficacy and safety, ultimately never <strong>reaching patients. </strong>"{" "}
                  <br></br>
                  <br></br>
                </p>
            </div>          
          </Col> 
        </Row>
        </Container>
      </div>
      <div className="section section-tabs">
        <Container>
        <Row>
        <Col md="3">
          <h5><strong>What leads to failure</strong></h5>
        </Col>
        <Col md="9">
          <Row>
            <Col md="6">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/otfa_1_bw.png")}
                ></img>
              </div>
            </Col>
            <Col md="6">
              <div>
                <h3>Traditional approach </h3>
                <p>Traditional medicine follows a one-size-fits-all approach. Drugs and other therapies are designed to treat large groups of people with the same disease -- like diabetes or cancer. They may factor in your sex, age, or weight, but overall, doctors base your treatment on what’s most likely to work for everyone with a similar illness.</p>
              </div>
            </Col>
          </Row>
          <div className="space-100"></div>
          <Row>
            <Col md="6">
              <div>
                <img
                  alt="..."
                  src={require("assets/img/PersonalTarget.png")}
                ></img>
              </div>
            </Col>
            <Col md="6">
            <div className="space-100"></div>
              <div>
                <h3>One size <strong>does not</strong> fit all </h3>
                <p>Not everyone responds to a treatment in the same way. Some drugs work very well for certain people. Others don’t help at all or cause harmful side effects. Finding the exact drug that works for you can involve a lot of trial and error.</p>
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
                <h3>Future approach</h3>
                <p>Precision medicine is "an emerging approach for disease treatment and prevention that takes into account individual variability in genes, environment, and lifestyle for each person." This approach will allow doctors, researchers and pharmaceutical companies to predict more accurately which treatment and prevention strategies for a particular disease will work in which groups of people.</p>
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

export default WhyIntroSection;
