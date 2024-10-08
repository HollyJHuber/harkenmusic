
/**
 * Harken Music (beta)
 * Copyright 2024 Mitchell Kahle and Holly J. Huber.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

let matrixType = "number";

let isMIDIplaying = false;
let stopMIDI = false;

let allCombinations = [];
let allCommonPermutations = [];
let allPermutations = [];
let allAllPermutations = [];
let allReflections = [];
let allRotations = [];

// TODO // do we need allPermutations and allAllPermutations?? 

/**
 * source is an array of objects in cycle order for every item on the cycle; circle of fifths
 * the index does not change, regardless of the tonic selected: they are the source
 * cycle  & note does change // standard cycle auto-entered for start
 * the intervalLabel is static, based on proximity to the tonic
 */
const source = [
    {
        "index": 0,
        "note": "A&#x266d",
        "cycle": 6,
        "alternatingCycleOrder": -1,
        "intervalLabel": "t",
        "color": { r: 204, g: 0, b: 0, a: 0.5 },
        "midi": 68
    },
    {
        "index": 1,
        "note": "E&#x266d",
        "cycle": 1, 
        "alternatingCycleOrder": 10,
        "intervalLabel": "m2",
        "color": { r: 0, g: 51, b: 255, a: 0.5 },
        "midi": 63
    },
    {
        "index": 2,
        "note": "B&#x266d",
        "cycle": 8,
        "alternatingCycleOrder": 8,
        "intervalLabel": "m6",
        "color": { r: 255, g: 204, b: 0, a: 0.5 },
        "midi": 70
    },
    {
        "index": 3,
        "note": "F",
        "cycle": 3,
        "alternatingCycleOrder": 6,
        "intervalLabel": "m3",
        "color": { r: 102, g: 0, b: 153, a: 0.5 },
        "midi": 65
    },
    {
        "index": 4,
        "note": "C",
        "cycle": 10,
        "alternatingCycleOrder": 4,
        "intervalLabel": "m7",
        "color": { r: 51, g: 153, b: 0, a: 0.5 },
        "midi": 72
    },
    {
        "index": 5,
        "note": "G",
        "cycle": 5,
        "alternatingCycleOrder": 2,
        "intervalLabel": "P4",
        "color": { r: 153, g: 0, b: 0, a: 0.5 },
        "midi": 67
    },
    {
        "index": 6,
        "note": "D",
        "cycle": 0,
        "alternatingCycleOrder": 0,
        "intervalLabel": "T",
        "color": { r: 51, g: 153, b: 255, a: 0.5 },
        "midi": 62
    },
    {
        "index": 7,
        "note": "A",
        "cycle": 7,
        "alternatingCycleOrder": 1,
        "intervalLabel": "P5",
        "color": { r: 255, g: 102, b: 0, a: 0.5 },
        "midi": 69
    },
    {
        "index": 8,
        "note": "E",
        "cycle": 2,
        "alternatingCycleOrder": 3,
        "intervalLabel": "M2",
        "color": { r: 51, g: 0, b: 204, a: 0.5 },
        "midi": 64
    },
    {
        "index": 9,
        "note": "B",
        "cycle": 9,
        "alternatingCycleOrder": 5,
        "intervalLabel": "M6",
        "color": { r: 102, g: 255, b: 51, a: 0.5 },
        "midi": 71
    },
    {
        "index": 10,
        "note": "F&#x266f",
        "cycle": 4,
        "alternatingCycleOrder": 7,
        "intervalLabel":"M3",
        "color": { r: 102, g: 0, b: 0, a: 0.5 },
        "midi": 66
    },
    {
        "index": 11,
        "note": "C&#x266f",
        "cycle": 11,
        "alternatingCycleOrder": 9,
        "intervalLabel": "M7",
        "color": { r: 0, g: 204, b: 204, a: 0.5 },
        "midi": 73
    },
    {
        "index": 12,
        "note": "G&#x266f",
        "cycle": 6,
        "alternatingCycleOrder": 11,
        "intervalLabel": "t",
        "color": { r: 204, g: 0, b: 0, a: 0.5 },
        "midi": 68
    }
];

// TODO // not sure why I have both source and noteSource
// TODO // source is used quite a bit but why do I need both???
// TODO // looks like noteSource could be replaced
// TODO // but don't do it unitl I incorporate the note arrays
/**
 * noteSource is an array of objects in cycle order for every item on the cycle; circle of fifths
 * the index, note, and cycle do not change; accidentals are [flat, sharp] order
 */
const noteSource = [
    {
        "index": 0,
        "note": ["A&#x266d", "G&#x266f"],
        "cycle": 6,
        "color": "AbG",
        "midi": 56
    },
    {
        "index": 1,
        "note": ["E&#x266d", "D&#x266f"],
        "cycle": 1,
        "color": "EbD",
        "midi": 51
    },
    {
        "index": 2,
        "note": ["B&#x266d", "A&#x266f"],
        "cycle": 8,
        "color": "BbA",
        "midi": 58
    },
    {
        "index": 3,
        "note": ["F"],
        "cycle": 3,
        "color": "F",
        "midi": 53
    },
    {
        "index": 4,
        "note": ["C"],
        "cycle": 10,
        "color": "C",
        "midi": 48
    },
    {
        "index": 5,
        "note": ["G"],
        "cycle": 5,
        "color": "G",
        "midi": 55
    },
    {
        "index": 6,
        "note": ["D"],
        "cycle": 0,
        "color": "D",
        "midi": 50
    },
    {
        "index": 7,
        "note": ["A"],
        "cycle": 7,
        "color": "A",
        "midi": 57
    },
    {
        "index": 8,
        "note": ["E"],
        "cycle": 2,
        "color": "E",
        "midi": 52
    },
    {
        "index": 9,
        "note": ["B"],
        "cycle": 9,
        "color": "B",
        "midi": 59
    },
    {
        "index": 10,
        "note": ["G&#x266d", "F&#x266f"],
        "cycle": 4,
        "color": "GbF",
        "midi": 54
    },
    {
        "index": 11,
        "note": ["D&#x266d","C&#x266f"],
        "cycle": 11,
        "color": "DbC",
        "midi": 49
    },
    {
        "index": 12,
        "note": ["A&#x266d", "G&#x266f"],
        "cycle": 6,
        "color": "AbG",
        "midi": 56
    }
];

