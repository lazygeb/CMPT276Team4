# CMPT276-Chip8-Group4 
Team 4 Members: Gabriele Dal Cengio, Lina Dang-Nguyen, Nishan Ghimire, Mathieu Laflamme, Harman Singh, Calvin So

## **Release 4**

## **Summary of changes from previous release**
### **What was implemented**
**PLANNED FEATURES:**

Our games have been completed and fully tested. Snake can be moved around with the w, a, s, d keys and is equipped with collision detection. The snake grows when it eats pellets and dies if it collides into its tail or the wall. Floppy bird can jump using the w key. There are 4 different variations of pipes that will spawn for the bird to go through. The score is incremented on the right side of the screen. The games have been tested by a small group of users and the whole development team. Through these testings, we are confident that our games are ready for the release and definitely playable. 

**UNPLANNED FEATURES:**

Since the games were the only thing left for this release, we have made a series of improvements to the project. The first improvement was the UI. We decided to change up the colours to make it look less like a prototype. Pink was chosen as our main colour due to its inviting nature and uniqueness. The font was also changed to meet the overall aesthetic. 

The next thing that was improved was the assembler. We decided to add an interface to it so that users can easily use it. One of the problems we had with our previous assembler was that no one wanted to read the documentation and as a result, they had difficulty using it. So we converted the java into javascript and created a web interface that allowed game development to be done at ease. 

The emulator and visualizer have also been improved. We discovered in testing that the log slowed down the system quite a bit. As a result, we have created a toggle button which allows users to play the games with decreased lag. We wanted to keep the log still because it was great for debugging. 


### **List of all system changes:**
- UI: Changed UI colour scheme to pink 
- Emulator: Increased speed due to log toggle
- Visualizer: Added a log toggle 
- Snake: Completed game
- Flappy Bird: Completed game
- Assembler: Created an html webpage for the interface

## **README**

### **README Emulator**

The development of the Emulator has been fully completed in terms on functionality. 

To run the emulator, follow these instructions:

1) Open index.html in google chrome
2) Click on “choose file” under file input
3) Navigate to the rom folder and open the maze.txt example file
4) Dismiss the alert and press the start emulation button

### **README Run Emulator Tests**
1) Open index.html in google chrome
2) Click run tests 
3) Output of the tests will show in the log


### **README Visualizer Step Controls**

The visualizer has pause functionality, resume functionality and step forward functionality. 

To use the step controls, follow these instructions:

1) While the emulator is running, click on the pause icon (two vertical bars)
2) While the emulator is in the pause state, you may either press the resume icon (arrow to the right),the step forward icon (the "+1" icon) or the step backwards icon (the "-1" icon)

### **README Assembler**
The assembler follows instructions from the following reference: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#memmap. The assembler transforms assembly language instructions into chip8 supported opcodes. For example it will take SE V3 VA and output 53A0. Because we have created our own assembler, the assembly language used has been slightly modified from the reference noted above.

### How to run it:
Getting to the assembler:  
1) Open up the emulator. 
2) At the bottom right corner, there will be a button that says **open in new tab**. Click it to be redirected to the assembler
  

Converting using assembler:
1) In the section that says convert file, make sure the drop down menu is on the assembler. 
2) Click choose file
3) Choose the assemblerSampleProgram.txt, which is located in the assembler folder
4) Click convert file and a copy of the file will be downloaded into your computer 


Converting using the disassembler:
1) In the section that says convert file, make sure the drop down menu is on the disassembler. 
2) Click choose file
3) Choose the disassemblerSampleProgram.txt, which is located in the assembler folder
4) Click convert file and a copy of the file will be downloaded into your computer 

Using the text box on the webpage: 
1) Make sure you are in the assembler setting
2) Click any of the buttons located in the mnemonics section
3) If they have any variables like: x, y, nibble, addr, byte, Vx, Vy make sure to change it to a correct value. More instructions on this can be found in the manual button located on the top right of the screen.

### **README Snake**
We have refered to this document: https://github.com/vinheim3/CHIP-8/tree/master/Snake during our development of the game

To load snake into the emulator follow these steps:
1) Go to the web browser by clicking the index.html
2) Click load rom
3) Go into the snake file and choose the snek.txt
4) Click start emulation
5) You can move around using w,a,s,d keys and eat the pellets that have been dropped.

### **README Flappy Bird**

To load Flappy Bird into the emulator follow these steps:
1) Go to the web browser by clicking the index.html
2) Click load rom
3) Go into the snake file and choose the FlappyBird.txt
4) Click start emulation
5) You can fly using the w key. Avoid getting hit by the poles to get a point.

   
## **Emulator Bugs**
All bugs have been fixed in release 3.

--------------------------------------------------------------------
## **Introduction** 

Chip-8 is an interpreter, which was developed in the 70s to run programs such as games like Pong, Tetris, and Pac-Man.

The goal of this project is to develop an interpreter like the original Chip-8 and two games to play with it. Our first game will be snake, which is more of a classic game. Whereas, our second game will be more of a newer, contempory game with retro aspects. This game will be a recreation of the hit game Flappy Bird. In order to simplify the development of these games, we will create an assembler and visualizer to help create and debug the game.


### **Planned Use Cases**
#### Release 1: Runnable Emulator [COMPLETED]

- [x] Have memory, register and intial opcodes set up
- [x] Output graphics
- [x] Input keyboard commands
- [x] External Rom inputs
  

#### Release 2: Runnable Visualizer & Assembler [COMPLETED]

