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

//add opcode functions 4 through 7 here

opCoTest(); //calls the function in this file..



















