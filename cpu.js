var opcode = 0x0000;
var memory = new Array(4096);
var register = new Array(16);
var indexRegister = 0x00;
var programCounter = 0x00;
var reg1 = 0x00;
var reg2 = 0x00;
var tempVal = 0x0;

//Screen is 64 by 32, array holds pixel states 0 (off) or 1 (on)
var graphics = new Array(64*32);
var delayTimer = 0;
var soundTimer = 0; //system makes a buzz when timer reaches 0

var stack = new Array(16);
var stackPointer = 0x00;

var keypad = new Array(16); //(0x0-0xF)

var font = [ //draws sprite (8x5
    0xF0, 0x90, 0x90, 0x90, 0xF0, //sprite: 0, index 0
    0x20, 0x60, 0x20, 0x20, 0x70, //sprite: 1, index 5
    0xF0, 0x10, 0xF0, 0x80, 0xF0, //sprite: 2, index 10
    0xF0, 0x10, 0xF0, 0x10, 0xF0, //sprite: 3, index 15
    0x90, 0x90, 0xF0, 0x10, 0x10, //sprite: 4, index 20
    0xF0, 0x80, 0xF0, 0x10, 0xF0, //sprite: 5, index 25
    0xF0, 0x80, 0xF0, 0x90, 0xF0, //sprite: 6, index 30
    0xF0, 0x10, 0x20, 0x40, 0x40, //sprite: 7, index 35
    0xF0, 0x90, 0xF0, 0x90, 0xF0, //sprite: 8, index 40
    0xF0, 0x90, 0xF0, 0x10, 0xF0, //sprite: 9, index 45
    0xF0, 0x90, 0xF0, 0x90, 0x90, //sprite: A, index 50
    0xE0, 0x90, 0xE0, 0x90, 0xE0, //sprite: B, index 55
    0xF0, 0x80, 0x80, 0x80, 0xF0, //sprite: C, index 60
    0xE0, 0x90, 0x90, 0x90, 0xE0, //sprite: D, index 65
    0xF0, 0x80, 0xF0, 0x80, 0xF0, //sprite: E, index 70
    0xF0, 0x80, 0xF0, 0x80, 0x80, //sprite: F, index 75
            ];

//emulation cycle
function initializeCPU() {
    //initialize registers and memory once
    programCounter = 0x200; //Chip8 expects programs to be loaded at 0x200
    stackPointer = 0; //stack starts at 0
    opcode = 0; //current opcode is 0
    indexRegister = 0;
    memory[0x200] = 0x82;                                           //rem
    memory[0x201] = 0x64;                                           //rem
    register[2] = 0xDD;                                              //rem
    register[6] = 0xDE;                                              //rem

    for (i = 0; i < graphics.length; i++) {
        graphics[i] = 1;
    }

    //load font set into memory
}

