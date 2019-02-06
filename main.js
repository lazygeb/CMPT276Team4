/*
 * References:
 * 1. https://www.html5rocks.com/en/tutorials/file/dndfiles/
 *      - Used for reading in files
 * 2. https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
 *      - Used for reading in files
 */


function main(usrFile) {
        document.getElementById("runTest").onclick = function () { runTest()};
        document.getElementById("startEmulator").onclick = function () { startEmulator(usrFile)};

} 

function startEmulator(usrFile) {
	let chip = new Chip8();
    chip.reset();
    if (usrFile) {
        chip.loadProgram(prog);
    }
	setInterval(function(){ chip.runEmulator(); }, 6);
    //window.requestAnimationFrame(chip.runEmulator());

    //if delaytimer or soundtimer nonzero, function will be added to queue at a rate of 1s 
    if (chip.delayTimer !== 0) {
        setInterval(function(){ chip.startDelayTimer();}, 1000);
    } 
    if (chip.soundTimer !== 0) {
        setInterval(function(){ chip.startSoundTimer(); }, 1000);
    } 
}

function runTest() {
    opCoTest();
}

let inputElement = document.getElementById("myFile");
inputElement.addEventListener("change", handleFiles, false);
let file;
let prog;
function handleFiles() {
    file = this.files[0];
    console.log(file);
    console.log(this.files[0]);
    let reader = new FileReader();
    let result;
    reader.onload = function(event) {
        result = event.target.result; //result = contents of file
        console.log(result);
        result = result.replace(/\n/g, " "); //replace any newline characters with spaces
        console.log(result);
        let arr = result.split(" "); //string to array, split by spaces
        console.log(arr);
        prog = new Uint8Array(arr.length*2); //Array to hold program
        let j = 0;
        for (let i = 0; j <= arr.length; i += 2) { //loop to split opcodes into 1 byte
            prog[i] = (parseInt(arr[j], 16) & 0xFF00) >>> 8; //first byte (parse int --> convert string to int)
            prog[i+1] = (parseInt(arr[j], 16) & 0x00FF);     //second byte
            j++;
        }
        for (let i = 0; i < prog.length; i++) {
            console.log((prog[i]).toString(16));
        }
        alert("Your file has been loaded, please press \"Start Emulation\"");
    main(true); //call main, with true boolean to show it should load a file
    };
    reader.readAsBinaryString(file);
}


main(false);


