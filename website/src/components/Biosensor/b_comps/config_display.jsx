import React, { useState } from "react";
import Popup from "reactjs-popup";
import { CSVLink } from "react-csv";

const TableDisplay = ({ name, data, setData }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  function shrinkLen(input) {
    input = input.toString();
    if (input.length > 12) {
      return input.substring(0, 12);
    }
    return input;
  }

  return (
    <div className="bg-white p-2 flex"> 
      {/* Download Button */}
      <button
        type="button"
        className="border-2 p-1 rounded hover:bg-red-600 hover:text-white mb-2"
        onClick={() => setOpen((o) => !o)}
      >
        Download {name} Configuration
      </button>

      {/* Download Popup */}
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="bg-white rounded-lg p-2"> 
          <CSVLink
            className="border-2 p-1 rounded hover:bg-red-600 hover:text-white"
            filename={`${name}Config.csv`}
            data={jsonToCSV(data)}
            target="_blank"
          > 
            Download {name} Configuration
          </CSVLink>
          <button
            className="ml-2 text-red-600 hover:text-red-800"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Popup>

      {/* Value Table */}
      <div className="flex w-full">
        <div className="w-1/2 p-2">
        <table className="w-full table-fixed border border-gray-300"> 
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-300"> 
            <th className="p-1 text-left text-xl font-semibold">{name} Configuration</th> 
            <th className="p-1 text-center text-xl font-semibold">Value</th> 
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            if (data[key] === "header") {
              return (
                <tr key={key}>
                  <td colSpan={2} className="py-2"></td>
                </tr>
              );
            }

            return (
              <tr key={key} className="border-b border-gray-300"> 
                <td className="p-1 text-left">{textCamelToSpace(key)}:</td> 
                <td className="p-1 text-center"> 
                  <input
                    type="text"
                    className="bg-gray-100 text-center rounded-sm p-1 border border-gray-300" 
                    defaultValue={shrinkLen(data[key])}
                    onChange={(e) => {
                      data[key] = shrinkLen(e.target.value);
                      setData(data);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
      </div>

    </div>
  );
};


function textCamelToSpace(input) {
  let output = input[0].toUpperCase();
  for (let i = 1; i < input.length; i++) {
    let char = input[i];
    let prevChar = input[i - 1];
    if (char === char.toUpperCase() && prevChar === prevChar.toLowerCase()) {
      output += ` ${char}`;
    } else {
      output += char;
    }
  }
  return output;
}

function jsonToCSV(data) {
  const outputArray = Object.entries(data).map(([key, value]) => [key, value]);
  return outputArray;
}

export default TableDisplay;
