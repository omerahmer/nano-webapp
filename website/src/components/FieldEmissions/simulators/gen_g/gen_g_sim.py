import time
from typing import Optional

import serial

from core.models.slicer.f_code import DeviceDriver
from simulators.stage_controller.stage_controller_sim import \
    StageControllerSimulator
from simulators.voltage_controller.voltage_controller_sim import \
    VoltageControllerSimulator


def _execute_gen_g_command(command: str):
    command_parts = command.split()
    if command_parts[0] == 'Wait':
        time.sleep(int(command_parts[1]))


class GenGSimulator:
    def __init__(self, f_code,
                 voltage_controller_com_port: Optional[str] = None,
                 stage_controller_com_port: Optional[str] = None):
        self._serial_connection = None
        self._f_code = f_code
        if stage_controller_com_port is None:
            self._stage_controller_sim = StageControllerSimulator()
        else:
            self._stage_controller_sim = None
            self._stage_controller_com_port = stage_controller_com_port
        if voltage_controller_com_port is None:
            self._voltage_controller_sim = VoltageControllerSimulator()
        else:
            self._voltage_controller_sim = None
            self._voltage_controller_com_port = voltage_controller_com_port

    def start_simulation(self):
        self._initialize_serial_communication()
        for device, command in self._f_code:
            if device is DeviceDriver.STAGE_CONTROLLER:
                if self._stage_controller_sim is None:
                    continue  # ToDo: add control of the real stage controller
                else:
                    self._stage_controller_sim.execute_command(command)
            elif device is DeviceDriver.VOLTAGE_CONTROLLER:
                if self._voltage_controller_sim is None:
                    self._write_voltage_command(command)
                else:
                    self._voltage_controller_sim.execute_command(command)
            elif device is DeviceDriver.GEN_G_CONTROLLER:
                _execute_gen_g_command(command)

    def pause_simulation(self):
        pass

    def resume_simulation(self):
        pass

    def stop_simulation(self):
        pass

    def _write_voltage_command(self, command: str):
        if self._serial_connection.isOpen():
            print(f'{command}?'.encode())
            self._serial_connection.write(f'{command}?'.encode())
            time.sleep(4)

    def _initialize_serial_communication(self):
        self._serial_connection = serial.Serial(
            port=self._voltage_controller_com_port,
            baudrate=9600
        )
        if self._serial_connection.isOpen():
            self._serial_connection.close()
        self._serial_connection.open()
        time.sleep(5)