---
title: Sequential Circuits & the CPU
---
## From Computation to Memory

In the previous two articles, we built up from Boolean algebra to logic gates, and from gates to combinational circuits that perform arithmetic, comparison, and selection. These circuits are powerful, but they share a fundamental limitation: **they have no memory**. The output depends only on the current inputs. The moment the inputs change, the output changes. There is no way to store information, count events, or remember what happened one nanosecond ago.

To build a computer that can execute programs, we need circuits that can *remember*. This is the domain of **sequential circuits**, and they form the foundation of memory, registers, and everything that makes a computer more than a fancy calculator.

This article completes our journey from transistors to the thinking machine. We will explore how feedback creates memory, how the clock synchronizes computation, and how the ALU brings everything together. By the end, you will understand not just how computers compute, but why the bitwise operations in your code work the way they do.

## The Key Insight: Feedback

The secret to memory is **feedback**: connecting a circuit's output back to its input. This creates a loop where the circuit can maintain a state even after the original input is removed.

Consider what happens when we connect two NOT gates in a loop:

```
┌─────────────────────────────────────────────────────────────────┐
│                     UNSTABLE FEEDBACK                           │
│                                                                 │
│         ┌─────┐         ┌─────┐                                │
│         │ NOT ├────────►│ NOT ├───────┐                        │
│         └──▲──┘         └─────┘       │                        │
│            │                          │                        │
│            └──────────────────────────┘                        │
│                                                                 │
│   This oscillates! It cannot settle on a stable value.         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This oscillates endlessly. But with the right combination of gates, we can create stable feedback loops.

## The SR Latch: Simplest Memory

The **SR latch** (Set-Reset latch) is the simplest memory element. It has two inputs: Set (S) and Reset (R), and two complementary outputs: Q and Q̅ (Q-bar, the inverse of Q).

```
┌─────────────────────────────────────────────────────────────────┐
│                         SR LATCH                                │
│                       (using NOR gates)                         │
│                                                                 │
│                      ┌─────┐                                    │
│      R ─────────────►│     │                                    │
│                      │ NOR ├─────┬──────────────────► Q         │
│               ┌─────►│     │     │                              │
│               │      └─────┘     │                              │
│               │                  │                              │
│               │      ┌─────┐     │                              │
│               │  ┌──►│     │     │                              │
│               │  │   │ NOR ├─────┼──────────────────► Q̅        │
│      S ───────┼──┼──►│     │     │                              │
│               │  │   └─────┘     │                              │
│               │  │               │                              │
│               │  └───────────────┘  (cross-coupled feedback)    │
│               │                  │                              │
│               └──────────────────┘                              │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  S │ R │ Q (next) │ Action                              │   │
│   ├───┼───┼──────────┼───────────────────────────────────────┤  │
│   │ 0 │ 0 │ Q (hold) │ Maintain current state               │   │
│   │ 1 │ 0 │    1     │ SET: Q becomes 1                     │   │
│   │ 0 │ 1 │    0     │ RESET: Q becomes 0                   │   │
│   │ 1 │ 1 │ invalid  │ FORBIDDEN: undefined behavior        │   │
│   └───┴───┴──────────┴───────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Here is the magic: when both S and R are 0, the latch *holds its current value*. The cross-coupled feedback maintains the state indefinitely. To change the state, we briefly pulse S (to set Q to 1) or R (to reset Q to 0).

This is memory. We can write a value and it persists until we explicitly change it.

## The D Flip-Flop: Controlled Memory

The SR latch has a problem: we must be careful never to set both S and R to 1 simultaneously. The **D flip-flop** solves this by having a single data input (D) and a clock input (CLK).