- [x] Display log for registers, memory, pc, index, sound timer, delay timer, stack
- [ ] <s>Provide interface feedback for users by showing keyboard presses (REMOVED FEATURE)</s> 
- [x] Allow user control by creating buttons to step through, go back and pause the program 
 - [x] Assembler can change mnemonics to opcodes, which can be ran in the emulator
 - [x] Emulator and Visualizer will be fully functional on Google Chrome

#### Release 3: Completed Visualizer [COMPLETED]

- [ ] <s>Provide interface feedback for users by showing keyboard presses (REMOVED FEATURE)</s>
- [x] Allow user to step back one step 

#### Release 4: Completed Snake Game, Completed Flappy Bird Game, GUI Assembler [COMPLETED]
- [x] Have snake game polished and playable (unfinished from release 2)
- [x] Have flappy bird game polished and playable
- [x] Have an assembler interface that is easy to use and required less documentation reading.


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
    - [Timeline](#Timeline)
    - [Work breakdown](#Work-breakdown)

  - [References](#References)
  - [Post Mortem](#Post-Mortem)

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

![Image of First Gantt Timeline](https://cdn.discordapp.com/attachments/513589409661059082/555562961561845770/Gaant.png)

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
| Display key press during execution      | 1 day                   | Feb 10      |
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


### **Release 3: March 13 2019** 
Deliverables for Release 3:  
- Snake (Game 1): Finish development and testing by Mar 9
- Step backwards for Visualizer: Finish by Mar 4
  
Work Breakdown: **Snake** 

| Feature | Estimated Time Required | Finish Date |
| ------- | ----------------------- | ----------- |
| Display key press during execution | 3 day                   | Feb 10      |
| Step-backwards one instruction    |  6 days | Mar 4   |
| Snake   **(DELAYED)**  | 2 weeks                 | Mar 7       |
| Testing | 3 days                  | Mar 9       |


### **Release 4: April 8 2019**
Deliverables for Release 4:  
- Flappy Bird: Finish development and testing by April 3 
- Snake: Finish development and testing by April 3  
- GUI Assembler: Finish development and testing by April 3

Work Breakdown: **Flappy Bird** 

| Feature        | Estimated Time Required | Finish Date |
| -------------- | ----------------------- | ----------- |
| Flappy Bird    | 2 weeks                 |  April 3      |
| Snake   **(DELAYED)**  | 2 weeks                 |  April 3       |
| GUI Assembler  | 2 weeks                 |  April 3       |


## **References**
Chip 8 information and history: https://en.wikipedia.org/wiki/CHIP-8

Cowgod's Chip 8 Technical Reference: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM

# Post-Mortem

This will be our final release. There will be no more added features or optimizations since the completed product is sufficient for our use case. This is evident in the user testing that we have conducted.  Users were able to use the emulator at ease and were moderately satisfied. The only lacking aspect of our project that was expressed by the test users was the speed of the emulator.

Overall our project was successful and our team dynamic was satisfactory.

### **What Worked?**
Our success was due to our detailed breakdown of what needed to be completed. This gave us a strong direction on how to proceed in the following weeks and allowed us to stay relatively on schedule. We did not do this for snake and ended up not being able to finish it for release 3. Using this breakdown, we used trello to organize and set reminders as to when things needed to be completed. Then every meeting we would refer to this and adjust it depending on the current status of the project. 

### **What Didn’t Work?**
Although our project was quite smooth, the only thing that didn't work was the definite roles that we set in the beginning. We did not really follow it because when we were struggling, we would help each other and therefore, some people would take on small aspects of each others roles. 

### **Improvements**
Now that we have all completed a project, there are a few improvements that we would like to make. The first one would be better automatized testing. Since we decided to not use Jest because of the learning curve, our automatized testing was done through our html file using if/else statements. Even though what we currently have is sufficient, using a testing framework would have allowed our automatized testing to be conducted in a more convenient way. Also, now that we all have web development experience, we definitely would have like to create a much more efficient emulator that would work at a faster rate. 

### **Biggest Unexpected Challenge**

Communication was definitely a challenge at first. The project manager would have to constantly ask for the status of everyone’s part. Once things got into the flow and the expectation has been established, our communication did improve. Therefore, setting the expectation early on in the project would be good so that there is time to talk to any members who are having trouble meeting this. 

### **Was all the testing worth it**
Yes, all of the testing we that we’ve conducted was definitely worth it. The automatized unit testing allowed us to be fully confident in our program and that it is functional. There were many bugs that would have not been found without testing such as the backwards step causing the whole browser to fail and the sprite bug that drew pixels in wrong locations.

Then our user testing allowed us to make the user interface a product that users would actually use. We were able to use their input to make their experience better. One of the ways we were able to incorporate their valued opinions was through the colour scheme. Originally we were going to keep it with the grey but users mentioned that the design was too plain. Hence why we changed it up after release 3.

### **What advice would you give to the next students who take 276?**
Through our learnings, we recommend that for future students, every team member works on the development of the emulator together. The development of the emulator allows the programmer to truly know how the system works, which applies to game and tool development. The emulator was definitely one of the most important parts of the project so having a high bus factor on it would be beneficial as well. 

To ensure productivity we also recommend that specific goals are set after each meeting so that everyone has something to bring to the table for the next meeting. This also allows people to budget their time accordingly to their schedule and ensures things are completed on schedule. If someone is not able to complete their portion, communicate with them and see why they are struggling. It is important to have a strong team dynamic when working in a project.