//gets called every cycle
function oneCycle() {
    //fetch OpCode
        //read in 2 bytes from the memory at PC and PC+1
        //combine both bytes into one, something like: opcode = memory[PC] << 8 | memory[PC+1]
        //opcode = memory[programCounter];
    opcode = memory[programCounter] << 8 | memory[programCounter + 1]; //combines PC and PC+1 into a single OpCode
    //Decode OpCode
        //build large switch statement for all the opcodes
    //Execute OpCode
        //perform the actual action..
    /*
        switch (opcode) {
            case 0x00E0: //CLS -- Clear the display. // works
                for (i = 0; i < graphics.length; i++) {
                graphics[i] = 0;
            }
            break;
            case 0x00EE: // RET -- sets the program counter to the address at the top of the stack, then subtracts 1 from the stack pointer.
                    programCounter = stack[stackPointer];
                    stackPointer--;
        }
        */
    switch (opcode >> 12) {
        case 0x0: //opcodes that start with 0
            if ((opcode & 0x0FFF) === 0x0E0) { //opcode 0x00E0 --> CLS -- Clear the display // works
                for (i = 0; i < graphics.length; i++) {
                    graphics[i] = 0;
                }
            }
            else if ((opcode & 0x0FFF) === 0x00EE) { //opcode 0x00EE --> RET
                programCounter = stack[stackPointer]; //sets the program counter to the address at the top of the stack
                stackPointer--;//then substracts 1 from the stack pointer
            }
            break;
        case 0x1: //opcode 0x1nnn --> JMP addr -- jump to location nnn
            tempVal = opcode & 0x0FFF;
            programCounter = value; //sets program counter to address nnn
            break;
        case 0x2: //opcode 0x2nnn --> Call addr -- call subroutine at address nnn
            stackPointer++; //increment stack pointer
            stack[stackPointer] = programCounter;
            programCounter = opcode & 0x0FFF;
            console.log("nnn = " + programCounter);
            break;
        case 0x3: //opcode 0x3xkk --> SE Vx, byte -- if register Vx == kk, skip next instruction (PC + 2)
            reg1= opcode & 0x0F00;
            reg1 = reg1 >> 8; //register number = x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            if (register[reg1] === tempVal) { //skips next instruction if register Vx == kk
               programCounter += 2;
            }
            break;
        case 0x4: //opcode 0x3xkk --> SNE Vx, byte -- if register Vx != kk, skip next instruction (PC + 2)
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //register number =  x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            if (register[reg1] !== tempVal) { //skips next instruction if register Vx != kk
                console.log("skips next instruction !=");
                programCounter += 2;
            }
            break;
        case 0x5: //opcode 0x5xy0 --> SE Vx, Vy -- if register Vx & Vy are equal, skip next instruction
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; // reg1 = x
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; // reg2 = y
            if (register[reg1] === register[reg2]) {
                console.log("Skips cause regs are equal");
                programCounter += 2;
            }
            break;
        case 0x6: //opcode 0x6xkk --> LD Vx, byte -- place value kk into register Vx
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            tempVal = opcode & 0x00FF;
            register[reg1] = tempVal;
            console.log("reg1: " + register[reg1]);
            break;
        case 0x7: //opcode 0x7xkk --> ADD Vx, byte -- add value kk to Vx and place in Vx
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            tempVal = opcode & 0x00FF;
            tempVal = tempVal + register[reg1];
            register[reg1] = tempVal;
            console.log("reg1: " + register[reg1]);
            break;
        case 0x8: //opcodes 8xy0 through 8xyE
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            switch (opcode & 0x000F) {
                case 0x0: //opcode 8xy0 --> LD Vx, Vy -- set Vx = Vy
                    register[reg1] = register[reg2];
                    break;
                case 0x1: //opcode 8xy1 --> OR Vx, Vy -- set Vx = Vx OR Vy (bitwise OR operation)
                    register[reg1] = register[reg1] | register[reg2];
                    break;
                case 0x2: //opcode 8xy2 --> AND Vx, Vy -- set Vx = Vx and Vy
                    register[reg1] = register[reg1] & register[reg2];
                    break;
                case 0x3: //opcode 8xy3 --> XOR Vx, Vy -- set Vx = Vx XOR Vy
                    register[reg1] = register[reg1] ^ register[reg2];
                    break;
                case 0x4: //opcode 8xy4 --> ADD Vx, Vy -- set Vx = Vx + Vy, set VF = carry
                    tempVal = register[reg1] + register[reg2];
                    if (tempVal > 255) {
                        register[0xF] = 1;
                        tempVal = tempVal & 0x0FF;
                    }
                    register[reg1] = tempVal;
                    break;
                case 0x5: //opcode 8xy5 --> SUB Vx, Vy -- set Vx = Vx - Vy, set VF = NOT borrow
                    if (register[reg1] > register[reg2]) {
                        register[0xF] = 1;
                    } else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] - register[reg2];
                    break;
                case 0x6: //opcode 8xy6 --> SHR Vx {, Vy} -- set Vx = Vx SHR 1 => if the least-sig bit of Vx is 1,
                    // set VF to 1, otherwise 0. the Vx is divided by 2
                    tempVal = register[reg1] & 0x01; //only keep the least significant bit
                    if (tempVal === 0x1) {
                        register[0xF] = 1;
                    } else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] / 2; //shift to the right by 1
                    break;
                case 0x7: //opcode 8xy7 --> SUBN Vx, Vy -- set Vx = Vy - Vx, set VF = Not borrow
                    if (register[reg2] > register[reg1]) {
                        register[0xF] = 1;
                    } else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg2] - register[reg1];
                    break;
                case 0xE: //opcode 8xyE --> SHL Vx, {, Vy} -- set Vx = Vx SHL 1
                    tempVal = register[reg1] & 0x80;
                    tempVal = tempVal >> 15; //tempVal = most sig bit
                    if (tempVal === 0x1) {
                        register[0xF] = 1;
                    } else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] * 2; //shift to the left by 1
                    break;
            }
            break;
        case 0x9: //opcode 9xy0 --> SNE Vx, Vy -- skip next instruction if Vx != Vy
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            if (register[reg1] !== register[reg2]) {
                programCounter += 2;
            }
            break;
        case 0xA: //opcode Annn --> LD I, addr -- set register I = nnn
            tempVal = opcode & 0x0FFF;
            indexRegister = tempVal;
            break;
        case 0xB: //opcode Bnnn --> JP V0, addr -- jump to location nnn + V0
            tempVal = opcode & 0x0FFF;
            tempVal += register[0x0];
            programCounter = tempVal;
            break;
        case 0xC: //opcode Cxkk --> RND Vx, byte -- set Vx = random byte (0 to 255) AND kk
            tempVal = Math.random() * (255);
            tempVal = Math.floor(tempVal);
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            tempVal = tempVal & (opcode & 0x00FF); //random & kk
            register[reg1] = tempVal;
            break;
        case 0xD: //opcode Dxyn --> DRW Vx, Vy, nibble --> Display n-sprite starting at mem loc I at (Vx, Vy), set VF = collision
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //x coordinate
            var xCoord = register[reg1];
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //y coordinate
            var yCoord = register[reg2];
            tempVal = opcode & 0x000F; //n
            register[0xF] = 0; //set VF to 0 initially

            //read in 1 byte from memory at a time
            for (i = 0; i < tempVal; i++) { //loop through each memory location (every loop is one row (y axis))
                var currIndex = indexRegister + i;
                var currByte = memory[currIndex]; //load in current memory location
                var currYCoord = yCoord + i;
                for (j = 0; j < 8; j++) { //loop through each bit and properly adjust graphics array
                    var currXCoord = xCoord + j;
                    //wrap around if necessary
                    if (currYCoord < 0) {
                        currYCoord = currYCoord + 64; //wraps to bottom
                    }
                    else if (currYCoord > 63) {
                        currYCoord = currYCoord - 64; //wraps to top
                    }
                    if (currXCoord < 0) {
                        currXCoord = currXCoord + 32; //wraps to the right
                    }
                    else if (currXCoord > 31) {
                        currXCoord = currXCoord - 32; //wraps to the left
                    }
                    var currPixel = graphics[currXCoord  * currYCoord]; //index of graphics array
                    graphics[currXCoord * currYCoord] ^= ((currByte >>> (7-j)) & 0x01); //should only keep 1 bit (from left to right)
                    if (currPixel === 1 && graphics[currXCoord * currYCoord] === 0) {
                        register[0xF] = 1; //if a pixel is flipped from 1 to 0, set VF to 1 (collision)
                    }
                }
            }
            break;
        

    }


        console.log(opcode);
        console.log(opcode & 0x0FFF); //removes the first digit in a 0xFFFF hex number
        console.log(graphics[10]);

    //update timers
        //update the delay and sound timers.
}

