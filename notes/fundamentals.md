# Fundamentals Section Outline

## Section Goal

Provide a comprehensive, bottom-up understanding of how computers operate—from physical hardware to abstract programming concepts. By the end of this section, readers will understand *why* things work the way they do, not just *how* to use them. This foundation makes everything that follows (data structures, algorithms, language-specific concepts) more intuitive.

---

## File Structure

All files live in:
```
docs/algorithms/learning-journey/fundamentals/
```

The section is divided into three sub-categories:

### Hardware Foundations

The physical machine and how it represents data.

| Order | Filename                     | Sidebar Label                 |
|-------|------------------------------|-------------------------------|
| 1     | `how-computers-work.md`      | How Computers Work            |
| 2     | `binary-basics.md`           | Binary Basics                 |
| 3     | `representing-numbers.md`    | Representing Numbers          |
| 4     | `representing-text.md`       | Representing Text             |
| 5     | `logic-gates.md`             | Logic Gates                   |
| 6     | `combinational-circuits.md`  | Combinational Circuits        |
| 7     | `sequential-circuits.md`     | Sequential Circuits & the CPU |
| 8     | `io-and-interrupts.md`       | I/O & Interrupts              |

### The Layers of Software

The bridge from hardware to high-level programming.

| Order | Filename                       | Sidebar Label                 |
|-------|--------------------------------|-------------------------------|
| 1     | `assembly-basics.md`           | Assembly Basics               |
| 2     | `operating-systems.md`         | Operating Systems             |
| 3     | `programming-languages.md`     | Programming Languages         |
| 4     | `compilation.md`               | Compilation                   |
| 5     | `interpretation.md`            | Interpretation & VMs          |
| 6     | `types-and-memory-layout.md`   | Types & Memory Layout         |
| 7     | `stack-and-heap.md`            | Stack & Heap                  |
| 8     | `memory-management.md`         | Memory Management             |
| 9     | `concurrency.md`               | Concurrency & Parallelism     |
| 10    | `networking.md`                | Networking Fundamentals       |
| 11    | `abstraction-and-paradigms.md` | Abstraction & Paradigms       |

### Introduction to Algorithms

Measuring efficiency and the math behind it.

| Order | Filename                       | Sidebar Label             |
|-------|--------------------------------|---------------------------|
| 1     | `recursion.md`                 | Recursion & the Call Stack |
| 2     | `algorithms-and-complexity.md` | Algorithms & Complexity   |
| 3     | `math-prerequisites.md`        | Math Prerequisites        |

---

## Sidebar Configuration

Update `sidebars.js` to include:

```js
{
  type: 'category',
  label: 'Fundamentals',
  collapsed: false,
  items: [
    {
      type: 'category',
      label: 'Hardware Foundations',
      collapsed: false,
      items: [
        'algorithms/learning-journey/fundamentals/how-computers-work',
        'algorithms/learning-journey/fundamentals/binary-basics',
        'algorithms/learning-journey/fundamentals/representing-numbers',
        'algorithms/learning-journey/fundamentals/representing-text',
        'algorithms/learning-journey/fundamentals/logic-gates',
        'algorithms/learning-journey/fundamentals/combinational-circuits',
        'algorithms/learning-journey/fundamentals/sequential-circuits',
        'algorithms/learning-journey/fundamentals/io-and-interrupts',
      ],
    },
    {
      type: 'category',
      label: 'The Layers of Software',
      collapsed: false,
      items: [
        'algorithms/learning-journey/fundamentals/assembly-basics',
        'algorithms/learning-journey/fundamentals/operating-systems',
        'algorithms/learning-journey/fundamentals/programming-languages',
        'algorithms/learning-journey/fundamentals/compilation',
        'algorithms/learning-journey/fundamentals/interpretation',
        'algorithms/learning-journey/fundamentals/types-and-memory-layout',
        'algorithms/learning-journey/fundamentals/stack-and-heap',
        'algorithms/learning-journey/fundamentals/memory-management',
        'algorithms/learning-journey/fundamentals/concurrency',
        'algorithms/learning-journey/fundamentals/networking',
        'algorithms/learning-journey/fundamentals/abstraction-and-paradigms',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Algorithms',
      collapsed: false,
      items: [
        'algorithms/learning-journey/fundamentals/recursion',
        'algorithms/learning-journey/fundamentals/algorithms-and-complexity',
        'algorithms/learning-journey/fundamentals/math-prerequisites',
      ],
    },
  ],
},
```

