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

import java.io.FileWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        ArrayList<String> OP = new ArrayList<>();
        boolean test = false;
        Path path;
       try {
           if (args.length > 1) {
               //System.out.println("Err: Too many arguments. Only use 1. Please see instructions document.");
               throw new IllegalArgumentException("Err: Too many arguments. Only use 1. Please see instructions document.");
           }
           else if (args[0].equalsIgnoreCase("--test")) {
               test = true;
               path = Paths.get("src/testInstructions.txt");
           }
           else {
               path = Paths.get(args[0]);
           }
           ArrayList<Integer> opcodes = new ArrayList<>();
           Scanner scanner = new Scanner(path);
           while (scanner.hasNextLine()) {
               String line = scanner.nextLine();
               line = line.trim();
               String[] tokens = line.split("\\s+"); //split every space (ignores multiple spaces in a row)
               //int opcode = getInstruction(tokens);
               boolean hasComment = false;
               //the following loop checks for comments, it ignores anything after the //
               for (int i = 0; i < tokens.length && !hasComment; i++) {
                   //hasComment = false;
                   if (tokens[i].startsWith("//")) {
                       hasComment = true;
                       String[] tempTokens = new String[i];
                       for (int j = 0; j < i; j++) {
                           tempTokens[j] = tokens[j];
                       }
                       tokens = tempTokens;
                       //System.out.println(tokens.length);
                   }
               }
               int opcode = getInstruction(tokens);
               if (opcode == 0) {
                   throw new InputMismatchException("Invalid instruction: " + line);
               }
               opcodes.add(opcode);
           }

           //System.out.println("\n");
           for (int i : opcodes) {
               String hex = Integer.toHexString(i);
               //System.out.println(hex);
               OP.add(hex);
           }
           writeOpcodes(opcodes);
           if (test) {
               test(OP);
           }
       }
       catch (Exception e){
            System.out.println(e.getMessage());
            System.exit(-1);
        }
    }

    //call the right function
    private static int getInstruction(String[] tokens) {
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

    private static int oneArgOpcode(String instruction) {
        if (instruction.equalsIgnoreCase("CLS")) {
            return 0x00E0;
        }
        else if (instruction.equalsIgnoreCase("RET")) {
            return 0x00EE;
        }
        return 0;
    }

    private static int twoArgOpcode(String instruction, String arg1) {
        if (instruction.equalsIgnoreCase("SYS")) {
            return Integer.parseInt(arg1, 16); //should convert a hex string into an int number
        }
        else if (instruction.equalsIgnoreCase("JP")) {
            return 0x1000 + Integer.parseInt(arg1, 16); //4096 = 0x1000
        }
        else if (instruction.equalsIgnoreCase("CALL")) {
            return 0x2000 + Integer.parseInt(arg1, 16);
        }
        else if (instruction.equalsIgnoreCase("SHR")) {
            arg1 = arg1.substring(1); //remove the V from register token
            int reg1 = Integer.parseInt(arg1, 16); //string to hex number
            reg1 *= 0x100; //place reg1 in proper position (8xy6)
            return 0x8000 + reg1 + 0x0006; //put opcode together
        }
        else if (instruction.equalsIgnoreCase("SHL")) {
            arg1 = arg1.substring(1);
            int reg1 = Integer.parseInt(arg1, 16);
            reg1 *= 0x100;
            return 0x8000 + reg1 + 0xE;
        }
        else if (instruction.equalsIgnoreCase("LD")) {
            return 0xA000 + Integer.parseInt(arg1, 16);
        }
        else if (instruction.equalsIgnoreCase("SKP")) {
            arg1 = arg1.substring(1);
            int reg1 = Integer.parseInt(arg1, 16);
            reg1 *= 0x100;
            return 0xE000 + reg1 + 0x9E;
        }
        else if (instruction.equalsIgnoreCase("SKNP")) {
            arg1 = arg1.substring(1);
            int reg1 = Integer.parseInt(arg1, 16);
            reg1 *= 0x100;
            return 0xE000 + reg1 + 0xA1;
        }
        else if (instruction.equalsIgnoreCase("DUMP")) {
            arg1 = arg1.substring(1);
            int reg1 = Integer.parseInt(arg1, 16);
            reg1 *= 0x100;
            return 0xF000 + reg1 + 0x55;
        }
        else if (instruction.equalsIgnoreCase("READ")) {
            arg1 = arg1.substring(1);
            int reg1 = Integer.parseInt(arg1, 16);
            reg1 *= 0x100;
            return 0xF000 + reg1 + 0x65;
        }
        else if (instruction.equalsIgnoreCase("SPRITE")) {
            try {
                int sprite = Integer.parseInt(arg1, 16);
                if (arg1.length() < 4) {
                    throw new IllegalArgumentException("Sprite is not length 4");
                }
                return sprite;
            }
            catch (IllegalArgumentException e){
                System.out.println(e.getMessage());
                System.exit(-1);
            }
        }
        return 0;
    }

    private static int threeArgOpcode(String instruction, String arg1, String arg2) {
        //get values
        int reg1 = 0;
        int reg2 = 0;
        int tempByte = 0;

        if (arg1.substring(0, 1).equalsIgnoreCase("V")) { //if arg1 is a register
            reg1 = Integer.parseInt(arg1.substring(1), 16);
            reg1 *= 0x100;
        }
        if (arg2.substring(0, 1).equalsIgnoreCase("V")) { //if arg2 is a register
            reg2 = Integer.parseInt(arg2.substring(1), 16);
            reg2 *= 0x10;
        }
        else if (!arg2.equalsIgnoreCase("DT") && !arg2.equalsIgnoreCase("ST")
                    && !arg2.equalsIgnoreCase("K")) { //if is number
            tempByte = Integer.parseInt(arg2, 16); //if arg2 is kk
        }
        //determine proper opcode
        if (instruction.equalsIgnoreCase("SE")) {
            String tempArg = arg2.substring(0, 1);
            if (tempArg.equalsIgnoreCase("V")) {
                //5xy0
                return 0x5000 + reg1 + reg2;
            }
            else {
                //3xkk
                return 0x3000 + reg1 + tempByte;
            }
        }
        else if (instruction.equalsIgnoreCase("SNE")) {
            String tempArg = arg2.substring(0, 1); //is arg 2 a register?
            if (tempArg.equalsIgnoreCase("V")) {
                //9xy0
                return 0x9000 + reg1 + reg2;
            }
            else { //4xkk
                return 0x4000 + reg1 + tempByte;
            }

        }
        else if (instruction.equalsIgnoreCase("ADD")) {
            if (arg1.equalsIgnoreCase("I")) {
                //Fx1E
                reg2 *= 0x10; //put reg2 into x position
                return 0xF000 + reg2 + 0x1E;
            }
            else if (arg2.substring(0, 1).equalsIgnoreCase("V")) {
                //8xy4
                return 0x8000 + reg1 + reg2 + 0x4;
            }
            else {
                //7xkk
                return 0x7000 + reg1 + tempByte;
            }
        }
        else if (instruction.equalsIgnoreCase("OR")) {
            //8xy1
            return 0x8000 + reg1 + reg2 + 0x1;
        }
        else if (instruction.equalsIgnoreCase("AND")) {
            //8xy2
            return 0x8000 + reg1 + reg2 + 0x2;
        }
        else if (instruction.equalsIgnoreCase("XOR")) {
            //8xy3
            return 0x8000 + reg1 + reg2 + 0x3;
        }
        else if (instruction.equalsIgnoreCase("SUB")) {
            //8xy5
            return 0x8000 + reg1 + reg2 + 0x5;
        }
        else if (instruction.equalsIgnoreCase("SUBN")) {
            //8xy7
            return 0x8000 + reg1 + reg2 + 0x7;
        }
        else if (instruction.equalsIgnoreCase("JP")) {
            //Bnnn
            return 0xB000 + tempByte;
        }
        else if (instruction.equalsIgnoreCase("RAND")) {
            //Cxkk
            return 0xC000 + reg1 + tempByte;
        }
        else if (instruction.equalsIgnoreCase("LD")) {
            if (arg1.substring(0, 1).equalsIgnoreCase("V")) { //arg1 is register
                if (arg2.equalsIgnoreCase("DT")) {
                    //Fx07
                    return 0xF000 + reg1 + 0x07;
                }
                else if (arg2.equalsIgnoreCase("K")) {
                    //Fx0A
                    return 0xF000 + reg1 + 0x0A;
                }
                else if (arg2.substring(0, 1).equalsIgnoreCase("V")) { //arg2 is register
                    //8xy0
                    return 0x8000 + reg1 + reg2;
                }
                else {
                    //6xkk
                    return 0x6000 + reg1 + tempByte;
                }
            }
            else if (arg2.substring(0, 1).equalsIgnoreCase("V")) { //arg2 is register but arg1 isn't
                reg2 *= 0x10; //place arg2 is proper position
                if (arg1.equalsIgnoreCase("DT")) {
                    //Fx15
                    return 0xF000 + reg2 + 0x15;
                }
                else if (arg1.equalsIgnoreCase("ST")) {
                    //Fx18
                    return 0xF000 + reg2 + 0x18;
                }
                else if (arg1.equalsIgnoreCase("F")) {
                    //Fx29
                    return 0xF000 + reg2 + 0x29;
                }
                else if (arg1.equalsIgnoreCase("B")) {
                    //Fx33
                    return 0xF000 + reg2 + 0x33;
                }
            }
        }
        return 0;
    }

    private static int fourArgOpcode(String instruction, String arg1, String arg2, String arg3) {
        //Dxyn
        if (instruction.equalsIgnoreCase("DRAW")) {
            int reg1 = Integer.parseInt(arg1.substring(1), 16);
            int reg2 = Integer.parseInt(arg2.substring(1), 16);
            int nibble = Integer.parseInt(arg3, 16);

            reg1 *= 0x100; //x
            reg2 *= 0x10; //y
            return 0xD000 + reg1 + reg2 + nibble;
        }
        return 0;
    }

    private static void writeOpcodes(ArrayList<Integer> opcodes) throws Exception {
        //write opcodes to file
        FileWriter fileWriter = new FileWriter("programFile.txt");
        int iterator = 1;
        for (Integer opcode: opcodes) {
            //intercept opcode if it needs zeros before any values
            if (opcode < 0x100) {
                fileWriter.write("00");
            }
            else if (opcode < 0x1000) {
                fileWriter.write("0");
            }
            fileWriter.write(Integer.toHexString(opcode));
            if (iterator % 8 == 0) {
                fileWriter.write("\n");
            }
            else {
                fileWriter.write(" ");
            }
            iterator++;
        }
        fileWriter.close();
    }

    private static void test(ArrayList <String> j){
        ArrayList<String>  e = new ArrayList<>();
        String [] q = {"123", "e0" , "ee", "1546" , "2443", "33ef", "49fc",
                "5170", "61ac", "7eab", "87a0","8091", "83e2" , "8733" ,
                "8cd4" ,"8385" ,"8506", "8297", "870e","9560","a123",
                "b92b", "c733", "d3bf", "e29e", "e0a1" , "f207" ,"f30a" ,
                "f115" ,"f818", "f21e", "f329", "f233", "f355" ,"f465", "ed62"};

        Collections.addAll(e, q);

        if(e.equals(j)){
            System.out.println("Assembler output file matched the corresponding input file.");
        }else
        {
            System.out.println("Assembler output file does not match the corresponding input file.");
        }
    }
}