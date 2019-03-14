# CMPT276-Chip8-Group4 
Team 4 Members: Gabriele Dal Cengio, Lina Dang-Nguyen, Nishan Ghimire, Mathieu Laflamme, Harman Singh, Calvin So

## **Release 2**

## **Summary of changes from previous release**

Almost all the planned use cases from release 1 have been completed. The first feature that has not been completed is the backwards function due to unexpected development issues. Our original design did not show the sprites correctly and had memory errors so we had to brainstorm new designs, which lead to development being delayed. We have started development again and will complete the feature by the next release. The last feature that has not been completed was the visualizer showing keyboard input as time did not permit for the development of this feature. It has been added to our backlog and will be completed for the next release.

These delays do not affect our schedule much as we have completed the assembler ahead of schedule. The assembler is written in java and is fully functional and ready to be used for game development. For our visualizer, we have implemented a pause, play and step forward functionality. The display of the memory, stack and registers are also fully functioning. 

All major bugs from last release have been fixed. Specifically, sound now works with external roms and the speed of the keyboard has significantly improved. Refer to the [document](#Emulator-bugs) for a detailed list of the bugs fixed. Minor bugs like the the ball glitching when hitting the paddle will be added to the backlog and fixed for next release. The rom still has to be copy and pasted in to a text file to be run. 

For testing, last release we decided to assign someone to research on jest and if it was worth using. The results from that was it was too time consuming to use jest and the google chrome debugger will do the job just fine. As a result, for the future releases, we will be using the google chrome debugger to test out our code. 

For our next release, it will be the same as we have planned. We will have the game snake done and polished with no bugs. Any bugs and features unfinished from this release will also be completed for next release.

### List of all system changes:
- UI: New Icon buttons for the visualizer and improved keyboard input
- Emulator: Clearer graphics and sound works
- Visualizer: Added play, pause, step forward functionality and display of stack, register and memory. 



## **README Emulator**

The development of the Emulator has been fully completed in terms on functionality. The bugs from release 2 have been completed except two minor bugs. 

To run the emulator, follow these instructions:

1) Open index.html in google chrome
2) Click on “choose file” under file input
3) Navigate to the rom folder and open the maze.txt example file
4) Dismiss the alert and press the start emulation button


## **README Visualizer Step Controls**

The visualizer has pause functionality, resume functionality and step forward functionality. All of this is indicated within the log as well. The step backwards functionality will be done for next release.

To use the step controls, follow these instructions:

1) While the emulator is running, click on the pause icon (two vertical bars)
2) While the emulator is in the pause state, you may either press the resume icon (arrow to the right) or the step forward icon (the "+1" icon)

The "-1" icon currently does nothing


## **README Assembler**
The assembler follows instructions from the following reference: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#memmap. The assembler transforms assembly language instructions into chip8 supported opcodes. For example it will take SE V3 VA and output 53A0. Because we have created our own assembler, the assembly language used has been slightly modified from the reference noted above.

### How to run it:
- In the same folder as this document, you’ll find a .jar file and an intellij project folder.
-	To run assembler, navigate to your java environment and run something like the following command: java -jar Chip8 Assembler.jar “fileDirectoryForAssemblyLangFile.txt”
-	The assembler will place your opcode file in the same folder as the .jar file. It will be named programFile.txt

### How it works:
-	The assembler reads in 1 line at a time, so only place 1 instruction per line.
-	It then splits the line into tokens, using the space “ “ as a separator.
-	When writing instructions, only place 1 per line and separate each part of the instruction by a space, nothing else (no commas).
-	Please see the exampleAssembly.txt file for an example of each instruction being used.
   
## **README Testing**

The html page will have a button called "Run Opcode Tests", which will automatically test all the opcodes to see if it passed or failed. Please use the Google Chrome browser. To see whether the opcodes have passed or not, right click and select inspect. Then go to the console tab in the inspector and this will display text as to if the tests have passed. 
   
## **Emulator Bugs**

