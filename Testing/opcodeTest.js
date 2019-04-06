//automated testing for opcodes
//To run test, press the run opcode test button on the html page

let chip = new Chip8(); //Change to local variable

function opCoTest() { //call opcode tests in here

    chip.reset(); //instantiate fresh chip8

    //Test opcodes:
    clrDisp();
    ret();
    oneNNN();
    twoNNN();
    threeXKK();
    fourXKK();
    fiveXY0();
    sixXKK();
    sevenXKK();
    eightXY0();
    eightXY1();
    eightXY2();
    eightXY3();
    eightXY4();
    eightXY5();
    eightXY6();
    eightXY7();
    eightXYE();
    nineXY0();
    ANNN();
    BNNN();
    CXKK();
	DXYN();
    EX9E();
    EXA1();
    FX07();
    FX0A();
    FX15();
    FX18();
    FX1E();
    FX29();
    FX33();
    FX55();
    FX65();
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
		chip.updateHTMLLogMessage("Opcode 00E0: Failed");
    }
    else {
        console.log("Opcode 00E0: Pass");
		chip.updateHTMLLogMessage("Opcode 00E0: Pass");
    }
    chip.updateHTML(0x00E0.toString(16));
}

//add function ret here

function ret() {
    let works = true;
    chip.stackPointer = 2;
    chip.stack[chip.stackPointer] = 0x222;
    chip.oneCycle(0x00EE);
    if (chip.programCounter !== 0x222) {
        works = false;
    }
    if (chip.stackPointer !== 1) {
        works = false;
    }
    if (works) {
        console.log("Opcode 00EE: Pass");
		chip.updateHTMLLogMessage("Opcode 00EE: Pass");
    }
    else {
        console.log("Opcode 00EE: Failed");
		chip.updateHTMLLogMessage("Opcode 00EE: Failed");
    }
    chip.updateHTML(0x00EE.toString(16));
}

function oneNNN() {
    let works = false;
    chip.oneCycle(0x1ABC);
    if (chip.programCounter === 0xABC) {
        works = true;
    }
    if (!works) {
        console.log("Opcode 1nnn: Failed");
		chip.updateHTMLLogMessage("Opcode 1nnn: Failed");
    } else {
        console.log("Opcode 1nnn: Pass");
		chip.updateHTMLLogMessage("Opcode 1nnn: Pass");
    }
    chip.updateHTML(0x1ABC.toString(16));
}

function twoNNN() {
    let works = true;
    let tempSp = chip.stackPointer;
    let tempPC = chip.programCounter;
    chip.oneCycle(0X2ABC);
    if (tempSp + 1 !== chip.stackPointer) {
        works = false;
    }
    if (chip.stack[chip.stackPointer] !== tempPC) {
        works = false;
    }
    if (chip.programCounter !== 0xABC){
        works = false;
    }
    if (works === false) {
        console.log("Opcode 2nnn: Failed");
		chip.updateHTMLLogMessage("Opcode 2nnn: Failed");
    }
    else {
        console.log("Opcode 2nnn: Pass");
		chip.updateHTMLLogMessage("Opcode 2nnn: Pass");
    }
    chip.updateHTML(0x2ABC.toString(16));
}

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
		chip.updateHTMLLogMessage("Opcode 3xkk: Failed");
    }
    else {
        console.log("Opcode 3xkk: Pass");
		chip.updateHTMLLogMessage("Opcode 3xkk: Pass");
    }
    chip.updateHTML(0x35A6.toString(16));
}

function fourXKK() { //opcode 0x4xkk --> SNE Vx, byte -- if this.register Vx != kk, skip next instruction (PC + 2)
    let works = true;
    chip.register[5] = 0xA6; //case 1: Vx == kk
    let pc = chip.programCounter;
    chip.oneCycle(0x45A6); //here register[5] should be equal to A6 therefore PC should not increase
    chip.updateHTML(0x45A6.toString(16));
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
		chip.updateHTMLLogMessage("Opcode 4xkk: Failed");
    }
    else {
        console.log("Opcode 4xkk: Pass");
		chip.updateHTMLLogMessage("Opcode 4xkk: Pass");
    }
    chip.updateHTML(0x45A7.toString(16));
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
		chip.updateHTMLLogMessage("Opcode 5xy0: Failed");
    }
    else {
        console.log("Opcode 5xy0: Pass");
		chip.updateHTMLLogMessage("Opcode 5xy0: Pass");
    }
    chip.updateHTML(0x5560.toString(16));
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
		chip.updateHTMLLogMessage("Opcode 6xkk: Failed");
    }
    else {
        console.log("Opcode 6xkk: Pass");
		chip.updateHTMLLogMessage("Opcode 6xkk: Pass");
    }
    chip.updateHTML(0x65A6.toString(16));
}

