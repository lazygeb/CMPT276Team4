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
    ret();
    oneNNN();
    twoNNN();
    threeXKK();
    fourXKK();
    fiveXY0();
    sixXKK();
    sevenXKK();
    eightXY1();
    eightXY4();
    eightXY5();
    eightXY6();
    eightXYE();
    eightXY7();
    eightXY0();
    nineX0();
    ANNN();
    BNNN();
    CXKK();
	DXYN();
    EX9E();
    EXA1();
    FX07();
    FX0A();
    FX18();
    FX15();
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
    }
    else {
        console.log("Opcode 00E0: Pass");
    }
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
    }
    else {
        console.log("Opcode 00EE: Failed");
    }

}

function oneNNN() {
    let works = false;
    chip.oneCycle(0x1ABC);
    if (chip.programCounter === 0xABC) {
        works = true;
    }
    if (!works) {
        console.log("Opcode 1nnn: Failed");
    } else {
        console.log("Opcode 1nnn: Pass");
    }
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
    }
    else {
        console.log("Opcode 2nnn: Pass");
    }
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
    }
    else {
        console.log("Opcode 8xy4: Failed")
    }
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
    }
    else {
        console.log("Opcode 8xy5: Failed");
    }
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
    }
    else {
        console.log("Opcode 8xy6: Failed");
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
    }
    else {
        console.log("Opcode 8xyE: Failed");
    }
}

//function FX07(){ //opcode 0xFx07 --> LD Vx, DT -- set Vx = delay timer value
//	let works = true;
//	chip.register[5] = 0xA6;
//	chip.oneCycle(0xF507);
//	if (chip.register[5] !== chip.delayTimer){
//		works = false;
//	}
//	if (!works) {
//        console.log("Opcode Fx07: Failed");
//    }
//    else {
//        console.log("Opcode Fx07: Pass");
//    }
//}

function CXKK() {
    let works = false;
    chip.oneCycle(0xC1FF);
    chip.oneCycle(0xC2FF);
    chip.oneCycle(0xC3FF);
    chip.oneCycle(0xC4FF);
    if (chip.register[1] !== chip.register[2] || chip.register[1] !== chip.register[3] ||
        chip.register[1] !== chip.register[4] || chip.register[2] !== chip.register[3] ||
        chip.register[2] !== chip.register[4] || chip.register[3] !== chip.register[4]) {
        works = true; //at least one of these is different 1 in 256^4 chance they are all the same & opcode works
    }
    if (works) {
        console.log("Opcode Cxkk: Pass");
    }
    else {
        console.log("Opcode Cxkk: Failed");
    }
}

function DXYN(){  //opcode Dxyn --> DRW Vx, Vy, nibble --> Display n-sprite starting at mem loc I at (Vx, Vy), set VF = collision
	let works = true;
	chip.oneCycle(0x6201); //sets V2 to 1 (for the first x)
	chip.oneCycle(0x6304); //sets V3 to 4 (for the first y)
	chip.oneCycle(0x6404); //sets V4 to 4 (for second x)
	chip.oneCycle(0x6508); //sets V5 to 8 (so the top left pixel will intercept on zeros)
	chip.oneCycle(0xd235); //draws a 0 a little below top left corner
	chip.oneCycle(0xd455); //draws a 0 below and to the right
	chip.updateDisplay();
	if (chip.register[0xF] === 0){
		works = false;
	}
	if (!works) {
        console.log("Opcode Dxyn: Collision Flag Failed");
    }
    else {
        console.log("Opcode Dxyn: Pass");
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
            
    }

    if (!works) {
        console.log("Opcode Ex9E: Failed");
    }
    else {
        console.log("Opcode Ex9E: Pass");
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
    }

    if (!works) {
        console.log("Opcode ExA1: Failed");
    }
    else {
        console.log("Opcode ExA1: Pass");
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
        let p1 = 0xF018; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;
        var rand = Math.floor((Math.random() * 1000) + 1);
        chip.delayTimer = rand;
        chip.oneCycle(opcode);
        if (chip.soundTimer !== chip.register[i]) {
            works = false;
        }
        if (chip.delayTimer != 0) {
            setInterval(function(){ chip.startDelayTimer();}, 1000);
        } 
    }
    if (!works) {
        console.log("Opcode Fx07: Failed");
    }
    else {
        console.log("Opcode Fx07: Pass");
    }
}

