# ToDo: Make it actually remember 3-axis position and understand commands
import time


class StageControllerSimulator:
    def execute_command(self, command: str):
        print(f'Stage controller executed: {command}')
        time.sleep(0)