function sevenXKK(){  //opcode 0x7xkk --> ADD Vx, byte -- add value kk to Vx and place in Vx
	let works = true;
	chip.register[5] = 0xA6;
	chip.oneCycle(0x75A6);
	if (chip.register[5] !== ((0xA6+0xA6) & 0xFF)){ //'&' is to truncate
		works = false;
	}
	if (!works) {
        console.log("Opcode 7xkk: Failed");
		chip.updateHTMLLogMessage("Opcode 7xkk: Failed");
    }
    else {
        console.log("Opcode 7xkk: Pass");
		chip.updateHTMLLogMessage("Opcode 7xkk: Pass");
    }
    chip.updateHTML(0x75A6.toString(16));
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
		chip.updateHTMLLogMessage("Opcode 8xy1: Failed");
    }
    else {
        console.log("Opcode 8xy1: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy1: Pass");
    }
    chip.updateHTML(0x8561.toString(16));
}

function eightXY2() { //opcode 8xy2 --> AND Vx, Vy -- set Vx = Vx and Vy
    let works = true;
    chip.register[0xA] = 0xA0;
    chip.register[0xC] = 0xC0;
    chip.oneCycle(0x8AC2);
    if (chip.register[0xA] !== (0xA0 & 0xC0)) {
        works = false;
    }
    if (works) {
        console.log("Opcode 8xy2: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy2: Pass");
    }
    else {
        console.log("Opcode 8xy2: Failed");
		chip.updateHTMLLogMessage("Opcode 8xy2: Failed");
    }
    chip.updateHTML(0x8AC2.toString(16));
}

function eightXY3() { //opcode 8xy3 --> XOR Vx, Vy -- set Vx = Vx XOR Vy
    let works = true;
    chip.register[0xB] = 0x12;
    chip.register[0xE] = 0x23;
    chip.oneCycle(0x8BE3);
    if (chip.register[0xB] !== (0x12 ^ 0x23)) {
        works = false;
    }
    if (works) {
        console.log("Opcode 8xy3: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy3: Pass");
    }
    else {
        console.log("Opcode 8xy3: Failed");
		chip.updateHTMLLogMessage("Opcode 8xy3: Failed");
    }
    chip.updateHTML(0x8BE3.toString(16));
}

function eightXY4() { //opcode 8xy4 --> ADD Vx, Vy -- set Vx = Vx + Vy, set VF = carry
    let works = true;
    chip.register[0x9] = 0xBA;
    chip.register[0xB] = 0xCF;
    chip.oneCycle(0x89B4);
    if (chip.register[0xF] !== 1) {
        works = false;
    }
    if (chip.register[0x9] !== ((0xBA + 0xCF) & 0xFF)) { //only 8 least significant bits
        works = false;
    }

    if (works) {
        console.log("Opcode 8xy4: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy4: Pass");
    }
    else {
        console.log("Opcode 8xy4: Failed");
		chip.updateHTMLLogMessage("Opcode 8xy4: Failed");
    }
    chip.updateHTML(0x89B4.toString(16));
}

function eightXY5() { //opcode 8xy5 --> SUB Vx, Vy -- set Vx = Vx - Vy, set VF = NOT borrow
    let works = true;
    chip.register[0] = 0xFF;
    chip.register[0xE] = 0x5A;
    chip.oneCycle(0x80E5);
    if (chip.register[0xF] !== 0x1) {
        works = false;
    }
    if (chip.register[0] !== 0xFF - 0x5A) {
        works = false;
    }
    if (works) {
        console.log("Opcode 8xy5: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy5: Pass");
    }
    else {
        console.log("Opcode 8xy5: Failed");
		chip.updateHTMLLogMessage("Opcode 8xy5: Failed");
    }
    chip.updateHTML(0x80E5.toString(16));
}