/**
 * generates initial html display of the cycle only
 * applies the rgba background-color directly
 */

let cycleOnly = source.map((obj) => 
    `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`
    
    );

allCombinations= [`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead>
<tr id = "cycle"><td class = "numbering"><button class="play-button" id="playButton">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];

let audioContext;

document.addEventListener('DOMContentLoaded', function() {
    // Initial load with default values
    document.querySelector("#combinations").innerHTML = allCombinations;

        // Add the event listener for the button click to handle AudioContext and MIDI playback
        document.getElementById('playButton').addEventListener('click', function() {
            if (!audioContext) {
                // Create the AudioContext only after the user has clicked the button
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
    
            if (audioContext.state === 'suspended') {
                // Resume the AudioContext if it’s in a suspended state
                audioContext.resume().then(() => {
                    // Start your MIDI playback here
                        playCycle(audioContext);
                });
            } else {
                // Start your MIDI playback here
                    playCycle(audioContext);
            }
        });
    
});

const comboLabels = ["", "Tonic", "Intervals", "Triads", "Tetrachords", "Pentatonics", "Hexatonics", "Heptatonics", "Octatonics", "Nonatonics", "Decatonics",  "Hendecactonics",  "Chromatic"];

/**********  FUNCTIONS  ***********/
/**
 * function called by the Start and Play Cycle buttons
 * plays the circle of fifths
 */
function playCycle (audioContext) {
    console.log("Harken Music started!");
    
    if (isMIDIplaying) { return; }
    isMIDIplaying = true;

    // removes leading 6; orders by alternatingCycleOrder which is 0, 7, 5, 2, 10, 9, 3, 4, 8, 11, 1, 6
    const cycleSequence = _.slice(_.orderBy(source,["alternatingCycleOrder"], ["asc"]),1);

    // duplicate first note, add 12 to MIDI, add to the end of the sequence
    const lastNote = _.clone(_.first(cycleSequence));
    lastNote.midi += 12;
    cycleSequence.push(lastNote);

    const row = document.getElementById("cycle");

    // To access all the cells except those with the "grey-button" or "interval" class
    const tableCells = row.querySelectorAll('td:not(.numbering):not(.interval)');

    const duration = 0.75; // 1/8th note duration in seconds (60 / bpm / 2)
    const velocity = 127; // how hard the note hits
    MIDI.setVolume(0, 127);

    cycleSequence.forEach((note, index) => {

        const startTime = index * duration * 750; // Start time in milliseconds

          // Set the color and play the note
          setTimeout(() => {

            // access the corresponding table cell
            const cell = tableCells[note.index];

            // Change cell background alpha to indicate the note is playing
            let colorObj = note.color;
            colorObj.a = 0.9;
            cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;

            // play the note
            MIDI.noteOn(0, note.midi, velocity, 0);

            // Reset the color after the note duration
            setTimeout(() => {
                colorObj.a = 0.5;
                cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`; 
                MIDI.noteOff(0, note.midi, duration);
            }, duration * 750); // Delay matches the note duration in milliseconds
            
            // delay display change?
           setTimeout(() => {
                if (index === cycleSequence.length -1) {
                    isMIDIplaying = false;
                    document.getElementById('startButton').classList.add("hidden");
                    document.getElementById('notes').classList.replace("hidden", "showInline");
                    document.getElementById('title').classList.replace("hidden", "showInline");
                }
             }, 500);
  
        }, startTime); // Start the note and color change after the calculated start time
    });
}

/**
 * function to play cycle order MIDI sequence
 * @param noteSequence is a source array that must include the note.midi and note.color
 * @param rowID is the HTML ID for the row
 * @param tableID is the HTML ID for the table
 * called by play buttons for playing cycle or permutationsCombo
 */
function playMIDICycle(rowID, noteSequenceData, tableID = "#permutationsCombo") {

    if (isMIDIplaying) { return; }
    isMIDIplaying = true;

    let noteSequenceToPlay = (typeof(noteSequenceData) === "string") ? JSON.parse(noteSequenceData) : noteSequenceData;

    // rowID is the unique ID for each row
    const row = document.getElementById(rowID);

    // TODO // temp code?
    if (row === null) {
        console.log("row is null");
        isMIDIplaying = false;
        return;
    }    

    // To access all td cells except those with the "grey-button" or "interval" class
    tableCells = row.querySelectorAll('td:not(.grey-button):not(.interval)');

    const duration = 0.75; // 1/8th note duration in seconds (60 / bpm / 2)
    const velocity = 127; // how hard the note hits
    MIDI.setVolume(0, 127);

    // sets delay for playing sequence when switching to permutations
    let delay = (tableID = "#permutationsCombo") ? 2 : 1;

    noteSequenceToPlay.forEach((note, index) => {
        const startTime = (index + delay) * duration * 750; // Start time in milliseconds

        // Set the color and play the note
        setTimeout(() => {
             // access the corresponding table cell
             const cell = tableCells[note.index + 1];

          // Change cell background alpha to indicate the note is playing
            let colorObj = note.color;
            colorObj.a = 0.9;
            cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;

           // play the note
           MIDI.noteOn(0, note.midi, velocity, 0);

           // Reset the color after the note duration
           setTimeout(() => {
               colorObj.a = 0.5;
               cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;   
               
               MIDI.noteOff(0, note.midi, duration);
           }, duration * 750); // Delay matches the note duration in milliseconds
           if (index === noteSequenceToPlay.length -1) {
                 isMIDIplaying = false;
           }
       }, startTime); // Start the note and color change after the calculated start time
   });
}
/**
 * sets flag to stop MIDI sequence from playing
 * resets STOP button text & function
 * @param buttonID to reset the button to PLAY ALL
 * 
 */
