import React, { useState } from "react";
import { CSVLink } from "react-csv";

// Component
export default (props) => {
  const [open, setOpen] = useState(false);

  function shrinkLen(input) {
    input = input.toString();
    if (input.length > 12) {
      return input.substring(0, 12);
    }
    return input;
  }

  return (
    <div className="h-screen px-8 md:px-20 py-10 bg-gray-100">
      <button
        type="button"
        className="border-2 p-2 rounded-md bg-indigo-600 text-black hover:bg-indigo-700 transition"
        onClick={() => setOpen(!open)}
      >
        Download {props.name} Configuration
      </button>

      {/* Value Tables */}
      <table className="my-8 w-full border-collapse bg-white shadow-md rounded-md">
  <thead>
    <tr className="bg-indigo-600 text-black">
      <th className="py-2 px-4 text-left">{props.name} Configuration</th>
      <th className="py-2 px-4 text-center">Value</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(props.data).map((item, index) => {
      if (props.data[item] === "header") {
        return (
          <React.Fragment key={item}>
            <tr className="bg-gray-200">
              <td colSpan="2" className="py-1 px-2"></td>
            </tr>
            <tr>
              <td colSpan="2" className="py-1 px-2 font-semibold text-lg">
                {textCamelToSpace(item)}:
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td colSpan="2" className="py-1 px-2"></td>
            </tr>
          </React.Fragment>
        );
      }

      return (
        <tr className="border-t border-gray-200" key={item}>
          <td className="py-2 px-4 text-left font-medium">
            {textCamelToSpace(item)}:
          </td>
          <td className="py-2 px-4 text-center">
            <input
              type="text"
              className="py-1 px-2 rounded-md border border-gray-300 bg-white text-gray-800"
              defaultValue={shrinkLen(props.data[item])}
              onChange={(e) => {
                props.data[item] = shrinkLen(e.target.value);
                props.setData(props.data);
              }}
            />
          </td>
        </tr>
      );
    })}
  </tbody>
</table>


      {/* Download Configuration */}
      <div className="mt-8">
        <CSVLink
          className="py-2 px-4 rounded-md bg-indigo-600 text-black hover:bg-indigo-700 transition"
          filename={`${props.name}_Config.csv`}
          data={jsonToCSV(props.data)}
          target="_blank"
        >
          Download {props.name} Configuration
        </CSVLink>
      </div>
    </div>
  );
};

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

function jsonToCSV(data) {
  const csvData = Object.entries(data).map(([key, value]) => ({
    Key: textCamelToSpace(key),
    Value: value,
  }));
  return csvData;
}