```
┌─────────────────────────────────────────────────────────────────┐
│                       D FLIP-FLOP                               │
│                                                                 │
│                   ┌───────────────┐                             │
│      D ──────────►│               │                             │
│                   │  D Flip-Flop  ├──────────────► Q            │
│      CLK ────────►│               │                             │
│                   │      (edge    ├──────────────► Q̅           │
│                   │    triggered) │                             │
│                   └───────────────┘                             │
│                                                                 │
│   Behavior:                                                     │
│   - Q only changes at the rising edge of CLK                    │
│   - At that moment, Q takes the value of D                      │
│   - Between clock edges, Q holds its value regardless of D      │
│                                                                 │
│   Timing diagram:                                               │
│                                                                 │
│   CLK  ─────┐     ┌─────┐     ┌─────┐     ┌─────               │
│             └─────┘     └─────┘     └─────┘                     │
│                 ↑           ↑           ↑                       │
│   D    ═══1═══════════0═══════════1═══════════                  │
│                                                                 │
│   Q    ═══?═══1═══════════0═══════════1═══════  (captures D     │
│               ↑           ↑           ↑          at each edge)  │
│            captured    captured    captured                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The D flip-flop captures the value of D at each clock edge and holds it until the next edge. This makes it predictable and safe: changes only happen at well-defined moments.

## The Clock: The Heartbeat of the Computer

The **clock** is a signal that oscillates between 0 and 1 at a fixed frequency. It synchronizes all operations in the computer, ensuring that circuits have settled to stable values before the next operation begins.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOCK SIGNAL                             │
│                                                                 │
│         ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐                  │
│   CLK   │   │   │   │   │   │   │   │   │   │                  │
│      ───┘   └───┘   └───┘   └───┘   └───┘   └───                │
│                                                                 │
│         │←──────────────────────────────────────────────────    │
│                    One clock cycle                              │
│                                                                 │
│   Frequency examples:                                           │
│   - 1 MHz  = 1 million cycles per second                        │
│   - 1 GHz  = 1 billion cycles per second                        │
│   - 3 GHz  = 3 billion cycles per second (typical modern CPU)   │
│                                                                 │
│   At 3 GHz, each cycle lasts about 0.33 nanoseconds.            │
│   Light travels only 10 cm in that time.                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

When you hear that a CPU runs at "3 GHz," this is the clock frequency: 3 billion ticks per second. Each tick advances the state of the machine by one step.

:::info Why Clocks Matter
Without a clock, circuits would be chaotic. Different gates have slightly different delays; signals arrive at different times. The clock provides a "wait for everyone" mechanism. All flip-flops update simultaneously at the clock edge, after all combinational logic has settled. This transforms an analog mess into a clean digital abstraction.
:::

## Registers: Storing Multiple Bits

A **register** is simply a group of flip-flops that store multiple bits. An 8-bit register contains 8 D flip-flops, all sharing the same clock. When the clock ticks, all 8 bits are captured simultaneously.

```
┌─────────────────────────────────────────────────────────────────┐
│                      8-BIT REGISTER                             │
│                                                                 │
│   D7  D6  D5  D4  D3  D2  D1  D0     (8-bit input)             │
│    │   │   │   │   │   │   │   │                               │
│    ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼                               │
│   ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐                             │
│   │FF││FF││FF││FF││FF││FF││FF││FF│    (8 D flip-flops)         │
│   └┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘                             │
│    │   │   │   │   │   │   │   │                               │
│    ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼                               │
│   Q7  Q6  Q5  Q4  Q3  Q2  Q1  Q0     (8-bit output)            │
│                                                                 │
│              ▲                                                  │
│              │                                                  │
│             CLK (shared clock - all bits update together)       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

CPUs contain many registers: general-purpose registers for computation, the program counter (PC) that tracks the current instruction, the instruction register (IR) that holds the current instruction, and many more.

## How Sequential Circuits Enable Loops

With memory, we can finally implement loops. Consider a simple counter that increments each clock cycle:

