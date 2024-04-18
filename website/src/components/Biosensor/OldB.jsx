import React, { useState } from "react";
import { CSVLink } from "react-csv";

import Plot from "react-plotly.js";
import TableDisplay from "/Users/ayushpanta/Documents/nano24/website/nano-site/website/src/components/Biosensor/b_comps/config_display.jsx";

import Calculations from "/Users/ayushpanta/Documents/nano24/website/nano-site/website/src/components/Biosensor/b_comps/simulations";

const OldB = (props) => {
  const [experimentIsRunning, setExperimentIsRunning] = useState(false);
  const [sims, setSims] = useState(sims_data);
  const [calcs, setCalcs] = useState(Calculations(sims));

  const experimentConfig = (
    <div className="flex flex-col lg:flex-row justify-center h-screen">
      <div className="flex flex-col lg:w-1/2 space-y-10 px-8">
        <TableDisplay name="Simulation" data={sims} setData={setSims} />
      </div>
      <div className="flex flex-col lg:w-1/2 px-8">
        <div className="overflow-hidden mb-4">
          <p>Nanostructure</p>
          <img src="https://i.ibb.co/jVmfXQG/one-cnt-and-board.png" alt="Nanostructure" />
        </div>
        <div className="overflow-hidden mb-4">
          <p>Materials Stack</p>
          <img src="https://i.ibb.co/19PVCWK/Field-penetration.png" alt="Materials Stack" />
        </div>
        <div className="overflow-hidden mb-4">
          <p>Dielectric</p>
          <img src="https://i.ibb.co/rM7G6cd/Dielectric.png" alt="Dielectric" />
        </div>
        <div className="overflow-hidden mb-4">
          <p>Circuit</p>
          <img src="https://i.ibb.co/gtvy7Kn/circuit.png" alt="Circuit" />
        </div>
        <div className="overflow-hidden">
          <p>Functionalization and Analyte</p>
          <img src="https://i.ibb.co/HK0r4p6/channel.png" alt="Functionalization and Analyte" />
        </div>
      </div>
    </div>
  );

  const experimentDashboard = (
    <div className="h-screen w-full flex flex-col items-center bg-white">
      <div className="w-full">
        <button
          onClick={startExperiment}
          className="border-2 p-2 mb-4 rounded hover:bg-red-600 hover:text-white w-full lg:w-auto"
        >
          Start Experiment
        </button>
      </div>

      <div className="w-full">
        <div className="mb-4">
          <TableDisplay name="Calculations" data={calcs} setData={setCalcs} />
        </div>
        <div className="w-full">
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [1, 2, 3],
                type: "line",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Test Plot" }}
          />
        </div>
        {/* Add more plots or content here if needed */}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex flex-row h-full">
        <div className="w-1/2 p-4 text-center">
          <div className="font-bold mb-4">
            Experiment: {experimentIsRunning ? "Running" : "Not Running"}
          </div>
          <button
            type="button"
            onClick={() => setExperimentIsRunning((prev) => !prev)}
            className="border-2 p-2 rounded hover:bg-red-600 hover:text-white"
          >
            Toggle Experiment
          </button>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col justify-center items-center">
            <TableDisplay name="Simulation" data={sims} setData={setSims} />
            <div className="mt-4">
              <CSVLink
                className="py-2 px-4 rounded-md bg-indigo-600 text-black hover:bg-indigo-700 transition"
                filename={`${props.name}_Config.csv`}
                data={jsonToCSV(props.data)}
                target="_blank"
              >
                Download Simulation Configuration
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function startExperiment() {
  console.log("Experiment started");
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



function jsonToCSV(data) {
  if (!data) {
    // Return an empty array or other appropriate default value
    return [];
  }
  const csvData = Object.entries(data).map(([key, value]) => ({
    Key: textCamelToSpace(key),
    Value: value,
  }));
  return csvData;
}

// Helper functions
function textCamelToSpace(input) {
  let output = input[0].toUpperCase();
  for (let i = 1; i < input.length; i++) {
    let char = input[i];
    let prevChar = input[i - 1];
    if (char === char.toUpperCase() && prevChar === prevChar.toLowerCase()) {
      output += " " + char;
    } else {
      output += char;
    }
  }
  return output;
}

export default OldB;
