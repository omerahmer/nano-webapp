import React, { useState } from "react";
import Plot from "react-plotly.js";

import TableDisplay from "/Users/ayushpanta/Documents/nano24/website/nano-site/website/src/components/Biosensor/b_comps/config_display.jsx";
import Calculations from "/Users/ayushpanta/Documents/nano24/website/nano-site/website/src/components/Biosensor/b_comps/simulations.jsx";

export default () => {
  const [experimentIsRunning, setExperimentIsRunning] = useState(false);

  //   const [fields, setFields] = useState(config_data);
  const [sims, setSims] = useState(sims_data);
  const [calcs, setCalcs] = useState(Calculations(sims));

  let experiment_config = (
<div style={{ display: "inline-block"}}>
  {/* Div containing the table */}
  <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
  {/* Table div */}
  <div style={{ width: "50%", padding: "5px" }}>
    <TableDisplay name={"Simulation"} data={sims} setData={setSims}/>
  </div>

  {/* Images div */}
  <div style={{ width: "50%", padding: "5px" }}>
    {/* Use Flexbox to organize images and titles in different rows */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Nanostructure */}
      <div style={{ padding: "5px" }}>
        <p>Nanostructure</p>
        <img
          src="https://i.ibb.co/jVmfXQG/one-cnt-and-board.png"
          alt="Nanostructure"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Materials Stack */}
      <div style={{ padding: "5px" }}>
        <p>Materials Stack</p>
        <img
          src="https://i.ibb.co/19PVCWK/Field-penetration.png"
          alt="Materials Stack"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Dielectric */}
      <div style={{ padding: "5px" }}>
        <p>Dielectric</p>
        <img
          src="https://i.ibb.co/rM7G6cd/Dielectric.png"
          alt="Dielectric"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Circuit */}
      <div style={{ padding: "5px" }}>
        <p>Circuit</p>
        <img
          src="https://i.ibb.co/gtvy7Kn/circuit.png"
          alt="Circuit"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Functionalization and Analyte */}
      <div style={{ padding: "5px" }}>
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

<style>
{`
  @media (max-width: 768px) {
    div[style*="width: 50%"] {
      width: 100%;
    }
  }
`}
</style>
  
  // , border: "1px solid #ccc", padding: "5px" 

  let experiment_dashboard = (
    <div className="h-screen bg-white" style={{ flex: "1"}}>
      Experiment graphs
      <br />
      <button
        onClick={() => startExperiment()}
        className="border-2 p-2 m-2 rounded hover:bg-red-600 hover:text-white"
      >
        Start Experiment
      </button>
      <br />
      <div className="overflow-hidden bg-white" >
        <div>
          <TableDisplay
            name={"Calculations"}
            data={Calculations(sims)}
            setData={setCalcs}
          />
        </div>

        <div className="">
          <Plot>
            data=
            {[
              {
                x: [1, 2, 3],
                y: [1, 2, 3],
                type: "line",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Test Plot" }} 
          </Plot>
          <Plot>
            data=
            {[
              {
                x: [1, 2, 3],
                y: [1, 2, 3],
                type: "line",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Test Plot" }}
          </Plot>
        </div>
        <div>
          <Plot>
            data=
            {[
              {
                x: [1, 2, 3],
                y: [1, 2, 3],
                type: "line",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Test Plot" }}
          </Plot>
          <Plot>
            data=
            {[
              {
                x: [1, 2, 3],
                y: [1, 2, 3],
                type: "line",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Test Plot" }}
          </Plot>
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