from __future__ import print_function
from threading import Thread
from time import sleep
import time
from flask import Flask, make_response
from vcs_manager.vcs_manager import VCCompare
from vcs_manager.workspace_watchdog import WorkspaceWatcher

app = Flask(__name__)
vc_compare = None
workspace_watcher = None


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
    workspace_watcher = WorkspaceWatcher()
    workspace_watcher.start()
    app.run(host='127.0.0.1', port=5000)
    workspace_watcher.join()
