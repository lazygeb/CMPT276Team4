/* Assembler for chip8, see document for more details.
 * Ask Mathieu if you have questions.
 *
 * General process:
 *  - Reads in from file (given as command line argument) line by line.
 *  - Splits line into tokens, separated at every space " "
 *  - depending on the # of tokens, calls a function to get opcode
 *  - goes through a series of if statements to find proper opcode
 *  - Outputs opcode file into "programFile.txt" located inside same folder as the Java project
 *
 * Very limited error handling, this assembler assumes you know how to use it.
 * Please see doc for instruction and proper format of assembly language.
 *
 * Functions were written to optimize readability, not necessarily efficiency.
 *
 * If the assembler does not understand the instruction you provided, the assembler will throw an error
 *
 * To test the assembler use the argument --test
 */


function assemblerMain(lines) {
    console.log("in main");
    let OP = [];
    let test = false;
    let path;
   try {
       let opcodes = [];
        lines.forEach(function(line) {
            line = line.trim();
            let tokens = line.split("\\s+"); //split every space (ignores multiple spaces in a row)
            //int opcode = getInstruction(tokens);
            hasComment = false;
            //the following loop checks for comments, it ignores anything after the //
            // for (i = 0; i < tokens.length && !hasComment; i++) {
            //     //hasComment = false;
            //     if (tokens[i].startsWith("//")) {
            //         hasComment = true;
            //         let tempTokens = new String[i];
            //         for (j = 0; j < i; j++) {
            //             tempTokens[j] = tokens[j];
            //         }
            //         tokens = tempTokens; 
            //     }
            // }
            let opcode = getInstruction(tokens);
            if (opcode == 0) {
                console.log(tokens.length);
                throw new InputMismatchException("Invalid instruction: " + line);
            }
            opcodes.push(opcode);
        });
       
       //System.out.println("\n");
       opcodes.forEach(function(i) {
           let hex = i.toString(16);
           //System.out.println(hex);
           OP.push(hex);
       });
       writeOpcodes(opcodes);
       if (test) {
           test(OP);
       }
   }
   catch (e){
        console.log(e)
    }
}

//call the right function
function getInstruction(tokens) {
    console.log("why");
    if (tokens.length < 2) {
        return oneArgOpcode(tokens[0]);
    }
    else if (tokens.length < 3) {
        return twoArgOpcode(tokens[0], tokens[1]);
    }
    else if (tokens.length < 4) {
        return threeArgOpcode(tokens[0], tokens[1], tokens[2]);
    }
    else if (tokens.length < 5) {
        return fourArgOpcode(tokens[0], tokens[1], tokens[2], tokens[3]);
    }
    return 0;
}

function opcodeCheck(instruction,mnemonic) {
    return instruction.toUpperCase() === mnemonic;
}

function oneArgOpcode(instruction) {
    console.log(instruction);
    if (opcodeCheck(instruction,"CLS")) {
        return 0x00E0;
    }
    else if (opcodeCheck(instruction,"RET")) {
        return 0x00EE;
    }
    return 0;
}

