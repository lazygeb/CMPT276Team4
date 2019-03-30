/*
 * Turns Chip8 opcodes into Group 4's instruction language.
 *
 * Notes:
 *  - Sprites: Since a sprite is in the same format as an opcode, it is entirely possible that
 *             a sprite can be interpreted as a valid opcode. The dissembler will assume any valid,
 *             (between 0x0000 and 0xFFFF) opcode that is not recognized as an operation is a sprite.
 *             If a sprite also happens to be an operations supported by chip8, it will interperate it
 *             as that instruction. It is up to the user to decide what is/isn't a sprite after the instruction
 *             file is generated.
 */

function dissemblerMain(lines) {
    try {
        let mnemonics = [];
        let memLoc = 0;
        console.log("dissembler");
        lines.forEach(function(line) {
            line = line.trim();
            let tokens = line.split(" "); //split every space (ignores multiple spaces in a row)
            //int opcode = getInstruction(tokens);
            //let opcode = getMnemonic(tokens);
            console.log(tokens.toString());
            tokens.forEach(function(token) {
                let instruction = getMnemonic(parseInt(token, 16), memLoc);
                memLoc += 2;
                console.log(instruction);
                mnemonics.push(instruction);
            });
        });

        console.log(mnemonics.toString());

        writeMnemonics(mnemonics);
    }
    catch (e){
        alert(e);
    }
}

function writeMnemonics(opcodes) {
    //write opcodes to file

    //let iterator = 1;
    let fileWriter = "";
    opcodes.forEach(function(opcode) {
        fileWriter += opcode;
        fileWriter += "\n";
        //iterator++;
        //console.log(fileWriter);
    });

    console.log(fileWriter);
    document.getElementById("submitFile").addEventListener("click", function(){
        download("assemblyProgram.txt",fileWriter);
    });
}

