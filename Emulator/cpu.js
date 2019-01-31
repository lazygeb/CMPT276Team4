class Chip8{
  /**
   * @constructor
   */
  constructor(){
    this.memory = new Uint8Array(4096);
    this.stack = new Array(16);
    this.register = new Array(16);
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.programCounter = 0x200; // Program Counter
    this.drawFlag = false;
	this.canvasWidth = 64;
	this.canvasHeight = 32;
    this.graphics = new Array(this.canvasWidth * this.canvasHeight);
    this.stackPointer = 0;
    this.indexRegister = 0;
    this.keyState = new Uint8Array(16);
	this.ctx = document.getElementById("canvas").getContext("2d");
	this.scale = Math.ceil(document.getElementById("canvas").width / 64);
    this.progLength = 0;

  }

  /**
   * @method loadProgram
   * @param {Array} program 
   * Responsible for loading program into the memory
   */
  loadProgram(program){
    for(let i = 0; i < program.length; i++){
      this.memory[i + 0x200] = program[i];
    }
  }

  /**
   * @method loadCharacters
   * Loads all the required fonts into the memory
   */
  loadCharacters(){
    let hexchars = [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0  index: 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1  index: 5
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2  index: 10
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3  index: 15
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4  index: 20
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5  index: 25
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6  index: 30
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7  index: 35
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8  index: 40
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9  index: 45
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A  index: 50
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B  index: 55
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C  index: 60
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D  index: 65
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E  index: 70
        0xF0, 0x80, 0xF0, 0x80, 0x80  // F  index: 75
      ];

    for(let i = 0; i<hexchars.length;i++){
      this.memory[i] = hexchars[i];
    }
  }

  /**
   * @method reset
   * Reset all the values to default
   */
  reset(){
    this.register = new Array(16);

    this.memory = new Uint8Array(4096);
    this.loadCharacters();
    this.stack = new Array(16);
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.programCounter = 0x200; //Chip 8 expects programs to be loaded at 0x200
    this.drawFlag = false;
	this.canvasWidth = 64;
	this.canvasHeight = 32;
    this.graphics = new Array(this.canvasWidth*this.canvasHeight);
    this.stackPointer = 0;  //top of stack is 0
    this.indexRegister = 0;
    this.keyState = new Uint8Array(16);
	//the first two are the same test ones as before. get red of 0x0000, ad 0x00e0 for the full maze program
    let program = [0xA2, 0x1E, 0xC2, 0x01, 0x32, 0x01, 0xA2, 0x1A,
                   0xD0, 0x14, 0x70, 0x04, 0x30, 0x40, 0x12, 0x00,
                   0x60, 0x00, 0x71, 0x04, 0x31, 0x20, 0x12, 0x00,
                    0x12, 0x18, 0x80, 0x40, 0x20, 0x10, 0x20, 0x40,
                    0x80, 0x10]; //simple maze program, something about my rng opcode is wrong causing it to
                                    //choose the same sprite every time (same diagonal)

          //let program = [0x00, 0x0e, 0xF2, 0x29, 0xD1, 0x25];
    this.loadProgram(program); //loads Array: program into memory
    this.progLength = program.length;

    //fill graphics array with 0's
    for (let i = 0; i < this.graphics.length; i++) {
        this.graphics[i] = 0x0;
    }
    for (let i = 0; i < this.keyState.length; i++) { //following 3 loops can be combined into 1 (they all go to 16)
        this.keyState[i] = 0x0;
    }
    for (let i = 0; i < this.register.length; i++) {
        this.register[i] = 0x0;
    }
    for (let i = 0; i < this.stack.length; i++) {
        this.stack[i] = 0x0
    }

  }

  //check for key presses, call this every cycle
  updateKeys() {

  }

  waitForKeyPressed() {
      //Lina
  }

  //draws single pixel at point specified by scale of canvas element
  drawPixel(x, y) {
	  this.ctx.fillStyle = "#fff";
	  this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
  }

  //clears canvas back to black
  clearScreen() {
	  this.ctx.fillStyle = "#000";
	  this.ctx.fillRect(0, 0, 64 * this.scale, 32 * this.scale);
  }

  //updates entire canvas by drawing pixel for each object in graphics array. 
  updateDisplay() {
	  let x = 0;
	  let y = 0;
	  this.ctx.fillStyle = "#000";
	  this.ctx.fillRect(0, 0, 64 * this.scale, 32 * this.scale);
	  for (let i = 0; i < this.graphics.length; i++) {
		  if (this.graphics[i] !== 0x0) {
		  this.ctx.fillStyle = "#fff";
			  y = Math.floor(i / 64);
			  x = i % 64;
			  this.drawPixel(x, y);
		  }
	  }
  }

  /**
   * @method emulatorCycle
   * Method for running emulator
   */
  runEmulator(){
    for(let i = 0; i < 400; i++){    //how long should it loop for? What ends it? help plz
        //read in 2 bytes from the memory at PC and PC+1
        console.log("curr OPcode: #" + i);

      let opcode = this.memory[this.programCounter] << 8 | this.memory[this.programCounter + 1]; //combines PC and PC+1 into single opcode
      this.oneCycle(opcode);
	  console.log((opcode).toString(16)); //outputs opcode in hex (plz don't delete this)
	  this.programCounter += 2;

	  if (this.drawFlag) {
	      this.updateDisplay();
	      console.log("Display updated");
	      this.drawFlag = false;
      }
    }                                                                 //un-comment
  }

  test() {
      this.graphics[10] = 1;

      this.graphics[0] = 1;
      this.graphics[1] = 1;
      this.graphics[2] = 1;
      this.updateDisplay();
  }

  /**
   * @method oneCycle
   * @param {Integer} opcode
   * This method takes an opcode as input
   * and runs one cycle of Chip8 CPU
   */
  oneCycle(opcode) {
      let reg1 = 0x00;
      let reg2 = 0x00;
      let tempVal = 0x00;
    switch (opcode >> 12) { //first digit of opcode
        case 0x0: //opcodes that start with 0
            if ((opcode & 0x0FFF) === 0x0E0) { //opcode 0x00E0 --> CLS -- Clear the display // works
                for (let i = 0; i < this.graphics.length; i++) {
                    this.graphics[i] = 0;
                }
                this.drawFlag = true;
            }
            else if ((opcode & 0x0FFF) === 0x00EE) { //opcode 0x00EE --> RET
                this.programCounter = this.stack[this.stackPointer]; //sets the program counter to the address at the top of the stack
                this.stackPointer--;//then substracts 1 from the stack pointer
            }
            break;
        
        case 0x1: //opcode 0x1nnn --> JMP addr -- jump to location nnn
            tempVal = opcode & 0x0FFF;
            this.programCounter = tempVal; //sets program counter to address nnn
            break;
        
        case 0x2: //opcode 0x2nnn --> Call addr -- call subroutine at address nnn
            this.stackPointer++; //increment stack pointer
            this.stack[this.stackPointer] = this.programCounter;
            this.programCounter = opcode & 0x0FFF;
            break;
        
        case 0x3: //opcode 0x3xkk --> SE Vx, byte -- if this.register Vx == kk, skip next instruction (PC + 2)
            reg1= opcode & 0x0F00;
            reg1 = reg1 >> 8; //this.register number = x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            if (this.register[reg1] === tempVal) { //skips next instruction if this.register Vx == kk
               this.programCounter += 2;
            }
            break;
        case 0x4: //opcode 0x4xkk --> SNE Vx, byte -- if this.register Vx != kk, skip next instruction (PC + 2)
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //this.register number =  x
            tempVal = opcode & 0x00FF; //kk == last 2 digits of opcode
            if (this.register[reg1] !== tempVal) { //skips next instruction if this.register Vx != kk
                this.programCounter += 2;
            }
            break;
        
        case 0x5: //opcode 0x5xy0 --> SE Vx, Vy -- if this.register Vx & Vy are equal, skip next instruction
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; // reg1 = x
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; // reg2 = y
            if (this.register[reg1] === this.register[reg2]) {
                this.programCounter += 2;
            }
            break;
        
        case 0x6: //opcode 0x6xkk --> LD Vx, byte -- place value kk into this.register Vx
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            tempVal = opcode & 0x00FF;
            this.register[reg1] = tempVal;
            break;
        
        case 0x7: //opcode 0x7xkk --> ADD Vx, byte -- add value kk to Vx and place in Vx
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8;
            tempVal = opcode & 0x00FF;
            tempVal = tempVal + this.register[reg1];
            this.register[reg1] = tempVal;
            break;
        
        case 0x8: //opcodes 8xy0 through 8xyE
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            switch (opcode & 0x000F) {
                case 0x0: //opcode 8xy0 --> LD Vx, Vy -- set Vx = Vy
                    this.register[reg1] = this.register[reg2];
                    break;
                case 0x1: //opcode 8xy1 --> OR Vx, Vy -- set Vx = Vx OR Vy (bitwise OR operation)
                    this.register[reg1] = this.register[reg1] | this.register[reg2];
                    break;
                case 0x2: //opcode 8xy2 --> AND Vx, Vy -- set Vx = Vx and Vy
                    this.register[reg1] = this.register[reg1] & this.register[reg2];
                    break;
                case 0x3: //opcode 8xy3 --> XOR Vx, Vy -- set Vx = Vx XOR Vy
                    this.register[reg1] = this.register[reg1] ^ this.register[reg2];
                    break;
                case 0x4: //opcode 8xy4 --> ADD Vx, Vy -- set Vx = Vx + Vy, set VF = carry
                    tempVal = this.register[reg1] + this.register[reg2];
                    if (tempVal > 255) {
                        this.register[0xF] = 1;
                        tempVal = tempVal & 0x0FF;
                    }
                    this.register[reg1] = tempVal;
                    break;
                case 0x5: //opcode 8xy5 --> SUB Vx, Vy -- set Vx = Vx - Vy, set VF = NOT borrow
                    if (this.register[reg1] > this.register[reg2]) {
                        this.register[0xF] = 1;
                    } else {
                        this.register[0xF] = 0;
                    }
                    this.register[reg1] = this.register[reg1] - this.register[reg2];
                    break;
                case 0x6: //opcode 8xy6 --> SHR Vx {, Vy} -- set Vx = Vx SHR 1 => if the least-sig bit of Vx is 1,
                    // set VF to 1, otherwise 0. the Vx is divided by 2
                    tempVal = this.register[reg1] & 0x01; //only keep the least significant bit
                    if (tempVal === 0x1) {
                        this.register[0xF] = 1;
                    } else {
                        this.register[0xF] = 0;
                    }
                    this.register[reg1] = this.register[reg1] / 2; //shift to the right by 1
                    break;
                case 0x7: //opcode 8xy7 --> SUBN Vx, Vy -- set Vx = Vy - Vx, set VF = Not borrow
                    if (this.register[reg2] > this.register[reg1]) {
                        this.register[0xF] = 1;
                    } else {
                        this.register[0xF] = 0;
                    }
                    this.register[reg1] = this.register[reg2] - this.register[reg1];
                    break;
                case 0xE: //opcode 8xyE --> SHL Vx, {, Vy} -- set Vx = Vx SHL 1
                    tempVal = this.register[reg1] & 0x80;
                    tempVal = tempVal >> 15; //tempVal = most sig bit
                    if (tempVal === 0x1) {
                        this.register[0xF] = 1;
                    } else {
                        this.register[0xF] = 0;
                    }
                    this.register[reg1] = this.register[reg1] * 2; //shift to the left by 1
                    break;
            }
            break;
        case 0x9: //opcode 9xy0 --> SNE Vx, Vy -- skip next instruction if Vx != Vy
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //Vy
            if (this.register[reg1] !== this.register[reg2]) {
                this.programCounter += 2;
            }
            break;
        case 0xA: //opcode Annn --> LD I, addr -- set this.register I = nnn
            tempVal = opcode & 0x0FFF;
            this.indexRegister = tempVal;
            break;
        case 0xB: //opcode Bnnn --> JP V0, addr -- jump to location nnn + V0
            tempVal = opcode & 0x0FFF;
            tempVal += this.register[0x0];
            this.programCounter = tempVal;
            break;
        case 0xC: //opcode Cxkk --> RND Vx, byte -- set Vx = random byte (0 to 255) AND kk
            tempVal = Math.random() * (255);
            tempVal = Math.floor(tempVal);
            console.log("random Num: " + tempVal);
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //Vx
            tempVal = tempVal & (opcode & 0x00FF); //random & kk
            this.register[reg1] = tempVal;
            break;
        case 0xD: //opcode Dxyn --> DRW Vx, Vy, nibble --> Display n-sprite starting at mem loc I at (Vx, Vy), set VF = collision
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >> 8; //x coordinate
            let xCoord = this.register[reg1];
            reg2 = opcode & 0x00F0;
            reg2 = reg2 >> 4; //y coordinate
            let yCoord = this.register[reg2];
            tempVal = opcode & 0x000F; //n
            console.log("n: " + tempVal);
            console.log("index:" + this.indexRegister);
            this.register[0xF] = 0; //set VF to 0 initially

            //read in 1 byte from memory at a time
            for (let i = 0; i < tempVal; i++) { //loop through each memory location (every loop is one row (y axis))
                let currIndex = this.indexRegister + i;
                let currByte = this.memory[currIndex]; //load in current memory location
                let currYCoord = yCoord + i;
                for (let j = 0; j < 8; j++) { //loop through each bit and properly adjust graphics array
                    let currXCoord = xCoord + j;
                    //wrap around if necessary
                    if (currYCoord < 0) {
                        currYCoord = currYCoord + this.canvasHeight; //wraps to bottom
                    }
                    else if (currYCoord > 63) {
                        currYCoord = currYCoord - this.canvasHeight; //wraps to top
                    }
                    if (currXCoord < 0) {
                        currXCoord = currXCoord + this.canvasWidth; //wraps to the right
                    }
                    else if (currXCoord > 31) {
                        currXCoord = currXCoord - this.canvasWidth; //wraps to the left
                    }
                    let currPixel = this.graphics[currXCoord  * currYCoord]; //index of graphics array
                    this.graphics[currXCoord + (currYCoord * this.canvasWidth)] ^= ((currByte >>> (7-j)) & 0x01); //should only keep 1 bit (from left to right)
                    if (currPixel === 1 && this.graphics[currXCoord * currYCoord] === 0) {
                        this.register[0xF] = 1; //if a pixel is flipped from 1 to 0, set VF to 1 (collision)
                    }
                }
            }
            this.drawFlag = true;
            break;
        case 0xE:
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >>> 8;
            tempVal = this.register[reg1];
            switch(opcode & 0x00FF) {
                case 0x9E: // opcode Ex9E --> SKP Vx -- skip next instruction if key with value Vx is pressed
                    if (tempVal >= 0 && tempVal <= 16) {
                        if (this.keyState[tempVal] === 1) { //Vx IS pressed
                            this.programCounter += 2;
                        }
                    }
                    break;
                case 0xA1: // opcode ExA1 --> SKNP Vx -- skip next instruction if key with value Vx is NOT pressed
                    if (tempVal >= 0 && tempVal <= 16) {
                        if (this.keyState[tempVal] === 0) { //Vx NOT pressed
                            this.programCounter += 2;
                        }
                    }
                    break;
            }
            break;
        case 0xF: //opcodes that start with F
            reg1 = opcode & 0x0F00;
            reg1 = reg1 >>> 8;
            switch(opcode & 0x00FF) {
                case 0x07: //opcode 0xFx07 --> LD Vx, DT -- set Vx = delay timer value
                    this.register[reg1] = this.delayTimer;
                    break;
                case 0x0A: //opcode 0xFx0A --> LD Vx, K -- wait for a key press, store the value of the key in Vx
                    this.register[reg1] = this.waitForKeyPressed();
                    break;
                case 0x15: //opcode 0xFx15 --> LD DT, Vx -- set delay timer = Vx
                    this.delayTimer = this.register[reg1];
                    break;
                case 0x18: //opcode 0xFx18 --> LD ST, Vx -- set sound timer = Vx;
                    this.soundTimer = this.register[reg1];
                    break;
                case 0x1E: //opcode 0xFx1E --> ADD I, Vx -- set I = I + Vx
                    this.indexRegister += this.register[reg1];
                    break;
                case 0x29: //opcode 0xFx29 --> LD F, Vx -- set I = location of sprite for digit Vx
                    this.indexRegister = this.register[reg1] * 5;
                    break;
                case 0x33: //opcode 0xFx33 --> LD B, Vx -- store BCD representation of Vx in memory locations I, I+1 & I + 2
                    tempVal = this.register[reg1] / 100;
                    this.memory[this.indexRegister] = tempVal; //hundredth digit of Vx
                    tempVal = this.register[reg1] - (this.memory[this.indexRegister] * 100);
                    this.memory[this.indexRegister + 1] = tempVal / 10; //tenth digit
                    tempVal = tempVal - (this.memory[this.indexRegister + 1] * 10);
                    this.memory[this.indexRegister + 2] = tempVal;
                    break;
                case 0x55: //opcode 0xFx55 --> LD [I], Vx -- Store registers V0 through Vx in memory starting at I
                    for (let i = 0; i < this.register[reg1]; i++) {
                        this.memory[this.indexRegister + i] = this.register[i];
                    }
                    break;
                case 0x65: //opcode 0xFx65 --> LD Vx, [I] -- Read registers V0 through Vx from memory starting at I
                    for (let i = 0; i < this.register[reg1]; i++) {
                        this.register[i] = this.memory[this.indexRegister + i];
                    }
                    break;
            }
            break;
    }//increment programCounter by 2 after running oneCycle()

  }
}

let ch = new Chip8();
ch.reset();