---

## File-by-File Breakdown

### Hardware Foundations

#### `how-computers-work.md` — The Machine

**Goal:** Establish a mental model of the physical computer before diving into code.

**Topics:**
- The CPU, RAM, and storage trio
- What each component does and why we need all three
- Speed vs capacity tradeoffs (registers → cache → RAM → SSD → HDD)
- The fetch-decode-execute cycle (high-level)
- How data flows between components
- Why understanding hardware helps you write better software

---

#### `binary-basics.md` — The Language of Computers

**Goal:** Understand *why* everything is 1s and 0s and how binary works.

**Topics:**
- Why binary? (electricity = on/off, reliability)
- How transistors work (MOSFET basics, on/off states)
- Why not use more states? (noise immunity, reliability)
- The binary number system as a positional system
- Converting binary ↔ decimal (with practice exercises)
- Hexadecimal as a shorthand (why it maps perfectly to 4 bits)
- Bits and bytes—the fundamental units
- Larger units (KB, MB, GB) and why we use powers of 2

---

#### `representing-numbers.md` — Numbers in Binary

**Goal:** Understand how computers represent integers and decimals.

**Topics:**
- Unsigned integers (straightforward binary)
- The problem with negative numbers
- Sign-magnitude and its flaws (two zeros, broken addition)
- Two's complement: the elegant solution
  - How it works (invert and add 1)
  - Why it works (modular arithmetic, 2ⁿ - N)
  - Why addition "just works"
- Signed vs unsigned types (explicit control over range)
- Integer overflow and language-specific behavior
- Floating-point numbers (IEEE 754):
  - Scientific notation in binary
  - The format: sign, exponent, mantissa
  - Encoding step by step
  - When numbers cannot be represented exactly (0.1 + 0.2)
  - Error accumulation and catastrophic cancellation
  - Strategies for numerical stability
- Float vs double (precision and range)
- Common pitfalls: never use floats for money

---

#### `representing-text.md` — Text in Binary

**Goal:** Understand how characters and strings are encoded.

**Topics:**
- ASCII: the original standard (7-bit, 128 characters)
- ASCII tricks (case conversion, digit extraction)
- The limitation of ASCII (non-English characters)
- Unicode: the universal standard (code points)
- UTF-8: the practical encoding
  - Variable-length encoding (1-4 bytes)
  - Backwards compatibility with ASCII
  - How to determine byte length from leading bits
- String length surprises (UTF-16 code units vs characters)
- Practical implications for file I/O and network data

---

#### `logic-gates.md` — Boolean Algebra & Logic Gates

**Goal:** Understand the mathematical foundation of digital logic and how transistors implement Boolean operations.

**Topics:**
- Boolean algebra: AND, OR, NOT, XOR
- Truth tables and Boolean identities
- De Morgan's laws
- Circuits and voltage: the electrical foundation
- How transistors work as voltage-controlled switches
- Building gates from transistors: NOT, NAND, NOR
- Universal gates (NAND, NOR)
- Deriving AND, OR, XOR from NAND
- Gate symbols summary

---

#### `combinational-circuits.md` — Combining Gates for Computation

**Goal:** Show how logic gates combine to perform useful computations without memory.

**Topics:**
- What are combinational circuits (output depends only on current inputs)
- Arithmetic circuits:
  - The half-adder (XOR + AND)
  - The full-adder (handling carry-in)
  - Ripple-carry adder for multi-bit numbers
  - Subtraction via two's complement
- Comparison circuits:
  - Equality checker using XOR
  - Greater-than comparator
- Selection circuits:
  - The multiplexer (hardware if-else)
  - Demultiplexers and decoders
  - Memory addressing

---

#### `sequential-circuits.md` — Memory, State, and the CPU

**Goal:** Explain how circuits remember and how all components come together in the CPU.

**Topics:**
- The limitation of combinational circuits (no memory)
- Sequential circuits and feedback loops
- The SR latch: simplest memory element
- The D flip-flop: controlled memory
- The clock signal: synchronizing computation
- Registers: storing multiple bits
- State machines and how loops work in hardware
- The Arithmetic Logic Unit (ALU):
  - Operations and multiplexed output
  - Status flags (zero, negative, carry, overflow)
- The fetch-decode-execute cycle revisited
- Why this matters: bitwise operations in programming
- Practical applications of bitwise operations

