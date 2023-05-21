import os
from PIL import Image
from PIL.ImageOps import grayscale
from watchdog.events import FileModifiedEvent
from time import time, ctime


class WorkspaceEventHandler(FileModifiedEvent):
    last_time = 0.0

    def __init__(self, dir):
        super().__init__(dir)

    def dispatch(self, event):
        self.last_time = time()
