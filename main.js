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
initializeCPU();
oneCycle();