```
┌─────────────────────────────────────────────────────────────────┐
│                       4-BIT COUNTER                             │
│                                                                 │
│                    ┌────────────┐                               │
│                    │            │                               │
│               ┌───►│   ADDER    ├───┐                           │
│               │    │   (+1)     │   │                           │
│               │    └────────────┘   │                           │
│               │                     │                           │
│               │    ┌────────────┐   │                           │
│               │    │            │   │                           │
│               └────┤  REGISTER  │◄──┘                           │
│                    │            │                               │
│                    └─────┬──────┘                               │
│                          │                                      │
│                          ▼                                      │
│                    COUNT OUTPUT                                 │
│                                                                 │
│   CLK ──────────────────►                                       │
│                                                                 │
│   Each clock cycle:                                             │
│   1. Current count is read from register                        │
│   2. Adder computes count + 1                                   │
│   3. Result is stored back in register                          │
│   4. Output shows the new count                                 │
│                                                                 │
│   Sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,   │
│            15, 0, 1, 2, ... (wraps at 16)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This is the hardware equivalent of:

```javascript
let count = 0;
while (true) {
    count = count + 1;
}
```

The register stores the current state. The adder computes the next state. The clock advances from one state to the next. **Loops in software become feedback loops in hardware.**

## State Machines: The Foundation of Control

More generally, sequential circuits implement **finite state machines** (FSMs). A state machine has:
- A set of possible states (stored in registers)
- Transition rules (combinational logic that computes the next state)
- A clock that advances from state to state

```
┌─────────────────────────────────────────────────────────────────┐
│                  FINITE STATE MACHINE                           │
│                                                                 │
│                         ┌─────────────────┐                     │
│                         │                 │                     │
│   Inputs ──────────────►│  Combinational  ├──────────► Outputs  │
│                         │     Logic       │                     │
│              ┌─────────►│  (next state    │                     │
│              │          │   + output)     │                     │
│              │          └────────┬────────┘                     │
│              │                   │                              │
│              │          ┌────────▼────────┐                     │
│              │          │                 │                     │
│              └──────────┤    Registers    │                     │
│                         │  (current state)│                     │
│                         └────────▲────────┘                     │
│                                  │                              │
│                                 CLK                             │
│                                                                 │
│   The CPU itself is a complex state machine:                    │
│   - State includes registers, flags, program counter            │
│   - Inputs include current instruction and data                 │
│   - Outputs include control signals and results                 │
│   - Each clock cycle advances to the next state                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The CPU is essentially a very large state machine. Each instruction changes the state (registers, memory, program counter), and the clock advances execution one step at a time.

<details>
<summary>Practice: How many flip-flops would you need to build a counter that counts from 0 to 255?</summary>

255 in binary is 11111111, which requires 8 bits.

You need **8 flip-flops** (one 8-bit register).

More generally, to count from 0 to N, you need ⌈log₂(N+1)⌉ flip-flops.

</details>

## The Arithmetic Logic Unit: Bringing It All Together

We have now seen individual circuits for addition, comparison, and selection. The **Arithmetic Logic Unit (ALU)** combines these into a single, versatile component that can perform many operations on command.

### What an ALU Does

An ALU takes two data inputs (A and B), an operation selector, and produces a result along with status flags:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARITHMETIC LOGIC UNIT                        │
│                                                                 │
│                      ┌──────────────────┐                       │
│   A (operand 1) ────►│                  │                       │
│                      │                  ├─────► Result          │
│   B (operand 2) ────►│       ALU        │                       │
│                      │                  ├─────► Zero flag       │
│   Op (operation) ───►│                  ├─────► Negative flag   │
│                      │                  ├─────► Carry flag      │
│                      │                  ├─────► Overflow flag   │
│                      └──────────────────┘                       │
│                                                                 │
│   Typical operations (selected by Op):                          │
│                                                                 │
│   Arithmetic:              Logic:                               │
│   - ADD  (A + B)           - AND  (A & B)                       │
│   - SUB  (A - B)           - OR   (A | B)                       │
│   - INC  (A + 1)           - XOR  (A ^ B)                       │
│   - DEC  (A - 1)           - NOT  (~A)                          │
│                                                                 │
│   Comparison & Shifts:                                          │
│   - CMP  (compare A and B, set flags)                           │
│   - SHL  (shift left)                                           │
│   - SHR  (shift right)                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Inside the ALU

Internally, the ALU contains circuits for each operation, and a multiplexer selects which result to output:

