"""
This is a data structure that holds an F-code for writing a chip using
field emission e-beams
"""
from enum import Enum


class DeviceDriver(Enum):
    VOLTAGE_CONTROLLER = 1
    STAGE_CONTROLLER = 2
    GEN_G_CONTROLLER = 3


class FCode:
    """
    The F-code consists of commands that each goes either to an Arduino
    controlling the voltages or to an 8742-4-KIT Four-Axis Picomotor Controller

    Sudo-code example of an F-code:
        (('stage', 'move to position 0'),
        ('arduino', 'turn on beams 0,2,3'),
        ('gen_g', 'wait 2 seconds'),
        ('arduino', 'turn off all beams'),
        ('gen_g', 'move X-axis 300nm'),
        ('gen_g', 'move Y-axis 450nm'),
        ...)
    """

    def __init__(self):
        self._commands = []

    def get_code(self):
        return tuple(map(tuple, self._commands))

    def add_command(self, device: DeviceDriver, command: str):
        if isinstance(device, DeviceDriver) \
                and command is not None \
                and command != '':
            self._commands.append((device, command))
        else:
            raise ValueError('Invalid command added')