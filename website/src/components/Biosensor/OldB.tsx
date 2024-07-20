// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from "react";
import Plot from 'react-plotly.js';

import TableDisplay from "./b_comps/TableDisplay"
import Calculations from "./b_comps/simulations";

export default function OldB() {
  const [experimentIsRunning, setExperimentIsRunning] = useState(false);

  //   const [fields, setFields] = useState(config_data);
  const [sims, setSims] = useState(sims_data);
  const [calcs, setCalcs] = useState(Calculations(sims));

  // , style = {{border: "1px solid #ccc", padding: "5px"}}

  let experiment_config = (
    <div className="overflow-hidden" style={{ display: "inline-block" }}>
      <div className="container" style={{ border: "", display: "flex", flexWrap: "wrap", width: "100%" }}>
        {/* Table div */}
        <div className="tbl" style={{ border: "", width: "50%", padding: "0px" }}>
          <TableDisplay name={"Simulation"} data={sims} setData={setSims} />
        </div>

        {/* Images div */}
        <div className="img" style={{ display: "flex", flexWrap: "wrap", border: "", padding: "5px", width: "50%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="overflow-hidden" style={{ padding: "5px" }}>
              <p>Nanostructure</p>
              <img
                src="https://i.ibb.co/jVmfXQG/one-cnt-and-board.png"
                alt="Nanostructure"
                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>

            {/* Materials Stack */}
            <div className="overflow-hidden" style={{ padding: "5px" }}>
              <p>Materials Stack</p>
              <img
                src="https://i.ibb.co/19PVCWK/Field-penetration.png"
                alt="Materials Stack"
                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>

            {/* Dielectric */}
            <div className="overflow-hidden" style={{ padding: "5px" }}>
              <p>Dielectric</p>
              <img
                src="https://i.ibb.co/rM7G6cd/Dielectric.png"
                alt="Dielectric"
                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>

            {/* Circuit */}
            <div className="overflow-hidden" style={{ padding: "5px" }}>
              <p>Circuit</p>
              <img
                src="https://i.ibb.co/gtvy7Kn/circuit.png"
                alt="Circuit"
                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>

            {/* Functionalization and Analyte */}
            <div className="overflow-hidden" style={{ padding: "5px" }}>
              <p>Functionalization and Analyte</p>
              <img
                src="https://i.ibb.co/HK0r4p6/channel.png"
                alt="Channel"
                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );

  let experiment_dashboard = (
    <div className="overflow-hidden" style={{ display: "inline-block" }}>
      <div className="container" style={{ border: "1px solid #ccc", display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
        {/* Table div */}
        <div className="tbl" style={{ border: "1px solid #ccc", width: "50%", padding: "0px" }}>
          <TableDisplay name={"Calculations"} data={calcs} setData={setCalcs} />
        </div>

        {/* Plot div */}
        <div className="plt" style={{ display: "flex", flexWrap: "wrap", border: "1px solid #ccc", padding: "0px", width: "50%" }}>
          <div className="plt" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {/* Plot 1 */}
            <div className="overflow-hidden" style={{ width: "100%", padding: "5px" }}>
              <Plot
                data={[
                  { x: [1, 2, 3], y: [1, 2, 3], type: "scatter", mode: "lines+markers", marker: { color: "red" } },
                ]}
                layout={{ title: "Test Plot 1" }}
              />
            </div>
            {/* Plot 2 */}
            <div className="overflow-hidden" style={{ width: "100%", padding: "5px" }}>
              <Plot
                data={[
                  { x: [1, 2, 3], y: [1, 2, 3], type: "scatter", mode: "lines+markers", marker: { color: "red" } },
                ]}
                layout={{ title: "Test Plot 2" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  return (
    <div className="bg-white">
      <div className="text-center">
        <header>
          <div className="font-bold p-2">
            Experiment: {experimentIsRunning ? "Running" : "Not Running"}
          </div>
          <button
            type="button"
            onClick={() => setExperimentIsRunning((o) => !o)}
            className="border-2 p-2 m-2 rounded hover:bg-red-600 hover:text-white"
          >
            Toggle Experiment
          </button>
        </header>

        <div className="">
          {!experimentIsRunning ? experiment_config : experiment_dashboard}
        </div>
      </div>
    </div>
  );
};

function startExperiment() {
  // let configPayload = JSON.stringify(fields)

  // const socket = new WebSocket("ws://localhost:8080/jadoo")

  // const stompClient = Stomp.over(socket)
  // stompClient.connect({}, frame => {
  //     console.log("connected: ", frame)
  // })

  // stompClient.subscribe("/app/start", data => {
  //     console.log(JSON.parse(data.body))
  // })

  // stompClient.send("/app/start",  {}, configPayload)

  console.log("this function is out of use");
  // setExperimentIsRunning(true);


  // try {
  //     socket.send("/app/start",  {}, configPayload)
  // } catch (e) {
  //     console.error(e)
  // }
}

let sims_data = {
  radiusOfCNTs: 5e-9,
  lengthOfCNTs: 500e-6,
  gapBetweenCNTs: 5e-9,
  materialsStack: "header",
  siliconThickness: 50e-6,
  siliconDioxideThickness: 300e-9,
  siliconDioxideThickness2: 300e-9,
  titaniumThickness: 5e-9,
  aluminaThickness: 50e-9,
  aluminumThickness: 5e-9,
  ironThickness: 5e-9,
  nanoStructure: "header",
  widthOfBase: 5e-6,
  lengthOfBase: 25400e-6,
  gapBetweenNanostructures: 5e-6,
  widthOfChip: 25400e-6,
  lengthOfChip: 25400e-6,
  functionalization: "header",
  radiusOfMolecule: 1e-9,
  lengthOfMolecule: 1e-9,
  gapBetweenMolecules: 1e-9,
  dielectricOfMolecule: 1,
  Analyte: "header",
  radiusOfMoleculeAnalyte: 1e-9,
  lengthOfMoleculeAnalyte: 1e-9,
  gapBetweenMoleculeAnalyte: 1e-9,
  dielectricOfMoleculeAnalyte: 1,
  dielectric: "header",
  energyDensityWattHoursPerLiterDesigned: 0,
  relativePermittivity: 350,
  voltage: 10,
  frequency: 1000,
  maxVOut: 0,
  seriesResistanceOfSolution: 1e5,
  concentrationOfStandardState: 1e-6,
  chargeOfIonSpecies: 1,
  relativePermittivityOfSolvent: 1,
  temperatureOfSolvent: 283,
  zetaPotential: 1,
  circuit: "header",
  chargingCurrent: 10e-3,
  chargingVoltage: 100,
  lensResistivity: 1.68e-8, // ohm/m at 20C for Cu\n"
  lensDensity: 8.96 * 1000, // # kg/m^3 at 20C for Cu\n"
  lensSpecificHeat: 0.385 / 1000,
  lensHeight: 1e-3,
  lensArea: 57.82e-6,
  lensInnerRadius: 0.75e-3,
  lensOuterRadius: 1.95e-3,
  lithographyTime: 10 * 60,
};