function eightXY6() { //opcode 8xy6 --> SHR Vx {, Vy} -- set Vx = Vx SHR 1 => if the least-sig bit of Vx is 1,
    let works = true;
    chip.register[0x8] = 0x97; //in binary: 1001 0111
    chip.oneCycle(0x8806);
    if (chip.register[0xF] !== 1) {
        works = false;
    }
    if (chip.register[0x8] !== 0x97/2) {
        works = false;
    }
    if (works) {
        console.log("Opcode 8xy6: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy6: Pass");
    }
    else {
        console.log("Opcode 8xy6: Failed");
		chip.updateHTMLLogMessage("Opcode 8xy6: Failed");
    }
    chip.updateHTML(0x8806.toString(16));
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
		chip.updateHTMLLogMessage("Opcode 8xy7: Failed");
    }
    else {
        console.log("Opcode 8xy7: Pass");
		chip.updateHTMLLogMessage("Opcode 8xy7: Pass");
    }
    chip.updateHTML(0x8567.toString(16));
}

function eightXYE() { //opcode 8xyE --> SHL Vx, {, Vy} -- set Vx = Vx SHL 1
    let works = true;
    chip.register[3] = 0x82; //in binary: 1000 0010
    chip.oneCycle(0x830E);
    if (chip.register[0xF] !== 0x1) {
        works = false;
    }
    if (chip.register[0x3] !== 0x82 * 2) {
        works = false;
    }
    if (works) {
        console.log("Opcode 8xyE: Pass");
		chip.updateHTMLLogMessage("Opcode 8xyE: Pass");
    }
    else {
        console.log("Opcode 8xyE: Failed");
		chip.updateHTMLLogMessage("Opcode 8xyE: Failed");
    }
    chip.updateHTML(0x830E.toString(16));
}

function CXKK() {
    let works = false;
    chip.oneCycle(0xC1FF);
    chip.updateHTML(0xC1FF.toString(16));
    chip.oneCycle(0xC2FF);
    chip.updateHTML(0xC2FF.toString(16));
    chip.oneCycle(0xC3FF);
    chip.updateHTML(0xC3FF.toString(16));
    chip.oneCycle(0xC4FF);
    chip.updateHTML(0xC4FF.toString(16));
    if (chip.register[1] !== chip.register[2] || chip.register[1] !== chip.register[3] ||
        chip.register[1] !== chip.register[4] || chip.register[2] !== chip.register[3] ||
        chip.register[2] !== chip.register[4] || chip.register[3] !== chip.register[4]) {
        works = true; //at least one of these is different 1 in 256^4 chance they are all the same & opcode works
    }
    if (works) {
        console.log("Opcode Cxkk: Pass");
		chip.updateHTMLLogMessage("Opcode Cxkk: Pass");
    }
    else {
        console.log("Opcode Cxkk: Failed");
		chip.updateHTMLLogMessage("Opcode Cxkk: Failed");
    }
}

function DXYN(){  //opcode Dxyn --> DRW Vx, Vy, nibble --> Display n-sprite starting at mem loc I at (Vx, Vy), set VF = collision
	chip.reset();
    let works = true;
	chip.oneCycle(0x6201); //sets V2 to 1 (for the first x)
	chip.oneCycle(0x6304); //sets V3 to 4 (for the first y)
	chip.oneCycle(0x6404); //sets V4 to 4 (for second x)
	chip.oneCycle(0x6508); //sets V5 to 8 (so the top left pixel will intercept on zeros)
	chip.oneCycle(0xd235); //draws a 0 a little below top left corner
	chip.oneCycle(0xd455); //draws a 0 below and to the right
    chip.updateHTML(0xD455.toString(16));
	chip.updateDisplay();
	if (chip.register[0xF] === 0){
		works = false;
	}
	if (!works) {
        console.log("Opcode Dxyn: Collision Flag Failed");
		chip.updateHTMLLogMessage("Opcode Dxyn: Collision Flag Failed");
    }
    else {
        console.log("Opcode Dxyn: Pass");
		chip.updateHTMLLogMessage("Opcode Dxyn: Pass");
    }
}

function EX9E() {
    //EX9E     Skip next instruction if key VX pressed 
    let works = true;

   // V[X] == key pressed for all keys
   for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xE09E; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;

        let pc = chip.programCounter;
        chip.register[i] = i; //register 1 = key pressed
        chip.keyState[i] = 1;

        chip.oneCycle(opcode);
        if (chip.programCounter !== pc + 2) {
            works = false;
        }

        chip.reset();

        //V[X] != key pressed for all keys 

        pc = chip.programCounter;
        chip.register[i] = i; //register 1 = key pressed
        chip.keyState[i] = 0;

        chip.oneCycle(opcode);

        if (chip.programCounter !== pc) {
            works = false;
        }
        chip.updateHTML(opcode.toString(16));
    }

    if (!works) {
        console.log("Opcode Ex9E: Failed");
		chip.updateHTMLLogMessage("Opcode Ex9E: Failed");
    }
    else {
        console.log("Opcode Ex9E: Pass");
		chip.updateHTMLLogMessage("Opcode Ex9E: Pass");
    }
}

