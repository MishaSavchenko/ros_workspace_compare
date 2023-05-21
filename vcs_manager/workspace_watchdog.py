import sys
import time

from watchdog.observers import Observer
from .events import WorkspaceEventHandler
from .vcs_manager import VCCompare

import threading


class WorkspaceWatcher(threading.Thread):
    watched_workspaces = ["/home/misha/code/test_ws/src",
                          "/home/misha/code/wbc_ws/src"]
    event_handlers = []
    last_event_times = []

    vc_compare = None

    def __init__(self):

        self.vc_compare = VCCompare()

        for workspace in self.watched_workspaces:
            self.event_handlers.append(WorkspaceEventHandler(workspace))
        self.__event_observer = Observer()

        threading.Thread.__init__(self)

    def run(self):
        self.watchdog_start()
        try:
            while True:
                for indx, handler in enumerate(self.event_handlers):
                    if self.last_event_times[indx] - handler.last_time < -1.0:
                        self.last_event_times[indx] = handler.last_time

                time.sleep(1)
        except KeyboardInterrupt:
            self.watchdog_stop()

    def watchdog_start(self):
        self.__schedule()
        self.__event_observer.start()

    def watchdog_stop(self):
        self.__event_observer.stop()
        self.__event_observer.join()

    def __schedule(self):
        for workspace, handler in zip(self.watched_workspaces, self.event_handlers):
            self.__event_observer.schedule(
                handler,
                workspace,
                recursive=True
            )
            self.last_event_times.append(-1.0)


if __name__ == "__main__":

    WorkspaceWatcher().run()
