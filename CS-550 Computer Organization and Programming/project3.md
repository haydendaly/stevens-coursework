# Assembly Project 3
## Hayden Daly

### 1. Please explain how to transform an assembly language program into a binary executable file using the necessary reference tables.

Turning an assembly program to a binary executable file is relatively easy. The way the instructions are formatted is to be seperated into opcode and 0-more addresses which are then mapped to the reference table for binary representations. This is the job of the assembler and works the same as the compilation of code basically. The opcode for the instructions could be an 8-bit code and the address fields could be 24bits assuming three addresses and a 32bit system. This reference table can be thought of as a translation dictionary for opcodes/binary equivalents. Different type of processors reference different tables like x86 vs 68k. This actually contributes to the core differences between Linux GNUs and x86 which makes writing assembly so difficult on my computer.

### 2. Please explain the formats of the different types of data (image, video, audio, and alphanumerical, integers, floating-point numbers).

Boolean:
This is by the far the simplest and is stored as a 1 or 0 indicating a true or false value.

Image:
The traditional method for storing an image is with a bitmap which has bits at each pixel position indicating the colors. This is stored into a sequence which is then mapped to the dimensions of the photograph. More efficiently there are vector graphics which use equations to define the images. This is better for photos with less variation in color and shape such as icons or cartoons and scales up in size over dimensions. These are most common as SVGs while bitmaps are stored in JPEG, PNG, and other similar formats.

Video: 
Video is just an extension of images and at the simplest form as sequences of bitmap images. More complicated codecs allow for lossy compression and formats like h264 use equations to cover large areas of images rather than bitmaps.

Audio:
Audio is similar to video but instead of having sequential bitmaps. The audio signals are sliced into binary code which represents samples of different frequencies which can be used to recreate the wave form. Common formats include mp3, wav, and many more.

Alphanumerical:
This one is simple and jsut uses ASCII to use 8-bit binary words that can represent up to 256 characters. ASCII provides basically a table equating each value to a character representation.

Integers:
This is extremely simple and just uses bits to store the number and then an optional bit to determine whether or not it is negative.

Floating Point Numbers:
These are represented as numbers with a decimal portion which can be reduced if less rational. These are converted into real numbers using routines at the program level.

## Works Cited
Englander, I. (2014). The Architecture of Computer Hardware, Systems Software, & Networking: An Information Technology Approach. John Wiley & Sons.