function EXA1(){
    //EXA1     Skip next instruction if key VX not pressed 
    let works = true;
   // V[X] == key pressed for all keys
   for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xE0A1; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;

        let pc = chip.programCounter;
        chip.register[i] = i; //register 1 = key pressed
        chip.keyState[i] = 1;

        chip.oneCycle(opcode);

        if (chip.programCounter !== pc ) {
            works = false;
        }
        
        chip.reset();

        //V[X] != key pressed for all keys 

        pc = chip.programCounter;
        chip.register[i] = i; //register 1 = key pressed
        chip.keyState[i] = 0;

        chip.oneCycle(opcode);

        if (chip.programCounter !== pc + 2) {
            works = false;
        }
        chip.updateHTML(opcode.toString(16));
    }

    if (!works) {
        console.log("Opcode ExA1: Failed");
		chip.updateHTMLLogMessage("Opcode ExA1: Failed");
    }
    else {
        console.log("Opcode ExA1: Pass");
		chip.updateHTMLLogMessage("Opcode ExA1: Pass");
    }
}

function FX07() {
    //VX := delay_timer 

    //get a random register
    //assign the register with a random number
    //take that random number, put into delay timer
    //check that it counted to zero 
    // if it didn't go to zero then it is false
    let works = true;
    for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xF007; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;
        var rand = Math.floor((Math.random() * 1000) + 1);
        chip.delayTimer = rand;
        chip.oneCycle(opcode);
        if (chip.register[i] !== chip.delayTimer) {
            works = false;
        }
        if (chip.delayTimer !== 0) {
            setInterval(function(){ chip.startDelayTimer();}, 1000);
        }
        chip.updateHTML(opcode.toString(16));
    }
    if (!works) {
        console.log("Opcode Fx07: Failed");
		chip.updateHTMLLogMessage("Opcode Fx07: Failed");
    }
    else {
        console.log("Opcode Fx07: Pass");
		chip.updateHTMLLogMessage("Opcode Fx07: Pass");
    }
}

function FX18() {
    //FX18      sound_timer := VX 
    //get a random register
    //assign the register with a random number
    //take that random number, put into delay timer
    //check that it counted to zero 
    // if it didn't go to zero then it is false

    let works = true;
   //for (let i = 0x00; i <= 0x03; i++){
        let i = 0x00;
        let p1 = 0xF018; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;

        var rand = Math.floor((Math.random() * 1000) + 1);
        chip.register[i] = rand;
        chip.soundTimer = chip.register[i];

        chip.oneCycle(opcode);
        chip.updateHTML(opcode.toString(16));

        if (chip.soundTimer !== chip.register[i]) {
            works = false;
        }
        if (chip.soundTimer !== 0) {
            var run = setInterval(function(){ 
                chip.startSoundTimer();
                if (chip.soundTimer === 0) {
                    clearInterval(run);
                }
            }, 1000);

        } 
    //}
    if (!works) {
        console.log("Opcode Fx18: Failed");
		chip.updateHTMLLogMessage("Opcode Fx18: Failed");
    }
    else {
        console.log("Opcode Fx18: Pass");
		chip.updateHTMLLogMessage("Opcode Fx18: Pass");
    }
}
    
function FX15(){
    //FX15      delay_timer := VX
    //assign delay timer a random value
    // put the value into Vx
    // check if value = delay timer
        //VX := delay_timer 
    let works = true;

    for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xF015; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;

        var rand = Math.floor((Math.random() * 1000) + 1);
        chip.delayTimer = rand;
        chip.register[i] = chip.delayTimer;

        chip.oneCycle(opcode);
        chip.updateHTML(opcode.toString(16));

        if(chip.register[i] !== chip.delayTimer){
            works = false;
        }   
   }
    if (!works) {
        console.log("Opcode Fx15: Failed");
		chip.updateHTMLLogMessage("Opcode Fx15: Failed");
    }
    else {
        console.log("Opcode Fx15: Pass");
		chip.updateHTMLLogMessage("Opcode Fx15: Pass");
    }
}