```
┌─────────────────────────────────────────────────────────────────┐
│                      ALU INTERNAL STRUCTURE                     │
│                                                                 │
│       A ───────┬────────┬────────┬────────┬─────────            │
│                │        │        │        │                     │
│       B ───────┼────────┼────────┼────────┼─────────            │
│                │        │        │        │                     │
│                ▼        ▼        ▼        ▼                     │
│           ┌────────┐┌───────┐┌───────┐┌───────┐                │
│           │ ADDER/ ││  AND  ││  OR   ││  XOR  │ ...            │
│           │  SUB   ││       ││       ││       │                │
│           └───┬────┘└───┬───┘└───┬───┘└───┬───┘                │
│               │         │        │        │                     │
│               ▼         ▼        ▼        ▼                     │
│           ┌─────────────────────────────────────┐               │
│           │                                     │               │
│    Op ───►│            MULTIPLEXER              ├───► Result    │
│           │        (selects one result)         │               │
│           │                                     │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│   All operations are computed in parallel.                      │
│   The multiplexer simply chooses which one to output.           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This is why the ALU is so fast: all operations happen simultaneously in dedicated circuits. The multiplexer just picks the right answer. There is no "if this operation, do this calculation." Everything is computed; we just select what we need.

### Status Flags

The flags that the ALU outputs are crucial for control flow:

- **Zero flag (Z):** Set when the result is zero. Used for equality checks.
- **Negative flag (N):** Set when the result is negative (highest bit is 1 in two's complement).
- **Carry flag (C):** Set when an arithmetic operation produces a carry out.
- **Overflow flag (V):** Set when signed arithmetic overflows.

These flags are how hardware implements comparisons. When you write `if (a == b)`, the CPU:
1. Computes `a - b` in the ALU
2. Checks if the Zero flag is set
3. Uses that to decide which code path to take

## The Fetch-Decode-Execute Cycle Revisited

With the ALU in place, we can now understand the complete cycle we introduced in "How Computers Work":

```
┌─────────────────────────────────────────────────────────────────┐
│                  FETCH-DECODE-EXECUTE CYCLE                     │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  1. FETCH                                                │  │
│   │     ┌────────────────────────────────────────────────┐   │  │
│   │     │ Read instruction from memory at address in PC  │   │  │
│   │     │ Store instruction in Instruction Register (IR) │   │  │
│   │     │ Increment PC to point to next instruction      │   │  │
│   │     └────────────────────────────────────────────────┘   │  │
│   │                           │                              │  │
│   │                           ▼                              │  │
│   │  2. DECODE                                               │  │
│   │     ┌────────────────────────────────────────────────┐   │  │
│   │     │ Interpret the instruction in IR                │   │  │
│   │     │ Determine: What operation? Which registers?    │   │  │
│   │     │ Generate control signals for ALU & registers   │   │  │
│   │     └────────────────────────────────────────────────┘   │  │
│   │                           │                              │  │
│   │                           ▼                              │  │
│   │  3. EXECUTE                                              │  │
│   │     ┌────────────────────────────────────────────────┐   │  │
│   │     │ Feed operands to ALU                           │   │  │
│   │     │ ALU performs the operation                     │   │  │
│   │     │ Store result in destination register/memory    │   │  │
│   │     │ Update flags based on result                   │   │  │
│   │     └────────────────────────────────────────────────┘   │  │
│   │                           │                              │  │
│   └───────────────────────────┼──────────────────────────────┘  │
│                               │                                 │
│                               └──────────────┐                  │
│                                              │                  │
│                                    (repeat forever)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Every instruction, from simple addition to complex function calls, follows this cycle. The PC register tracks where we are in the program. The decoder figures out what to do. The ALU (and other circuits) do the work. The clock advances us to the next instruction.

**This is how software becomes behavior.** A program is just a sequence of numbers in memory. The CPU reads each number, interprets it as an instruction, and executes it. Loops become jumps that modify the PC. Conditionals become comparisons that set flags, followed by conditional jumps that check those flags.

## Why This Matters: Bitwise Operations in Programming

Everything we have discussed is not merely academic. The logic gates inside your CPU are directly exposed to you as a programmer through **bitwise operations**.

### Bitwise Operators

Every programming language provides operators that perform Boolean operations on each bit of a number:

```javascript
// Bitwise AND: each bit is ANDed
0b1100 & 0b1010  // = 0b1000 (8 in decimal)

// Bitwise OR: each bit is ORed
0b1100 | 0b1010  // = 0b1110 (14 in decimal)

// Bitwise XOR: each bit is XORed
0b1100 ^ 0b1010  // = 0b0110 (6 in decimal)

// Bitwise NOT: each bit is inverted
~0b00001100      // = 0b11110011 (in 8-bit representation)

// Left shift: multiply by 2
0b0011 << 1      // = 0b0110 (shift left by 1 = multiply by 2)

// Right shift: divide by 2
0b1100 >> 1      // = 0b0110 (shift right by 1 = divide by 2)
```

These operations map directly to hardware gates. When you write `a & b`, the CPU literally performs AND on each pair of bits using AND gates.

### Practical Applications

Bitwise operations have many practical uses:

#### Bit Flags and Permissions

Store multiple boolean values in a single integer:

```javascript
// Define permission flags (each is a power of 2)
const READ    = 0b0001;  // 1
const WRITE   = 0b0010;  // 2
const EXECUTE = 0b0100;  // 4
const DELETE  = 0b1000;  // 8

// Combine permissions with OR
let userPermissions = READ | WRITE;  // 0b0011

// Check permission with AND
if (userPermissions & EXECUTE) {
    console.log("Can execute");
} else {
    console.log("Cannot execute");  // This runs
}

// Add permission with OR
userPermissions = userPermissions | EXECUTE;  // 0b0111

// Remove permission with AND and NOT
userPermissions = userPermissions & ~WRITE;   // 0b0101
```

#### Masking

Extract specific bits from a value:

```javascript
// Extract the lower 4 bits (0-15) from a byte
let value = 0b11010110;
let lowerNibble = value & 0b00001111;  // 0b0110 = 6

// Extract the upper 4 bits
let upperNibble = (value >> 4) & 0b00001111;  // 0b1101 = 13
```

#### Fast Arithmetic

Certain operations are faster with bit manipulation:

```javascript
// Multiply by 2: left shift
let n = 5;
let doubled = n << 1;  // 10

// Divide by 2: right shift
let halved = n >> 1;   // 2 (integer division)

// Check if even: test lowest bit
let isEven = (n & 1) === 0;  // true if even

// Swap two values without a temporary variable (using XOR)
let a = 5, b = 3;
a = a ^ b;  // a = 6
b = a ^ b;  // b = 5
a = a ^ b;  // a = 3
// Now a = 3, b = 5
```

:::tip When to Use Bitwise Operations
Bitwise operations are powerful but can reduce code readability. Use them when:
- Working with hardware, protocols, or file formats that use bit flags
- Performance is critical and profiling shows a bottleneck
- The domain naturally involves bits (graphics, cryptography, compression)

For general-purpose code, prefer clarity over clever bit tricks.
:::

## Key Takeaways

1. **Sequential circuits add memory through feedback.** Connecting outputs back to inputs creates stable states that persist until explicitly changed.

2. **Flip-flops store single bits; registers store words.** The D flip-flop captures data at clock edges, making storage predictable and synchronized.

3. **The clock synchronizes everything.** It transforms chaotic analog behavior into clean digital steps, advancing the entire machine in lockstep.

4. **State machines model computation.** The CPU is a large state machine: current state in registers, next state computed by combinational logic, clock advancing through states.

5. **The ALU is the computational core.** It performs all arithmetic and logic operations in parallel, with a multiplexer selecting the result. Flags enable conditional branching.

6. **Bitwise operations in code are direct hardware operations.** Understanding gates helps you understand why bit manipulation is fast and how to use it effectively.

## Looking Ahead

We have now traveled from the abstract mathematics of Boolean algebra down to the physical transistors, and back up to the complete CPU executing the fetch-decode-execute cycle. You understand how circuits add, compare, select, and remember.

But a CPU executing one instruction at a time seems limiting. How do we go from individual instructions to the rich programs we write today? In the next article, we will explore **assembly language**: the thin layer between hardware and software where human-readable instructions map directly to the binary patterns that control the CPU. This will reveal how loops, functions, and conditionals actually look when they are about to become electricity.