function twoArgOpcode(instruction, arg1) {
    if ( opcodeCheck(instruction,"SYS")) {
        console.log(parseInt(arg1, 16));
        return parseInt(arg1, 16); //should convert a hex string into an int number
    }
    else if (opcodeCheck(instruction,"JP")) {
        return 0x1000 + parseInt(arg1, 16); //4096 = 0x1000
    }
    else if (opcodeCheck(instruction,"CALL")) {
        return 0x2000 + parseInt(arg1, 16);
    }
    else if (opcodeCheck(instruction,"SHR")) {
        arg1 = arg1.substring(1); //remove the V from register token
        let reg1 = parseInt(arg1, 16); //string to hex number
        reg1 *= 0x100; //place reg1 in proper position (8xy6)
        return 0x8000 + reg1 + 0x0006; //put opcode together
    }
    else if (opcodeCheck(instruction,"SHL")) {
        arg1 = arg1.substring(1);
        let reg1 = parseInt(arg1, 16);
        reg1 *= 0x100;
        return 0x8000 + reg1 + 0xE;
    }
    else if (opcodeCheck(instruction,"LD")) {
        return 0xA000 + parseInt(arg1, 16);
    }
    else if (opcodeCheck(instruction,"SKP")) {
        arg1 = arg1.substring(1);
        let reg1 = parseInt(arg1, 16);
        reg1 *= 0x100;
        return 0xE000 + reg1 + 0x9E;
    }
    else if (opcodeCheck(instruction,"SKNP")) {
        arg1 = arg1.substring(1);
        let reg1 = parseInt(arg1, 16);
        reg1 *= 0x100;
        return 0xE000 + reg1 + 0xA1;
    }
    else if (opcodeCheck(instruction,"DUMP")) {
        arg1 = arg1.substring(1);
        let reg1 = parseInt(arg1, 16);
        reg1 *= 0x100;
        return 0xF000 + reg1 + 0x55;
    }
    else if (opcodeCheck(instruction,"READ")) {
        arg1 = arg1.substring(1);
        let reg1 = parseInt(arg1, 16);
        reg1 *= 0x100;
        return 0xF000 + reg1 + 0x65;
    }
    else if (opcodeCheck(instruction,"SPRITE")) {
        try {
            let sprite = parseInt(arg1, 16);
            if (arg1.length() < 4) {
                throw new IllegalArgumentException("Sprite is not length 4");
            }
            return sprite;
        }
        catch (e){
            alert(e);
            break;
        }
    }
    return 0;
}

function threeArgOpcode(instruction, arg1, arg2) {
    //get values
    let reg1 = 0;
    let reg2 = 0;
    let tempByte = 0;

    if (opcodeCheck(arg1.substring(0, 1),"V")) { //if arg1 is a register
        reg1 = parseInt(arg1.substring(1), 16);
        reg1 *= 0x100;
    }
    if (opcodeCheck(arg2.substring(0, 1),"V")) { //if arg2 is a register
        reg2 = parseInt(arg2.substring(1), 16);
        reg2 *= 0x10;
    }
    else if (!opcodeCheck(arg2,"DT") && !opcodeCheck(arg2,"ST")
                && !opcodeCheck(arg2,"K")) { //if is number
        tempByte = parseInt(arg2, 16); //if arg2 is kk
    }
    //determine proper opcode
    if (opcodeCheck(instruction,"SE")) {
        let tempArg = arg2.substring(0, 1);
        if (opcodeCheck(tempArg,"V")) {
            //5xy0
            return 0x5000 + reg1 + reg2;
        }
        else {
            //3xkk
            return 0x3000 + reg1 + tempByte;
        }
    }
    else if (opcodeCheck(instruction,"SNE")) {
        let tempArg = arg2.substring(0, 1); //is arg 2 a register?
        if (opcodeCheck(tempArg,"V")) {
            //9xy0
            return 0x9000 + reg1 + reg2;
        }
        else { //4xkk
            return 0x4000 + reg1 + tempByte;
        }

    }
    else if (opcodeCheck(instruction,"ADD")) {
        if (opcodeCheck(arg1,"I")) {
            //Fx1E
            reg2 *= 0x10; //put reg2 into x position
            return 0xF000 + reg2 + 0x1E;
        }
        else if (opcodeCheck(arg2.substring(0, 1),"V")) {
            //8xy4
            return 0x8000 + reg1 + reg2 + 0x4;
        }
        else {
            //7xkk
            return 0x7000 + reg1 + tempByte;
        }
    }
    else if (opcodeCheck(instruction,"OR")) {
        //8xy1
        return 0x8000 + reg1 + reg2 + 0x1;
    }
    else if (opcodeCheck(instruction,"AND")) {
        //8xy2
        return 0x8000 + reg1 + reg2 + 0x2;
    }
    else if (opcodeCheck(instruction,"XOR")) {
        //8xy3
        return 0x8000 + reg1 + reg2 + 0x3;
    }
    else if (opcodeCheck(instruction,"SUB")) {
        //8xy5
        return 0x8000 + reg1 + reg2 + 0x5;
    }
    else if (opcodeCheck(instruction,"SUBN")) {
        //8xy7
        return 0x8000 + reg1 + reg2 + 0x7;
    }
    else if (opcodeCheck(instruction,"JP")) {
        //Bnnn
        return 0xB000 + tempByte;
    }
    else if (opcodeCheck(instruction,"RAND")) {
        //Cxkk
        return 0xC000 + reg1 + tempByte;
    }
    else if (opcodeCheck(instruction,"LD")) {
        if (opcodeCheck(arg1.substring(0, 1),"V")) { //arg1 is register
            if (opcodeCheck(arg2,"DT")) {
                //Fx07
                return 0xF000 + reg1 + 0x07;
            }
            else if (opcodeCheck(arg2,"K")) {
                //Fx0A
                return 0xF000 + reg1 + 0x0A;
            }
            else if (opcodeCheck(arg2.substring(0, 1),"V")) { //arg2 is register
                //8xy0
                return 0x8000 + reg1 + reg2;
            }
            else {
                //6xkk
                return 0x6000 + reg1 + tempByte;
            }
        }
        else if (opcodeCheck(arg2.substring(0, 1),"V")) { //arg2 is register but arg1 isn't
            reg2 *= 0x10; //place arg2 is proper position
            if (opcodeCheck(arg1,"DT")) {
                //Fx15
                return 0xF000 + reg2 + 0x15;
            }
            else if (opcodeCheck(arg1,"ST")) {
                //Fx18
                return 0xF000 + reg2 + 0x18;
            }
            else if (opcodeCheck(arg1,"F")) {
                //Fx29
                return 0xF000 + reg2 + 0x29;
            }
            else if (opcodeCheck(arg1,"B")) {
                //Fx33
                return 0xF000 + reg2 + 0x33;
            }
        }
    }
    return 0;
}