function FX1E () { //opcode 0xFx1E --> ADD I, Vx -- set I = I + Vx
    let works = true;
    chip.indexRegister = 0x15;
    chip.register[0x8] = 0x05;
    chip.oneCycle(0xF81E);
    if (chip.indexRegister !== (0x15 + 0x05)) {
        works = false;
    }
    if (works) {
        console.log("Opcode Fx1E: Pass");
		chip.updateHTMLLogMessage("Opcode Fx1E: Pass");
    }
    else {
        console.log("Opcode Fx1E: Failed");
		chip.updateHTMLLogMessage("Opcode Fx1E: Failed");
    }
    chip.updateHTML(0xF81E.toString(16));
}

function FX29 () { //opcode 0xFx29 --> LD F, Vx -- set I = location of sprite for digit Vx
    let works = true;
    for (let i = 0; i < 16; i++) {  //loop through each sprite
        let opcode = 0xF029;
        chip.register[0] = i;
        chip.oneCycle(opcode);
        if (chip.indexRegister !== (i * 5)) {
            works = false;
        }
    }
    if (works) {
        console.log("Opcode Fx29: Pass");
		chip.updateHTMLLogMessage("Opcode Fx29: Pass");
    }
    else {
        console.log("Opcode Fx29: Failed");
		chip.updateHTMLLogMessage("Opcode Fx29: Failed");
    }
    chip.updateHTML(0xF029.toString(16));
}

function FX33 () { //opcode 0xFx33 --> LD B, Vx -- store BCD representation of Vx in memory locations I, I+1 & I + 2
    let works = true;
    chip.indexRegister = 0x300;
    chip.register[0xA] = 0xAF; //decimal: 175
    chip.oneCycle(0xFA33);
    let tempVar = chip.memory[0x300] * 100 + chip.memory[0x301] * 10 + chip.memory[0x302];
    if (tempVar !== 0xAF) {
        works = false;
    }
    if (chip.memory[0x300] * 100 !== 100 || chip.memory[0x301] * 10 !== 70 || chip.memory[0x302] !== 5) {
        works = false;
    }
    if (works) {
        console.log("Opcode Fx33: Pass");
		chip.updateHTMLLogMessage("Opcode Fx33: Pass");
    }
    else {
        console.log("Opcode Fx33: Failed");
		chip.updateHTMLLogMessage("Opcode Fx33: Failed");
    }
    chip.updateHTML(0xFA33.toString(16));
}