function FX0A() {
    //FX0A  wait for keypress, store hex value of key in VX 
    let works = true;
    for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xF00A; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;
    
        //key pressed has been pressed
        // given that a key is pressed so key != undefined 
        // gets key, returns key so v[i] == keyPressed aka waitKey
        chip.waitKey = i; 
        //console.log("se   " +  chip.waitKey);
        chip.oneCycle(opcode);
        //console.log("te   " +  chip.register[i]);
        if (chip.register[i] !== i) {
            works = false;
        }
    }
        if (!works) {
            console.log("Opcode FxOA: Failed");
        }
        else {
            console.log("Opcode Fx0A: Pass");
        }

    chip.reset();

    //stored into vx
    //key not pressed 
    //keypressed runs again until rand says that key has been pressed
    //check if key = vx

    var rand = Math.floor((Math.random() * 10) + 1);
    chip.waitForKeyFlag = false;
    
    if (chip.waitForKeyFlag === false ) {
        //simulate repeating when no key is pressed
        var rep = setInterval(function() {
            chip.oneCycle(0xF10A);

            if(rand === 0){ //pretend key has been pressed
                clearInterval(rep);

                chip.waitKey = Math.floor((Math.random() * 15) + 0);
                var temp = chip.waitKey;
                
                chip.oneCycle(0xF10A);

                if (chip.register[1] !== temp) {
                    works = false;
                }
                if (!works) {
                    console.log("Opcode Fx0A: Failed");
                }
                else {
                    console.log("Opcode Fx0A: Pass");
                }
            }

            rand--; //keeps on going until rand == 0
        },10);
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
    for (let i = 0x00; i <= 0x0F; i++){
        let p1 = 0xF018; 
        let p2 = i;
        let opcode = p1 | p2 << 8 ;

        var rand = Math.floor((Math.random() * 1000) + 1);
        chip.register[i] = rand;
        chip.soundTimer = chip.register[i];

        chip.oneCycle(opcode);

        if (chip.soundTimer !== chip.register[i]) {
            works = false;
        }
        if (chip.soundTimer !== 0) {
            setInterval(function(){ chip.startSoundTimer();}, 1000);
        } 
    }
    if (!works) {
        console.log("Opcode Fx18: Failed");
    }
    else {
        console.log("Opcode Fx18: Pass");
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

        if(chip.register[i] !== chip.delayTimer){
            works = false;
        }   
   }
    if (!works) {
        console.log("Opcode Fx15: Failed");
    }
    else {
        console.log("Opcode Fx15: Pass");
    }
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
    }
    else {
        console.log("Opcode Fx29: Failed");
    }
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
    }
    else {
        console.log("Opcode Fx33: Failed");
    }
}

function ANNN () { //opcode Annn --> LD I, addr -- set this.register I = nnn
    let opcode = 0xA123; // 0xA123 >> 12 = 0xA
    chip.oneCycle(opcode);
    let tmp = chip.indexRegister;
    if (tmp=== 0x0123) {
        console.log("Opcode ANNN: Pass");
    }
    else {
        console.log("Opcode ANNN: Failed");
    }
}

function BNNN () { //opcode Bnnn --> JP V0, addr -- jump to location nnn + V0
    chip.register[0] = 0x01;
    let opcode = 0xB001;
    chip.oneCycle(opcode);
    if (chip.programCounter === 0x0002) { 
        console.log("Opcode BNNN: Pass");
    }
    else {
        console.log("Opcode BNNN: Failed");
    }
}

function eightXY0(){ //opcode 8xy0 --> LD Vx, Vy -- set Vx = Vy
    chip.register[1] = 1;
    chip.register[2] = 2;
    var vy = 2
    let opcode = 0x8120;
    chip.oneCycle(opcode)
    if (chip.register[1] === vy) { 
        console.log("Opcode eightXY0: Pass");
    }
    else {
        console.log("Opcode eightXY0: Failed");
    }
}

function  nineX0(){//opcode 9xy0 --> SNE Vx, Vy -- skip next instruction if Vx != Vy
    let opcode = 0x9120;
    chip.register[1] = 0;
    chip.register[2] = 1;
    chip.programCounter = 0
    chip.oneCycle(opcode);
    if (chip.programCounter === 2) {
        console.log("Opcode nineX0: Pass");
    }
    else {
        console.log("Opcode nineX0: Failed");
    }

    chip.register[1] = 1;
    chip.register[2] = 1;
    chip.programCounter = 0
    chip.oneCycle(opcode);
    if (chip.programCounter === 0) { 
        console.log("Opcode nineX0: Pass");
    }
    else {
        console.log("Opcode nineX0: Failed");
    }

}

function FX55(){//opcode 0xFx55 --> LD [I], Vx -- Store registers V0 through Vx in memory starting at I
    let opcode = 0xF355;
    chip.indexRegister = 5;
    chip.register[0x0] = 0x00;
    chip.register[0x1] = 0x10;

    chip.oneCycle(opcode);
    if (chip.memory[0x0 + chip.indexRegister] === 0x00) { 
        console.log("Opcode FX55: Pass");
    }
    else {
        console.log("Opcode FX55 Failed");
    }
    if (chip.memory[0x1 + chip.indexRegister] === 0x10) { 
        console.log("Opcode FX55: Pass");
    }
    else {
        console.log("Opcode FX55 Failed");
    }
}

function FX65(){ //opcode 0xFx65 --> LD Vx, [I] -- Read registers V0 through Vx from memory starting at I
    let opcode = 0xF365;
    chip.indexRegister = 5;
    chip.memory[chip.indexRegister + 0x0] = 0x00;
    chip.memory[chip.indexRegister + 0x1] = 0x10;

    chip.oneCycle(opcode);
    
    if (chip.register[0x0] === 0x00) { 
        console.log("Opcode FX65: Pass");
    }
    else {
        console.log("Opcode FX65 Failed");
    }
    if (chip.register[0x1] === 0x10) { 
        console.log("Opcode FX65: Pass");
    }
    else {
        console.log("Opcode FX65 Failed");
    }
}



opCoTest(); //calls the function in this file..





















