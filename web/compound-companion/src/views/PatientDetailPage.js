import React, { useState}  from "react";
import fetch from "fetch-retry";

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
    Card,
    CardHeader,
    CardBody,
    TabPane,
    TabContent,
    Spinner
  } from "reactstrap";

// core components
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
import patient_list from "../data/patients.json";

import Targets from "../data/targets.js";
import Pathways from "../data/pathways.js";
import Settings from "../data/settings.js";

function PatientDetailPage() {

  target_drug_matrix.sort(function (a, b) {
    if (a.TARGET < b.TARGET)
      return -1;
    if (a.TARGET > b.TARGET)
      return 1;
    return 0;
  });




  function ComparePatients(a, b){
    let comparison = 0;
    if (a.PATIENT_ID > b.PATIENT_ID) {
      comparison = 1;
    } else if (a.PATIENT_ID < b.PATIENT_ID) {
      comparison = -1;
    }
    return comparison;
  }


  const [targetedDrugs, setTargetedDrugs] = useState([]);
  const [target, setTarget] = useState('');
  const [selectedPathways, setSelectedPathways] = useState(Pathways);
  const [currentPathways, setCurrentPathways] = useState([]);
  const [drugResponses, setDrugResponses] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState(patient_list.sort(ComparePatients));
  const [selectedDrugStats, setSelectedDrugStats] = useState([]);
  const [predictionRequests, setPredictionRequests] = useState([]);
  const [pills, setPills] = useState("1");
  const [keepPolling, setKeepPolling] = useState(false);

  const [patientResistantPredictions, setPatientResistantPredictions] = useState([]);
  const [patientSensitivePredictions, setPatientSensitivePredictions] = useState([]);

  function handleInitialPredictRequest() {

    let newPatient = {...selectedPatient}
    setKeepPolling(true);

    fetch(Settings.PredictionApiPath + "/predict/" + newPatient.COSMIC_ID + "/condition/" + newPatient.TCGA_LABEL)
    .then(() => {
        selectedPatient.INIT_PRED_REQUESTED = true;
        newPatient.INIT_PRED_REQUESTED = true;
        setSelectedPatient(newPatient);
        pollForResults(newPatient);
      },
      (error) => {
        console.log(error);
      }
    )

  }

 function handleSpecificPredictRequest() {
  fetch(Settings.PredictionApiPath + "/predict/" + selectedPatient.COSMIC_ID + "/condition/" + selectedPatient.TCGA_LABEL + /pathway/ + currentPathways[0])
    .then(() => { 
      setKeepPolling(true);
      setTimeout(function(){ setKeepPolling(false)}, 5000);
    })


 } 


  function pollForResults(patient) {
    fetch(Settings.PredictionApiPath +  "/patients/" + patient.COSMIC_ID + "/results", {
      retries: 10,
      retryDelay: 5000,
      retryOn: [404]
      })
    .then(result => result.json(),
    (error) => {
        console.log(error);
      }
    ).then(data => {
      if(data) {
        setPatientResistantPredictions(data.filter((res) => res.BINARY_RESPONSE === 'R'));
        setPatientSensitivePredictions(data.filter((res) => res.BINARY_RESPONSE === 'S'));  
      }
    })
  }



  React.useEffect(() => {
    handlePatientSelection(patients[0].PATIENT_ID);
  }, []);

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
    setCurrentPathways(changedPathways);
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
      let filtered_drug_ids = Array.from(new Set(filteredDrugs.map(x => x.DRUG_ID)));
      setTargetedDrugs(filteredDrugs);

      let selected_drugs_stat = [];
      let response_matrix_items = [];
      let counter = 0;

      filtered_drug_ids.forEach(drug => {

         fetch(Settings.PredictionApiPath +  "/drugs/" + drug + "/responses")
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
              }
          }
        )
       });

  }

  function handlePatientSelection(patient)
  {
      patient = patients.find(f => f.PATIENT_ID === patient);

      setSelectedPatient(patient);
      setSelectedPathways(Pathways);
      setSelectedDrugStats([]);
      setPatientResistantPredictions([]);
      setPatientSensitivePredictions([]);

      getPatientResults(patient);

  }

  function getPatientResults(patient)
  {
    fetch(Settings.PredictionApiPath + "/patients/" + patient.COSMIC_ID + "/results")
    .then(result => result.json(),
    (error) => {
        console.log(error);
      }
    ).then(data => {
      if(data) {
        setPatientResistantPredictions(data.filter((res) => res.BINARY_RESPONSE === 'R'));
        setPatientSensitivePredictions(data.filter((res) => res.BINARY_RESPONSE === 'S'));  
      }
    })

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
  }



  return (
    <>
      <ApplicationNavbar />
        <div className="section section-tabs">
            <Container>
              <Row>
                <Col className="section-why-we-do-2 scrolly-boy" md={{size:3}} >
                  <div className="space-25"></div>
                  <h3><strong>Samples</strong></h3>
                  <hr />
                  <Nav vertical>
                      {patients.map((p) => <NavItem key={p.COSMIC_ID} onClick={() => handlePatientSelection(p.PATIENT_ID)}><NavLink className="patient-labels"> {p.PATIENT_ID} </NavLink> </NavItem>)}
                  </Nav>
                </Col>
                <Col className="section patient-container" md={{size:9}} >
                  { selectedPatient ? (
                    <div>
                        <Row>                              
                          <Col md={{size:6, offset:1}}>
                          <h3><strong>Information</strong></h3>
                            <Row>
                                <Col md="4">Sample ID</Col>
                                <Col md="4">{selectedPatient.PATIENT_ID}</Col>
                            </Row>
                            <Row>
                                <Col md="4">Accession ID</Col>
                                <Col md="4">{selectedPatient.COSMIC_ID}</Col>
                            </Row>
                            <Row>
                                <Col md="4">Condition </Col>
                                <Col md="4">{selectedPatient.TCGA_LABEL}</Col>
                            </Row>
                          </Col>
                          <Col md={{size:5}}>
                          <h3><strong>Datasets</strong></h3>
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
                        <div className="space-50"></div>
                          <Row>
                          { patientResistantPredictions.length > 0 || patientSensitivePredictions.length > 0 ? (
                          <Col className="ml-auto mr-auto">
                            <Card>
                              <CardHeader>
                                <Nav
                                  className="nav-tabs-neutral justify-content-center"
                                  data-background-color="black"
                                  role="tablist"
                                  tabs
                                >
                                  <NavItem>
                                    <NavLink
                                      className={pills === "1" ? "active" : ""}
                                      href="#pablo"
                                      onClick={e => {
                                        e.preventDefault();
                                        setPills("1");
                                      }}
                                    >
                                      Resistant
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={pills === "2" ? "active" : ""}
                                      href="#pablo"
                                      onClick={e => {
                                        e.preventDefault();
                                        setPills("2");
                                      }}
                                    >
                                      Sensitive
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={pills === "3" ? "active" : ""}
                                      href="#pablo"
                                      onClick={e => {
                                        e.preventDefault();
                                        setPills("3");
                                      }}
                                    >
                                      Predict
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                              </CardHeader>
                              <CardBody>
                                <TabContent
                                  className="text-center"
                                  activeTab={"pills" + pills}
                                >
                                  <TabPane tabId="pills1">
                                  <Row>
                                      {patientResistantPredictions.length == 0 ? (<Col md={{size:5, offset:3}}><h4>No Resistant Drugs Predicted</h4></Col>) :(
                                      <Col>
                                      <Table>
                                        <thead>
                                          <tr>
                                            <th>Drug Name</th>
                                            <th>Model Condition</th>
                                            <th>Pathway</th>
                                            <th>IC 50</th>
                                            <th>Threshold</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            {patientResistantPredictions.map((preds) =>  
                                            <tr key={preds.DRUG_ID}>
                                              <td>{preds.DRUG_NAME}</td>
                                              <td>{preds.MODEL}</td>
                                              <td>{preds.PATHWAY}</td>
                                              <td>{preds.LN_IC50}</td>
                                              <td>{preds.THRESHOLD}</td>
                                              </tr>)}
                                        </tbody>
                                      </Table>
                                      </Col>)}
                                  </Row>
                                  </TabPane>
                                  <TabPane tabId="pills2">
                                  <Row>
                                  {patientSensitivePredictions.length == 0 ? (<Col md={{size:5, offset:3}}><h4>No Sensitive Drugs Predicted</h4></Col>) :(

                                      <Col>
                                      <Table>
                                        <thead>
                                          <tr>
                                            <th>Drug Name</th>
                                            <th>Model Condition</th>
                                            <th>Pathway</th>
                                            <th>IC 50</th>
                                            <th>Threshold</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            {patientSensitivePredictions.map((preds) =>  
                                            <tr key={preds.DRUG_ID}>
                                              <td>{preds.DRUG_NAME}</td>
                                              <td>{preds.MODEL}</td>
                                              <td>{preds.PATHWAY}</td>
                                              <td>{preds.LN_IC50}</td>
                                              <td>{preds.THRESHOLD}</td>
                                              </tr>)}
                                        </tbody>
                                      </Table>
                                      </Col>)}
                                    </Row>
                                  </TabPane>
                                  <TabPane tabId="pills3">
                                  <Row>
                                    <Col md="4">
                                      <Row>
                                          <Col>
                                            <div>
                                                <h4><strong>Targets</strong></h4>
                                                <select onChange={e => handleTargetSelection(e)} multiple>
                                                    {Targets.sort().map((target) => <option key={target} value={target}>{target}</option>)}
                                                </select>
                                            </div>            
                                        </Col>
                                      </Row>
                                      <Row>
                                          <Col>
                                            <div>
                                              <h4><strong>Pathways</strong></h4>
                                              <select className="pathway-select" onChange={e => handlePathwaySelection(e)} multiple>
                                                  {selectedPathways.sort().map((pathway) => <option key={pathway} value={pathway}>{pathway}</option>)}
                                              </select>
                                          </div>            
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md="8">
                                      <div>
                                          <h4><strong>Available Compounds</strong></h4>
                                          <Table>
                                            <thead>
                                              <tr>
                                                <th></th>
                                                <th>Drug</th>
                                                <th>Total</th>
                                                <th>S :: R</th>
                                                { selectedPatient ? (<th>{selectedPatient.TCGA_LABEL} S :: R</th>) : ('')}
                                              </tr>
                                            </thead>
                                            <tbody>
                                                {selectedDrugStats.map((drug_resp) =>  
                                                <tr key={drug_resp.DRUG_ID}>
                                                  <th scope="row"><Input onChange={e => handleDrugSelection(e, drug_resp.DRUG_ID)} type="checkbox"></Input></th>
                                                  <td>{drug_resp.DRUG_NAME}</td>
                                                  <td>{drug_resp.T_C}</td>
                                                  <td>{drug_resp.T_S_C} :: {drug_resp.T_R_C}</td>
                                                  <td>{drug_resp.C_S_C} :: {drug_resp.C_R_C}</td>
                                                  </tr>)}
                                            </tbody>
                                          </Table>
                                      </div>            
                                  </Col>
                              </Row>
                              <Row>
                                  <Col md={{size:8, offset:4}}>
                                      <div>
                                        <h4><strong>Prediction Requests</strong></h4>
                                      </div>
                                      {keepPolling ?(<Spinner style={{ width: '3rem', height: '3rem' }} color="warning" />) :
                                      (
                                      <Row>
                                          <Col>{currentPathways}</Col>
                                          <Col>
                                            <ul>
                                              {predictionRequests.map((pred_reqs) => <li key={pred_reqs.DRUG_ID} ><span>{pred_reqs.DRUG_NAME}</span></li>)}
                                            </ul>
                                          </Col>
                                          <Button className="btn-round" onClick={handleSpecificPredictRequest} color="success" type="button">
                                        <i className="now-ui-icons"></i>
                                        Predict
                                      </Button>
                                      </Row>
                                      )}
                                  </Col>
                              </Row>
                                  </TabPane>
                                </TabContent>
                              </CardBody>
                            </Card>
                          </Col>) :                          
               (
                        <Col>
                          <Row>
                            { selectedPatient.INIT_PRED_REQUESTED == null ?
                            (                            
                              <Col md={{size:6, offset:3 }}>
                                <h3>No existing predictions</h3>
                                    <Button className="btn-round" color="success" type="button" onClick={handleInitialPredictRequest}>
                                    <i className="now-ui-icons"></i>
                                    Predict
                                  </Button>
                                </Col>) :
                            
                            (<Col md={{size:4, offset:3 }}>
                                <h3>Processing Request</h3>
                                <Spinner style={{ width: '3rem', height: '3rem' }} color="warning" type="grow" />
                              </Col>)}
                          
                          </Row>
                        </Col>
             )}
              </Row>
          </div>
        ) : ("")
        }
    </Col>
  </Row>
      </Container>
    </div>
    </>
  );
}

export default PatientDetailPage;