function fourArgOpcode(instruction, arg1, arg2, arg3) {
    //Dxyn
    if (opcodeCheck(instruction,"DRAW")) {
        let reg1 = parseInt(arg1.substring(1), 16);
        let reg2 = parseInt(arg2.substring(1), 16);
        let nibble = parseInt(arg3, 16);

        reg1 *= 0x100; //x
        reg2 *= 0x10; //y
        return 0xD000 + reg1 + reg2 + nibble;
    }
    return 0;
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function writeOpcodes(opcodes) {
    //write opcodes to file
    
    let iterator = 1;
    let fileWriter = "";
    console.log("op " + opcodes);
    opcodes.forEach(function(opcode) {
        console.log(opcode.toString(16));

    });
    opcodes.forEach(function(opcode) {
        //intercept opcode if it needs zeros before any values
        if (opcode < 0x100) {
            fileWriter += "00";
        }
        else if (opcode < 0x1000) {
            fileWriter += "0";
        }
        fileWriter += opcode.toString(16);
        console.log(opcode.toString(16));
        if (iterator % 8 == 0) {
            fileWriter += "\n";
        }
        else {
            fileWriter += " ";
        }
        iterator++;
        console.log(fileWriter);
    });
    
    
    //download("program.txt",fileWriter);
}


function test(j){
    let e = [];
    let q = ["123", "e0" , "ee", "1546" , "2443", "33ef", "49fc",
            "5170", "61ac", "7eab", "87a0","8091", "83e2" , "8733" ,
            "8cd4" ,"8385" ,"8506", "8297", "870e","9560","a123",
            "b92b", "c733", "d3bf", "e29e", "e0a1" , "f207" ,"f30a" ,
            "f115" ,"f818", "f21e", "f329", "f233", "f355" ,"f465", "ed62"];

    Collections.addAll(e, q);

    if(e.equals(j)){
        System.out.println("Assembler output file matched the corresponding input file.");
    }
    else {
        System.out.println("Assembler output file does not match the corresponding input file.");
    }
}
