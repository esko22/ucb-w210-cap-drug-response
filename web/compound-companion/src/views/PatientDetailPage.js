import React, { useState}  from "react";
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Input,
    Label,
    Button,
    Table,
  } from "reactstrap";

// core components
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
import patient_list from "../data/patients.json";
import patient_results from "../data/patient_results.json";

import Targets from "../data/targets.js";
import Pathways from "../data/pathways.js";

import Demo from "./product-sections/vega-demo.js";
import LiteDemo from "./product-sections/vega-lite-demo.js";


import { Vega, createClassFromSpec } from 'react-vega';
import spec3 from '../vega-specs/spec3';
import spec4 from '../vega-specs/spec4';
import spec5 from '../vega-specs/spec5.json';
import spec6 from '../vega-specs/spec6.json';

function PatientDetailPage() {

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
  const [target, setTarget] = useState('');
  const [selectedPathways, setSelectedPathways] = useState(Pathways);
  const [drugResponses, setDrugResponses] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vegaSpec, setVegaSpec] = useState(spec5);
  const [patients, setPatients] = useState(patient_list);
  const [patientResults, setPatientResults] = useState(patient_results);
  const [selectedDrugStats, setSelectedDrugStats] = useState([]);
  const [predictionRequests, setPredictionRequests] = useState([]);

  const TestChart = createClassFromSpec({spec: spec6});
  const [patientResistantPredictions, setPatientResistantPredictions] = useState([]);
  const [patientSensitivePredictions, setPatientSensitivePredictions] = useState([]);

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
      
      handleDrugResponseSet(td_matrix_items);
  }

  function handlePathwaySelection(e){

    var changedPathways = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
    var matrix_items = [];

    if (target.length > 0)
      matrix_items = target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY) && target.includes(f.TARGET));
    else
      matrix_items = target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY));

    handleDrugResponseSet(matrix_items);
  }


  function getDrugStats(response_matrix_items, drugId)
  {
    var total_drug_response_count = response_matrix_items.length;
    var total_resistant_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'R').length; 
    var total_sensitive_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'S').length; 

    if (selectedPatient)
    {
      var cond_resistant_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'R' && resp.TCGA_LABEL === selectedPatient.TCGA_LABEL).length; 
      var cond_sensitive_count = response_matrix_items.filter((resp) => resp.BINARY_RESPONSE === 'S' && resp.TCGA_LABEL === selectedPatient.TCGA_LABEL).length; 
    }
    var drug_name = target_drug_matrix.find(f => f.DRUG_ID === drugId).DRUG_NAME;


    return { 'DRUG_ID': drugId,'DRUG_NAME': drug_name,'T_C': total_drug_response_count, 'T_R_C': total_resistant_count, 'T_S_C': total_sensitive_count, 'C_R_C': cond_resistant_count, 'C_S_C': cond_sensitive_count };
  }



  function handleDrugResponseSet(filteredDrugs){
      let filtered_drug_ids = filteredDrugs.map(x => x.DRUG_ID);
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
              selected_drugs_stat.push(getDrugStats(data, drug));

              if (counter == filtered_drug_ids.length) {
                setSelectedDrugStats(selected_drugs_stat);
                setDrugResponses(response_matrix_items);
                // setData1(  {myData: response_matrix_items});
                console.log(response_matrix_items.length);
              }
          }
        )
       });

  }

  function handlePatientSelection(patient)
  {
      patient = patients.find(f => f.PATIENT_ID === patient);

      setSelectedPatient(patient);

      console.log(patient);

      setPatientResistantPredictions(patientResults.filter((res) => res.PATIENT_ID === patient.PATIENT_ID && res.BINARY_RESPONSE === 'R'));
      setPatientSensitivePredictions(patientResults.filter((res) => res.PATIENT_ID === patient.PATIENT_ID && res.BINARY_RESPONSE === 'S'));
  }

  function handleDrugSelection(e, drugId) {

    var requests = [];
    predictionRequests.forEach(f => requests.push(f));


    if (e.currentTarget.checked)
    {
      requests.push(target_drug_matrix.find(dr => dr.DRUG_ID === drugId));
    }
    else
    {
      var target_item = predictionRequests.find(f => f.DRUG_ID === drugId);
      requests.splice(predictionRequests.indexOf(target_item), 1);
    }

    setPredictionRequests(requests);
    console.log(requests);
    //var drugsSelected =  [].filter.call(e.target.options, o => o.selected).map(o => o.value);

    // for (let index = 0; index < drugsSelected.length; index++) {
    //   const element = drugsSelected[index];
    //   console.log(element.DRUG_ID);
      
    // }

    //setSelectedDrugs(drugsSelected);
    //console.log(drug_selection_matrix.filter(dsm => dsm.DRUG_ID == 1526));
  }






  return (
    <>
      <ApplicationNavbar />
        <div className="section section-tabs">
            <Container>
              <Row>
                <Col className="section-why-we-do-2 scrolly-boy" md={{size:3}} >
                  <div className="space-25"></div>
                  <h3>Patients</h3>
                  <hr />
                  <Nav vertical>
                      {patients.map((p) => <NavItem onClick={() => handlePatientSelection(p.PATIENT_ID)}><NavLink> {p.PATIENT_ID} </NavLink> </NavItem>)}
                  </Nav>
                </Col>
                <Col className="section" md={{size:9}} >
                  <div className="space-50"></div>
                  { selectedPatient ? (
                    <div>
                        <Row>                              
                          <Col md={{size:6, offset:1}}>
                          <h3>Information</h3>
                            <Row>
                                <Col md="4">Patient ID</Col>
                                <Col md="4">{selectedPatient.PATIENT_ID}</Col>
                            </Row>
                            <Row>
                                <Col md="4">Condition </Col>
                                <Col md="4">{selectedPatient.TCGA_LABEL}</Col>
                            </Row>
                          </Col>
                          <Col md={{size:5}}>
                          <h3>Datasets</h3>
                              <Row>
                              <Label check>
                                    <Input disabled checked={selectedPatient.WES == "Y"} type="checkbox"></Input>
                                    Whole Exome Data
                                  </Label>                                  
                              </Row>
                              <Row>
                                  <Label check>
                                    <Input disabled checked={selectedPatient.CNA == "Y"} type="checkbox"></Input>
                                    Copy Number 
                                  </Label>                                  
                              </Row>
                              <Row>
                                  <Label check>
                                    <Input disabled checked={selectedPatient.METHYL == "Y"} type="checkbox"></Input>
                                    Methylation
                                  </Label>                                  
                              </Row>
                          </Col>
                        </Row>
                        <div className="space-100"></div>
                         <Row>
                            <Col md={{size:11, offset:1}}>
                                <h3>Resistant</h3>
                                <Row>
                                    <Col>
                                    <Table>
                                      <thead>
                                        <tr>
                                          <th>Drug Name</th>
                                          <th>Model</th>
                                          <th>Model Type</th>
                                          <th>IC 50</th>
                                          <th>Threshold</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                          {patientResistantPredictions.map((preds) =>  
                                          <tr key={preds.DRUG_ID}>
                                            <td>{preds.DRUG_NAME}</td>
                                            <td>{preds.MODEL}</td>
                                            <td>{preds.MODEL_TYPE}</td>
                                            <td>{preds.LN_IC50}</td>
                                            <td>{preds.THRESHOLD}</td>
                                            </tr>)}
                                      </tbody>
                                    </Table>
                                    </Col>
                                </Row>
                                <div className="space-50"></div>
                                <h3>Sensistive</h3>
                                <Row>
                                    <Col>
                                    <Table>
                                      <thead>
                                        <tr>
                                          <th>Drug Name</th>
                                          <th>Model</th>
                                          <th>Model Type</th>
                                          <th>IC 50</th>
                                          <th>Threshold</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                          {patientSensitivePredictions.map((preds) =>  
                                          <tr key={preds.DRUG_ID}>
                                            <td>{preds.DRUG_NAME}</td>
                                            <td>{preds.MODEL}</td>
                                            <td>{preds.MODEL_TYPE}</td>
                                            <td>{preds.LN_IC50}</td>
                                            <td>{preds.THRESHOLD}</td>
                                            </tr>)}
                                      </tbody>
                                    </Table>
                                    </Col>
                                </Row>

                              </Col>
                          </Row>
                       </div>
                      ) : ("")
                      }
                </Col>
              </Row>


              <Row>
                  <div>
                    <Row>
                      <Col md="3">
                      </Col>
                
                    </Row>

                  </div>
              </Row>
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
                    <Col md="9">
                        <div>
                            <h2>Available Compounds</h2>
                            <Table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Drug Name</th>
                                  <th>Total</th>
                                  <th>Total Sens</th>
                                  <th>Total Res</th>
                                  { selectedPatient ? (<th>{selectedPatient.TCGA_LABEL} Sens</th>) : ('')}
                                  { selectedPatient ? (<th>{selectedPatient.TCGA_LABEL} Res</th>) : ('')}
                                </tr>
                              </thead>
                              <tbody>
                                   {selectedDrugStats.map((drug_resp) =>  
                                   <tr key={drug_resp.DRUG_ID}>
                                     <th scope="row"><Input onChange={e => handleDrugSelection(e, drug_resp.DRUG_ID)} type="checkbox"></Input></th>
                                     <td>{drug_resp.DRUG_NAME}</td>
                                     <td>{drug_resp.T_C}</td>
                                     <td>{drug_resp.T_S_C}</td>
                                     <td>{drug_resp.T_R_C}</td>
                                     <td>{drug_resp.C_S_C}</td>
                                     <td>{drug_resp.C_R_C}</td>
                                    </tr>)}
                              </tbody>
                            </Table>
                        </div>            
                    </Col>
                    <Col md="2">
                        <div>
                          <h2>Prediction Requests</h2>
                        </div>
                        <Row>
                            <Col>
                              <ul>
                                {predictionRequests.map((pred_reqs) => <li key={pred_reqs.DRUG_ID} ><span>{pred_reqs.DRUG_NAME}</span></li>)}
                              </ul>
                            </Col>
                        </Row>
                        <Button className="btn-round" color="info" type="button">
                          <i className="now-ui-icons ui-2_favourite-28"></i>
                          Predict
                        </Button>
                    </Col>
                </Row>
                <TestChart data={data1} />

                {/* <Demo ></Demo> */}
                {/* <LiteDemo></LiteDemo> */}
            </Container>
          </div>
    </>
  );
}

export default PatientDetailPage;