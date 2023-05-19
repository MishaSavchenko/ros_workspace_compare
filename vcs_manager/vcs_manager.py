from vcstool.commands.export import main as export
import argparse
from io import StringIO
import sys
import json
import re
import yaml
from yaml import SafeLoader

import difflib
from pathlib import Path


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
        return yaml.dumps(yaml.load(val, Loader=SafeLoader), indent=4)
        return json.dumps(yaml.load(val, Loader=SafeLoader), indent=4)

    def workspace_compare(self):
        ws_a_file = "/home/misha/code/ros_workspace_compare/vcs_manager/test/ws_a"
        ws_b_file = "/home/misha/code/ros_workspace_compare/vcs_manager/test/ws_b"

        with open(ws_a_file, "r") as f:
            # ws_a_data = f.read()
            # ws_a = json.loads(ws_a_data)
            ws_a = f.read()

        with open(ws_b_file, "r") as f:
            # ws_b_data = f.read()
            # ws_b = json.loads(ws_b_data)
            ws_b = f.read()

        # first_file_lines = ws_a.splitlines()

        second_file_lines = ws_b.splitlines()
        first_file_lines = [""] * len(second_file_lines)

        html_diff = difflib.HtmlDiff().make_file(first_file_lines, second_file_lines)
        return html_diff


if __name__ == "__main__":
    print("Howdy")
    # path = "/home/misha/code/hand_eye_cal_ws/src"
    test_path = "/home/misha/code/test_ws/src"
    vc_compare = VCCompare()
    res = vc_compare.add_workspace(test_path)
    # print(res)
    # exit()
    # open("/home/misha/code/ros_workspace_compare/vcs_manager/test/ws_a",
    #      "w").write(res)
    # print(res)
    # exit()
    # print(html_diff)
    # print(type(html_diff))
    # Path('diff.html').write_text(html_diff)
    # diff = difflib.ndiff(ws_a, ws_b)
    # delta = ''.join(x[2:] for x in diff if x.startswith('- '))
    # print(delta)
