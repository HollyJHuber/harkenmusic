
/**
 * Harken Music (beta)
 * Copyright (c) 2024 Radical Data and Media LLC and The Harmonagon Project
 */


let matrixType = "number";
let allCombinations = [];

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
<tr><td class = "numbering"><button class="play-button" id="playButton">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];

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

    document.getElementById('refresh').style.display = 'none';
    document.getElementById('goBack').style.display = 'none';    
    
});

const comboLabels = ["", "Tonic", "Intervals", "Triads", "Tetrachords", "Pentatonics", "Hexatonics", "Heptatonics", "Octatonics", "Nonatonics", "Decatonics",  "Hendecactonics",  "Chromatic"];

/**********  FUNCTIONS  ***********/
/**
 * function called by the Play Cycle button
 * plays the circle of fifths
 */
function playCycle (audioContext) {
    console.log("MIDI sequence started!");
    
    // disable the button to prevent spam tapping
    document.getElementById('playButton').disabled = true; 

    // removes leading 6; orders by alternatingCycleOrder which is 0, 7, 5, 2, 10, 9, 3, 4, 8, 11, 1, 6
    const sequenceToPlay = _.slice(_.orderBy(source,["alternatingCycleOrder"], ["asc"]),1);

    // retrieve cells without "numbering" or "interval" classes
    const tableCells = document.querySelectorAll("#combinations td:not(.numbering):not(.interval)");

    const duration = 0.75; // 1/8th note duration in seconds (60 / bpm / 2)
    const velocity = 127; // how hard the note hits
    MIDI.setVolume(0, 127);

    sequenceToPlay.forEach((note, index) => {

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
            if (index === sequenceToPlay.length -1) {
                // enable play button
                document.getElementById('playButton').disabled = false; 
            }
        }, startTime); // Start the note and color change after the calculated start time
    });
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
        <tr><td class = "numbering"><button class="play-button" id="playButton">&#9654;</button></td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];
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

    console.log(`tonic ${tonic}, numNotes ${numNotes}`)

    // display cycle only when 1 is selected
    if (numNotes === 1 || numNotes === "1"){
        allCombinations= [`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead>
        <tr><td class = "numbering">*</td>${cycleOnly.join("")}<td class = "interval">cycle</td></tr>`];
        document.querySelector("#combinations").innerHTML = allCombinations;
        document.getElementById('totalCombinations').innerHTML = "";
    } else {
        document.querySelector("#combinations").innerHTML = generateCombos(tonic, numNotes);
    }
    document.getElementById('notes').style.display = 'inline';
    document.getElementById('totalCombinations').style.display = 'block';
    document.getElementById('combinations').style.display = 'block';
    document.getElementById('refresh').style.display = 'none';
    document.getElementById('goBack').style.display = 'none';
    document.getElementById('permutationsCombo').style.display = 'none';
    document.getElementById('commonPermutationsTitle').style.display = 'none';
    document.getElementById('commonPermutations').style.display = 'none';
    document.getElementById('reflectionsTitle').style.display = 'none';
    document.getElementById('reflections').style.display = 'none';
    document.getElementById('rotationsTitle').style.display = 'none';
    document.getElementById('rotations').style.display = 'none';
    document.getElementById('allPermutationsTitle').style.display = 'none';
    document.getElementById('allPermutations').style.display = 'none';

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
    return `<tr><td><label>*</label></td><td> ${_.join(sequence, "</td><td>")} </td><td><label>*</label></td>
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
    let comboCount = 0;
    allCombinations = [];

    _.forEach(comboSorted, (array) => {
        comboCount ++;

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
        array[array.length -1].countNo = comboCount;
    
        // get the updated intervalLabels from info, the last array item
        // TODO // replacing intervalLabel with nothing until we can implement the play button
        const displayLabel = array[array.length -1].intervalLabel;

        const button = `<button class="grey-button" onclick='createPermutationsTables(${comboCount}, ${JSON.stringify(array)})'>${comboCount}.</button>`;

        // TODO // replacing displayLabel with nothing until we can implement play button
        allCombinations.push(`<tr id = ${comboCount}><td>${button}</td>${display.join("")}<td class = "interval"></td></tr>`);
        // allCombinations.push(`<tr id = ${comboCount}><td>${button}</td>${display.join("")}<td class = "interval">${displayLabel.join(", ")}</td></tr>`);
        // first join replaces commas with html tags for table data
        // second join replaces commas with comma space

        // (comboCount === 1) && console.log(array);
            
    });

    document.querySelector("#title").innerHTML = `Select Combination`;

    let cycleDisplay = [];

    //add cycle to top of combinations
    // number displays obj.cycle; note displays obj.note

    cycleDisplay = mySource.map((obj) => 
    `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${matrixType === "note" ? obj.note : obj.cycle}</td>`
    );

   allCombinations.unshift(`<thead class = "numbering"><tr><th></th><th colspan = "6">Descending Cycle</th><th>Tonic</th><th colspan = "6">Ascending Cycle</th><th></th></tr></thead><tr><td class = "numbering">*</td>${cycleDisplay.join("")}<td class = "interval">cycle</td></tr>`);

    document.querySelector("#totalCombinations").innerHTML = `${comboCount} ${comboLabels[k]}`;

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
 
    const numRotations = combinationToPermute.length;

    const rotationsAsc = _.times(numRotations, (i) => [
        ..._.slice(combinationToPermute, i),
        ..._.slice(combinationToPermute, 0, i)
    ]);

    // order by descending
    const reverseOrderFromTonic = _.orderBy(combinationToPermute, ["cycle"], ["desc"]);
    // put the tonic first
    reverseOrderFromTonic.unshift(reverseOrderFromTonic.pop());

    const rotationsDesc = _.times(numRotations, (i) => [
        ..._.slice(reverseOrderFromTonic, i),
        ..._.slice(reverseOrderFromTonic, 0, i)
    ]);

    const rotations = _.concat(rotationsAsc, rotationsDesc);
    const commonRotations = [];
    count = 0;
    _.forEach(rotations, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`)
        commonRotations.push(`<tr><td class = "numbering">${count}.</td>${cellDisplay.join("")}</tr>`);
    });

    // TODO // this should be moved elsewhere ???
    document.querySelector("#title").innerHTML = `Selected Combination`;

    // Common Permutations of # Total
    document.querySelector("#commonPermutationsTitle").innerHTML = "Permutations";
    // table of common permutations!
    return( _.join(commonRotations,  "</tr><tr>"));
}

 /**
  * this calls permute to generate ALL the permutations
  * and put them into html for display
  */
 function generatePermutations(combinationToPermute) {

    console.log(combinationToPermute);

    let sourcePermutations = permute(combinationToPermute);

    const allPermutations = [];
    count = 0;
    _.forEach(sourcePermutations, (array) => {
        count ++;
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`)
        allPermutations.push(`<tr><td class = "numbering">${count}.</td>${cellDisplay.join("")}</tr>`);

    });

    // returns ALL Permutations
    return( _.join(allPermutations,  "</tr><tr>"));


}

// TODO change the name of this function???
//******************** THIS IS WHERE THE HTML COMES FROM *************/
/**
 * called by each combo button to create:
 * all permutations, common & all permutations (with limits)
 * @param {*} comboCount // ID number of selected combination
 * @param {*} selectedComboArray // combination of notes to permute (includes)
 */
function createPermutationsTables(comboCount, selectedComboArray) {

    // remove descriptor object at end of selectedComboArray
    // extract only unique cycle values (no duplicates)
    // sort by cycle
    const combinationOfNotesOnly = _.sortBy(_.uniqBy(_.initial(selectedComboArray), "cycle"), "cycle");

    console.log(combinationOfNotesOnly);

    document.querySelector("#title").innerHTML = `Selected Combination`;

    document.getElementById('refresh').style.display = 'inline';
    document.getElementById('goBack').style.display = 'inline';


    const totalPermutationsCount = calculatePermutations(combinationOfNotesOnly.length);
    const numberOfNotes = document.querySelector("#notes").value;
     if (numberOfNotes < 4) {
        console.log(`all permutations`);
        // all permutations, no need for common but put the all where common would be!
        document.querySelector("#commonPermutationsTitle").innerHTML = "All " + calculatePermutations(combinationOfNotesOnly.length) + " Permutations";

        document.querySelector("#commonPermutations").innerHTML = generatePermutations(combinationOfNotesOnly);
     } else {
        console.log(`common & all permutations`);

        if (combinationOfNotesOnly.length > 7) {
            document.querySelector("#allPermutationsTitle").innerHTML = "First 5040 Permutations of " + totalPermutationsCount;
        } else {
            document.querySelector("#allPermutationsTitle").innerHTML = "All " + calculatePermutations(combinationOfNotesOnly.length) + " Permutations";
        }

        // display common permutations and 

        document.querySelector("#commonPermutations").innerHTML = generateCommonPermutations(combinationOfNotesOnly);

        // display all permutations
        document.querySelector("#allPermutations").innerHTML = generatePermutations(combinationOfNotesOnly);
     }


    // hide combinations data by id
        document.getElementById('tonicSelect').style.display = 'none';
        document.getElementById('notes').style.display = 'none';
        document.getElementById('totalCombinations').style.display = 'none';
        document.getElementById('combinations').style.display = 'none';

        // select combos to display in #permutationsCombo table

      document.querySelector("#permutationsCombo").innerHTML = allCombinations[0] + allCombinations[comboCount];

      document.querySelector("#reflectionsTitle").innerHTML = "Reflections";
      document.querySelector("#reflections").innerHTML = reflectOverMultipleAxes(combinationOfNotesOnly);

      document.querySelector("#rotationsTitle").innerHTML = "Rotations";
      document.querySelector("#rotations").innerHTML = rotateCombination(combinationOfNotesOnly);



      document.getElementById('refresh').style.display = 'inline';
      document.getElementById('goBack').style.display = 'inline';
      document.getElementById('permutationsCombo').style.display = 'inline-block';
      document.getElementById('commonPermutationsTitle').style.display = 'block';
      document.getElementById('commonPermutations').style.display = 'inline-block';
      document.getElementById('reflectionsTitle').style.display = 'block';
      document.getElementById('reflections').style.display = 'inline-block';
      document.getElementById('rotationsTitle').style.display = 'block';
      document.getElementById('rotations').style.display = 'inline-block';
      document.getElementById('allPermutationsTitle').style.display = 'block';
      document.getElementById('allPermutations').style.display = 'inline-block';

 }

 /**********  RELECTION FUNCTIONS  ***********/

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
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`)
        displayReflections.push(`<tr><td class = "numbering">${count}.</td>${cellDisplay.join("")}</tr>`);
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
        let cellDisplay = array.map((obj) => `<td style="background-color: rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})">${obj.cycle}</td>`)
        displayRotations.push(`<tr><td class = "numbering">${count}.</td>${cellDisplay.join("")}</tr>`);
    });
        // displays Rotations
        return( _.join(displayRotations,  "</tr><tr>"));
      
}

 /**********  MISC FUNCTIONS  ***********/
/**
 * function to generate obfuscated email link in footer
 */
var user = "mitchkahle"; // Replace with your email username
var domain = "gmail.com"; // Replace with your email domain
var emailElement = document.getElementById("email");

function generateEmailLink(user, domain) {
    const email = user + "@" + domain;
    let obfuscatedEmail = "";
    for (let i = 0; i < email.length; i++) {
        obfuscatedEmail += "&#" + email.charCodeAt(i) + ";";
    }
    obfuscatedEmail = obfuscatedEmail + "?subject=Music%20Matrix";
    return obfuscatedEmail;
}

document.querySelector("#email").innerHTML = "<a href='mailto:" + generateEmailLink(user, domain) + "'>Send email to Mitch Kahle for more information</a>"

function refreshPage() {
    // Reloads the current page
    location.reload();
}