/**
 * Script.js is responsible for handling user input on the index.html page and
 * pass it through to the server. It's also responsible for running animations
 * of the live data.
 */

/*------------------------------------------------------------------------------
 * Main program
 -----------------------------------------------------------------------------*/

initializeForms();
const gMultiClickEnabled = true;

/*------------------------------------------------------------------------------
 * Utility functions
 -----------------------------------------------------------------------------*/

/**
 * Initializes all forms and assigns proper callbacks
 */
function initializeForms() {
    document.getElementById('size-controller').onsubmit =
        function (event) {
            event.preventDefault();
            generateGrid();
        };

    document.getElementById('chip-controller').onsubmit =
        function (event) {
            event.preventDefault();
            updateChipSettings();
        };
}

/**
 * Creates and displays an instance of a Chip
 */
function generateGrid() {
    // ToDo: add check when generating a new layout
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;

    // Create a <p> element to display grid position
    const gridPositionDisplay = document.createElement('p');
    document.body.appendChild(gridPositionDisplay);

    fetch('/generate-chip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ width: width, height: height })
    })
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('grid');
            grid.innerHTML = '';
            grid.style.gridTemplateColumns = `repeat(${data.width}, 40px)`;
            grid.style.gridTemplateRows = `repeat(${data.height}, 40px)`;

            for (let y = 0; y < data.height; y++) {
                for (let x = 0; x < data.width; x++) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.setAttribute('id', data.grid[y][x].id);

                    // Adjust x and y before creating the closure
                    const adjustedX = x + 1;
                    const adjustedY = y + 1;

                    // Use a function to create a closure around adjustedX and adjustedY
                    tile.onmouseover = (function (hoverX, hoverY) {
                        return function () {
                            onTileHovered(data.grid[hoverY - 1][hoverX - 1].id);
                            // Update the <p> element with the current grid position
                            gridPositionDisplay.textContent = `Grid Position: (${hoverX}, ${hoverY})`;
                        };
                    })(adjustedX, adjustedY); // Adjusted positions

                    tile.onclick = function () {
                        onTileClicked(this.getAttribute('id'));
                    };
                    grid.appendChild(tile);
                }
            }
        });
}




/**
 * Handles a click event on a tile (Pixel)
 *
 * @param tileId Pixel ID assigned by the server to given pixel
 */
function onTileClicked(tileId) {
    console.log(`Clicked on tile with ID: ${tileId}`);
    if (gMultiClickEnabled) {
        const tiles = [];
        const idParts = tileId.split('_');
        const startY = parseInt(idParts[2]);
        //CHANGED FROM 5 to 1
        for (let y = startY; y < startY + 1; y++) {
            idParts[2] = `${y}`;
            changeSelectTileStatus(idParts.join('_'));
        }
    } else {
        changeSelectTileStatus(tileId);
    }
}

function onTileHovered(tileId) {
    console.log(`Hovered over tile with ID: ${tileId}`);
}

function changeSelectTileStatus(tileId) {
    const tile = document.getElementById(tileId);
    const selectedAttribute = tile.getAttribute('selected');
    if (selectedAttribute == null) {
        tile.setAttribute('selected', '');
    } else {
        tile.removeAttribute('selected');
    }
}

/**
 * Updates layout settings (physical attributes)
 */
function updateChipSettings() {
    // ToDo: add change of pixels in rows and columns
    // ToDo: check the returned response
    const width = document.getElementById('physical-width').value;
    const height = document.getElementById('physical-height').value;
    fetch('/update-chip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'physical-width': width,
            'physical-height': height
        })
    }).then((response) => console.log(response));
}

/**
 * Ask if the current configuration should be writen as a new layout and submit a
 * new design to be written
 */
function writeChip() {
    // ToDo: add double check if the settings are correct
    const pixels = document.getElementById('grid').children;
    let pixels_json = [];
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;

    let Serial_Input = "";
    for (let i = 0; i < pixels.length; i++) {

        let turnOn = false;
        if (pixels[i].getAttribute('selected') != null) {
            turnOn = true;
        }
        Serial_Input = Serial_Input.concat(+ turnOn);
        pixels_json.push({ id: pixels[i].id, on: turnOn });
    }
    //window.alert(Object.keys(j).map(function(_) { return j[_]; }))
    //HOW TO ACCESS JSON BELLOW
    //console.log(pixels_json[0].on)
    document.getElementById("Serial_Input").innerHTML = Serial_Input;
    //window.alert("Pushing: " + Serial_Input);
    let commands = "";
    let step_size = 1000;
    for (let i = 0; i < Serial_Input.length; i++) {
        if (Serial_Input[i] == 1) {
            x_pos = i % width;
            y_pos = (i - x_pos) / width;

            commands = commands.concat('"2PA', x_pos * step_size, '",');
            commands = commands.concat('"1PA', y_pos * step_size, '",');
            console.log(commands);
            //runPythonScript('/../../slicer/sender.py', [commands]);
            //console.log(i - (i % width))  
        }

    }

    document.getElementById("Serial_Input").innerHTML = commands;


    const comPort = document.getElementById('com-port').value;
    fetch('/write-chip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grid: pixels_json, 'com-port': comPort, 'commands': commands })
    }).then(r => console.log(r));

}



// Run a Python script and return output
function runPythonScript(scriptPath, args) {
    const { spawn } = require('child_process');
    // Use child_process.spawn method from 
    // child_process module and assign it to variable
    const pyProg = spawn('python', [scriptPath].concat(args));

    // Collect data from script and print to console
    let data = '';
    pyProg.stdout.on('data', (stdout) => {
        data += stdout.toString();
    });

    // Print errors to console, if any
    pyProg.stderr.on('data', (stderr) => {
        console.log(`stderr: ${stderr}`);
    });

    // When script is finished, print collected data
    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log(data);
    });
}

// Run the Python file