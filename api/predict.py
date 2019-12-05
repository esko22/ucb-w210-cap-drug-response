from flask import Blueprint, jsonify, current_app

import json
import os

bp = Blueprint("predict", __name__)

patients = []
patient_results = []

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

## WES
##with open(APP_ROOT + '/data/patient_results.json') as json_file:
##    patient_results = json.load(json_file)

## CNA
##with open(APP_ROOT + '/data/patient_results.json') as json_file:
##    patient_results = json.load(json_file)


@bp.route("/predict/<string:id>/condition/<string:condition>")
def predict_patient_condition(id, condition):

    #here you will pull data from WES and CNA based on id == cosmic_id
    #pipe this data into kafka
    print("ID - {0}, CONDITION - {1}".format(id, condition))

    return jsonify("OK")



@bp.route("/predict/<string:id>/condition/<string:condition>/pathway/<string:pathway>")
def predict_patient_condition_pathway(id, condition, pathway):

    #same as above, just with pathway given for a more specific model

    #here you will pull data from WES and CNA based on id == cosmic_id
    #pipe this data into kafka
    print("ID - {0}, CONDITION - {1}, PATHWAY - {2}".format(id, condition, pathway))

    return jsonify("OK")
