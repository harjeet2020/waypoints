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

| Order | Filename                   | Sidebar Label        |
|-------|----------------------------|----------------------|
| 1     | `how-computers-work.md`    | How Computers Work   |
| 2     | `binary-basics.md`         | Binary Basics        |
| 3     | `representing-numbers.md`  | Representing Numbers |
| 4     | `representing-text.md`     | Representing Text    |
| 5     | `logic-gates.md`           | Logic Gates          |

### The Layers of Software

The bridge from hardware to high-level programming.

| Order | Filename                     | Sidebar Label           |
|-------|------------------------------|-------------------------|
| 1     | `assembly-basics.md`         | Assembly Basics         |
| 2     | `programming-languages.md`   | Programming Languages   |
| 3     | `types-and-memory-layout.md` | Types & Memory Layout   |
| 4     | `memory-management.md`       | Memory Management       |
| 5     | `abstraction-and-paradigms.md` | Abstraction & Paradigms |

### Introduction to Algorithms

Measuring efficiency and the math behind it.

| Order | Filename                     | Sidebar Label           |
|-------|------------------------------|-------------------------|
| 1     | `algorithms-and-complexity.md` | Algorithms & Complexity |
| 2     | `math-prerequisites.md`      | Math Prerequisites      |

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
      ],
    },
    {
      type: 'category',
      label: 'The Layers of Software',
      collapsed: false,
      items: [
        'algorithms/learning-journey/fundamentals/assembly-basics',
        'algorithms/learning-journey/fundamentals/programming-languages',
        'algorithms/learning-journey/fundamentals/types-and-memory-layout',
        'algorithms/learning-journey/fundamentals/memory-management',
        'algorithms/learning-journey/fundamentals/abstraction-and-paradigms',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Algorithms',
      collapsed: false,
      items: [
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

#### `logic-gates.md` — How Hardware Computes

**Goal:** Demystify how electronic circuits can "think."

**Topics:**
- Boolean algebra recap (AND, OR, NOT, XOR)
- Logic gates as physical components
- Truth tables
- Building blocks from gates:
  - **Assignment:** How flip-flops store a bit
  - **Comparison:** Building an equality checker
  - **Arithmetic:** The half-adder and full-adder
  - **Conditionals:** Multiplexers for "if" logic
  - **Loops:** Clock signals and sequential circuits
- From gates to ALU (arithmetic logic unit)
- Why this matters: understanding bitwise operations

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

#### `memory-management.md` — Who Cleans Up?

**Goal:** Understand how programs manage memory and why it matters for performance.

**Topics:**
- The stack in depth:
  - LIFO structure, automatic allocation/deallocation
  - Stack frames and function calls
  - Stack overflow (recursion gone wrong)
- The heap in depth:
  - Dynamic allocation, flexible but costly
  - Fragmentation
- Manual memory management:
  - `malloc` / `free` in C
  - Ownership and borrowing (Rust's approach)
  - Common bugs: memory leaks, dangling pointers, double-free
- Garbage collection:
  - Reference counting
  - Mark-and-sweep
  - Generational GC
  - Tradeoffs: convenience vs predictability vs pause times
- How JavaScript/Python/Java handle memory (brief comparison)

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

1. **Hardware Foundations** (5 files): Establishes *why* things work the way they do
   - Physical hardware (CPU, RAM, storage)
   - Binary representation and why computers use it
   - How numbers and text are encoded
   - Logic gates and how hardware computes

2. **The Layers of Software** (5 files): Bridges hardware to high-level programming
   - Assembly as the lowest software layer
   - How programming languages abstract the machine
   - Types, memory layout, and memory management
   - Abstraction and programming paradigms

3. **Introduction to Algorithms** (2 files): How we measure and improve
   - Algorithm analysis and Big O notation
   - Mathematical tools for understanding complexity

This way, when readers reach Big O notation, they already understand *why* certain operations are faster (memory access patterns, CPU cycles) rather than just memorizing "O(n) is slower than O(log n)."

---

## Progress Tracker

### Hardware Foundations

| File | Status | Notes |
|------|--------|-------|
| `how-computers-work.md` | Complete | |
| `binary-basics.md` | In progress | Split from original binary-and-data.md |
| `representing-numbers.md` | In progress | Split from original binary-and-data.md |
| `representing-text.md` | In progress | Split from original binary-and-data.md |
| `logic-gates.md` | Not started | |

### The Layers of Software

| File | Status | Notes |
|------|--------|-------|
| `assembly-basics.md` | Not started | |
| `programming-languages.md` | Not started | |
| `types-and-memory-layout.md` | Not started | |
| `memory-management.md` | Not started | Existing placeholder to be replaced |
| `abstraction-and-paradigms.md` | Not started | |

### Introduction to Algorithms

| File | Status | Notes |
|------|--------|-------|
| `algorithms-and-complexity.md` | Not started | Existing `big-o-notation.md` to be replaced |
| `math-prerequisites.md` | Not started | Existing placeholder to be replaced |