function stopPlayingMIDI(buttonID) {
    stopMIDI = true;

    const numberOfNotes = document.querySelector("#notes").value;

    console.log(`stop playingMIDI ${buttonID}, number of notes ${numberOfNotes}`);
    switch (buttonID) {
        case "playAllCommon":
            if (numberOfNotes < 4) {
                document.querySelector("#playAllCommon").onclick = function() {
                    playAllSequences(allAllPermutations);
                };
                document.querySelector("#playAllCommon").innerHTML = "PLAY ALL";

            } else {
                document.querySelector("#playAllCommon").onclick = function() { playAllSequences(allCommonPermutations) };
                document.querySelector("#playAllCommon").innerHTML = "PLAY ALL";
            }
            break;
        case "playAllReflections":
            document.querySelector("#playAllReflections").onclick = function() { playAllSequences(allReflections) };
            document.querySelector("#playAllReflections").innerHTML = "PLAY ALL";

            break;
        case "playAllRotations":
            playButton = document.querySelector("#playAllRotations").onclick = function() { playAllSequences(allRotations) };
            document.querySelector("#playAllRotations").innerHTML = "PLAY ALL";

            break;
        case "playAllPermutations":
            document.querySelector("#playAllPermutations").onclick = function() { playAllSequences(allAllPermutations) };
            document.querySelector("#playAllPermutations").innerHTML = "PLAY ALL";

            break;
    }
    
}


/**
 * function to play any MIDI sequence
 * @param noteSequence is a source array that must include the note.midi and note.color
 * @param rowID is the HTML ID for the row
 * @param tableID is the HTML ID for the table 
 * @param duration to speed up play all; 0.75 default 1/8th note duration in seconds (60 / bpm / 2)
 * called by button from generateCombos()
 */
function playMIDISequence(rowID, noteSequenceData, tableID = "#permutationsCombo", duration = 0.75) {
    return new Promise((resolve) => {
        if (isMIDIplaying) { return; }
        isMIDIplaying = true;
        stopMIDI = false;

        let noteSequenceToPlay = (typeof(noteSequenceData) === "string") ? JSON.parse(noteSequenceData) : noteSequenceData;

        // console.log(noteSequenceData);

        // rowID is the unique ID for each row
        const row = document.getElementById(rowID);

        // TODO // temp code?? 
        if (row === null) {
            console.log("row is null");
            isMIDIplaying = false;
            resolve(); // resolve immediately if row is null
            return;
        }

        // To access all td cells // first cell is button cell
        const tableCells = row.querySelectorAll('td');

        const velocity = 127; // how hard the note hits
        MIDI.setVolume(0, 127);

        // sets delay for playing sequence
        let delay = (tableID === "#permutationsCombo") ? 2 : 1;

        let sequenceLength = noteSequenceToPlay.length;

        noteSequenceToPlay.forEach((note, index) => {
            const startTime = (index + delay) * duration * 750; // Start time in milliseconds

             if (stopMIDI) {
                console.log(`STOP MIDI SEQUENCE`);
                isMIDIplaying = false;
                // return; // Stop the sequence if stop flag is true 
            } else {
            // Set the color and play the note
            setTimeout(() => {
                // skip the first cell
                let cell = tableCells[index + 1];

                // Change cell background alpha to indicate the note is playing
                let colorObj = note.color;
                colorObj.a = 0.9;
                cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
    
                // play the note
                MIDI.noteOn(0, note.midi, velocity, 0);

                // Reset the color after the note duration
                setTimeout(() => {
                    colorObj.a = 0.5;
                    cell.style.backgroundColor = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;

                    MIDI.noteOff(0, note.midi, duration);
                }, duration * 750); // Delay matches the note duration in milliseconds

                // When the last note finishes, resolve the promise
                if (index === sequenceLength - 1) {
                    setTimeout(() => {
                        isMIDIplaying = false;
                        resolve(); // Signal that the sequence is done
                    }, duration * 750); // Wait for the last note to finish
                }
            }, startTime); // Start the note and color change after the calculated start time
            }
        });
    });
}

/**
 * plays all the specified sequences
 * transforms PLAY ALL button to STOP
 * when over, resets PLAY ALL button
 * @param {*} noteSequencesArray 
 */
async function playAllSequences(noteSequencesArray) {
    stopMIDI = false; // Reset stop flag
    const numberOfNotes = noteSequencesArray[0].notes.length;
    let buttonID = "";

    switch (noteSequencesArray[0].rowID) {
        case "1-commonPermutations":
            document.querySelector("#playAllCommon").onclick = function() {
            stopPlayingMIDI("playAllCommon")};
            document.querySelector("#playAllCommon").innerHTML = "STOP";
            buttonID = "playAllCommon";
            break;
        case "1-reflections":
            document.querySelector("#playAllReflections").onclick = function() {
            stopPlayingMIDI("playAllReflections")};
            document.querySelector("#playAllReflections").innerHTML = "STOP";
            buttonID = "playAllReflections";
            break;

        case "1-rotations":
            document.querySelector("#playAllRotations").onclick = function() {
            stopPlayingMIDI("playAllRotations")};
            document.querySelector("#playAllRotations").innerHTML = "STOP";
            buttonID = "playAllRotations";
            break;
        case "1-allPermutations":
            if (numberOfNotes < 4) {
                document.querySelector("#playAllCommon").onclick = function() {
                    stopPlayingMIDI("playAllCommon")};
                    document.querySelector("#playAllCommon").innerHTML = "STOP";
                    buttonID = "playAllCommon";
            } else {
                document.querySelector("#playAllPermutations").onclick =    function(){ stopPlayingMIDI("playAllPermutations")};
                document.querySelector("#playAllPermutations").innerHTML = "STOP";
                buttonID = "playAllPermutations";
            }
            break;
    }

    console.log(noteSequencesArray);

    for (let i = 0; i < noteSequencesArray.length; i++) {
        const sequence = noteSequencesArray[i];
        // speed up duration to 1/16 note
        if (stopMIDI) {
            console.log(`stop play all sequences`);
            // TODO reset button // ??
            break;
        }
        await playMIDISequence(sequence.rowID, sequence.notes, "", 0.375); 
    }
    
    stopPlayingMIDI(buttonID);
    console.log("All sequences have been played");
    stopMIDI = false; // reset flag
    isMIDIplaying = false;
}


