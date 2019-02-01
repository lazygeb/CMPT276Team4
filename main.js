


function main(usrFile) {
        document.getElementById("startEmulator").onclick = function () { startEmulator(usrFile)};

}

function startEmulator(usrFile) {
	let chip = new Chip8();
    chip.reset();
    if (usrFile) {
        chip.loadProgram(prog);
    }
	//chip.updateDisplay();
	setInterval(function(){ chip.runEmulator(); }, 4);
	//window.requestAnimationFrame(chip.runEmulator());
	//chip.runEmulator();
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
    main(true); //call main, with true boolean to show it should load a file
    };
    reader.readAsBinaryString(file);
    //console.log(arrayBuffer);

}


main();


