var opcode = 0x0000;
var memory = new Array(4096);
var register = new Array(16);
var indexRegister = 0x00;
var programCounter = 0x00;

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

    //load font set into memory
}

//gets called every cycle
function oneCycle() {
    //fetch OpCode
        //read in 2 bytes from the memory at PC and PC+1
        //combine both bytes into one, something like: opcode = memory[PC] << 8 | memory[PC+1]
    //Decode OpCode
        //build large switch statement for all the opcodes
    //Execute OpCode
        //perform the actual action..

    //update timers
        //update the delay and sound timers.
}

