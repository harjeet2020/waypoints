---
title: Fundamentals
---

It may sound strange to begin a DSA learning path by studying hardware - but you will soon see that without hardware context, algorithms & data structures look like arbitrary, impractical riddles. Knowledge of how computers work under the hood will give our study of algorithms a deeper meaning. This section takes a bottom-up approach, starting from the physical hardware and building up to the abstractions we use every day as programmers.

Why bother with all this? Because understanding the foundations transforms you from someone who memorizes rules into someone who truly *gets* why things work the way they do. When you know what happens beneath the surface, debugging becomes intuitive, performance optimization makes sense, and best practices stop feeling arbitrary.

## Hardware Foundations

We begin with the physical machine. You will learn how the CPU, RAM, and storage work together, and why computers represent everything as binary. From there, we build up: how numbers and text are encoded, how transistors form logic gates, how gates combine into circuits that perform arithmetic and make decisions, and finally how these pieces come together in the CPU to execute instructions. By the end, you will understand computation from the ground up.

| Article | What You Will Learn |
|---------|---------------------|
| How Computers Work | The CPU, RAM, and storage trio. The fetch-decode-execute cycle. How data flows between components. |
| Binary Basics | Why computers use binary. How transistors work. Converting between binary, decimal, and hexadecimal. |
| Representing Numbers | Unsigned integers and two's complement for negatives. Floating-point numbers (IEEE 754) and their quirks. |
| Representing Text | ASCII and its limitations. Unicode and UTF-8 encoding. Why string length can be surprising. |
| Electrical Circuits | Voltage, current, and resistance. Ohm's Law. Voltage dividers. Electric fields and transistors in circuits. |
| Logic Gates | Boolean algebra and truth tables. How transistors implement AND, OR, NOT, and XOR. Universal gates. |
| Combinational Circuits | Building adders and comparators from gates. Multiplexers and how hardware makes decisions. |
| Sequential Circuits & the CPU | Latches, flip-flops, and memory. Registers and the clock signal. The ALU and how the CPU executes instructions. |
| Computer Architecture | Buses and how the CPU communicates with RAM. Memory addressing. Cache hierarchy. The full system picture. |
| I/O & Interrupts | How the CPU talks to keyboards, displays, and storage. Polling vs interrupts. Direct Memory Access. |

## The Layers of Software

With hardware understood, we ascend through the layers of abstraction that make modern programming possible. We start with assembly, the CPU's native tongue, then explore how operating systems manage resources and create the illusion of infinite memory. You will see how programming languages are compiled or interpreted, where your variables actually live in memory, and who cleans up when you are done with them. We round out this section with concurrency, networking, and the paradigms we use to organize complex code.

| Article | What You Will Learn |
|---------|---------------------|
| Assembly Basics | Machine code vs assembly. Core instruction categories. How high-level code compiles down. |
| Operating Systems | What an OS does and why we need one. Processes, threads, and virtual memory. System calls and the kernel. |
| Programming Languages | Compiled vs interpreted vs hybrid languages. The basic operations every language provides. |
| Compilation | The full pipeline: lexing, parsing, semantic analysis, optimization, code generation, and linking. |
| Interpretation & VMs | Pure interpretation vs bytecode. Virtual machines (JVM, V8, CPython). Just-in-time compilation. |
| Types & Memory Layout | Value types vs reference types. Memory layout of common data. Pass by value vs pass by reference. |
| Stack & Heap | Why we have two memory regions. Stack frames and function calls. Dynamic allocation on the heap. |
| Memory Management | Manual memory management and its pitfalls. Ownership and borrowing. Garbage collection strategies. |
| Concurrency & Parallelism | Threads and shared state. Race conditions and deadlocks. Synchronization primitives. Async/await. |
| Networking Fundamentals | The layered model (IP, TCP, HTTP). Ports and sockets. DNS. How a web request works end-to-end. |
| Abstraction & Paradigms | Procedural, object-oriented, and functional programming. The tradeoffs of abstraction. |

## Introduction to Algorithms

Now we are ready to think about efficiency. We begin with recursion, a powerful problem-solving technique that relies on the call stack you learned about earlier. Then we develop the vocabulary for comparing algorithms: Big O notation, time and space complexity, and the common growth rates you will encounter again and again. Finally, we cover the mathematical tools that underpin algorithm analysis. With these foundations in place, you will be prepared to study data structures and algorithms with genuine understanding.

| Article | What You Will Learn |
|---------|---------------------|
| Recursion & the Call Stack | How recursion works with the stack. Base cases and recursive cases. When to use recursion vs iteration. |
| Algorithms & Complexity | What an algorithm is. Big O notation and common complexities. Time vs space complexity. |
| Math Prerequisites | Logarithms, exponents, and factorials. Summation formulas. Modular arithmetic. Proof techniques. |