/**
 * function called by pull-down menus to generate all possible combinations 
* tonic and the total number of notes in each combination
*/
function updateHTML () {
    const tonic = document.querySelector("#tonicSelect").value;
    const numNotes = document.querySelector("#notes").value;

    // display cycle only when 1 is selected
    if (numNotes === 1 || numNotes === "1"){
        allCombinations= [`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead>
        <tr id = "cycle"><td class = "numbering"><button class="play-button" id="playButton" onclick="playCycle(audioContext)">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];
        document.querySelector("#combinations").innerHTML = allCombinations;
        document.getElementById('totalCombinations').innerHTML = "";
    } else {
        document.querySelector("#combinations").innerHTML = generateCombos(tonic, numNotes);
        // TODO let's update generateCombos now
    }

}

// TODO problem is the createPermutations buttons on the regenerated combinations don't work!
// TODO // GO BACK button is not generating play cycle button and table cell colors
/**
 * called by GO BACK button to display the combinations again
 */
function goBack() {
    const tonic = document.querySelector("#tonicSelect").value;
    const numNotes = document.querySelector("#notes").value;

    // console.log(`tonic ${tonic}, numNotes ${numNotes}`)

    // display cycle only when 1 is selected
    if (numNotes === 1 || numNotes === "1"){
        allCombinations= [`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead>
        <tr id = "cycle"><td class = "numbering"><button class="play-button" id="playButton">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];
        document.querySelector("#combinations").innerHTML = allCombinations;
        document.getElementById('totalCombinations').innerHTML = "";
    } else {
        document.querySelector("#combinations").innerHTML = generateCombos(tonic, numNotes);
    }
    document.getElementById('notes').style.display = 'inline';
    document.getElementById('totalCombinations').style.display = 'block';
    document.getElementById('combinations').style.display = 'inline-block';
    document.getElementById('startOver').style.display = 'none';
    document.getElementById('goBack').style.display = 'none';
    document.getElementById('goToBottom').style.display = 'none';
    document.getElementById('goToTop').style.display = 'none';
    document.getElementById('permutationsCombo').style.display = 'none';
    document.getElementById('generatedContent').classList.replace("showInline", "hidden");

}

 /**
  * uses the index, not the cycle 
 * returns a continguous sequence in cycle order
 * generates the circle of fifths/ cycle matrix: makeSequence(13, 6)
 * @param {*} n is the number of notes to return
 * @param {*} b is the beginning index
 * @returns array of n numbers: [6,1,8,3,10,5,0,7,2,9,4,11,6]
 */
  function makeSequence(n, b) {
    const sequence = [];
    for (let i = b; i < (b + n); i++) {
        sequence.push((i * 7) % 12);
    }
    return sequence;
}

/**
 * NOT USED
 * displays the circle of fifths from makeSequence
 * in HTML 15 columns
 * @param {*} sequence is [6,1,8,3,10,5,0,7,2,9,4,11,6]
 */
function displaySequence(sequence) {
    return `<tr><td><label><button class="play-button" id="playButton" onclick="playCycle(audioContext)">&#9654;</button></label></td><td> ${_.join(sequence, "</td><td>")} </td><td><label>*</label></td>
    <tr></tr>`;
}

/**********  COMBINATIONS FUNCTIONS  ***********/
/**
 * helper function to generate numeric combos using the cycle
 * called by generateCombos()
 * @param {*} numbers is the cycle array minus the tonic
 * @param {*} combinationSize total number of notes in each combination
 * @param {*} prefix always []
 * @param {*} start ??
 * @returns array of combinations
 */
function generateCombosHelper(numbers, combinationSize, prefix = [], start = 0) {
    if (combinationSize === 0) {
      return [prefix];
    }
  
    const combinations = [];
    for (let i = start; i < numbers.length; i++) {
      const newPrefix = [...prefix, numbers[i]];
      const remainingCombinations = generateCombosHelper(numbers, combinationSize - 1, newPrefix, i + 1); 
      combinations.push(...remainingCombinations);
    }
  
    return combinations;
}

/**
 * helper function called by generateCombos to determine symmetry
 * @param {*} row is an collection of objects
 * @returns boolean; true if symmetrical
 */
function isSymmetrical(row) {
    const centerIndex = Math.floor(source.length / 2);
    const leftSide = _.slice(row, 0, centerIndex);
    const rightSide = _.reverse(_.slice(row, centerIndex + 1));

    return _.isEqual(leftSide, rightSide);
}

/**
 * generates all possible combinations of k number of notes including the tonic
 * @param {*} t is the tonic
 * @param {*} k is the total number of notes in each combination
 * @returns ?? array of arrays of objects; each inner array has an additional object to describe the inner array
 */
