/*
 * References:
 * 1. https://www.html5rocks.com/en/tutorials/file/dndfiles/
 *      - Used for reading in files
 * 2. https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
 *      - Used for reading in files
 */
 

let stepBackward = new Array();
var runEmulator = null;
var pauseflag = false;
var loadFlag = null;
function main(usrFile) {
    document.getElementById("runTest").onclick = function () { runTest()};
    document.getElementById("startEmulator").onclick = function () { 
        if (loadFlag != false) {
            startEmulator(usrFile);
            loadFlag = false;
			document.getElementById("startEmulator").classList.add("emulatorRunning");
        }
    };
} 

function pushThisChip() {
    if (stepBackward.length > 200) {
        stepBackward.shift();
    }
    let newChip = new Chip8();
    newChip = chip.deepCopy(newChip);
    stepBackward.push(newChip);
}

function callSetInt(){
	runEmulator = 
        setInterval(function() {
            if (chip.getWaitKeyFlag() == true || pauseflag == true) {
                window.clearInterval(runEmulator);
            }
            else {
                chip.runEmulator(); 
            }
        }, 1);
}

function startEmulator(usrFile) {
    chip = new Chip8();
    chip.reset();
    if (usrFile) {
        chip.loadProgram(prog);
    }
    callSetInt();

}
    //window.requestAnimationFrame(chip.runEmulator());

    //If click  pause -> clear setinterval
    document.getElementById("pause").onclick = function() {
        if (pauseflag === false) {
            chip.updateHTMLLogMessage("Emulator Paused");

			//for the UI 
			document.getElementById("resume").classList.add("stepControlActive");
			document.getElementById("stepForward").classList.add("stepControlActive");
			document.getElementById("stepBack").classList.add("stepControlActive");
			document.getElementById("resume").classList.remove("stepControlInactive");
			document.getElementById("stepBack").classList.remove("stepControlInactive");
			document.getElementById("stepForward").classList.remove("stepControlInactive");

            pauseflag = true;
		}
    };
    

    //If click  resume -> run emulator is true
	document.getElementById("resume").onclick = function() {
		if (pauseflag == true){
			callSetInt();
    		chip.updateHTMLLogMessage("Emulator Resumed");

			//for the UI
			document.getElementById("resume").classList.remove("stepControlActive");
			document.getElementById("stepForward").classList.remove("stepControlActive");
			document.getElementById("stepBack").classList.remove("stepControlActive");
			document.getElementById("resume").classList.add("stepControlInactive");
			document.getElementById("stepBack").classList.add("stepControlInactive");
			document.getElementById("stepForward").classList.add("stepControlInactive");

			pauseflag = false;
		}
    };

    //If click step forward -> move forward one opcode
    document.getElementById("stepForward").onclick = function() { 
		if (pauseflag === false) return;
		chip.runEmulator();
		chip.updateHTMLLogMessage("Stepped Forward");

    };

    document.getElementById("stepBack").onclick = function() {
		if (pauseflag === false) return;
        window.clearInterval(runEmulator);
        
        chip.updateHTMLLogMessage("Stepped Backwards");
        stepBackward.pop(); //get rid of one (cause we run through one at the end)
        let otherChip = stepBackward.pop();
        console.log(otherChip.register.toString());
        console.log(otherChip.stack.toString());
        console.log(otherChip.programCounter.toString(16));
        this.chip = otherChip.deepCopy(chip);
        pauseflag = true;
        chip.runEmulator(); //run that once (updates emulator every time you step back)
    };

    var translateKeys = {
        49: 1,
        50: 2,
        51: 3,
        52: 12,
        81: 4,
        87: 5,
        69: 6,
        82: 13,
        65: 7,
        83: 8,
        68: 9,
        70: 14,
        90: 10,
        88: 0,
        67: 11,
        86: 15,
    };

    document.addEventListener("keydown", function(event) {
        chip.keydown(translateKeys[event.keyCode]);
        if (chip.getWaitKeyFlag() == true && pauseflag == false) {
            chip.runEmulator();
            callSetInt();
        }
    });

    document.addEventListener("keyup", function(event) {
        chip.keyup(translateKeys[event.keyCode]);
    });



function runTest() {
    opCoTest();
}

let inputElement = document.getElementById("file");
inputElement.addEventListener("change", handleFiles, false);
let file;
let prog;
function handleFiles() {
    window.clearInterval(runEmulator);
    file = this.files[0];
    let reader = new FileReader();
    let result;
    reader.onload = function(event) {
        result = event.target.result; //result = contents of file
        result = result.replace(/\n/g, " "); //replace any newline characters with spaces
        let arr = result.split(" "); //string to array, split by spaces
        prog = new Uint8Array(arr.length*2); //Array to hold program
        let j = 0;
        for (let i = 0; j <= arr.length; i += 2) { //loop to split opcodes into 1 byte
            prog[i] = (parseInt(arr[j], 16) & 0xFF00) >>> 8; //first byte (parse int --> convert string to int)
            prog[i+1] = (parseInt(arr[j], 16) & 0x00FF);     //second byte
            j++;
        }
        alert("Your file has been loaded, please press \"Start Emulation\"");
        loadFlag = true; //makes sure runEmulator only runs once
        pauseflag = false; //resets the pause flag when new game is put in
		document.getElementById("startEmulator").classList.remove("emulatorRunning");
    main(true); //call main, with true boolean to show it should load a file
    };
    reader.readAsBinaryString(file);
}


main(false);

