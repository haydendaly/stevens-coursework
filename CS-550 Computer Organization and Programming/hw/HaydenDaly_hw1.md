# Homework 1

1. Why the Von Neumann model is essential in understanding computers ? (Chapter 1)

### Answer
The Von Neumann Architecture is ubiqutous within computing. It is the foundation for all computations and originated in 1945 and consists of three major characteristics: the memory, control unit, and arithmetic logic unit which has become the basis for computers today. Since it is by far the most common computer architecture used today, it is essential to understand.

### Citations
M. (Director). (2017, September 23). The CPU and Von Neumann Architecture [Video file]. Retrieved September 2, 2020, from https://www.youtube.com/watch?v=SbqXqQ-2ixs

2. Numbers: Please write TWO
examples representing the numerical data in any possible base, including binary, hexadecimal and octal, as well as floating point number notations

### Answer
#### Example 1:
Binary:     1111111011
Hexadec:    3FB
Float:      1019.0

#### Example 2:
Binary:     110100011
Hexadec:    1A3
Float:      419.0

### Citations

3. Data - Please describe any TWO examples representing different formats of data used for still images (bitmap versus object images), video, audio and alphanumerical data. (Ch 4 p. 100-135)

### Answer

For images, there are different ways to represent them in terms of data. All of the most common formats lean toward the bitmap representation like PNG, JPEG, and GIFs. However lighter weight, object representations include SVGs and PostScript which can render vector based images easily. The bitmap images are stored as a series of pixels each with individual data but vector based images form shapes using equations to render shapes and curves which build images up. Icons are typically done with object based because they are lighter weight and take much less time than objects being rendered. Bitmap based images are good for many colors and detail but can't be shifted to higher fidelity while object based images can.

**Note** I was confused by the form of this question, wasn't sure if I should provide examples for each of the types or just two in general.

### Citations

4. LMC - Explain the inner workings of the Little Man Computer and its relation with real life computers, including the basics of assembly instructions. (A three-four sentences answer will suffice) Ch 6—p.178-193

### Answer

The LMC is an abstraction for computation that makes processing assembly instructions pellucid. It explains assembly instructions as telling a "little man" to have an input/output toward the accumulator, program counter, and memory which you directly instruct through assembly. It is a metaphor which accurately represents how assembly instructions are executed at a lower level in real life computers. Each cell of memory has instructions directly associated with it which the "little man" is able to decode in the accumulator and increments/decrements the program counter.

### Citations

LMC (Little Man Computer) -- Tutorial 1 -- What is it? (2016, June 9). [Video]. YouTube. https://www.youtube.com/watch?v=kCyyZI1GgsQ

5. CPU-memory – Explain how the CPU and memory communicate. Concept of a register (including MAR/MDR). (A three-four sentences answer will suffice) Ch 7 p. 201

### Answer

The CPU and memory communicate through a bus component which caries signals that represent data, memory addresses, and control functionality which connects to the bus interface unit. A register is a single, permanent storage location in the CPU used for a specific role and are usually ranging from 1 to 128 bits in size. The memory address register (MAR) and memory data register (MDR) are specific types of registers which hold the address of a memory location and a data value that is being addressed respectively. In simpler terms, the MARs contain the locations of the MDRs.

### Citations

6. Fetch-execute – What is the fetch- execution ? (Ch 7.4 p. 207)

### Answer

The fetch-execution cycle is the pattern which the "little man" follows and works similar in a CPU and copies data from register to register which operates upon a ticking mechanism within the CPU. It loads instructions from the RAM where it goes through the fetch-decode-execute cycle. This operation just encodes binary data based off of machine code typically directed by assembly instruction.

### Citations

The Fetch-Execute Cycle: What’s Your Computer Actually Doing? (2019, July 29). [Video]. YouTube. https://www.youtube.com/watch?v=Z5JC9Ve1sfI

7. Stack - How the stack is permanently used through any subroutine call to better write code? (Ch 7.13 p. 221)

### Answer

The stack is a data storage structure which is used to retrieve recently used data and operates in a last-in, first-out (LIFO) procedure. It is permanently used through any subroutine to better write code because it allows program routines to operate recursively and call themselves and prior computed data efficiently. An example of where this becomes useful is fixed location subroutines for return address storage: since the most recent address will mutate, a stack can be used to ensure the most recent return address is used.