function getMnemonic(opcode, memLoc) {
    if (opcode < 0 || opcode > 0xFFFF) {
        throw "Invalid opcode: " + opcode.toString(16);
    }
    let instruction;
    let reg1 = 0x00;
    let reg2 = 0x00;
    let tempVal = 0x00;
    switch (opcode >>> 12) { //first digit of opcode
        default:
            instruction = "SPRITE " + opcode.toString(16);
            break;
        case 0x0: //opcodes that start with 0
            if ((opcode & 0x0FFF) === 0x0E0) { //opcode 0x00E0 --> CLS
                instruction = "CLS           ";
            }
            else if ((opcode & 0x0FFF) === 0x00EE) { //opcode 0x00EE --> RET
                instruction = "RET           ";
            }
            else {
                tempVal = opcode & 0xFFF;
                instruction = "SYS " + tempVal.toString(16) + "       ";
            }
            break;

        case 0x1: //opcode 0x1nnn --> JMP addr
            tempVal = opcode & 0x0FFF;
            instruction = "JP " + tempVal.toString(16) + "        ";
            break;

        case 0x2: //opcode 0x2nnn --> Call addr
            tempVal = opcode & 0x0FFF;
            instruction = "CALL " + tempVal.toString(16) + "      ";
            break;

        case 0x3: //opcode 0x3xkk --> SE Vx, byte
            reg1= opcode & 0x0F00;
            reg1 = reg1 >> 8; //this.register number = x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            instruction = "SE V" + reg1.toString(16) + " " + tempVal.toString(16) + "      ";
            break;
        case 0x4: //opcode 0x4xkk --> SNE Vx, byte
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //register number =  x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            instruction = "SNE V" + reg1.toString(16) + " " + tempVal.toString(16) + "     ";
            break;

        case 0x5: //opcode 0x5xy0 --> SE Vx, Vy
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; // reg1 = x
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; // reg2 = y
            instruction = "SE V" + reg1.toString(16) + " V" + reg2.toString(16) + "      ";
            break;

        case 0x6: //opcode 0x6xkk --> LD Vx, byte
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            tempVal = opcode & 0x00FF;
            instruction = "LD V" + reg1.toString(16) + " " + tempVal.toString(16) + "      ";
            break;

        case 0x7: //opcode 0x7xkk --> ADD Vx, byte
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            instruction = "ADD V" + reg1.toString(16) + " " + (opcode & 0x00FF).toString(16) + "     ";
            break;

        case 0x8: //opcodes 8xy0 through 8xyE
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            switch (opcode & 0x000F) {
                case 0x0: //opcode 8xy0 --> LD Vx, Vy
                    instruction = "LD V" + reg1.toString(16) + " V" + reg2.toString(16) + "      ";
                    break;
                case 0x1: //opcode 8xy1 --> OR Vx, Vy
                    instruction = "OR V" + reg1.toString(16) + " V" + reg2.toString(16) + "      ";
                    break;
                case 0x2: //opcode 8xy2 --> AND Vx, Vy
                    instruction = "AND V" + reg1.toString(16) + " V" + reg2.toString(16) + "     ";
                    break;
                case 0x3: //opcode 8xy3 --> XOR Vx, Vy
                    instruction = "XOR V" + reg1.toString(16) + " V" + reg2.toString(16) + "     ";
                    break;
                case 0x4: //opcode 8xy4 --> ADD Vx, Vy
                    instruction = "ADD V" + reg1.toString(16) + " V" + reg2.toString(16) + "     ";
                    break;
                case 0x5: //opcode 8xy5 --> SUB Vx, Vy
                    instruction = "SUB V" + reg1.toString(16) + " V" + reg2.toString(16) + "     ";
                    break;
                case 0x6: //opcode 8xy6 --> SHR Vx {, Vy}
                    instruction = "SHR V" + reg1.toString(16) + "        " ;
                    break;
                case 0x7: //opcode 8xy7 --> SUBN Vx, Vy
                    instruction = "SUBN V" + reg1.toString(16) + " V" + reg2.toString(16) + "    ";
                    break;
                case 0xE: //opcode 8xyE --> SHL Vx, {, Vy}
                    instruction = "SHL V" + reg1.toString(16) + "        ";
                    break;
            }
            break;
        case 0x9: //opcode 9xy0 --> SNE Vx, Vy
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            instruction = "SNE V" + reg1.toString(16) + " V" + reg2.toString(16) + "     ";
            break;
        case 0xA: //opcode Annn --> LD I, addr
            tempVal = opcode & 0x0FFF;
            instruction = "LD " + tempVal.toString(16) + "        ";
            break;
        case 0xB: //opcode Bnnn --> JP V0, addr
            tempVal = opcode & 0x0FFF;
            instruction = "JP V0 " + tempVal.toString(16) + "     ";
            break;
        case 0xC: //opcode Cxkk --> RND Vx, byte
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            tempVal = opcode & 0x00FF; //random & kk
            instruction = "RAND V" + reg1.toString(16) + " " + tempVal.toString(16) + "    ";
            break;
        case 0xD: //opcode Dxyn --> DRW Vx, Vy, nibble
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //x coordinate
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //y coordinate
            tempVal = opcode & 0x000F; //n
            instruction = "DRAW V" + reg1.toString(16) + " V" + reg2.toString(16) + " "
                + tempVal.toString(16) + "  ";
            break;
        case 0xE:
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >>> 8;
            switch(opcode & 0x00FF) {
                case 0x9E: // opcode Ex9E --> SKP Vx
                    instruction = "SKP V" + reg1.toString(16) + "        ";
                    break;
                case 0xA1: // opcode ExA1 --> SKNP Vx
                    instruction = "SKNP V" + reg1.toString(16) + "       ";
                    break;
            }
            break;
        case 0xF: //opcodes that start with F
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >>> 8;
            switch(opcode & 0x00FF) {
                case 0x07: //opcode 0xFx07 --> LD Vx, DT
                    instruction = "LD V" + reg1.toString(16) + " DT      ";
                    break;
                case 0x0A: //opcode 0xFx0A --> LD Vx, K
                    instruction = "LD V" + reg1.toString(16) + " K       ";
                    break;
                case 0x15: //opcode 0xFx15 --> LD DT, Vx
                    instruction = "LD DT V" + reg1.toString(16) + "      ";
                    break;
                case 0x18: //opcode 0xFx18 --> LD ST, Vx
                    instruction = "LD ST V" + reg1.toString(16) + "      ";
                    break;
                case 0x1E: //opcode 0xFx1E --> ADD I, Vx -- set I = I + Vx
                    instruction = "ADD I V" + reg1.toString(16) + "      ";
                    break;
                case 0x29: //opcode 0xFx29 --> LD F, Vx
                    instruction = "LD F V" + reg1.toString(16) + "       ";
                    break;
                case 0x33: //opcode 0xFx33 --> LD B, Vx
                    instruction = "LD B V" + reg1.toString(16) + "       ";
                    break;
                case 0x55: //opcode 0xFx55 --> LD [I], Vx
                    instruction = "DUMP V" + reg1.toString(16) + "       ";
                    break;
                case 0x65: //opcode 0xFx65 --> LD Vx, [I]
                    instruction = "READ V" + reg1.toString(16) + "       ";
                    break;
            }
            break;
    }
    if (instruction === undefined) {
        instruction = "SPRITE " + opcode.toString(16) + "   ";
    }

    instruction += "//mem loc: " + memLoc + "   opcode: " + opcode.toString(16);
    return instruction;
}