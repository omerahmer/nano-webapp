from threading import Thread
from typing import Optional

import serial.tools.list_ports
from flask import Flask, render_template, request, jsonify
from waitress import serve

from core.models.layout.chip import Chip
from core.models.slicer.slicer import Slicer
from simulators.gen_g.gen_g_sim import GenGSimulator
from core.models.slicer.sender import Sender

app = Flask(__name__)
g_chip: Optional[Chip] = None


def initialize_server():
    global app
    serve(app, host='127.0.0.1', port='8081')


@app.route('/')
def index():
    available_com_ports = _get_available_com_ports()
    return render_template('index.html', com_ports=available_com_ports)


@app.route('/generate-chip', methods=['POST'])
def generate_chip():
    global g_chip
    data = request.get_json()
    width = int(data['width'])
    height = int(data['height'])

    g_chip = Chip(width, height)
    return jsonify(g_chip.__dict__())


@app.route('/update-chip', methods=['POST'])
def update_chip():
    global g_chip

    if g_chip is not None:
        data = request.get_json()
        try:
            g_chip.set_physical_width(int(data['physical-width']))
        except KeyError:
            pass
        try:
            g_chip.set_physical_height(int(data['physical-height']))
        except KeyError:
            pass

        return 'OK'

    return 'Bad Request'


@app.route('/get-latest-chip', methods=['GET'])
def get_latest_chip():
    global g_chip
    return jsonify(g_chip.__dict__())


@app.route('/write-chip', methods=['POST'])
def write_chip():
    global g_chip
    data = request.get_json()

    #connect the thing to send
    commands = data['commands']
    sender = Sender(commands)
    
    pixels = data['grid']
    for html_pixel in pixels:
        id_parts = str(html_pixel['id']).split('_')
        g_chip.get_pixel(int(id_parts[1]), int(id_parts[2])).on = html_pixel['on']
    com_port_request = data['com-port']
    com_port = None
    for port, description, _ in serial.tools.list_ports.comports():
        if description == com_port_request:
            com_port = port
    slicer = Slicer(g_chip)
    Thread(target=_write_chip, args=(slicer, com_port)).start()
    return 'OK'


def _get_available_com_ports():
    com_ports = []
    ports = serial.tools.list_ports.comports()
    for _, description, _ in ports:
        com_ports.append(description)
    return com_ports


def _write_chip(slicer: Slicer, voltage_controller_com: str = None):
    # ToDo: Change to a real code, not simulation. Or make it a choice
    f_code = slicer.to_fcode().get_code()
    #print("RUNS")
    #print(f_code)
   # Sender()
    if voltage_controller_com is None:
        GenGSimulator(f_code).start_simulation()
    else:
        GenGSimulator(f_code,
                      voltage_controller_com_port=voltage_controller_com).start_simulation()