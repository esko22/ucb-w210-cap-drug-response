import React, { useState}  from "react";
import {
    Container,
    Row,
    Col,
    Input,
    Table,
    Button
  } from "reactstrap";

// core components
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";

import target_drug_matrix from "../data/target_drug_matrix.json";
// import drug_response_matrix from "../data/drug_response.json";
import patient_list from "../data/patients.json";
import patient_results from "../data/patient_results.json";

import Targets from "../data/targets.js";
import Pathways from "../data/pathways.js";
import Conditions from "../data/conditions.js";

function RecruitPage() {

  target_drug_matrix.sort(function (a, b) {
    if (a.TARGET < b.TARGET)
      return -1;
    if (a.TARGET > b.TARGET)
      return 1;
    return 0;
  });


  React.useEffect(() => {
  }, []);


  const [target, setTarget] = useState('');
  const [selectedPathways, setSelectedPathways] = useState(Pathways);
  const [patientResults, setPatientResults] = useState(patient_results);
  const [patients, setPatients] = useState(patient_list);
  const [filteredPatients, setFilteredPatients] = useState(patient_results);
  const [selectedPatients, setSelectedPatients] = useState([]);

  function handleTargetSelection(e) {

      var changedTargets = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
      var changedPathways = Array.from(new Set(target_drug_matrix.filter(f => changedTargets.includes(f.TARGET)).map(m => m.TARGET_PATHWAY)));

      var td_matrix_items = target_drug_matrix.filter(tdm => changedTargets.includes(tdm.TARGET) && changedPathways.includes(tdm.TARGET_PATHWAY));

      setSelectedPathways(changedPathways);
      setTarget(changedTargets);
      
  }

  function handlePathwaySelection(e){

    var changedPathways = [].filter.call(e.target.options, o => o.selected).map(o => o.value);
    var matrix_items = [];

    if (target.length > 0)
      matrix_items = target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY) && target.includes(f.TARGET));
    else
      matrix_items = target_drug_matrix.filter(f => changedPathways.includes(f.TARGET_PATHWAY));

    let patientList = patientResults.filter(f => changedPathways.includes(f.PATHWAY));
    setFilteredPatients(patientList);
  }

  function handleConditionSelection(e){
    var changedConditions = [].filter.call(e.target.options, o => o.selected).map(o => o.value);

    let patientList = patientResults.filter(f => changedConditions.includes(f.CONDITION));
    setFilteredPatients(patientList);

  }

  function handleAddPatient(e, patient){

    var requests = [];
    selectedPatients.forEach(f => requests.push(f));

    if (e.currentTarget.checked)
    {
      if(!requests.find((i) => i.PATIENT_ID == patient.PATIENT_ID))
        requests.push(patient);
    }
    else
    {
      var target_item = selectedPatients.find(f => f.PATIENT_ID === patient.PATIENT_ID);
      requests.splice(selectedPatients.indexOf(target_item), 1);
    }

    setSelectedPatients(requests);

  }




  return (
    <>
      <ApplicationNavbar />
      <div className="section section-tabs">
            <Container>
              <Row>
                <Col className="section-why-we-do-2" md={{size:3}} >
                  <div className="space-25"></div>
                  <h3>Recruitment</h3>
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
                  <Row>
                    <Col>
                        <div>
                            <h4>Pathways</h4>
                            <select className="pathway-select" onChange={e => handlePathwaySelection(e)} multiple>
                                {selectedPathways.sort().map((pathway) => <option key={pathway} value={pathway}>{pathway}</option>)}
                            </select>
                        </div>            
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                        <div>
                            <h4>Conditions</h4>
                            <select className="pathway-select" onChange={e => handleConditionSelection(e)} multiple>
                                {Conditions.sort().map((condition) => <option key={condition} value={condition}>{condition}</option>)}
                            </select>
                        </div>            
                    </Col>

                  </Row>
                  <div className="space-100"></div>
                </Col>
                <Col className="section patient-container" md={{size:9}} >
                <Table>
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Model</th>
                        <th>Drug</th>
                        <th>Response</th>
                        <th>Threshold Delta</th>
                      </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.sort().map((result, index) =>  
                        <tr key={index}>
                          <td><Input type="checkbox" onChange={(e) => handleAddPatient(e, result)}></Input>{result.PATIENT_ID}</td>
                          <td>{result.MODEL + '--' + result.PATHWAY}</td>
                          <td>{result.DRUG_NAME}</td>
                          <td>{result.BINARY_RESPONSE}</td>
                          <td>{Math.round(Math.abs(result.LN_IC50 - result.THRESHOLD) * 100) / 100}</td>
                          </tr>)}
                    </tbody>
                  </Table>
                  <Row>
              {selectedPatients.length > 0 ? (
              <Col>
                <h5>Selected Patients</h5>
                <ul>
                      {selectedPatients.map((patient) => <li key={patient.PATIENT_ID} ><span>{patient.PATIENT_ID}</span></li>)}
                </ul>
                <Button className="btn-round" color="info" type="button" >
                  Contact For Trial
                </Button>
                <Button className="btn-round" color="success" type="button" >
                  Predict New Drug
                </Button>
              </Col>
              ) : ('')}
              </Row>

                </Col>
              </Row>

            </Container>
        </div>
    </>
  );
}

export default RecruitPage;
