from flask import Blueprint, jsonify, current_app

import json
import os

bp = Blueprint("patients", __name__)

patients = []
patient_results = []

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

with open(APP_ROOT + '/data/patients.json') as json_file:
    patients = json.load(json_file)

with open(APP_ROOT + '/data/patient_results.json') as json_file:
    patient_results = json.load(json_file)


@bp.route("/patients")
def index():
    return jsonify(patients)



@bp.route("/patients/<string:id>/results")
def get_patient_results(id):

    ## we should look into using this https://github.com/dropbox/PyHive
    ## then do your query based on id that is passed in

    #we can change this to pull files or something when the pipeline is complete
    results = filter(lambda p: p['PATIENT_ID'] == id,patient_results)

    return jsonify(list(results))