function ANNN () { //opcode Annn --> LD I, addr -- set this.register I = nnn
    let opcode = 0xA123; // 0xA123 >> 12 = 0xA
    chip.oneCycle(opcode);
    let tmp = chip.indexRegister;
    if (tmp=== 0x0123) {
        console.log("Opcode ANNN: Pass");
		chip.updateHTMLLogMessage("Opcode ANNN: Pass");
    }
    else {
        console.log("Opcode ANNN: Failed");
		chip.updateHTMLLogMessage("Opcode ANNN: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function BNNN () { //opcode Bnnn --> JP V0, addr -- jump to location nnn + V0
    chip.register[0] = 0x01;
    let opcode = 0xB001;
    chip.oneCycle(opcode);
    if (chip.programCounter === 0x0002) { 
        console.log("Opcode BNNN: Pass");
		chip.updateHTMLLogMessage("Opcode BNNN: Pass");
    }
    else {
        console.log("Opcode BNNN: Failed");
		chip.updateHTMLLogMessage("Opcode BNNN: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function eightXY0(){ //opcode 8xy0 --> LD Vx, Vy -- set Vx = Vy
    chip.register[1] = 1;
    chip.register[2] = 2;
    let vy = 2;
    let opcode = 0x8120;
    chip.oneCycle(opcode);
    if (chip.register[1] === vy) { 
        console.log("Opcode 8XY0: Pass");
		chip.updateHTMLLogMessage("Opcode 8XY0: Pass");
    }
    else {
        console.log("Opcode 8XY0: Failed");
		chip.updateHTMLLogMessage("Opcode 8XY0: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function  nineXY0(){//opcode 9xy0 --> SNE Vx, Vy -- skip next instruction if Vx != Vy
    let works = true;
    let opcode = 0x9120;
    chip.register[1] = 0;
    chip.register[2] = 1;
    chip.programCounter = 0;
    chip.oneCycle(opcode);
    chip.updateHTML(opcode.toString(16));
    if (chip.programCounter !== 2) {
        works = false;
    }
    chip.register[1] = 1;
    chip.register[2] = 1;
    chip.programCounter = 0;
    chip.oneCycle(opcode);
    if (chip.programCounter !== 0) {
        console.log("Opcode 9xy0: Pass");
		chip.updateHTMLLogMessage("Opcode 9xy0: Pass");
        works = false;
    }
    if (works) {
        console.log("Opcode 9xy0: Pass");
		chip.updateHTMLLogMessage("Opcode 9xy0: Pass");
    }
    else {
        console.log("Opcode 9xy0: Failed");
		chip.updateHTMLLogMessage("Opcode 9xy0: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function FX55(){//opcode 0xFx55 --> LD [I], Vx -- Store registers V0 through Vx in memory starting at I
    let works = true;
    let opcode = 0xF355;
    chip.indexRegister = 5;
    chip.register[0x0] = 0x00;
    chip.register[0x1] = 0x10;

    chip.oneCycle(opcode);
    if (chip.memory[0x0 + chip.indexRegister] !== 0x00) {
        works = false;
    }
    if (chip.memory[0x1 + chip.indexRegister] !== 0x10) {
        works = false;
    }
    if (works) {
        console.log("Opcode Fx55: Pass");
		chip.updateHTMLLogMessage("Opcode Fx55: Pass");
    }
    else {
        console.log("Opcode Fx55: Failed");
		chip.updateHTMLLogMessage("Opcode Fx55: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function FX65(){ //opcode 0xFx65 --> LD Vx, [I] -- Read registers V0 through Vx from memory starting at I
    let works = true;
    let opcode = 0xF365;
    chip.indexRegister = 5;
    chip.memory[chip.indexRegister + 0x0] = 0x00;
    chip.memory[chip.indexRegister + 0x1] = 0x10;

    chip.oneCycle(opcode);
    
    if (chip.register[0x0] !== 0x00) {
        works = false;
    }
    if (chip.register[0x1] !== 0x10) {
        works = false;
    }
    if (works) {
        console.log("Opcode Fx65: Pass");
		chip.updateHTMLLogMessage("Opcode Fx65: Pass");
    }
    else {
        console.log("Opcode Fx65: Failed");
		chip.updateHTMLLogMessage("Opcode Fx65: Failed");
    }
    chip.updateHTML(opcode.toString(16));
}

function FX0A() {
    //FX0A  wait for keypress, store hex value of key in VX 
    //Purpose: checks if onecycle will keep the same program counter if a key is not pressed.
    //and if a key is pressed, the program counter will change. 
    chip.reset();

    var intervalCount = 0;
    var tempPC = chip.programCounter + 2;

    program = [0xF1, 0x0A, 0xF2, 0x07,];
    chip.loadProgram(program); //loads Array: program into memory
    chip.progLength = program.length;
    chip.logCount = 0;


    runEmulator = setInterval(function() {
        
        // simulate runEmulator
        let opcode = chip.memory[chip.programCounter] << 8 | chip.memory[chip.programCounter + 1]; //From reference 1
        chip.programCounter += 2;

        //onecycle
        chip.oneCycle(opcode);
        chip.updateHTML(opcode.toString(16));

        //Simulate Keypress -> on the second interval, pc should increase.
        if (intervalCount === 1) {
            chip.keyState[1] = 1;
            chip.waitKey = 1; 
            chip.register[1] = 1;
            chip.waitForKeyFlag = false;
        }

        //-2 if key == true
        if (chip.waitForKeyFlag === true) {
            chip.programCounter -= 2; //re-run same opcode if key is not pressed (& wait for key = true)
        }

        //if tpc -2 != pc -> problem, only for interval 0 
        if (intervalCount === 0 && tempPC - 2 !== chip.programCounter) {
            console.log("Opcode Fx0A: Failed");
			chip.updateHTMLLogMessage("Opcode Fx0A: Failed");
            clearInterval(runEmulator);
        }
        //if tpc != pc -> problem, only for interval 1 since key has been pressed 
        if (intervalCount === 1 && tempPC !== chip.programCounter) {
            console.log("Opcode Fx0A: Failed");
			chip.updateHTMLLogMessage("Opcode Fx0A: Failed");
            clearInterval(runEmulator);
        }
        
        if (intervalCount === 1 && tempPC === chip.programCounter) {
            console.log("Opcode Fx0A: Pass");
			chip.updateHTMLLogMessage("Opcode Fx0A: Pass");

            clearInterval(runEmulator);
        }

        if (intervalCount > 1) {
            console.log("Opcode Fx0A: Failed");
			chip.updateHTMLLogMessage("Opcode Fx0A: Failed");
            clearInterval(runEmulator);
        }

        intervalCount++;
    }, 1);
}






















