# Supplemental Questions:

### Part 2. Please explain how the stack is used for subroutine call and return (Chapter 7 “Stack Instructions”)

The stack is a fundamental part of computation and is the basis of low-level instruction management. A program is commonly split into tasks which are called upon from the main loop--these tasks take the name subroutines. Tgese are like the traditional functions used in higher level languages and the basis of the functional paradigm. When the subroutined is called from the main loop with a call operation, it adds the stack the address of the machine code and then adds the paramters of the subroutine on to the stack. Then the call operation goes to the starting address of the subroutine. The subroutine itself pops the parameters off the stack and the subroutine specifies how many to pop off for the appropriate number of parameters. The subroutine end is marked by a return instruction which pops the call address and pushes the return value onto the stack and now functionality is returned to the main loop and can be used accordingly.

### Part 3. Explain a computer's register-level architecture, including (Maximum 1 point) 

#### a) CPU-memory interface

The memory interface is an abstraction of the data/address buses and the control signals. This connects the memory and CPU so is critical to any computing system. This relies primarily on MAR and MDR. The  MAR refers to the Memory Address Register and contains memory addresses of data and then instructions which are used to access this data. MDR is a bit different and refers to the Memory Data Register which holds information in the transfer process. By transfer process, I mean when instructions transfer data between the memory and the CPU. The control signals have the ability read, write, and memory function complete. Using the MAR, the CPU can asser a read or write signal and wait for the response from memory. 

####  b) special-use registers (minimum 100 words)

Special purpose registers are registers used for specific tasks. Instead of being meant to hold an address, they have specific purposes. Some special purpose registers in x86 are: cs, ds, eip, es, flag, fs, gs, and ss. These are intended to hold program state and usually include the program counter, stack pointer, and status register. In more embedded applications, they can even include hardware elements. The program counter register is used to store the address of the next instruction and is typically incremented. The instruction register holds the current instruction to be executed. There are many more examples but these are necessary in the computer's register level architecture.

#### c) addressing modes (minimum 100 words)

Addressing modes are critical to the instruction cycle and specifies the operation that will be performed. This operation is executed on data which is stored in the prior mentioned registers. The way these operands are chosen is dependent on the addressing mode making it a critical and useful tool to the program. There are a few standard types of addressing modes. The first of which is the immediate mode which is like the default and allows the operand to be defined in the instruction itself. Another mode is register mode where the operand is stored in the register and then the register is in the CPU. This instruction has the address of the register where the operand is stored. Some other ones that have been covered in our course are: direct addressing mode, indirect addressing mode, stack addressing mode, and so many more!

### Works Cited

Adressing Modes and Instruction Cycle. (n.d.). Retrieved October 23, 2020, from https://www.studytonight.com/computer-architecture/addressingmodes-instructioncycle

Computer Science learning for school students. (n.d.). Retrieved October 23, 2020, from https://www.teach-ict.com/as_as_computing/ocr/H447/F453/3_3_8/architecture/miniweb/pg3.htm


