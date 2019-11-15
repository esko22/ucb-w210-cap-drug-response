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
import Pathways from "../data/pathways.js";

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
  const [selectedPathways, setSelectedPathways] = useState(Pathways);
  const [drugResponses, setDrugResponses] = useState([]);
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

      var changedTargets = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
      var changedPathways = Array.from(new Set(target_drug_matrix.filter(f => changedTargets.includes(f.TARGET)).map(m => m.TARGET_PATHWAY)));

      var td_matrix_items = target_drug_matrix.filter(tdm => changedTargets.includes(tdm.TARGET) && changedPathways.includes(tdm.TARGET_PATHWAY));

      setSelectedPathways(changedPathways);
      setTarget(changedTargets);
      setTargetedDrugs(td_matrix_items);
      //handleDrugResponseSet(td_matrix_items);
  }


  function handleDrugResponseSet(filteredDrugs){
      let filtered_drug_ids = filteredDrugs.map(x => x.DRUG_ID);

      var response_matrix_items = drug_response_matrix.filter(dr => filtered_drug_ids.includes(dr.DRUG_ID));
      setDrugResponses(response_matrix_items);
      setData1(  {myData: response_matrix_items});

  }

  function handleDrugSelection(e) {
    setSelectedDrugs([].filter.call(e.target.options, o => o.selected).map(o => o.value));
    //console.log(drug_selection_matrix.filter(dsm => dsm.DRUG_ID == 1526));
  }

  function handlePathwaySelection(e){

    var changedPathways = [].filter.call(e.target.options, o => o.selected).map(o => o.value);

    if (target.length > 0)
      setTargetedDrugs(target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY) && target.includes(f.TARGET)));
    else
      setTargetedDrugs(target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY)));

    console.log(changedPathways);
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
                            <select onChange={e => handleTargetSelection(e)} multiple>
                                {Targets.sort().map((target) => <option key={target} value={target}>{target}</option>)}
                            </select>
                        </div>            
                    </Col>
                    <Col md="4">
                        <div>
                            <h2>Pathways</h2>
                            <select onChange={e => handlePathwaySelection(e)} multiple>
                                {selectedPathways.sort().map((pathway) => <option key={pathway} value={pathway}>{pathway}</option>)}
                            </select>
                        </div>            
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <h1>{target}</h1>
                    </Col>

                    <Col md="4">
                    </Col>
                </Row>

                <Row>
                    <Col md="4">
                        <div>
                            <h2>Available Compounds</h2>
                            <select onChange={e => handleDrugSelection(e)} multiple>
                                {targetedDrugs.sort().map((drug) => <option key={drug.TD_MATRIX_ID} value={drug.DRUG_ID}>{drug.DRUG_ID}</option>)}
                            </select>
                        </div>            
                    </Col>
                    <Col md="4">
                        <h1>{selectedDrugs}</h1>
                    </Col>
                </Row>
                {/* <Vega spec={vegaSpec} signalListeners={handlers}/> */}
                {/* <TestChart data={data1} /> */}

                {/* <Demo ></Demo> */}
                {/* <LiteDemo></LiteDemo> */}
            </Container>
        </div>
      </div>
    </>
  );
}

export default PredictionSubmissionPage;
