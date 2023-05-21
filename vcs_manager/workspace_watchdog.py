import sys
import time

from watchdog.observers import Observer
from events import WorkspaceEventHandler


class WorkspaceWatcher:
    def __init__(self):

        self.__src_path = "/home/misha/code/test_ws/src"
        self.__event_handler = WorkspaceEventHandler(self.__src_path)
        self.__event_observer = Observer()

    def run(self):
        self.start()
        try:
            while True:
                print(self.__event_handler.last_time)
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop()

    def start(self):
        self.__schedule()
        self.__event_observer.start()

    def stop(self):
        self.__event_observer.stop()
        self.__event_observer.join()

    def __schedule(self):
        self.__event_observer.schedule(
            self.__event_handler,
            self.__src_path,
            recursive=True
        )


if __name__ == "__main__":
    WorkspaceWatcher().run()