---

#### `io-and-interrupts.md` — Communicating with the Outside World

**Goal:** Explain how the CPU interacts with external devices like keyboards, displays, and storage.

**Topics:**
- The I/O problem: CPUs are fast, devices are slow
- Device controllers and the I/O bus
- Polling: the simple but wasteful approach
- Interrupts: letting devices get the CPU's attention
  - The interrupt request (IRQ) line
  - Interrupt handlers and the interrupt vector table
  - Why interrupts enable multitasking
- Direct Memory Access (DMA): bypassing the CPU for bulk transfers
- Memory-mapped I/O vs. port-mapped I/O
- How a keystroke reaches your program (end-to-end example)
- Why this matters: understanding async operations and event-driven programming

---

### The Layers of Software

#### `assembly-basics.md` — The Bridge to Software

**Goal:** See what the CPU actually executes, making high-level languages feel less magical.

**Topics:**
- What is machine code vs assembly
- Assembly syntax basics (using x86 or ARM as examples)
- Core instruction categories:
  - Data movement (`MOV`, `LOAD`, `STORE`)
  - Arithmetic (`ADD`, `SUB`, `MUL`, `DIV`)
  - Logic (`AND`, `OR`, `XOR`, `NOT`)
  - Control flow (`JMP`, `CMP`, `JE`, `JNE`)
  - Stack operations (`PUSH`, `POP`, `CALL`, `RET`)
- Registers—the CPU's scratchpad
- A simple example: "Hello World" or adding two numbers
- How high-level code compiles down (side-by-side comparison)
- Why you (probably) won't write assembly, but should understand it

---

#### `operating-systems.md` — The Resource Manager

**Goal:** Understand the operating system as a coherent unit that solves fundamental problems of resource sharing and abstraction.

**Topics:**
- What is an operating system and why we need one
- The core problems an OS solves (overview):
  - Process management and multitasking
  - Memory management and virtual memory
  - File systems and persistent storage
  - I/O and device management
  - Security and protection
  - Networking
- Process management (detailed):
  - What is a process vs a program
  - Process states and lifecycle
  - Context switching and scheduling basics
  - Concurrency: threads, parallelism, and the illusion of simultaneity
- Memory virtualization (detailed):
  - Why programs think they have all the memory
  - Virtual vs physical addresses
  - Paging and page tables (conceptual)
- The kernel and system calls:
  - User mode vs kernel mode
  - How programs request OS services
  - The system call interface as an API
- How the pieces fit together:
  - The boot process (brief)
  - How an application runs from launch to termination
- Brief comparison of major OSes (Linux, Windows, macOS)

---

#### `programming-languages.md` — Abstracting the Machine

**Goal:** Understand what programming languages do for us and how they differ.

**Topics:**
- What is a programming language? (human-readable instructions → machine code)
- Compiled vs interpreted languages:
  - Compilation: source → machine code (C, Go, Rust)
  - Interpretation: source → executed line-by-line (Python, Ruby)
  - Hybrid: source → bytecode → VM (Java, JavaScript)
  - Tradeoffs: speed, portability, development experience
- The basic operations every language provides:
  - Input/Output (reading/writing data)
  - Variables and assignment
  - Arithmetic operations
  - Conditionals (if/else)
  - Loops (for/while)
  - Functions (reusable blocks of code)
- Static vs dynamic typing (brief intro)

---

#### `compilation.md` — From Source to Machine Code

**Goal:** Understand the compilation pipeline and how source code becomes an executable.

**Topics:**
- The compilation pipeline overview
- **Lexical analysis (lexing):**
  - Breaking source into tokens
  - What a token is (keywords, identifiers, literals, operators)
  - Regular expressions and finite automata (conceptual)
- **Parsing:**
  - Tokens → Abstract Syntax Tree (AST)
  - Grammar and syntax rules
  - Why syntax errors happen at this stage
- **Semantic analysis:**
  - Type checking and scope resolution
  - Symbol tables
  - Why "undefined variable" errors happen here
- **Intermediate representation (IR):**
  - Why not go straight to machine code
  - Platform independence at this stage
- **Optimization:**
  - Dead code elimination, constant folding, inlining
  - Why compilers sometimes produce surprising output
- **Code generation:**
  - IR → target assembly/machine code
  - Register allocation
- **Linking:**
  - Combining multiple object files
  - Static vs. dynamic linking
  - What `.dll` and `.so` files are
