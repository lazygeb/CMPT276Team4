//automated testing for opcodes
//to use (for now): comment out line 137 from index.html (the one with src = main.js)
//                  add this line to replace it: <script src = "Testing/opcodeTest.js"></script>
//To comment in html, wrap the part you want to comment like this: <!-- this is commented out -->
//I'll come up with a better way to test later on...

let chip = new Chip8(); //I know, it's global, I'll change it later

function opCoTest() { //call opcode tests in here
    chip.reset(); //instantiate chip8 VM

    //Test opcodes:
    clrDisp();
    // ret();
    // oneNNN();
    // twoNNN();
    threeXKK();
    fourXKK();
    fiveXY0();
    sixXKK();
    sevenXKK();
    eightXY1();
    eightXY7();
    fX07();



}

function clrDisp() {
    chip.oneCycle(0x00E0); //opcode 0x00E0, this one clears the display so every element in graphics[i] should
                                                    //be 0 and the drawFlag should be set to true;
    let isClear = true;
    for (let i = 0; i < chip.graphics.length; i++) {
        if (chip.graphics[i] !== 0) {
            isClear = false;
        }
    }
    if (!isClear || chip.drawFlag !== true) {
        console.log("Opcode 00E0: Failed");
    }
    else {
        console.log("Opcode 00E0: Pass");
    }
}

//add functions ret, one NNN and two NNN here


function threeXKK() { //opcode 0x3xkk, if register Vx == kk, skip to next instruction (PC + 2)
                        //this one has two cases, one where Vx == kk and one where Vx != kk. We need to test both
    let works = true;
    chip.register[5] = 0xA6; //case 1: Vx == kk
    let pc = chip.programCounter;
    chip.oneCycle(0x35A6); //here register[5] should be equal to A6 therefore PC should increase by 2
    if (chip.programCounter !== pc + 2) {
        works = false;
    }
    pc = chip.programCounter;
    chip.oneCycle(0x35A7); //here register[5] should not be equal to A7, therefore PC should not increase
    if (chip.programCounter !== pc) {
        works = false;
    }
    if (!works) {
        console.log("Opcode 3xkk: Failed");
    }
    else {
        console.log("Opcode 3xkk: Pass");
    }
}

function fourXKK() { //opcode 0x4xkk --> SNE Vx, byte -- if this.register Vx != kk, skip next instruction (PC + 2)
    let works = true;
    chip.register[5] = 0xA6; //case 1: Vx == kk
    let pc = chip.programCounter;
    chip.oneCycle(0x45A6); //here register[5] should be equal to A6 therefore PC should not increase
    if (chip.programCounter !== pc) {
        works = false;
    }
    pc = chip.programCounter;
    chip.oneCycle(0x45A7); //here register[5] should not be equal to A7, therefore PC should increase by 2
    if (chip.programCounter !== pc + 2) {
        works = false;
    }
    if (!works) {
        console.log("Opcode 4xkk: Failed");
    }
    else {
        console.log("Opcode 4xkk: Pass");
    }
}

function fiveXY0(){ //opcode 0x5xy0 --> SE Vx, Vy -- if this.register Vx & Vy are equal, skip next instruction
	let works = true;
    chip.register[5] = 0xA6; 
    chip.register[6] = 0xA6;
    let pc = chip.programCounter;
    chip.oneCycle(0x5560); 
    if (chip.programCounter !== pc + 2) {
        works = false;
    }
    if (!works) {
        console.log("Opcode 5xy0: Failed");
    }
    else {
        console.log("Opcode 5xy0: Pass");
    }
}

function sixXKK(){ //opcode 0x6xkk --> LD Vx, byte -- place value kk into this.register Vx
	let works = true;
    chip.register[5] = 0xA6; 
    chip.oneCycle(0x65A6); 
    if (chip.register[5] !== 0xA6) {
        works = false;
    }
    if (!works) {
        console.log("Opcode 6xkk: Failed");
    }
    else {
        console.log("Opcode 6xkk: Pass");
    }
}

function sevenXKK(){  //opcode 0x7xkk --> ADD Vx, byte -- add value kk to Vx and place in Vx
	let works = true;
	chip.register[5] = 0xA6;
	chip.oneCycle(0x75A6);
	if (chip.register[5] !== 0xA6+0xA6){
		works = false;
	}
	if (!works) {
        console.log("Opcode 7xkk: Failed");
    }
    else {
        console.log("Opcode 7xkk: Pass");
    }
}

function eightXY1(){ //opcode 8xy1 --> OR Vx, Vy -- set Vx = Vx OR Vy (bitwise OR operation)
	let works = true;
	chip.register[5] = 0xA6;
	chip.register[6] = 0xA6;
	chip.oneCycle(0x8561);
	if (chip.register[5] !== (0xA6|0xA6)){
		works = false;
	}
	if (!works) {
        console.log("Opcode 8xy1: Failed");
    }
    else {
        console.log("Opcode 8xy1: Pass");
    }
}

function eightXY7(){ //opcode 8xy7 --> SUBN Vx, Vy -- set Vx = Vy - Vx, set VF = Not borrow
	let works = true;
	chip.register[5] = 0xA6; //Vx
	chip.register[6] = 0xA7; //Vy
	chip.oneCycle(0x8567);
	if (chip.register[0xF] !== 1){
		works = false;
	}
	if (chip.register[5] !== 0xA7-0xA6){
		works = false;
	}
	if (!works) {
        console.log("Opcode 8xy7: Failed");
    }
    else {
        console.log("Opcode 8xy7: Pass");
    }
}

function fX07(){ //opcode 0xFx07 --> LD Vx, DT -- set Vx = delay timer value
	let works = true;
	chip.register[5] = 0xA6;
	chip.oneCycle(0xF507);
	if (chip.register[5] !== chip.delayTimer){
		works = false;
	}
	if (!works) {
        console.log("Opcode Fx07: Failed");
    }
    else {
        console.log("Opcode Fx07: Pass");
    }
}

opCoTest(); //calls the function in this file..



















