import React, { useState}  from "react";
import {
    Container,
    Row,
    Col,
    Table
  } from "reactstrap";

// core components
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
import patient_list from "../data/patients.json";
import patient_results from "../data/patient_results.json";

import Targets from "../data/targets.js";
import Pathways from "../data/pathways.js";

import Demo from "./product-sections/vega-demo.js";


import { Vega, createClassFromSpec } from 'react-vega';
import testSpec from '../vega-specs/testSpec';
import pathwayHisto from '../vega-specs/pathwayHisto.json';
import stackedHisto from '../vega-specs/stackedHisto.json';



import spec5 from '../vega-specs/spec5.json';
import spec6 from '../vega-specs/spec6.json';

function PortfolioPage() {

  target_drug_matrix.sort(function (a, b) {
    if (a.TARGET < b.TARGET)
      return -1;
    if (a.TARGET > b.TARGET)
      return 1;
    return 0;
  });


  React.useEffect(() => {
  }, []);


  const [targetedDrugs, setTargetedDrugs] = useState([]);
  const [target, setTarget] = useState(Targets);
  const [pathways, setPathways] = useState(Pathways);
  const [selectedPathway, setSelectedPathway] = useState('');
  const [drugResponses, setDrugResponses] = useState([]);
  const [drugs, setDrugs] = useState(target_drug_matrix);
  const [vegaSpec, setVegaSpec] = useState(pathwayHisto);
  const [vegaSpec2, setVegaSpec2] = useState(stackedHisto);

  const [patientResults, setPatientResults] = useState(patient_results);
  const [selectedDrugStats, setSelectedDrugStats] = useState([]);
  const [predictionRequests, setPredictionRequests] = useState([]);

  const TestChart = createClassFromSpec({spec: spec6});

  const [data1, setData1] = useState({
    myData: drugs,
  });

  const [data2, setData2] = useState({
    myData2: [],
  });

  const [handlers, setHandlers] = useState({ click: handlePathwaySelection });


  function handleTargetSelection(e) {

      var changedTargets = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
      var td_matrix_items = drugs.filter(tdm => changedTargets.includes(tdm.TARGET));

      setTarget(changedTargets);

      setData1({ myData: td_matrix_items});
  }

  function handlePathwaySelection(...args)
  {
    let pathway = args[1];
    pathway = pathway.TARGET_PATHWAY;

    setSelectedPathway(pathway);

    var matrix_items = [];

    if (target.length > 0)
      matrix_items = drugs.filter(f => f.TARGET_PATHWAY == pathway && target.includes(f.TARGET));
    else
      matrix_items = drugs.filter(f => f.TARGET_PATHWAY == pathway);

    handleDrugResponseSet(matrix_items);
  }


  function getDrugStats(response_matrix_items, drugId)
  {
    var total_drug_response_count = response_matrix_items.length;
    var total_resistant_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'R').length; 
    var total_sensitive_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'S').length; 

    var drug_name = target_drug_matrix.find(f => f.DRUG_ID === drugId).DRUG_NAME;

    var responses = [];
    responses.push({ 'DRUG_ID': drugId,'DRUG_NAME': drug_name,'T_C': total_resistant_count, 'R_TYPE': 'R'});
    responses.push({ 'DRUG_ID': drugId,'DRUG_NAME': drug_name,'T_C': total_sensitive_count, 'R_TYPE': 'S'});


    return responses;
  }



  function handleDrugResponseSet(filteredDrugs){
      let filtered_drug_ids = Array.from(new Set(filteredDrugs.map(x => x.DRUG_ID)));
      setTargetedDrugs(filteredDrugs);

      let selected_drugs_stat = [];
      let response_matrix_items = [];
      let counter = 0;

      filtered_drug_ids.forEach(drug => {

         fetch("http://localhost:5000/drugs/" + drug + "/responses")
        .then(result => result.json(),
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
        .then(data => {
              counter += 1;
    
              data.forEach(dat => response_matrix_items.push(dat));
              getDrugStats(data, drug).forEach(f => selected_drugs_stat.push(f));

              if (counter == filtered_drug_ids.length) {
                setSelectedDrugStats(selected_drugs_stat);
                setDrugResponses(response_matrix_items);
                setData2(  {myData2: selected_drugs_stat});
              }
          }
        )
       });

  }



  return (
    <>
      <ApplicationNavbar />
      <div className="section section-tabs">
            <Container>
              <Row>
                <Col className="section-why-we-do-2 scrolly-boy" md={{size:3}} >
                  <div className="space-25"></div>
                  <h3>Coverage Stats</h3>
                  <hr />
                  <Row>
                    <Col md={{size:4}}>
                        Compounds:
                    </Col>
                    <Col md={{size:4, offset:1}}>
                        267
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size:4}}>
                        Targets:
                    </Col>
                    <Col md={{size:4, offset:1}}>
                        {Targets.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size:4}}>
                        Pathways:
                    </Col>
                    <Col md={{size:4, offset:1}}>
                        {pathways.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size:4}}>
                        Conditions:
                    </Col>
                    <Col md={{size:4, offset:1}}>
                        29
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={{size:4}}>
                        Models:
                    </Col>
                    <Col md={{size:4, offset:1}}>
                        2
                    </Col>
                  </Row>

                  <hr />
                  <Row>
                    <Col>
                        <div>
                            <h4>Targets</h4>
                            <select onChange={e => handleTargetSelection(e)} multiple>
                                {Targets.sort().map((target) => <option key={target} value={target}>{target}</option>)}
                            </select>
                        </div>            
                    </Col>
                  </Row>

                </Col>
                <Col className="section patient-container" md={{size:9}} >
                  <Row>
                    
                    <Col md={{size:8, offset:1}}>
                        <h3><strong>Pathway Distribution</strong></h3>
                        <div>
                          <Vega spec={vegaSpec} data={data1} signalListeners={handlers}/>
                        </div>
                      </Col>
                  </Row>
                  { selectedDrugStats.length > 0 ? (
                  <div>
                      <div className="space-50"></div>
                      <Row>
                      <Col md={{size:8, offset:1}}>
                      <h4><strong>Selected Pathway: </strong>{selectedPathway}</h4>
                          <div>
                            <Vega spec={vegaSpec2} data={data2} />
                          </div>
                        </Col>
                  </Row>

                  </div>
                  ) : ('')}
                  {/* <Row>
                    <Col>
                    <Table>
                      <thead>
                        <tr>
                          <th>Drug Name</th>
                          <th>Total</th>
                          <th>S :: R</th>
                        </tr>
                      </thead>
                      <tbody>
                          {selectedDrugStats.map((stats, index) =>  
                          <tr key={index}>
                            <td>{stats.DRUG_NAME}</td>
                            <td>{stats.T_C}</td>
                            <td>{stats.R_TYPE}</td>
                            </tr>)}
                      </tbody>
                    </Table>

                    </Col>
                  </Row> */}
                </Col>
              </Row>
            </Container>
        </div>
    </>
  );
}

export default PortfolioPage;
