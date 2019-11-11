import React, { useState}  from "react";
import {
    Container,
    Row,
    Col
  } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PredictPageHeader from "components/Headers/PredictPageHeader.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
import drug_response_matrix from "../data/drug_response.json";
import Targets from "../data/targets.js";

import Demo from "./product-sections/vega-demo.js";
import LiteDemo from "./product-sections/vega-lite-demo.js";


import { Vega, createClassFromSpec } from 'react-vega';
import spec3 from '../vega-specs/spec3';
import spec4 from '../vega-specs/spec4';
import spec5 from '../vega-specs/spec5.json';
import spec6 from '../vega-specs/spec6.json';

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


  let temp_drug_set = [9,1526, 3, 5]
  const [targetedDrugs, setTargetedDrugs] = useState([]);
  const [target, setTarget] = useState('');
  const [drugResponses, setDrugResponses] = useState(drug_response_matrix.filter(dr => temp_drug_set.includes(dr.DRUG_ID)));
  const [selectedDrugs, setSelectedDrugs] = useState();
  const [vegaSpec, setVegaSpec] = useState(spec5);

  const TestChart = createClassFromSpec({spec: spec6});


  const [data1, setData1] = useState({
    myData: drugResponses,
  });

  const [handlers, setHandlers] = useState({ click: handleDrugClick });


  function handleDrugClick(...args){
    console.log(args);
  }


  function handleTargetSelection(e) {
      setTargetedDrugs(target_drug_matrix.filter(tdm => tdm.TARGET == e.target.value));
      setTarget(e.target.value);

      handleDrugResponseSet();

      setData1(  {myData: drugResponses});
  }

  function handleDrugResponseSet(){
      let drug_ids = targetedDrugs.map(x => x.DRUG_ID);
      setDrugResponses(drug_response_matrix.filter(dr => drug_ids.includes(dr.DRUG_ID)));
      console.log(drugResponses);
  }

  function handleDrugSelection(e) {
    setSelectedDrugs([].filter.call(e.target.options, o => o.selected).map(o => o.value));
    //console.log(drug_selection_matrix.filter(dsm => dsm.DRUG_ID == 1526));
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

                {/* <Row>
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
                </Row> */}
                {/* <Vega spec={vegaSpec} signalListeners={handlers}/> */}
                <TestChart data={data1} />

                {/* <Demo ></Demo> */}
                {/* <LiteDemo></LiteDemo> */}
            </Container>
        </div>
      </div>
    </>
  );
}

export default PredictionSubmissionPage;
