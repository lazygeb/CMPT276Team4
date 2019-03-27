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
var logToggle = false;
function main(usrFile) {
    document.getElementById("runTest").onclick = function () { runTest()};
    document.getElementById("startEmulator").onclick = function () { 
        if (loadFlag != false) {
            startEmulator(usrFile);
            loadFlag = false;
			document.getElementById("startEmulator").classList.add("emulatorRunning");
			if (logToggle) {
				chip.logToggle = true;
			}
        }
    };
	document.getElementById("logToggle").onclick = function () { toggleLog()};
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
    if (usrFile && !snakeOK && !floppyOK) {
        chip.loadProgram(prog);
    } else if (snakeOK) {
		//broken snake hardcoded rn.
		chip.program = [0x6a, 0x08, 0x6b, 0x04, 0x66, 0x00, 0x67, 0x04, 0xf8, 0x55, 0xfb, 0x1e, 0xf5, 0x65, 0xf8, 0x55, 0xd0, 0x11, 0x60, 0x05, 0xe0, 0xa1, 0x67, 0x00, 0x60, 0x07, 0xe0, 0xa1, 0x67, 0x12, 0x60, 0x08, 0xe0, 0xa1, 0x67, 0x08, 0x60, 0x09, 0xe0, 0xa1, 0x67, 0x04, 0x00, 0xee, 0x80, 0x70, 0x74, 0xff, 0x00, 0xee, 0x74, 0x01, 0x00, 0xee, 0x75, 0x01, 0x00, 0xee, 0x73, 0xff, 0x00, 0xee, 0x7a, 0x02, 0xfa, 0x1e, 0x80, 0x40, 0x80, 0x50, 0xf1, 0x65, 0x00, 0xee, 0xf9, 0x65, 0xd4, 0x51, 0x3f, 0x01, 0x00, 0xee, 0x60, 0x08, 0x61, 0x10, 0x7a, 0xfe, 0xf8, 0x55, 0xfb, 0x1e, 0xf1, 0x65, 0xf9, 0x55, 0xd4, 0x51];
		chip.loadProgram(chip.program);
	} else {
		//still broken snake hardcoded
		chip.program = [0x6a, 0x08, 0x6b, 0x04, 0x66, 0x00, 0x67, 0x04, 0xf8, 0x55, 0xfb, 0x1e, 0xf5, 0x65, 0xf8, 0x55, 0xd0, 0x11, 0x60, 0x05, 0xe0, 0xa1, 0x67, 0x00, 0x60, 0x07, 0xe0, 0xa1, 0x67, 0x12, 0x60, 0x08, 0xe0, 0xa1, 0x67, 0x08, 0x60, 0x09, 0xe0, 0xa1, 0x67, 0x04, 0x00, 0xee, 0x80, 0x70, 0x74, 0xff, 0x00, 0xee, 0x74, 0x01, 0x00, 0xee, 0x75, 0x01, 0x00, 0xee, 0x73, 0xff, 0x00, 0xee, 0x7a, 0x02, 0xfa, 0x1e, 0x80, 0x40, 0x80, 0x50, 0xf1, 0x65, 0x00, 0xee, 0xf9, 0x65, 0xd4, 0x51, 0x3f, 0x01, 0x00, 0xee, 0x60, 0x08, 0x61, 0x10, 0x7a, 0xfe, 0xf8, 0x55, 0xfb, 0x1e, 0xf1, 0x65, 0xf9, 0x55, 0xd4, 0x51];
		chip.loadProgram(chip.program);
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

function toggleLog() {
	if (!logToggle) {
	//turns on
		logToggle = true;
		if (chip!= null) {
			chip.logToggle = true;
			document.getElementById("logToggle").innerText = "Toggle Log Off";
			document.getElementById("log").innerHTML = "";
			chip.logCount = 0;
		}
	} else {
	//turns off
		logToggle = false;
		if (chip!= null) {
			chip.logToggle = false;
			document.getElementById("logToggle").innerText = "Toggle Log On";
			chip.updateHTMLLogMessage("Click on \"Toggle Log On\" to bring back the logs");
			document.getElementById("log").removeChild(document.getElementById("log").lastElementChild);
		}
	}
}

//function to update game rom name and input to snake or flappy bird when select is chosen
let snakeOK, floppyOK = false;
function updateGameFromSelect() {
	snakeOK = false;
	floppyOK = false;
	var lol = document.getElementById("games");
	if (lol.options[lol.selectedIndex].value !== "default") {
		if (lol.options[lol.selectedIndex].value === "snake") {
			//play snake
			snakeOK = true;
			alert("Snek has been loaded, please press \"Start Emulation\"");
			document.getElementById("fileUploadBox").innerText = "Snake loaded";
		} else {
			//play floppy
			floppyOK = true;
			alert("Floppy B0rd has been loaded, please press \"Start Emulation\"");
			document.getElementById("fileUploadBox").innerText = "Floppy B-iard loaded";
		}
	}

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
        
		//input name
		var fileElement = document.getElementById('file');
			var filename = fileElement.files[0].name;
			document.getElementById("fileUploadBox").innerText = filename + " uploaded";

		loadFlag = true; //makes sure runEmulator only runs once
        pauseflag = false; //resets the pause flag when new game is put in
		document.getElementById("startEmulator").classList.remove("emulatorRunning");
    main(true); //call main, with true boolean to show it should load a file
    };
    reader.readAsBinaryString(file);
}


main(false);

