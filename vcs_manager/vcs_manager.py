from vcstool.commands.export import main as export
import argparse
from io import StringIO
import sys
import json
import re
import yaml
from yaml import SafeLoader


class VCCompare:
    workspace_data = {}

    def __init__(self):
        return

    def get_workspaces(self):
        return self.workspace_data.keys()

    def add_workspace(self, path):
        old_stdout = sys.stdout
        sys.stdout = local_stdout = StringIO()
        export(args=[path], stdout=local_stdout)
        sys.stdout = old_stdout
        # print(type(local_stdout.getvalue()))
        val = local_stdout.getvalue()
        val = val[val.find('\n'):]
        return json.dumps(
            yaml.load(val, Loader=SafeLoader))


if __name__ == "__main__":
    print("Howdy")
    path = "/home/misha/code/hand_eye_cal_ws/src"
    vc_compare = VCCompare()
    vc_compare.add_workspace(path)
    print(vc_compare.workspace_data)
