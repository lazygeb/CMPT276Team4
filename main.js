/*
#include
#include //OpenGL graphics and input
#include "chip8.h" // Your cpu core implementation

chip8 myChip8;

int main(int argc, char **argv)
{
    //set up render system and register input callbacks
    setupGraphics();
    setupInput();

    //initialize the chip8 system and load the game into the memory
    myChip.initialize();
    myChip8.loadGame("pong");

    //Emulation loop
    for(;;) {
        //emulate one cycle
        myChip8.emulateCycle();

        //If the draw flag is set, update the screen
        if (myChip8.drawFlag) { //only opcodes 0x00E0 & 0xDXYN should set this flag
            drawGraphics();
        }

        myChip9.setKeys();
    }

    return 0;
 }
 */

document.getElementById("V1-Stack").innerHTML = "0x12";

function updateHTML() { //call this after every cycle
    for (let i = 0; i < this.stack.length; i++) {
        document.getElementById("V" + i + "-Stack").innerHTML = this.stack[i];
    }
    for (let i = 0; i < this.register.length; i++) {
        document.getElementById("V" + i + "-Reg").innerHTML = this.register[i];
    }
    document.getElementById("PC").innerHTML = this.programCounter;
    document.getElementById("I").innerHTML = this.indexRegister;
}

function updateDisplay() {
    //Gabe
}

function main() {

    //from here should be inside a loop
    let chip = new Chip8();
    chip.reset();
    chip.runEmulator();

      //  oneCycle();
      //  updateKeys();
      //  updateHTML();

    if (chip.drawFlag === true) {
        updateDisplay(); //draws display on HTML page
        chip.drawFlag = false;
    }
}

main();


