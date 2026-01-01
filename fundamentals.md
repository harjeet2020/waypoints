# Fundamentals Section Outline

## Section Goal

Provide a comprehensive, bottom-up understanding of how computers operate—from physical hardware to abstract programming concepts. By the end of this section, readers will understand *why* things work the way they do, not just *how* to use them. This foundation makes everything that follows (data structures, algorithms, language-specific concepts) more intuitive.

---

## File Structure

All files live in:
```
docs/algorithms/learning-journey/fundamentals/
```

| Order | Filename                         | Sidebar Label              |
|-------|----------------------------------|----------------------------|
| 1     | `01-how-computers-work.md`       | How Computers Work         |
| 2     | `02-binary-and-data.md`          | Binary & Data              |
| 3     | `03-logic-gates.md`              | Logic Gates                |
| 4     | `04-assembly-basics.md`          | Assembly Basics            |
| 5     | `05-programming-languages.md`    | Programming Languages      |
| 6     | `06-types-and-memory-layout.md`  | Types & Memory Layout      |
| 7     | `07-memory-management.md`        | Memory Management          |
| 8     | `08-abstraction-and-paradigms.md`| Abstraction & Paradigms    |
| 9     | `09-algorithms-and-complexity.md`| Algorithms & Complexity    |
| 10    | `10-math-prerequisites.md`       | Math Prerequisites         |

---

## Sidebar Configuration

Update `sidebars.js` to include:

```js
{
  type: 'category',
  label: 'Fundamentals',
  collapsed: false,
  items: [
    'algorithms/learning-journey/fundamentals/01-how-computers-work',
    'algorithms/learning-journey/fundamentals/02-binary-and-data',
    'algorithms/learning-journey/fundamentals/03-logic-gates',
    'algorithms/learning-journey/fundamentals/04-assembly-basics',
    'algorithms/learning-journey/fundamentals/05-programming-languages',
    'algorithms/learning-journey/fundamentals/06-types-and-memory-layout',
    'algorithms/learning-journey/fundamentals/07-memory-management',
    'algorithms/learning-journey/fundamentals/08-abstraction-and-paradigms',
    'algorithms/learning-journey/fundamentals/09-algorithms-and-complexity',
    'algorithms/learning-journey/fundamentals/10-math-prerequisites',
  ],
},
```

---

## File-by-File Breakdown

### 1. `01-how-computers-work.md` — The Machine

**Goal:** Establish a mental model of the physical computer before diving into code.

**Topics:**
- The CPU, RAM, and storage trio
- What each component does and why we need all three
- Speed vs capacity tradeoffs (registers → cache → RAM → SSD → HDD)
- The fetch-decode-execute cycle (high-level)
- How data flows between components
- Why understanding hardware helps you write better software

---

### 2. `02-binary-and-data.md` — The Language of Computers

**Goal:** Understand *why* everything is 1s and 0s and how data is represented.

**Topics:**
- Why binary? (electricity = on/off, reliability)
- Bits and bytes—the fundamental units
- Converting binary ↔ decimal (with practice exercises)
- Hexadecimal as a shorthand
- How negative numbers work (two's complement)
- Floating-point numbers (brief intro to IEEE 754 quirks)
- Primitive data types and their typical sizes:
  - `boolean` (1 bit conceptually, 1 byte in practice)
  - `char` (1-4 bytes depending on encoding)
  - `int` / `short` / `long` (2/4/8 bytes)
  - `float` / `double` (4/8 bytes)
- ASCII and Unicode basics

---

### 3. `03-logic-gates.md` — How Hardware Computes

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

### 4. `04-assembly-basics.md` — The Bridge to Software

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

### 5. `05-programming-languages.md` — Abstracting the Machine

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

### 6. `06-types-and-memory-layout.md` — How Data Lives in Memory

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

### 7. `07-memory-management.md` — Who Cleans Up?

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

### 8. `08-abstraction-and-paradigms.md` — Organizing Complexity

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

### 9. `09-algorithms-and-complexity.md` — Measuring Efficiency

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

### 10. `10-math-prerequisites.md` — Tools for Analysis

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

The order follows a **bottom-up approach**:

1. **Hardware first** (files 1-3): Establishes *why* things work the way they do
2. **Assembly as a bridge** (file 4): Connects hardware to software
3. **Languages and types** (files 5-7): How we write and organize data
4. **Abstraction** (file 8): How we manage complexity
5. **Analysis** (files 9-10): How we measure and improve

This way, when readers reach Big O notation, they already understand *why* certain operations are faster (memory access patterns, CPU cycles) rather than just memorizing "O(n) is slower than O(log n)."

---

## Progress Tracker

| File | Status | Notes |
|------|--------|-------|
| `01-how-computers-work.md` | Not started | |
| `02-binary-and-data.md` | Not started | |
| `03-logic-gates.md` | Not started | |
| `04-assembly-basics.md` | Not started | |
| `05-programming-languages.md` | Not started | |
| `06-types-and-memory-layout.md` | Not started | |
| `07-memory-management.md` | Not started | Existing placeholder to be replaced |
| `08-abstraction-and-paradigms.md` | Not started | |
| `09-algorithms-and-complexity.md` | Not started | Existing `big-o-notation.md` to be replaced |
| `10-math-prerequisites.md` | Not started | Existing placeholder to be replaced |
