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
                    if (tempVal > 255){
                        register[0xF] = 1;
                        tempVal = tempVal & 0x0FF;
                    }
                    register[reg1] = tempVal;
                    break;
                case 0x5: //opcode 8xy5 --> SUB Vx, Vy -- set Vx = Vx - Vy, set VF = NOT borrow
                    if (register[reg1] > register[reg2]) {
                        register[0xF] = 1;
                    }
                    else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] - register[reg2];
                    break;
                case 0x6: //opcode 8xy6 --> SHR Vx {, Vy} -- set Vx = Vx SHR 1 => if the least-sig bit of Vx is 1,
                          // set VF to 1, otherwise 0. the Vx is divided by 2
                    tempVal = register[reg1] & 0x01; //only keep the least significant bit
                    if (tempVal === 0x1) {
                        register[0xF] = 1;
                    }
                    else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] / 2; //shift to the right by 1
                    break;
                case 0x7: //opcode 8xy7 --> SUBN Vx, Vy -- set Vx = Vy - Vx, set VF = Not borrow
                    if (register[reg2] > register[reg1]) {
                        register[0xF] = 1;
                    }
                    else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg2] - register[reg1];
                    break;
                case 0xE: //opcode 8xyE --> SHL Vx, {, Vy} -- set Vx = Vx SHL 1
                    tempVal = register[reg1] & 0x80;
                    tempVal = tempVal >> 15; //tempVal = most sig bit
                    if (tempVal === 0x1) {
                        register[0xF] = 1;
                    }
                    else {
                        register[0xF] = 0;
                    }
                    register[reg1] = register[reg1] * 2; //shift to the left by 1
                    break;
            }
    }


        console.log(opcode);
        console.log(opcode & 0x0FFF); //removes the first digit in a 0xFFFF hex number
        console.log(graphics[10]);

    //update timers
        //update the delay and sound timers.
}