These bugs have been found through unit testing and integrated testing by using public domain roms provided through the following website: [https://www.zophar.net/pdroms/chip8/chip-8-games-pack.html]

### **Fixed bugs from last release**
1) Sound works with the automatized testing and in external roms.
2) Improved input keyboard delay from 70ms to 0.6ms on average
3) Game can be loaded one after another without any glitches. 
4) Score updates in games (Pong, Brix) 

### **Bugs that have not been fixed**
1) Clicking the run emulator multiple times causes it to glitch
2) Paddle graphics glitch when the ball hits it 
3) Rom input currently does not work properly. The input has to be copy and pasted to text files in order to run.
4) Games don’t end after all lives have been used up. 

### **New bugs**
1) Log delay in visualizer lags the entire program substantially


--------------------------------------------------------------------
## **Introduction** 

Chip-8 is an interpreter, which was developed in the 70s to run programs such as games like Pong, Tetris, and Pac-Man.

The goal of this project is to develop an interpreter like the original Chip-8 and two games to play with it. Our first game will be snake, which is more of a classic game. Whereas, our second game will be more of a newer, contempory game with retro aspects. This game will be a recreation of the hit game Flappy Bird. In order to simplify the development of these games, we will create an assembler and visualizer to help create and debug the game.


### **Planned Use Cases**
#### Release 0: Runnable Emulator [COMPLETED]

- [x] Have memory, register and intial opcodes set up
- [x] Output graphics
- [x] Input keyboard commands
- [x] External Rom inputs
  

#### Release 1: Runnable Visualizer & Assembler [COMPLETED]

- [x] Display log for registers, memory, pc, index, sound timer, delay timer, stack
- [ ] Provide interface feedback for users by showing keyboard presses (UNFINISHED)
- [x] Allow user control by creating buttons to step through, go back and pause the program (STEP BACK UNIFINISHED)
 - [x] Assembler can change mnemonics to opcodes, which can be ran in the emulator
 - [x] Emulator and Visualizer will be fully functional on Google Chrome

#### Release 2: Completed Snake Game & Completed Visualizer

- [ ] Provide interface feedback for users by showing keyboard presses (unfinished from release 1)
- [ ] Allow user to step back one step (unfinished from release 1) 
- [ ] Have snake game polished and playable 