### Citations

8. I/O – Please list different types of Input/Output: Programmed I/O vs Interrupts and explain how they each work, as well as their advantages and disadvantages. (Ch 9.3)

### Answer

For I/O operations, the simplest method is programmed I/O which has an I/O module connected to a pair of I/O registers in the CPU through a bus similar to the I/O baskets in the LMC which act as buffers. Input is transferred from the I/O module to I/O data register and then to the accumulator register. The primary disadvantage of this is that it is slow since it require full instructions of the fetch-execution cycle for every I/O data word transfer. For this reason, it is used for simple character based data transfers and also makes taking input from a keyboard only acceptable under program control.

Interrupts are used commonly to mutate the normal flow of a program in the computer in reaction to special events like executing Control-C while running code for example. To handle these events, there are special lines to the central processor known as interrupt lines and modern computers can contain as many as 32 labeled with the IRQ prefix. These directly interact with the fetch execution as a form of I/O which can precede programmed I/O.

### Citations

9. DMA - How Direct Memory Access works and when it is useful to use it? (Ch 9 p 268)

### Answer

Given the limitations of using programmed I/O, computers provided a form of I/O which can transfer block data between the memory and I/O module under the latter's control. This is initiated using programmed I/O but then the CPU is bypassed for the remainder of the transfer and notifies the CPU with an interupt upon transfer completion. This technique is known as direct memory access (DMA) and is extremely helpful to speed up computation with larger data than the char level.

### Citations

10. Buses – Please list the advantages and limitations of different types of buses (serial vs parallel with many examples). Ch 7.5 page 210

### Answer

At the extremes of bus types, there exists parallel and serial types. Parallel buses are characterized as having a bus where each individual line is responsible for a bit of data and transfer all data simultaneously while serial buses transfer data sequentially one bit at a time. The inherent benefits of parallel transmission are ease of programming and speed of transfer but require more transmission channels to use which makes it used commonly when a large amount of data is being sent or it is time sensitive. Serial transmission's advantages are opposite, it is slower but requires less transmission channels to operate.

### Citations

Mellon, L. (2017, May 23). Data Transmission - Parallel vs Serial Transmission. QUANTIL. https://www.quantil.com/content-delivery-insights/content-acceleration/data-transmission/#:%7E:text=Serial%20data%20transmission%20sends%20data,same%20time%20over%20multiple%20channels

11. Peripherals - How computer
peripherals work, including magnetic disk drives (floppy disks, hard drives), optical disk drives (CD-R, CD-RW, DVDROM, DVD+R, DVD-R, DVD+RW, DVD- RW), displays (CRT and LCD monitors) and laser printers and realize why it is important to limit the number of disk- read phases when writing programs. (Ch 10 p. 297)

### Answer

Peripherals are commonly connected through some type of port like a USB or directly connected through parallel/serial ports. One of the most common peripherals is computer storage which is commonly done with magnetic disk drives (even though SSDs are gaining greater popularity) which consists of one or more flat platters made of glass, metal, or plastic and coated with a magnetic substance. Particles are polarized magnetically to represent data in the form of 1s and 0s. These platters are circular and rotate and trace out specific tracks where data is stored in sectors and then blocks of data. 

Optical disk drives are used to store data as well but are in a read-only/write-once form which makes them optimal for burning media like video/music and are used for CDs and DVDs often. CD ROM is a form of optical disks which contain limited segments of data storage similar to magnetic disks which can be mutated and are used commonly for video games applications. 

Displays are entirely different than storage and represent RGB pixels arranged in a large rectangular screen which can be used to represent 256 * 256 * 256 different colors in newer systems. The monitor is typically connected externally through ports like HMDI/VGA or directly connected in laptops. There are many different ways content is actually rendered like progressive scan, vector scan, interlace scan, raster scan, and more. Newer technologies use cathode ray tubes (CRT) and organic light emitting diodes (OLED) now but I won't go into detail on those.

The most common form of printing today is laser printing which produces images electronically using light emitting diodes which print a sheet for times with different colored toners. These lasers use spinning mirrors which photosensitive drums that rotate in toner and then contact the paper. The process is much more complicated than presented here but this is the simplified model.

Limitting the the number of disk read phases when writing programs is extremely important because it improves the performance of the CPU as there is less I/O that needs to be handled by the fetch execution cycle.

### Citations