- **Loading:**
  - How the OS loads an executable into memory
  - The role of the loader
- Example: tracing a simple function through the pipeline

---

#### `interpretation.md` — Interpretation & Virtual Machines

**Goal:** Understand how interpreted languages work and the role of virtual machines.

**Topics:**
- The interpretation spectrum (pure interpretation → JIT compilation)
- **Pure interpretation:**
  - Reading and executing source directly
  - The interpreter loop: fetch instruction → decode → execute
  - Why it's slow (re-parsing, no optimization)
  - When it's still useful (scripting, REPLs)
- **Bytecode and virtual machines:**
  - Compiling to an intermediate format
  - What bytecode is (platform-independent instructions)
  - The virtual machine as a software CPU
  - Stack-based vs. register-based VMs
- **The Java model:**
  - `.java` → `.class` → JVM
  - Write once, run anywhere (and its limitations)
  - The classpath and JAR files
- **The JavaScript model:**
  - From interpretation to JIT (V8's evolution)
  - Hidden classes and inline caching (conceptual)
  - Why modern JS is surprisingly fast
- **The Python model:**
  - `.py` → `.pyc` → CPython VM
  - The Global Interpreter Lock (GIL) and why it matters
- **Just-In-Time (JIT) compilation:**
  - Compiling hot paths at runtime
  - Profiling and adaptive optimization
  - Why startup is slow but steady-state is fast
- Tradeoffs: compilation vs. interpretation
  - Startup time vs. peak performance
  - Static analysis vs. dynamic flexibility
  - Distribution (binaries vs. source)

---

#### `types-and-memory-layout.md` — How Data Lives in Memory

**Goal:** Understand where your data goes and common bugs that arise from not knowing.

**Topics:**
- Value types vs reference types
  - Value: data stored directly (primitives, structs in some languages)
  - Reference: data stored elsewhere, variable holds an address (objects, arrays)
- Stack vs heap (conceptual intro—details in next file)
- Memory layout of common types
- Common pitfalls:
  - Mutating shared references unexpectedly
  - Shallow vs deep copy
  - Comparing references vs values (`==` vs `.equals()`)
  - Null/undefined references
- Pass by value vs pass by reference
- Language-specific examples (JavaScript objects, Python lists, etc.)

---

#### `stack-and-heap.md` — Where Data Lives

**Goal:** Understand the two primary memory regions and when each is used.

**Topics:**
- Why two memory regions?
- The stack in depth:
  - LIFO structure and automatic allocation/deallocation
  - Stack frames and function calls
  - What goes on the stack (local variables, return addresses)
  - Stack overflow (recursion gone wrong)
  - Why the stack is fast
- The heap in depth:
  - Dynamic allocation for flexible-sized data
  - What goes on the heap (objects, arrays, long-lived data)
  - Fragmentation and its consequences
  - Why heap allocation is slower
- Stack vs heap: when to use each
- Visualizing memory layout of a running program

---

#### `memory-management.md` — Who Cleans Up?

**Goal:** Understand the different strategies for managing heap memory and their tradeoffs.

**Topics:**
- The core problem: heap memory must be explicitly managed
- Manual memory management:
  - `malloc` / `free` in C
  - Common bugs: memory leaks, dangling pointers, double-free, use-after-free
  - Why manual management is error-prone but fast
- Ownership and borrowing (Rust's approach):
  - Compile-time memory safety
  - The borrow checker concept
  - Why Rust is gaining popularity
- Garbage collection:
  - The idea: automatic memory reclamation
  - Reference counting (and its cycle problem)
  - Tracing collectors: mark-and-sweep
  - Generational GC (why most objects die young)
  - Tradeoffs: convenience vs predictability vs pause times
- How different languages handle memory:
  - C/C++: manual
  - Rust: ownership
  - Java/Go: tracing GC
  - Python: reference counting + cycle detection
  - JavaScript: tracing GC (V8's approach)
- Choosing the right approach for your use case

---

#### `concurrency.md` — Concurrency & Parallelism

**Goal:** Understand why concurrent programming is fundamentally different and what makes it challenging.

**Topics:**
- Why we need concurrency (multi-core CPUs, responsive UIs, I/O-bound work)
- **Concurrency vs. parallelism:**
  - Concurrency: dealing with multiple things (structure)
  - Parallelism: doing multiple things simultaneously (execution)
  - The restaurant kitchen analogy
- **Processes vs. threads (expanded from OS):**
  - Separate memory (processes) vs. shared memory (threads)
  - Cost of context switching
  - When to use each
- **The fundamental problem: shared mutable state:**
  - What happens when two threads access the same variable
  - Read-modify-write and the lost update problem
  - Why this doesn't happen in single-threaded code
- **Race conditions:**
  - What they are (outcome depends on timing)
  - Why they're hard to reproduce
  - The check-then-act pattern and its dangers
- **Synchronization primitives:**
  - Mutexes/locks: one thread at a time
  - Semaphores: counting access
  - The cost of synchronization (contention, overhead)
- **Deadlock:**
  - What it is (threads waiting for each other forever)
  - The dining philosophers problem
  - Conditions for deadlock and how to avoid it
- **Alternative models for safer concurrency:**
  - Immutability: if nothing changes, sharing is safe
  - Message passing: don't share memory, share messages (Go channels, Erlang actors)
  - The event loop model: concurrency without threads (Node.js)
- **Async/await (conceptual):**
  - Non-blocking I/O
  - Coroutines and cooperative multitasking
  - Why JavaScript uses this model
- Practical guidance: when to use threads vs. async vs. processes

---

#### `networking.md` — Networking Fundamentals

**Goal:** Understand how computers communicate over networks and how the internet works.

**Topics:**
- Why networking matters (the internet is the computer)
- **The layered model (simplified):**
  - Physical layer: electrical signals, cables, radio waves
  - Network layer: IP addresses, routing
  - Transport layer: TCP and UDP
  - Application layer: HTTP, DNS, etc.
  - Why layers? (abstraction and modularity)
- **IP addresses and routing:**
  - IPv4 vs. IPv6
  - Public vs. private addresses
  - How packets find their destination (conceptual)
- **Ports and sockets:**
  - Why we need ports (multiple services per machine)
  - What a socket is (endpoint for communication)
  - The socket API (conceptual: bind, listen, accept, connect)
- **TCP vs. UDP:**
  - Reliable, ordered delivery (TCP)
  - Fast, fire-and-forget (UDP)
  - When to use each
- **DNS: the internet's phone book:**
  - Domain names → IP addresses
  - DNS hierarchy and caching
  - Why DNS can be a performance bottleneck
- **HTTP: the language of the web:**
  - Request/response model
  - Methods (GET, POST, PUT, DELETE)
  - Headers, status codes, and bodies
  - HTTP/1.1 vs. HTTP/2 vs. HTTP/3 (brief)
- **How a web request works (end-to-end):**
  - DNS lookup → TCP connection → HTTP request → response
  - What "latency" really means
- **Servers and clients:**
  - What a server actually does (listen, accept, handle)
  - Handling multiple clients (threading, async, event loop)
  - Load balancers and reverse proxies (conceptual)
- Brief mention of HTTPS and TLS (security layer)

---

#### `abstraction-and-paradigms.md` — Organizing Complexity

**Goal:** Understand why we structure code the way we do, and the costs of abstraction.

**Topics:**
- What is abstraction and why it's essential
- Procedural programming (functions as building blocks)
- Object-Oriented Programming (OOP):
  - Classes and objects
  - Encapsulation, inheritance, polymorphism
  - When OOP shines (modeling real-world entities)
- Functional Programming (FP):
  - Pure functions, immutability
  - First-class functions, higher-order functions
  - When FP shines (data transformations, concurrency)
- The abstraction tradeoff:
  - Code reuse and maintainability benefits
  - Hidden complexity and performance costs
  - "Leaky abstractions"—when you need to understand what's underneath
- Practical guidance: choosing the right paradigm for the job

---

### Introduction to Algorithms

#### `recursion.md` — Recursion & the Call Stack

**Goal:** Understand recursion as a problem-solving technique and see how it uses the stack.

**Topics:**
- What is recursion? (a function that calls itself)
- Why recursion works: the call stack revisited
  - Each call gets its own stack frame
  - Local variables are independent per call
  - Visualizing the call stack growing and shrinking
- The anatomy of a recursive function:
  - Base case: when to stop
  - Recursive case: making progress toward the base case
  - Why forgetting the base case causes stack overflow
- Classic examples with stack traces:
  - Factorial
  - Fibonacci (and why the naive version is slow)
  - Sum of a list
- Thinking recursively:
  - "Assume the recursive call works" (leap of faith)
  - Breaking problems into smaller instances
- Recursion vs. iteration:
  - Any recursion can be converted to iteration (and vice versa)
  - When recursion is clearer (trees, nested structures)
  - When iteration is better (simple loops, performance)
- Tail recursion and optimization (brief)
- Stack overflow: when recursion goes too deep
- Preview: recursive complexity analysis

---

#### `algorithms-and-complexity.md` — Measuring Efficiency

**Goal:** Understand what algorithms are and how we measure their performance.

**Topics:**
- What is an algorithm? (step-by-step problem-solving procedure)
- Why efficiency matters (scaling from 100 to 1 million items)
- Big O notation:
  - What it measures (worst-case growth rate)
  - Common complexities with examples:
    - O(1) — constant
    - O(log n) — logarithmic
    - O(n) — linear
    - O(n log n) — linearithmic
    - O(n²) — quadratic
    - O(2ⁿ) — exponential
    - O(n!) — factorial
  - How to analyze simple code
- Time complexity vs space complexity
- Best case, average case, worst case
- Big Omega (Ω) and Big Theta (Θ) briefly
- Amortized analysis (brief intro)

---

#### `math-prerequisites.md` — Tools for Analysis

**Goal:** Reference sheet for mathematical concepts that appear frequently in CS.

**Topics:**
- Logarithms:
  - What they are (inverse of exponentiation)
  - Key properties (product, quotient, power rules)
  - Why log₂ appears everywhere in CS
- Exponents and powers of 2
- Factorials and their growth rate
- Permutations and combinations
- Summation formulas (1+2+...+n, geometric series)
- Modular arithmetic (mod operator, wrapping, hashing)
- Floor and ceiling functions
- Proof techniques (brief: induction, contradiction)

---

## Pedagogical Rationale

The order follows a **bottom-up approach**, organized into three categories:

1. **Hardware Foundations** (8 files): Establishes *why* things work the way they do
   - Physical hardware (CPU, RAM, storage)
   - Binary representation and why computers use it
   - How numbers and text are encoded
   - Logic gates, combinational circuits, and sequential circuits
   - How the CPU communicates with external devices

2. **The Layers of Software** (11 files): Bridges hardware to high-level programming
   - Assembly as the lowest software layer
   - Operating systems as the resource manager
   - How programming languages abstract the machine
   - The compilation and interpretation pipelines
   - Types, memory layout, stack and heap
   - Memory management strategies
   - Concurrency and parallelism
   - Networking fundamentals
   - Abstraction and programming paradigms

3. **Introduction to Algorithms** (3 files): How we solve problems and measure efficiency
   - Recursion as a fundamental technique
   - Algorithm analysis and Big O notation
   - Mathematical tools for understanding complexity

This way, when readers reach Big O notation, they already understand *why* certain operations are faster (memory access patterns, CPU cycles, OS scheduling) rather than just memorizing "O(n) is slower than O(log n)."

---

## Progress Tracker

### Hardware Foundations

| File | Status | Notes |
|------|--------|-------|
| `how-computers-work.md` | Complete | |
| `binary-basics.md` | Complete | Split from original binary-and-data.md |
| `representing-numbers.md` | Complete | Split from original binary-and-data.md |
| `representing-text.md` | Complete | Split from original binary-and-data.md |
| `logic-gates.md` | Complete | Split into 3 articles |
| `combinational-circuits.md` | Complete | Split from original logic-gates.md |
| `sequential-circuits.md` | Complete | Split from original logic-gates.md |
| `io-and-interrupts.md` | Not started | New article |

### The Layers of Software

| File | Status | Notes |
|------|--------|-------|
| `assembly-basics.md` | Not started | |
| `operating-systems.md` | Not started | |
| `programming-languages.md` | Not started | |
| `compilation.md` | Not started | New article |
| `interpretation.md` | Not started | New article |
| `types-and-memory-layout.md` | Not started | |
| `stack-and-heap.md` | Not started | |
| `memory-management.md` | Not started | |
| `concurrency.md` | Not started | New article |
| `networking.md` | Not started | New article |
| `abstraction-and-paradigms.md` | Not started | |

### Introduction to Algorithms

| File | Status | Notes |
|------|--------|-------|
| `recursion.md` | Not started | New article |
| `algorithms-and-complexity.md` | Not started | Existing `big-o-notation.md` to be replaced |
| `math-prerequisites.md` | Not started | Existing placeholder to be replaced |
