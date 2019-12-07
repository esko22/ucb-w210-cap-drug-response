import React from "react";

// reactstrap components
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
import AboutUsPageHeader from "components/Headers/AboutUsPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function AboutUsPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <AboutUsPageHeader />
        <div className="section section-team text-center">
          <Container>
            <div className="space-50"></div>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/kb.jpeg")}
                    ></img>
                    <h4 className="title">Kirby Bloom</h4>
                    <p className="category text-info">Architect</p>
                    <p className="description">
                      As Chief Architect for <a href="https://lunadna.com">LunaDNA</a>, Kirby is helping bridge the gap between research scientists and large scale data analytics by building the tools needed to produce better insights for health discovery
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.linkedin.com/in/kenneth-kirby-bloom-7701872/"
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/dm.jpeg")}
                    ></img>
                    <h4 className="title">Debasish Mukhopadhyay</h4>
                    <p className="category text-info">Data Scientist</p>
                    <p className="description">
                     Currently working at Microsoft, Debashish is a seasoned product engineer and a general management strategist with more than 25 years of Product Development, and Architecture experience.                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.linkedin.com/in/debasish/"
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/sv.jpeg")}
                    ></img>
                    <h4 className="title">Subha Vadakkumkkor</h4>
                    <p className="category text-info">Data Scientist</p>
                    <p className="description">
                    Experienced data scientist working at Farmers Insurance with demonstrated ability of providing data driven and actionable insights to stakeholders. Skilled in Machine Learning, Statistical Modeling, Predictive Analytics, SAS, R, Python.
                    </p>

                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.linkedin.com/in/subha-vadakkumkoor-0801b05/"
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default AboutUsPage;