function generateCombos(t, k) {

    let tonicType = "";
    const tonicString = String(t);
    if (tonicString === "0") {
        matrixType = "number";
    } else {
        matrixType = "note";
        if (tonicString.endsWith("#")) {
            tonicType = "sharp";
        } else if (tonicString.endsWith("b")){
            tonicType = "flat";
        }
    }
    
    // parseInt(t) required or findIndex does not work!
    const tonic = parseInt(t); 

    // determine the index (not the cycle) of the tonic
    const tonicIndex = noteSource.findIndex(note => note.cycle === tonic);
    const myCycle = makeSequence(13, tonicIndex);

    // create a new source for this tonic
    const mySource = _.cloneDeep(source);
    mySource.forEach((item, i) => {
        item.cycle = myCycle[i];
       // TODO // why are we using noteSource here when we've cloned source // ??????
        const matchIndex = noteSource.findIndex(info => info.cycle === item.cycle);
        const matchObject = noteSource[noteSource.findIndex(info => info.cycle === item.cycle)];
        const possibleNotes = matchObject.note;
        // const possibleNotes = noteSource[matchIndex].note; // ?? does this work?
        if (possibleNotes.length === 1){
            item.note = possibleNotes[0];
        } else {
            if (tonicType === "") {
                if (item.index < 6) {
                    // flat
                    item.note = possibleNotes[0];
                } else {
                    // sharp
                    item.note = possibleNotes[1];
                }
            } else if (tonicType === "flat") {
                item.note = possibleNotes[0];
            } else {
                item.note = possibleNotes[1];
            }
        }
    });

   // generates combos in cycle order instead of numeric order
    const cycleIndex = [7, 8, 9, 10, 11, 6, 5, 4, 3, 2, 1, 0];
    const cycleOrder = cycleIndex.map(i => mySource[i].cycle);  // returns [7, 2, 9, 4, 11, 0, 5, 10, 3, 8, 1, 6
    const  numberSeries = _.without(cycleOrder, tonic); // removes tonic
    const combinationsArray = generateCombosHelper(numberSeries, k-1);
    const combinationsWithTonic = _.map(combinationsArray, combination => [tonic, ... combination]);

    const sourceCombinations = [];
    _.forEach(combinationsWithTonic, (combo) => {
        // creating collection array for sorting & generating data about the collection of notes
        const collection = [];

        let isMajor = 0;
        let isTritone = 0;
        let isMinor = 0;
        let barcode = [];
        const iLabel = []

        let seconds = 0;
        let thirds = 0;
        let fourths = 0;
        let fifths = 0;
        let sixths = 0;
        let sevenths = 0;

        const centerIndex = Math.floor(mySource.length / 2);

        // for each array, map it to 13 columns (map it to mySource)
        _.forEach(mySource, (obj) => {
            if (_.includes(combo, obj.cycle)){
                collection.push(obj);
                barcode.push(1);
                iLabel.push(obj.intervalLabel); 

                switch (obj.cycle) {
                    case 1: 
                    case 2:
                        seconds++;
                        break;
                    case 3:
                    case 4:
                        thirds++;
                        break;
                    case 5:
                        fourths++;
                        break;
                    case 6:
                        isTritone++;
                        break;
                    case 7:
                        fifths++;
                        break;
                    case 8:
                    case 9:
                        sixths++;
                        break;
                    case 10: 
                    case 11:
                        sevenths++;
                        break;
                }

                (obj.index > centerIndex) && isMajor++;
                (obj.index < centerIndex) && isMinor++;

            } else {
                barcode.push(0);
            }
        });
        // add an object on the end to sort & describe the collection of notes
        const info = {
            "symmetrical": false,
            "quality": "",
            "tritone": isTritone ? true : false,
            "intervalLabel": [], 
            "binary": barcode,
            "countNo": 0
        }

        if (isSymmetrical(barcode)) {
            info.symmetrical = true;
            info.quality = "mixed";
        } else {
            if (isMajor > 0){
                if (isMinor === 0) {
                    info.quality = "major"
                    // remove the minor tritone
                    info.tritone && collection.shift();
                } else if (isMajor >= isMinor){
                    info.quality = "major-minor"
                } else {
                    info.quality = "minor-major"
                }
            } else {
                info.quality = "minor"
                // remove the major tritone
                info.tritone && collection.pop();
            }
        }

// ?? don't confuse info.intervalLabel which is part of the description object at the end of each combo with iLabel which is temporary
        // solving for the tritone; kicking up minor intervals to tensions
        info.intervalLabel = iLabel.map ((label, i) => {
            switch (label) {
                case "m3":
                    if(thirds === 2) {
                        return "&#x266f;9";  // sharp 9
                    } else {
                        return label;
                    }
                    break;
                case  "m7":
                    if(sevenths === 2) {
                        return "&#x266f;13"; // sharp 13
                    } else {
                        return label;
                    }
                    break;
                case  "m6":
                    if(fifths === 0 && !isMinor) {
                        return "&#x266f;5"; // sharp 5
                    } else if (sixths === 2) {
                        return "&#x266d;13"; // flat 13
                    } else {
                        return label;
                    }
                    break;
                case  "t":
                    if(fifths === 0) {
                        if (i > iLabel.indexOf("T")) {
                            return "&#x266f;4";   // sharp 4 if tritone is above Tonic (major)
                        } else {
                            return "&#x266d;5";  // flat 5 if tritone is below Tonic (minor)
                        }
                    } else if (fifths === 1  || fourths === 0) {
                        return "&#x266f;4";   // sharp 4
                        return label;
                        // ?? should this always be sharp 4, even if it is below Tonic?
                    }
                    break;
                case  "m2":
                    if(seconds === 2) {
                        return "&#x266d;9";  // flat 9
                    } else {
                        return label;
                    }
                    break;
                default:
                    return label;
            };
        });
        collection.push(info);
        sourceCombinations.push(collection);
    });
    // sorting arrays based on quality using a custom sort order
    const customComboOrder = ["mixed", "major", "minor", "major-minor", "minor-major"];

    // function to map the custom sort order index
    const getComboOrder = (ord) => {
        return customComboOrder.indexOf(ord);
    }

    // sorts by quality, a property in the last object in each sub-array (retains inner array structure)
    const comboSorted = _.orderBy(sourceCombinations, [(arr) => getComboOrder(arr[arr.length-1].quality)]);

    // TODO // could separate these functions into generating combinations and displaying combinations
    // TODO // comboSorted is the array of generated combos in order
    // TODO // everything from here is just to display in HTML

    // reset
    let count = 0;
    allCombinations = [];

    _.forEach(comboSorted, (array) => {
        count ++;

        const display = [];    
        
        // for each array, map it to 13 columns (map it to the cycle)
        _.forEach(mySource, (obj) => {
            if (_.includes(array, obj)){
                // number displays obj.cycle; note displays obj.note
                display.push(`<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${(matrixType === "number") ? obj.cycle : obj.note}</td>`);

            } else {
                display.push("<td></td>");
            }
        });
        // set the numbering for info object
        array[array.length -1].countNo = count;
    
        // get the updated intervalLabels from info, the last array item
        // TODO // replacing intervalLabel with nothing until we can implement the play button
        const displayLabel = array[array.length -1].intervalLabel;
        
        const button = `<button class="grey-button" onclick='createPermutationsTables(${count}, ${JSON.stringify(_.initial(array))})'>${count}.</button>`;

        // TODO // replacing displayLabel with nothing until we can implement play button
        const rowID = count + "-combinations";
        allCombinations.push(`<tr id = ${rowID}><td>${button}</td>${display.join("")}<td class = "interval"></td></tr>`);
        // first join replaces commas with html tags for table data
        // second join replaces commas with comma space
        // (count === 1) && console.log(array);  
    });

    document.querySelector("#title").innerHTML = `Select Combination`;
    document.getElementById('goToBottom').classList.replace("hidden", "showInline");
    document.getElementById('goToTop').classList.replace("hidden", "showInline");

    let cycleDisplay = [];

    //add cycle to top of combinations
    // number displays obj.cycle; note displays obj.note

    cycleDisplay = mySource.map((obj) => 
    `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${matrixType === "note" ? obj.note : obj.cycle}</td>`
    );

   allCombinations.unshift(`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead><tr id = "cycle"><td class = "numbering"><button class="play-button" id="playButton" onclick="playCycle(audioContext)">&#9654;</button></td>${cycleDisplay.join("")}<td class = "interval">cycle</td></tr>`);

    document.querySelector("#totalCombinations").innerHTML = `${count} ${comboLabels[k]}`;

    return( _.join(allCombinations, "</tr><tr>"));
  }


  /**********  PERMUTATION FUNCTIONS  ***********/

