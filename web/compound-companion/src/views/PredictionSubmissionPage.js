import React, { useState}  from "react";
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
import PredictPageHeader from "components/Headers/PredictPageHeader.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
import Targets from "../data/targets.js";

import Demo from "./product-sections/vega-demo.js";


function PredictionSubmissionPage() {

  target_drug_matrix.sort(function (a, b) {
    if (a.TARGET < b.TARGET)
      return -1;
    if (a.TARGET > b.TARGET)
      return 1;
    return 0;
  });


  React.useEffect(() => {
    console.log('blahh');
  }, []);

  const [targetedDrugs, setTargetedDrugs] = useState([]);
  const [target, setTarget] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);


  function handleTargetSelection(e) {
      setTargetedDrugs(target_drug_matrix.filter(tdm => tdm.TARGET == e.target.value));
      setTarget(e.target.value);
  }

  function handleDrugSelection(e) {
    setSelectedDrugs([].filter.call(e.target.options, o => o.selected).map(o => o.value));
  }



  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PredictPageHeader />
        <div className="section">
            <Container>
                <Row>
                    <Col md="4">
                        <div>
                            <h2>Targets</h2>
                            <select onChange={e => handleTargetSelection(e)}>
                                {Targets.sort().map((drug) => <option key={drug} value={drug}>{drug}</option>)}
                            </select>
                        </div>            
                    </Col>
                    <Col md="4">
                        <h1>{target}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <div>
                            <h2>Pathways</h2>
                        </div>            
                    </Col>
                    <Col md="4">
                    </Col>
                </Row>

                <Row>
                    <Col md="4">
                        <div>
                            <h2>Drugs</h2>
                            <select onChange={e => handleDrugSelection(e)} multiple>
                                {targetedDrugs.sort().map((drug) => <option key={drug.TD_MATRIX_ID} value={drug.DRUG_ID}>{drug.DRUG_ID}</option>)}
                            </select>
                        </div>            
                    </Col>
                    <Col md="4">
                        <h1>{selectedDrugs}</h1>
                    </Col>
                </Row>
                <Demo></Demo>
            </Container>
        </div>
      </div>
    </>
  );
}

export default PredictionSubmissionPage;
