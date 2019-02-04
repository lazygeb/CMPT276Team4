
function oneNNN{

chip.oneCycle(0xOOEO);
if(chip.programCounter== 00E0){
works=true;
}

if(!works){

console.log(“Opcode 1NNN: Failed”)
}else{
console.log(“Opcode 1NNN : Pass”);
}
}

Function twoNNN {
works=false
var tempSp= chip.stackPointer;
chip.oncecycle(0X2ABC)
  if (stack[stackPointer] ==tempSp){
works= true;
}

if(chip.programCounter= 0xABC)[
works = true ;
}
if(!works){

console.log(“Opcode 2NNN: Failed”)
}else{
console.log(“Opcode 2NNN : Pass”);
}
}
}