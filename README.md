# CMPT276-Chip8-Group4 
Team 4 Members: Gabriele Dal Cengio, Lina Dang-Nguyen, Nishan Ghimire, Mathieu Laflamme, Harman Singh, Calvin So

## **Release 1**

## **Summary of changes from previous release**

All planned use cases from release 0 have been completed with some major bugs. These bugs are documented[<sup>1</sup>](#Emulator-bugs) and will be fixed by release 2. We have tested the following roms on our emulator: Maze, Connect4, Brix, Pong, and Guess. All these roms are functional and the games are able to be played with the keyboard input. 

We have decided to not use node.js as we can just run our program through google chrome, which has a debugger as well[<sup>2</sup>](#Main-language-and-libraries-[UPDATED]) . For this release, we did not end up using jest[<sup>3</sup>](#Testing-Methods) because there was insufficient time to learn it. Instead, we wrote automatized test code for the opcode through javascript and printing if the the test had failed or not. We will dedicate a tester to learn jest to see if it is worth using and will improve our test outcomes for the next release.

Due to the increase in team members, we have decided to push the completion of the assembler earlier[<sup>4</sup>](#Work-Breakdown). This decision was made in an effort to have all our tools built so that the production of the games will be easier. For the visualizer[<sup>5</sup>](#Work-Breakdown), the only difference from release 0 is that we are planning to show on the UI when a key is pressed. This is to improve visual feedback so users can see when they press a key. We have also directed our main focus to just having our program be compatible with google chrome. If time permits, we will expand to other browsers. 

The roles have also been changed from release 0 to accommodate each others strengths[<sup>6</sup>](#Our-Roles-[UPDATED]). Multiple people will be working at the same time on different features as the features don't rely on each other. Therefore, all the tasks are started on the same day and do not require a more squential order. 

## **README Emulator**

We achieved what we wanted to achieve during the first release which was a working emulator connected to html elements. We wanted to display graphics to the canvas element as well as keyboard input, sound output and file input. Through testing we found we have quite a few bugs (outlined in this [document](#Emulator-bugs) and will be fixing them all within the next release. 

To demonstrate what we have working thus far, follow these instructions:

1) Open index.html in google chrome
2) Click on “choose file” under file input
3) Navigate to the rom folder and open the maze.txt example file
4) Dismiss the alert and press the start emulation button

When the bug fixes are done we will demonstrate more in greater detail in the next release
   
## **README Testing**

The html page will have a button called "Run Opcode Tests", which will automatically test all the opcodes to see if it passed or failed.
   
## **Emulator Bugs**

These bugs have been found through unit testing and integrated testing by using public domain roms provided through the following website: [https://www.zophar.net/pdroms/chip8/chip-8-games-pack.html]

### **General bugs consistent with all the games tested**

1) Sound works with the automatized testing. However, it will not work in the games.
2) Keyboard input seems to hold up the program and take too long to be registered. 
3) Rom input currently does not work properly. The input has to be copy and pasted to text files in order to run.
4) Loading a game after one has already been loaded will cause the graphics to merge. The previous game and newly imputed game will run at the same time.

### **Bugs from specific games**

**Pong**

  ![Image of Pong Gameplay](https://cdn.discordapp.com/attachments/513589409661059082/542784512170393611/pong.gif)

Paddle graphics occasionally glitch when the ball hits the paddle. The ball often looks distorted when hitting the bottom of the screen
Score is not updated. We are not sure if this is a sprite issue or a register issue and will have to look into it more. 

**Brick Breaker**
![Image of Brix Gameplay](https://cdn.discordapp.com/attachments/513589409661059082/542782366201020427/brix.gif)
   
Just like pong, the score does not update. It is also not possible to lose. Once all lives are lost, the ball will spawn out of the paddle infinitely. 

We will be assigning people dedicated to tackle these bugs and have a fully functioning emulator by release 2. 


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
  

#### Release 1: Runnable Visualizer & Assembler

- [ ] Display log for registers, memory, pc, index, sound timer, delay timer, stack
- [ ] Provide interface feedback for users by showing keyboard presses
- [ ] Allow user control by creating buttons to step through, go back and pause the program
 - [ ] Assembler can change mnemonics to opcodes, which can be ran in the emulator
 - [ ] Emulator and Visualizer will be fully functional on Google Chrome



## **Table of Contents**

  - [Project Organization](#Project-Organization)
    - [Details of our software methodology](#Details-of-our-software-methodology)
    - [Our Roles [UPDATED]](#Our-Roles-[UPDATED])

  - [Monitoring and Reporting Mechanisms](#Monitoring-and-Reporting-Mechanisms)
    - [Meeting Schedule](#Meeting-Schedule)
    - [Communication and Software Repository](#Communication-and-Software-Repository)
  
  - [Hardware and Software Requirements](#Hardware-and-Software-Requirements)
    - [Testing Methods [UPDATED]](#Testing-Methods)
    - [Main Language and Libraries [UPDATED]](#Main-Language-and-Libraries-[UPDATED])
  
  - [Work Breakdown and Project Schedule](#Work-Breakdown-and-Project-Schedule)
    - [Timeline [UPDATED]](#Timeline)
    - [Work breakdown [UPDATED]](#Work-breakdown)

  - [References](#References)

## **Project Organization**

### Details of Our Software Methodology

For our use, *incremental development* is the most efficient and effective methodology as we will be testing for each release and making sure it is able to submit by each release. It also allows for improvements on the features, which means we can get feedback and make any necessary changes if time permits. 

### Our Roles [UPDATED]

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

### Main language and libraries [UPDATED]

We will be using *Javascript* in order to render the virtual machine. To debug our code, we will be using the *Chrome Browser*. 

## **Work Breakdown and Project Schedule**

### Timeline [UPDATED]

![Image of First Gantt Timeline](https://cdn.discordapp.com/attachments/513589409661059082/542596447262998538/Gaant.png)

### Work Breakdown

### **Release 1: Feb 6 2019** [COMPLETED]
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

### **Release 2: Feb 27 2019** [UPDATED]
Deliverables for Release 2:  
- Visualizer: Finish development and testing by Feb 20
- Assembler (Chip 8 tool): Finish development and testing by Feb 20

Work Breakdown: **Visualizer** 

| Feature                               | Estimated Time Required | Finish Date |
| ------------------------------------- | ----------------------- | ----------- |
| Display memory during execution       | 2 days                  | Feb 9       |
| Display registers during execution    | 2 days                  | Feb 9       |
| Display instructions during execution | 2 days                  | Feb 9       |
| Display key press during execution    | 1 day                   | Feb 10      |
| Pause program                         | 1 day                   | Feb 10      |
| Play program                          | 1 day                   | Feb 10      |
| Step-forward one instruction          | 2 days                  | Feb 14      |
| Step-backwards one instruction        | 3 days                  | Feb 20      |
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
  
Work Breakdown: **Snake** 

| Feature | Estimated Time Required | Finish Date |
| ------- | ----------------------- | ----------- |
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