/**
 * calculate the total number of permutations
 * using factorial 
 */
function calculatePermutations(numberOfNotes) {
    let result = 1;
    for (let i = 1; i <= numberOfNotes; i++) {
        result *= i;
    }
    return result;
}

/**
 * NEW helper function to produce a limited number of permutation s of a sequence
 * works with array of objects, cycle is the value to permutate
 * called by generatePermutations()
 * @param {} sequence  an array of numbers or objects
 * @maxLimit set to 5,040
 * @startIndex number to start from
 */
function permute(sequence, maxLimit = 5040, startIndex = 0) {
    let results = [];
    let count = 0;

    function permuteHelper(sequence, perm = []) {
        if (count >= maxLimit) return; // Stop if we reach the limit

        if (sequence.length === 0) {
            if (count >= startIndex) {
                results.push(perm);
            }
            count++;
        } else {
            for (let i = 0; i < sequence.length; i++) {
                let newSequence = [...sequence.slice(0, i), ...sequence.slice(i + 1)];
                let newPerm = [...perm, sequence[i]];
                permuteHelper(newSequence, newPerm);
                if (count >= maxLimit + startIndex) return; // Stop if we reach the combined limit
            }
        }
    }

    permuteHelper(sequence);

    return results;
}

 /**
  * generates COMMON permutations only
  * returns table of common permutations
  * based on reflections 
  */
 function generateCommonPermutations(combinationToPermute) {

    allPermutations = [];
 
    const numPermutations = combinationToPermute.length;

    const permutationsAsc = _.times(numPermutations, (i) => [
        ..._.slice(combinationToPermute, i),
        ..._.slice(combinationToPermute, 0, i)
    ]);

    // order by descending
    const reverseOrderFromTonic = _.orderBy(combinationToPermute, ["cycle"], ["desc"]);
    // put the tonic first
    reverseOrderFromTonic.unshift(reverseOrderFromTonic.pop());

    const permutationsDesc = _.times(numPermutations, (i) => [
        ..._.slice(reverseOrderFromTonic, i),
        ..._.slice(reverseOrderFromTonic, 0, i)
    ]);

    const commonPermutations = [];
    
    const permutationSeq = _.concat(permutationsAsc, permutationsDesc);
    count = 0;
    _.forEach(permutationSeq, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`);

        const rowID = count + "-commonPermutations";
        allCommonPermutations.push({
            rowID: rowID,
            notes: array
        });

        const button = `<button class="grey-button" onclick='playMIDISequence("${rowID}", ${JSON.stringify(array)}, "#commonPermutations")'>${count}.</button>`;
        commonPermutations.push(`<tr id = ${rowID}><td>${button}</td>${cellDisplay.join("")}</tr>`);
    });


    // TODO // this should be moved elsewhere ???
    document.querySelector("#title").innerHTML = `Selected Combination`;

    // Common Permutations of # Total
    document.querySelector("#commonPermutationsTitle").innerHTML = "Permutations";
    // table of common permutations!
    return( _.join(commonPermutations,  "</tr><tr>"));
}

 /**
  * this calls permute to generate ALL the permutations
  * and put them into html for display
  */
 function generatePermutations(combinationToPermute) {

    let sourcePermutations = permute(combinationToPermute);

    count = 0;
    _.forEach(sourcePermutations, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`);
        const rowID = count + "-allPermutations";
        // generates PLAY ALL array
        allAllPermutations.push({
            rowID: rowID,
            notes: array
        });
        const button = `<button class="grey-button" onclick='playMIDISequence("${rowID}", ${JSON.stringify(array)}, "#allPermutations")'>${count}.</button>`;
        allPermutations.push(`<tr id = ${rowID}><td>${button}</td>${cellDisplay.join("")}</tr>`);
    });

    const numberOfNotes = document.querySelector("#notes").value;
    // TODO // isn't there a better way to determine this value??
console.log(`number of Notes: ${numberOfNotes}`);
     if (numberOfNotes < 4) {
        // if intervals or triads, change the PLAY ALL buttons for Permutations
        document.querySelector("#playAllCommon").onclick = function() {
            playAllSequences(allAllPermutations);
        };
        document.querySelector("#playAllPermutations").style.display = 'none';
        document.querySelector("#allPermutations").style.display = 'none';
     }

    // returns ALL Permutations
    return( _.join(allPermutations,  "</tr><tr>"));
}

// TODO change the name of this function???
//******************** THIS IS WHERE THE HTML COMES FROM *************/
/**
 * called by each combo button to generate & display permutations
 * all permutations OR common & all permutations
 * displays cycle & selected combination in #permutationsCombo table
 * then displays all permutations (#allPermutations table) OR 
 * displays common (#commonPermutations table) & all permutations (#allPermutations table)
 * @param {*} comboCount // ID number of selected combination
 * @param {*} selectedComboArray // combination of notes to permute
 */
function createPermutationsTables(comboCount, selectedComboArray) {
    // extract only unique cycle values (no duplicates) & sort by cycle
    const combinationOfNotesOnly = _.sortBy(_.uniqBy(selectedComboArray, "cycle"), "cycle");
    const totalPermutationsCount = calculatePermutations(combinationOfNotesOnly.length);

    document.querySelector("#title").innerHTML = `Selected Combination`;
    document.getElementById('startOver').classList.replace("hidden", "showInline");
    document.getElementById('goBack').classList.replace("hidden", "showInline");
    document.getElementById('goToBottom').classList.replace("hidden", "showInline");
    document.getElementById('goToTop').classList.replace("hidden", "showInline");
    document.getElementById('generatedContent').classList.replace("hidden", "showInline");


    // select combo to display in #permutationsCombo table and set up buttons
    // change note sequence to cycle order for permutationsCombo table only
     let notesToPlay = _.orderBy(selectedComboArray,["alternatingCycleOrder"], ["asc"]);
     
       // if first note is duplicate 6, then delete it
           if (_.first(notesToPlay).alternatingCycleOrder < 0) {
               notesToPlay = _.slice(notesToPlay,1);
           }
        // duplicate first note, add 12 to MIDI, add to the end of the sequence
        const lastNote = _.clone(_.first(notesToPlay));
        lastNote.midi += 12;
       notesToPlay.push(lastNote);

    // update button and tr tags from allCombinations
     let selectedCombination = allCombinations[comboCount];
     const rowID = comboCount + "-permutationsCombo";
     let newButtonTag = `<button class="grey-button" onclick='playMIDICycle("${rowID}", ${JSON.stringify(notesToPlay)}, "#permutationsCombo")'>`;
     selectedCombination = selectedCombination
        .replace(/<button[^>]*>/, newButtonTag)
        .replace(/<tr[^>]*>/, `<tr id = "${rowID}">`);
          
     let permutationsComboCycle = allCombinations[0];
    // removes leading 6; orders by alternatingCycleOrder which is 0, 7, 5, 2, 10, 9, 3, 4, 8, 11, 1, 6
    const cycleSequence = _.slice(_.orderBy(source,["alternatingCycleOrder"], ["asc"]),1);
    // duplicate first note, add 12 to MIDI, add to the end of the sequence
    const cycleLastNote = _.clone(_.first(cycleSequence));
    cycleLastNote.midi += 12;
    cycleSequence.push(cycleLastNote);
    newButtonTag = `<button class="grey-button" onclick='playMIDICycle("cycle-permutationsCombo", ${JSON.stringify(cycleSequence)}, "#permutationsCombo")'>`;
    permutationsComboCycle = permutationsComboCycle
        .replace(/<tr id = "cycle">/, `<tr id = "cycle-permutationsCombo">`)
        .replace(/<button[^>]*>/, newButtonTag);

    document.querySelector("#permutationsCombo").innerHTML = permutationsComboCycle + selectedCombination;

    // go to top of screen to show selected combo playing
    scrollToTop();

    setTimeout(() => {
        // this is what plays when the selected combination is displayed
        playMIDICycle(rowID, JSON.stringify(notesToPlay), "#permutationsCombo");
    }, 500);

    const numberOfNotes = document.querySelector("#notes").value;
    // TODO // isn't there a better way to determine this value??
    console.log(`number of Notes: ${numberOfNotes}`);


     if (numberOfNotes < 4) {
        // all permutations, no need for common but put the all where common would be!
        document.querySelector("#commonPermutationsTitle").innerHTML = "All Permutations";

        document.querySelector("#commonPermutations").innerHTML = generatePermutations(combinationOfNotesOnly);
        document.querySelector("#allPermutationsTitle").style.display = 'none';
        document.querySelector("#allPermutations").style.display = 'none';

        // TODO // fix the play all button id="playAllCommon" 
        // TODO // remove the play all button for id="playAllPermutations"
     } else {
       // common & all permutations
        if (combinationOfNotesOnly.length > 7) {
            document.querySelector("#allPermutationsTitle").innerHTML = "First 5040 Permutations of " + totalPermutationsCount;
        } else {
            document.querySelector("#allPermutationsTitle").innerHTML = "All " + calculatePermutations(combinationOfNotesOnly.length) + " Permutations";
        }

        // display common permutations and 

        document.querySelector("#commonPermutations").innerHTML = generateCommonPermutations(combinationOfNotesOnly);

        // display all permutations
        document.querySelector("#allPermutations").innerHTML = generatePermutations(combinationOfNotesOnly);
        document.getElementById('allPermutations').style.display = 'inline-block';
        document.getElementById('allPermutationsTitle').style.display = 'block';
        document.querySelector("#playAllPermutations").style.display = 'inline-block';

     }

     // TODO fix this mess of style.display versus classList hidden

     document.querySelector("#reflectionsTitle").innerHTML = "Reflections";
      document.querySelector("#reflections").innerHTML = reflectOverMultipleAxes(combinationOfNotesOnly);

      document.querySelector("#rotationsTitle").innerHTML = "Rotations";
      document.querySelector("#rotations").innerHTML = rotateCombination(combinationOfNotesOnly);

      document.getElementById('startOver').style.display = 'inline';
      document.getElementById('goBack').style.display = 'inline';
      document.getElementById('goToTop').style.display = 'inline';
      document.getElementById('goToBottom').style.display = 'inline';
      
      document.getElementById('permutationsCombo').style.display = 'inline-block';
      document.getElementById('commonPermutationsTitle').style.display = 'block';
      document.getElementById('commonPermutations').style.display = 'inline-block';
      document.getElementById('reflectionsTitle').style.display = 'block';
      document.getElementById('reflections').style.display = 'inline-block';
      document.getElementById('rotationsTitle').style.display = 'block';
      document.getElementById('rotations').style.display = 'inline-block';
    //   document.getElementById('allPermutationsTitle').style.display = 'block';
    //   document.getElementById('allPermutations').style.display = 'inline-block';

        // hide combinations data by id
        document.getElementById('tonicSelect').style.display = 'none';
        document.getElementById('notes').style.display = 'none';
        document.getElementById('totalCombinations').style.display = 'none';
        document.getElementById('combinations').style.display = 'none';
 }

 /**********  REFLECTION FUNCTIONS  ***********/

 /**
  * helper function to reflect a sequence of notes
  * @param {*} seq // sequence of notes from combination
  * @param {*} axis  // number of axis to reflect on
  * @returns array 
  */
 function reflectScale(seq, axis) { 
    return seq.map(note => (2 * axis - note + 12) % 12); 
  } 

  /**
   * reflects a sequence over all axes in cycle order
   * @param {*} combination // array of objects
   * @returns 
   */
  function reflectOverMultipleAxes(combination) { 
    const cycleAxes = [0, 3.5, 1, 4.5, 2, 5.5, 3, 0.5, 4, 1.5, 5,	2.5]
    const reflections = []; 
    const sequence = combination.map(note => note.cycle);

    cycleAxes.forEach(axis => { 
        const numbersArray = (reflectScale(sequence, axis)); 
        reflections.push(_.compact(_.map(numbersArray, note => _.find(source, { cycle: note }))));
    });     
    
    // console.log(reflections);

    const displayReflections = [];
    count = 0;
    _.forEach(reflections, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`);
        const rowID = count + "-reflections";
        // generates PLAY ALL array
        allReflections.push({
            rowID: rowID,
            notes: array
        });
        const button = `<button class="grey-button" onclick='playMIDISequence("${rowID}", ${JSON.stringify(array)}, "#reflections")'>${count}.</button>`;
        displayReflections.push(`<tr id = ${rowID}><td>${button}</td>${cellDisplay.join("")}</tr>`);
    });
        // displays Reflections
        return( _.join(displayReflections,  "</tr><tr>"));
      
  } 
 /**********  ROTATION FUNCTIONS  ***********/

/**
 * to generate the rotations
 * @param {*} combination : selected sequence of notes
 * @returns 
 */
 function rotateCombination(combination) {
//cycleSource changes the order to ascending cycle order [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]
 
    const cycleSource =  _.concat(_.slice(source, 6, 13), _.slice(source, 1, 6));

    // TODO // why was I using noteSource here instead of source???
    // const cycleSource =  _.concat(_.slice(noteSource, 6, 13), _.slice(noteSource, 1, 6));

    const rotations = [];
    const cycleIndices = _.map(combination, obj => _.findIndex(cycleSource, { cycle: obj.cycle }));

    _.times(cycleSource.length, (i) => {
        const rotatedCombination = _.map(cycleIndices, index => {
            const newIndex = (index + i) % cycleSource.length;
            return cycleSource[newIndex];
        });
        rotations.push(rotatedCombination);
    });

    // console.log(rotations);
    const displayRotations = [];
    count = 0;
    _.forEach(rotations, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`);
        const rowID = count + "-rotations";
        // generate PLAY ALL array
        allRotations.push({
            rowID: rowID,
            notes: array
        });
        const button = `<button class="grey-button" onclick='playMIDISequence("${rowID}", ${JSON.stringify(array)}, "#rotations")'>${count}.</button>`;
        displayRotations.push(`<tr id = ${rowID}><td>${button}</td>${cellDisplay.join("")}</tr>`);
    });
        // displays Rotations
        return( _.join(displayRotations,  "</tr><tr>"));
      
}

 /**********  MISC FUNCTIONS  ***********/
/**
 * function to generate obfuscated email link in footer & modal
 */
const user = "mitchkahle"; // Replace with your email username
const domain = "gmail.com"; // Replace with your email domain
const emailFooter = document.getElementById("email-footer");
const emailModal = document.getElementById("email-modal");

function generateEmailLink(user, domain) {
    const email = user + "@" + domain;
    let obfuscatedEmail = "";
    for (let i = 0; i < email.length; i++) {
        obfuscatedEmail += "&#" + email.charCodeAt(i) + ";";
    }
    obfuscatedEmail = obfuscatedEmail + "?subject=Harken%20Music";
    return obfuscatedEmail;
}
emailFooter.innerHTML = "<a href='mailto:" + generateEmailLink(user, domain) + "'>Email for more information</a>";
emailModal.innerHTML = "<a href='mailto:" + generateEmailLink(user, domain) + "'>contact the author</a>";


// TODO  // this is a mess of style.display and classList.replace
/**
 * called by START OVER button to allow a new Notes selection
 * without having to hit the START button to load the MIDI
 *  */
function startOver() {
        // used to be refresh page;
    // location.reload();

    cycleOnly = source.map((obj) => 
    `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`);
    allCombinations= [`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead>
<tr id = "cycle"><td class = "numbering"><button class="play-button" id="playButton">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];

    allCommonPermutations = [];
    allPermutations = [];
    allAllPermutations = [];
    allReflections = [];
    allRotations = [];

    document.getElementById('notes').value= "1";
    document.getElementById('notes').style.display = 'inline';
    document.getElementById('title').innerHTML = "Choose Combination";

    document.querySelector("#combinations").innerHTML = allCombinations;
    document.getElementById('combinations').style.display = 'inline-block';

    document.getElementById('permutationsCombo').style.display = 'none';
    document.getElementById('goBack').style.display = 'none';
    document.getElementById('goToBottom').style.display = 'none';
    document.getElementById('goToTop').style.display = 'none';
    document.getElementById('startOver').style.display = 'none';
    document.getElementById('generatedContent').classList.replace("showInline", "hidden");

    // reset the play all buttons 
    document.querySelector("#playAllCommon").onclick = function() { playAllSequences(allCommonPermutations) };
     document.querySelector("#playAllCommon").innerHTML = "PLAY ALL";

     document.querySelector("#playAllReflections").onclick = function() { playAllSequences(allReflections) };
     document.querySelector("#playAllReflections").innerHTML = "PLAY ALL";

     playButton = document.querySelector("#playAllRotations").onclick = function() { playAllSequences(allRotations) };
     document.querySelector("#playAllRotations").innerHTML = "PLAY ALL";

     document.querySelector("#playAllPermutations").onclick = function() { playAllSequences(allAllPermutations) };
     document.querySelector("#playAllPermutations").innerHTML = "PLAY ALL";

}


// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// MODAL

document.getElementById('openModalButton').addEventListener('click', function(event) {
    event.stopPropagation();  // Prevent the click from triggering outside click logic
    openModal();
  });

  function openModal() {
    // Display the modal and prevent background scroll
    document.getElementById('AboutModal').style.display = 'block';
    document.body.classList.add('modal-open');

    // Close the modal if user clicks outside the modal content
    window.addEventListener('click', outsideClickHandler);
  }

  function closeModal() {
    // Hide the modal and restore background scroll
    document.getElementById('AboutModal').style.display = 'none';
    document.body.classList.remove('modal-open');

    // Remove the event listener to avoid it running after the modal is closed
    window.removeEventListener('click', outsideClickHandler);
  }

  function outsideClickHandler(event) {
    const modal = document.getElementById('AboutModal');
    const modalContent = document.querySelector('.w3-modal-content');

    // Check if the click was outside the modal content
    if (!modalContent.contains(event.target) && modal.style.display === 'block') {
      closeModal();
    }
  }