## **Table of Contents**

  - [Project Organization](#Project-Organization)
    - [Details of our software methodology](#Details-of-our-software-methodology)
    - [Our Roles](#Our-Roles)

  - [Monitoring and Reporting Mechanisms](#Monitoring-and-Reporting-Mechanisms)
    - [Meeting Schedule](#Meeting-Schedule)
    - [Communication and Software Repository](#Communication-and-Software-Repository)
  
  - [Hardware and Software Requirements](#Hardware-and-Software-Requirements)
    - [Testing Methods](#Testing-Methods)
    - [Main Language and Libraries ](#Main-Language-and-Libraries)
  
  - [Work Breakdown and Project Schedule](#Work-Breakdown-and-Project-Schedule)
    - [Timeline [UPDATED]](#Timeline-[UPDATED])
    - [Work breakdown [UPDATED]](#Work-breakdown)

  - [References](#References)

## **Project Organization**

### Details of Our Software Methodology

For our use, *incremental development* is the most efficient and effective methodology as we will be testing for each release and making sure it is able to submit by each release. It also allows for improvements on the features, which means we can get feedback and make any necessary changes if time permits. 

### Our Roles 

Gabe: Project Manager/UI

Calvin: Tester

Mathieu: Developer

Harman: Developer

Nishan: Tester

Lina: Developer

## **Monitoring and Reporting Mechanisms**

### Meeting Schedule

We have decided to meet every week on *Monday* at *3:30* o'clock in a meeting room that we can find.

### Communication and Software Repository  
We will be communicating via *Slack* at least once a day and use *Trello* to track our development progress and status.  

We will be working in a *GitHub* repo.

## **Hardware and Software Requirements**

### Testing Methods

Automatized tests will be written in Javascript and ran on Chrome to see if there are any runtime errors.

We will be engaging in three types of testing to ensure the validation of our program. These three types are: 

- *Unit Testing* - each feature will be tested individually by the programmer in charge of the feature. This will be done while the programmer is developing the feature by writing automated tests using the Jest  framework
  
- *Integration Testing* - where the features for one major component of the program are combined and automated tests are written for that component. This will be done by the member who has been assigned the role of tester and will commence when all the features for a component have been completed.
  
- *System Testing* - where all the components of the program are combined into one program and tested. This will be done by the member who has been assigned the role of tester and will commence once the visualizer and emulator has been completed as these two parts go together.

### Main language and libraries 

We will be using *Javascript* in order to render the virtual machine. To debug our code, we will be using the *Chrome Browser Development Tools*. 

## **Work Breakdown and Project Schedule**

### Timeline [UPDATED]

![Image of First Gantt Timeline](https://cdn.discordapp.com/attachments/513589409661059082/550127862578020362/Gaant.png)

### Work Breakdown

### **Release 1: Feb 6 2019** 
Deliverables for Release 1:  
- Emulator: Finish development and testing by Feb 3 

Work Breakdown: **Emulator** 

| Feature                 | Estimated Time Required | Finish Date |
| ----------------------- | ----------------------- | ----------- |
| Web Interface           | 1 day                   | Jan 20      |
| Memory, Registers       | 1 week                  | Jan 21      |
| Initialize Instructions | 1 week                  | Jan 21      |
| Graphics Output         | 3 days                  | Jan 24      |
| Keyboard Input          | 3 days                  | Jan 24      |
| Sound Output            | 2 days                  | Jan 27      |
| External Rom Input      | 1 week                  | Jan 31      |
| Integrated Testing      | 3 days                  | Feb 3       |

### **Release 2: Feb 27 2019** 
Deliverables for Release 2:  
- Visualizer: Finish development and testing by Feb 20
- Assembler (Chip 8 tool): Finish development and testing by Feb 20

Work Breakdown: **Visualizer** 

| Feature                               | Estimated Time Required | Finish Date |
| ------------------------------------- | ----------------------- | ----------- |
| Display memory during execution       | 2 days                  | Feb 9       |
| Display registers during execution    | 2 days                  | Feb 9       |
| Display instructions during execution | 2 days                  | Feb 9       |
| Display key press during execution    **(DELAYED)**     | 1 day                   | Feb 10      |
| Pause program                         | 1 day                   | Feb 10      |
| Play program                          | 1 day                   | Feb 10      |
| Step-forward one instruction          | 2 days                  | Feb 14      |
| Step-backwards one instruction  **(DELAYED)**      | 3 days                  | Feb 20      |
| Finish debugging the Emulator         | 2 weeks                 | Feb 20      |
| Testing                               | 3 days                  | Feb 23      |


Work Breakdown: **Assembler** 

| Feature   | Estimated Time Required | Finish Date |
| --------- | ----------------------- | ----------- |
| Assembler | 2 weeks                 | Feb 20      |
| Testing   | 4 days                  | Feb 23      |


### **Release 3: March 13 2019** [UPDATED]
Deliverables for Release 3:  
- Snake (Game 1): Finish development and testing by Mar 9
- Step backwards for Visualizer: Finish by Mar 4
  
Work Breakdown: **Snake** 

| Feature | Estimated Time Required | Finish Date |
| ------- | ----------------------- | ----------- |
| Display key press during execution | 3 day                   | Feb 10      |
| Step-backwards one instruction    |  6 days | Mar 4   |
| Snake   | 2 weeks                 | Mar 7       |
| Testing | 3 days                  | Mar 9       |


### **Release 4: April 8 2019**
Deliverables for Release 4:  
- Flappy Bird: Finish development and testing by April 3  

Work Breakdown: **Flappy Bird** 

| Feature        | Estimated Time Required | Finish Date |
| -------------- | ----------------------- | ----------- |
| Flappy Bird    | 2 weeks                 | Mar 27      |
| System Testing | 1 weeks                 | April 3     |

## **References**
Chip 8 information and history: https://en.wikipedia.org/wiki/CHIP-8

Cowgod's Chip 8 Technical Reference: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM


