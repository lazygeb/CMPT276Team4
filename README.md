# :boom: CMPT276-Chip8-Group4 :boom:

## Release 0

## **Introduction** 
---
Chip-8 is an interpreter, which was developed in the 70s to run programs such as games like Pong, Tetris, and Pac-Man (en.wikipedia.org/wiki/CHIP-8).

The goal of this project is to develop an interpreter like the original Chip-8 and two games to play with it. Our first game will be snake, which is more of a classic game. Whereas, our second game will be more of a newer, contempory game with retro aspects. This game will be a recreation of the hit game Flappy Bird. In order to simplify the development of these games, we will create an assembler and visualizer to help debug the game.

### **Planned Use Cases for Release 1**
#### Runnable Emulator

- [ ] Have memory, register and intial opcodes set up
- [ ] Output graphics
- [ ] Input keyboard commands
- [ ] External Rom inputs

## **Table of Contents**
----------------------------------------------------------
- [Project Organization](#Project-Organization)
  - 
  - [Details of our software methodology](#Details-of-our-software-methodology)
  - [Our Roles](#Our-Roles)

- [Monitoring and Reporting Mechanisms](#Monitoring-and-Reporting-Mechanisms)
  -  
  - [Meeting Schedule](#Meeting-Schedule)
  - [Communication and Software Repository](#Communication-and-Software-Repository)
  
- [Hardware and Software Requirements](#Hardware-and-Software-Requirements)
  - 
  - [Testing Methods](#Testing-Methods)
  - [Main Language and Libraries](#Main-Language-and-Libraries)
  
- [Work Breakdown and Project Schedule](#Work-Breakdown-and-Project-Schedule)
  - 
  - [Timeline](#Timeline)
  - [Work breakdown](#Work-breakdown)

## **Project Organization**
----------------------------------------------------------
### Details of our software methodology

For our use, it is the most efficient and effective methodology as we will be testing for each release and making sure it is able to submit by each release. It also allows for improvements on the features, which means we can get feedback and make any necessary changes if time permits. 

### Our Roles

Gabe: Project Manager

Calvin: Designer

Mathieu: Developer

Harman: Developer

Lina: Tester

## **Monitoring and Reporting Mechanisms**
----------------------------------------------------------

### Meeting Schedule

We have decided to meet every week on *Monday* at *3:30* o'clock in a meeting room that we can find.

### Communication and Software Repository  
We will be communicating via *Slack* at least once a day and use *Trello* to track our development progress and status.  

We will be working in a *GitHub* repo.

## **Hardware and Software Requirements**
----------------------------------------------------------

### Testing Methods

To automate and test our software, we'll be using the *Jest* javascript library 

We will be engaging in three types of testing to ensure the validation of our program. These three types are: 

- *Unit Testing* - each feature will be tested individually by the programmer in charge of the feature. This will be done while the programmer is developing the feature by writing automated tests using the Jest  framework
  
- *Integration Testing* - where the features for one major component of the program are combined and automated tests are written for that component. This will be done by the member who has been assigned the role of tester and will commence when all the features for a component have been completed.
  
- *System Testing* - where all the components of the program are combined into one program and tested. This will be done by the member who has been assigned the role of tester and will commence once the visualizer and emulator has been completed as these two parts go together.

### Main language and libraries

We will be using *Javascript* and *Node.js* in order to render the virtual machine

## **Work Breakdown and Project Schedule**
----------------------------------------------------------

### Timeline

![Image of First Gantt Timeline](img/gantt_timeline.png)

### Work breakdown

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

Work Breakdown: **Visualizer** 

| Feature                               | Estimated Time Required | Finish Date |
| ------------------------------------- | ----------------------- | ----------- |
| Display memory during execution       | 2 days                  | Feb 9       |
| Display registers during execution    | 2 days                  | Feb 9       |
| Display instructions during execution | 2 days                  | Feb 9       |
| Pause program                         | 1 day                   | Feb 10      |
| Play program                          | 1 day                   | Feb 10      |
| Step-forward one instruction          | 2 days                  | Feb 14      |
| Step-backwards one instruction        | 3 days                  | Feb 20      |
| Testing                               | 3 days                  | Feb 23      |

### **Release 3: March 13 2019**
Deliverables for Release 3:  
- Assembler (Chip 8 tool): Finish development and testing by Mar 10
- Snake (Game 1): Finish development and testing by Mar 9
  
Work Breakdown: **Assembler** 

| Feature   | Estimated Time Required | Finish Date |
| --------- | ----------------------- | ----------- |
| Assembler | 2 weeks                 | Mar 1       |
| Testing   | 4 days                  | Mar 10      |

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