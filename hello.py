from __future__ import print_function
import time
from flask import Flask, make_response
from vcs_manager.vcs_manager import VCCompare
app = Flask(__name__)


vc_compare = None


@app.route("/")
def hello():
    return "Hello World! This is powered by Python backend."


@app.route("/murder")
def murder():
    return "OH SHIT SHE DID IT."


@app.route('/add_workspace/<path:directory>')
def add_workspace(directory):
    return {"response": directory}


@app.route('/workspace_compare_test')
def workspace_compare():
    return vc_compare.workspace_compare()


if __name__ == "__main__":
    vc_compare = VCCompare()
    app.run(host='127.0.0.1', port=5000)
