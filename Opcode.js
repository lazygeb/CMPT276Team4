function oneNNN {

	chip.oneCycle(0x00E0);
	if (chip.programCounter == 00E0) {
		works = true;
	}

	if (!works) {

		console.log(“Opcode 1 NNN: Failed”)
	} else {
		console.log(“Opcode 1 NNN: Pass”);
	}
}

function twoNNN {
	works = false
	let tempSp = chip.stackPointer;
	let tempPC = chip.programCounter;
	chip.oneCycle(0X2ABC);
	if (tempSp !== chip.stackPointer) {
		works = false;
	}
	if (chip.stack[chip.stackPointer] !== tempPC) {
		works = false;
	}

	if (chip.programCounter !== 0xABC)[
		works = true;
	}
	if (works === true) {

		console.log(“Opcode 2 NNN: Failed”)
	} else {
		console.log(“Opcode 2 NNN: Pass”);
	}
}
}