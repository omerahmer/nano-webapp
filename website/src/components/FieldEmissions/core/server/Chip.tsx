import React, { useState } from 'react';
import './static/styles.css'

interface Props {
    comPorts: string[];
}

const ComPortOptions: React.FC<Props> = ({ comPorts }) => {
    return (
        <>
            {comPorts.map((port) => (
                <option key={port} value={port}>
                    {port}
                </option>
            ))}
        </>
    );
};

const App: React.FC = () => {
    const [comPorts] = useState<string[]>(['COM1', 'COM2', 'COM3']); // Example COM ports
    const [width, setWidth] = useState<number>(1);
    const [height, setHeight] = useState<number>(1);
    const [physicalWidth, setPhysicalWidth] = useState<number>(1);
    const [physicalHeight, setPhysicalHeight] = useState<number>(1);
    const [spotSize, setSpotSize] = useState<number>(1);
    const [travelTime, setTravelTime] = useState<number>(1);
    const [waitTime, setWaitTime] = useState<number>(0);
    const [selectedComPort, setSelectedComPort] = useState<string>('');
    const [gridData, setGridData] = useState<any[]>([]);
    const [commands, setCommands] = useState<string>('');

    const handleGenerateGrid = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('/generate-chip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ width, height }),
        })
            .then((response) => response.json())
            .then((data) => {
                setGridData(data.grid);
                // Implement your grid update logic here
            });
    };

    const handleUpdateChipSettings = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('/update-chip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'physical-width': physicalWidth,
                'physical-height': physicalHeight,
            }),
        }).then((response) => console.log(response));
    };

    const handleWriteChip = () => {
        const pixels = document.querySelectorAll('.tile');
        const pixels_json: { id: string; on: boolean }[] = [];
        let Serial_Input = '';

        pixels.forEach((pixel: Element) => {
            const turnOn = pixel.hasAttribute('selected');
            Serial_Input += turnOn ? '1' : '0';
            pixels_json.push({ id: pixel.id, on: turnOn });
        });

        let commands = '';
        let step_size = 1000;
        for (let i = 0; i < Serial_Input.length; i++) {
            if (Serial_Input[i] === '1') {
                const x_pos = i % width;
                const y_pos = Math.floor(i / width);

                commands += `"2PA${x_pos * step_size}",`;
                commands += `"1PA${y_pos * step_size}",`;
            }
        }

        setCommands(commands);

        fetch('/write-chip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ grid: pixels_json, 'com-port': selectedComPort, commands }),
        }).then((response) => console.log(response));
    };

    return (
        <div className="controls">
            <h1>Field Emission Controller</h1>
            <form id="size-controller" onSubmit={handleGenerateGrid}>
                <div className="field" id="width-setting">
                    <label htmlFor="width">Width</label>
                    <input
                        type="number"
                        id="width"
                        name="width"
                        min="1"
                        max="28"
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value))}
                    />
                </div>
                <div className="field" id="height-setting">
                    <label htmlFor="height">Height</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        min="1"
                        max="28"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                    />
                </div>
                <button id="grid-submit-btn" type="submit">
                    Generate Chip
                </button>
            </form>
            <form id="chip-controller" onSubmit={handleUpdateChipSettings}>
                <div className="field" id="physical-width-setting">
                    <label htmlFor="physical-width">Physical width (mm)</label>
                    <input
                        type="number"
                        id="physical-width"
                        name="physical-width"
                        min="1"
                        value={physicalWidth}
                        onChange={(e) => setPhysicalWidth(parseInt(e.target.value))}
                    />
                </div>
                <div className="field" id="physical-height-setting">
                    <label htmlFor="physical-height">Physical height (mm)</label>
                    <input
                        type="number"
                        id="physical-height"
                        name="physical-height"
                        min="1"
                        value={physicalHeight}
                        onChange={(e) => setPhysicalHeight(parseInt(e.target.value))}
                    />
                </div>
                <div className="field" id="spot-size-setting">
                    <label htmlFor="spot-size">Spot Size (um)</label>
                    <input
                        type="number"
                        id="spot-size"
                        name="spot-size"
                        min="1"
                        value={spotSize}
                        onChange={(e) => setSpotSize(parseInt(e.target.value))}
                    />
                </div>
                <div className="field" id="travel-time-setting">
                    <label htmlFor="travel-time">Travel Time (sec)</label>
                    <input
                        type="number"
                        id="travel-time"
                        name="travel-time"
                        min="1"
                        value={travelTime}
                        onChange={(e) => setTravelTime(parseInt(e.target.value))}
                    />
                </div>
                <button id="chip-submit-btn" type="submit">
                    Update chip settings
                </button>
            </form>
            <form id="wait-time-setting">
                <label htmlFor="wait-time">Select wait time:</label>
                <input
                    type="number"
                    id="wait"
                    name="wait time"
                    min="0"
                    max="60"
                    value={waitTime}
                    onChange={(e) => setWaitTime(parseInt(e.target.value))}
                />
            </form>
            <form id="com-port-controller">
                <label htmlFor="com-port">Select a COM Port:</label>
                <select
                    id="com-port"
                    name="com-port"
                    value={selectedComPort}
                    onChange={(e) => setSelectedComPort(e.target.value)}
                >
                    <ComPortOptions comPorts={comPorts} />
                </select>
            </form>
            <button id="write-chip-btn" onClick={handleWriteChip}>
                Write chip
            </button>
            <label>
                Sending: <span id="Serial_Input">{commands}</span>
            </label>
            <div className="grid" id="grid">
                {gridData.map((row, y) =>
                    row.map((tile: any, x: number) => (
                        <div
                            key={tile.id}
                            className="tile"
                            id={tile.id}
                            onMouseOver={() => {
                                document.getElementById('Serial_Input')!.textContent = `Grid Position: (${x + 1}, ${y + 1})`;
                            }}
                            onClick={() => {
                                const element = document.getElementById(tile.id)!;
                                const selected = element.hasAttribute('selected');
                                if (selected) {
                                    element.removeAttribute('selected');
                                } else {
                                    element.setAttribute('selected', '');
                                }
                            }}
                        ></div>
                    )),
                )}
            </div>
        </div>
    );
};

export default App;
