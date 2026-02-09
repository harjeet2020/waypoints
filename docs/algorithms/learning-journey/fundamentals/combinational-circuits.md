---
title: Combinational Circuits
---
## Gates Working Together

A NOT gate inverts. An AND gate conjoins. An OR gate disjoins. Individually, each performs something almost trivially simple. The power of logic gates lies not in what they do alone, but in what they can do together.

This article explores **combinational circuits**: circuits built by wiring gates together, where the output depends only on the current inputs. No memory, no stored state, no sense of time. Change the inputs and the output follows within nanoseconds. Despite this simplicity, combinational circuits are the computational workhorses of every processor. By the end, you will see the hardware behind `+`, `==`, and `if-else`.

## Arithmetic: The Half-Adder

The most fundamental arithmetic operation is addition. How do we add two binary digits?

When we add two single bits, we get two outputs:
- The **sum** (the rightmost digit of the result)
- The **carry** (the digit that overflows to the next column)

```
  0     0     1     1
+ 0   + 1   + 0   + 1
───   ───   ───   ───
  0     1     1    10
  ↑     ↑     ↑    ↑↑
 sum   sum   sum   ││
                   │└── sum = 0
                   └─── carry = 1
```

Let us tabulate this:

```
┌───┬───┬───────┬───────┐
│ A │ B │  Sum  │ Carry │
├───┼───┼───────┼───────┤
│ 0 │ 0 │   0   │   0   │
│ 0 │ 1 │   1   │   0   │
│ 1 │ 0 │   1   │   0   │
│ 1 │ 1 │   0   │   1   │
└───┴───┴───────┴───────┘
```

Look carefully at these columns. The **Sum** column matches the XOR truth table exactly. The **Carry** column matches AND. This is not a coincidence; it is the elegant heart of binary arithmetic.

```
┌─────────────────────────────────────────────────────────────────┐
│                        HALF-ADDER                               │
│                                                                 │
│                    ┌─────┐                                      │
│      A ───────┬────┤ XOR ├──────────── Sum                      │
│               │    └─────┘                                      │
│               │        ▲                                        │
│               │        │                                        │
│      B ───────┼────────┴────┐                                   │
│               │             │                                   │
│               │    ┌─────┐  │                                   │
│               └────┤ AND ├──┴───────── Carry                    │
│                    └─────┘                                      │
│                        ▲                                        │
│                        │                                        │
│      B ────────────────┘                                        │
│                                                                 │
│                                                                 │
│   Simplified diagram:                                           │
│                                                                 │
│               ┌─────┐                                           │
│      A ──┬────┤ XOR ├──── Sum                                   │
│          │    └─────┘                                           │
│      B ──┼──┬───┘                                               │
│          │  │                                                   │
│          │  │ ┌─────┐                                           │
│          └──┴─┤ AND ├──── Carry                                 │
│               └─────┘                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

With just an XOR gate and an AND gate, we have built a circuit that can add two bits. This is called a **half-adder** because it handles only two inputs. But what about the carry from a previous addition?

## Arithmetic: The Full-Adder

When adding multi-bit numbers column by column, we need to account for three inputs: the two bits being added, plus any carry from the previous column. This requires a **full-adder**.

```
     Carry-in
         ↓
  1  0  1  1    (11 in decimal)
+ 0  1  1  0    (6 in decimal)
───────────
  1  0  0  0  1  (17 in decimal)
  ↑
  Carry-out
```

A full-adder has three inputs (A, B, Carry-in) and two outputs (Sum, Carry-out):

```
┌─────┬─────┬─────┬───────┬───────────┐
│  A  │  B  │ Cin │  Sum  │   Cout    │
├─────┼─────┼─────┼───────┼───────────┤
│  0  │  0  │  0  │   0   │     0     │
│  0  │  0  │  1  │   1   │     0     │
│  0  │  1  │  0  │   1   │     0     │
│  0  │  1  │  1  │   0   │     1     │
│  1  │  0  │  0  │   1   │     0     │
│  1  │  0  │  1  │   0   │     1     │
│  1  │  1  │  0  │   0   │     1     │
│  1  │  1  │  1  │   1   │     1     │
└─────┴─────┴─────┴───────┴───────────┘
```

We can build a full-adder from two half-adders:

```
┌─────────────────────────────────────────────────────────────────┐
│                        FULL-ADDER                               │
│                                                                 │
│                 ┌────────────────┐                              │
│      A ────────►│                │                              │
│                 │  Half-Adder 1  ├─────────┐                    │
│      B ────────►│                │         │                    │
│                 └───────┬────────┘         ▼                    │
│                         │          ┌───────────────┐            │
│                         │  Sum1    │               │            │
│                         └─────────►│ Half-Adder 2  ├──► Sum     │
│                                    │               │            │
│      Cin ─────────────────────────►│               │            │
│                                    └───────┬───────┘            │
│                 ┌────────────────┐         │                    │
│                 │                │         │ Carry2             │
│       Carry1 ──►│      OR        │◄────────┘                    │
│                 │                ├─────────────────────► Cout   │
│                 └────────────────┘                              │
│                                                                 │
│   Sum  = A XOR B XOR Cin                                        │
│   Cout = (A AND B) OR ((A XOR B) AND Cin)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The first half-adder adds A and B. The second half-adder adds that result to the carry-in. If either half-adder produces a carry, we have a carry-out.

## Building a Multi-Bit Adder

To add larger numbers, we chain full-adders together, with each carry-out feeding into the next carry-in:

```
┌─────────────────────────────────────────────────────────────────┐
│                   4-BIT RIPPLE-CARRY ADDER                      │
│                                                                 │
│   A3 A2 A1 A0          (4-bit number A)                         │
│   B3 B2 B1 B0          (4-bit number B)                         │
│                                                                 │
│         ┌────┐    ┌────┐    ┌────┐    ┌────┐                   │
│   Cout◄─┤ FA │◄───┤ FA │◄───┤ FA │◄───┤ FA │◄─── 0 (Cin)       │
│         │    │    │    │    │    │    │    │                    │
│    A3──►│    │A2─►│    │A1─►│    │A0─►│    │                    │
│    B3──►│    │B2─►│    │B1─►│    │B0─►│    │                    │
│         └──┬─┘    └──┬─┘    └──┬─┘    └──┬─┘                    │
│            │         │         │         │                      │
│            ▼         ▼         ▼         ▼                      │
│           S3        S2        S1        S0                      │
│                                                                 │
│   Result: S3 S2 S1 S0 (with possible overflow in Cout)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This is called a **ripple-carry adder** because the carry "ripples" through from right to left. Each full-adder must wait for the carry from the previous one, which introduces delay. Modern CPUs use more sophisticated designs (like carry-lookahead adders) to compute carries in parallel, but the principle remains the same.

:::tip Subtraction for Free
Remember two's complement from the representing numbers article? To subtract B from A, we simply add A to the two's complement of B (invert all bits and add 1). The same adder circuit handles both addition and subtraction with a few extra gates to conditionally invert B.
:::

## Comparison: The Equality Checker

Another fundamental operation is comparison: are two values equal? XOR gives us the answer for single bits.

Recall that XOR outputs 1 when inputs differ and 0 when they match:

```
A XOR B = 0  →  A equals B
A XOR B = 1  →  A differs from B
```

For a single bit, `NOT (A XOR B)` tells us if A equals B. For multiple bits, we XOR each pair and combine the results:

```
┌─────────────────────────────────────────────────────────────────┐
│                   4-BIT EQUALITY CHECKER                        │
│                                                                 │
│   A3──┐    A2──┐    A1──┐    A0──┐                             │
│       │        │        │        │                              │
│      XOR      XOR      XOR      XOR                             │
│       │        │        │        │                              │
│   B3──┘    B2──┘    B1──┘    B0──┘                             │
│       │        │        │        │                              │
│       ▼        ▼        ▼        ▼                              │
│       D3       D2       D1       D0    (difference bits)        │
│       │        │        │        │                              │
│       └────┬───┴────┬───┴────┬───┘                              │
│            │        │        │                                  │
│            ▼        ▼        ▼                                  │
│         ┌──────────────────────┐                                │
│         │       NOR            │                                │
│         │   (all must be 0)    │                                │
│         └──────────┬───────────┘                                │
│                    │                                            │
│                    ▼                                            │
│                  EQUAL                                          │
│           (1 if A = B, 0 otherwise)                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

If any XOR produces a 1 (indicating a difference), the numbers are not equal. Only when all XOR outputs are 0 are the numbers equal. A NOR gate (or a chain of OR followed by NOT) detects when all difference bits are zero.

## Selection: The Multiplexer

Perhaps the most conceptually important combinational circuit is the **multiplexer** (MUX). A multiplexer selects one of several inputs based on a control signal.

The simplest multiplexer has two data inputs (D0, D1), one select input (S), and one output (Y):

```
┌─────────────────────────────────────────────────────────────────┐
│                     2-TO-1 MULTIPLEXER                          │
│                                                                 │
│            ┌─────────────────────────┐                          │
│      D0 ──►│                         │                          │
│            │          MUX            ├───► Y                    │
│      D1 ──►│                         │                          │
│            └────────────┬────────────┘                          │
│                         │                                       │
│                         ▲                                       │
│                         S (select)                              │
│                                                                 │
│   When S = 0: Y = D0                                            │
│   When S = 1: Y = D1                                            │
│                                                                 │
│   ─────────────────────────────────────────────────────────     │
│                                                                 │
│   Internal implementation:                                      │
│                                                                 │
│            ┌─────┐                                              │
│      D0 ───┤ AND │───┐                                          │
│   S ──┬─○──┤     │   │                                          │
│       │    └─────┘   │    ┌────┐                                │
│       │              ├────┤ OR ├───► Y                          │
│       │    ┌─────┐   │    └────┘                                │
│       └────┤ AND │───┘                                          │
│      D1 ───┤     │                                              │
│            └─────┘                                              │
│                                                                 │
│   Y = (D0 AND NOT S) OR (D1 AND S)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The multiplexer is the hardware equivalent of an if-else statement:

```javascript
if (S == 0) {
    Y = D0;
} else {
    Y = D1;
}
```

This is profound. **With multiplexers, we can implement conditional logic in hardware.** Every if-else, every switch statement, every branch in your code ultimately reduces to multiplexers (and their sequential counterparts) at the hardware level.

:::info Larger Multiplexers
A 4-to-1 multiplexer has 4 data inputs and 2 select lines (since 2² = 4). An 8-to-1 multiplexer has 8 data inputs and 3 select lines. In general, a 2ⁿ-to-1 multiplexer needs n select lines.
:::

## Demultiplexers and Decoders

The inverse of a multiplexer is a **demultiplexer** (DEMUX): it takes one input and routes it to one of several outputs based on a select signal. A related circuit, the **decoder**, activates exactly one of several output lines based on a binary input.

```
┌─────────────────────────────────────────────────────────────────┐
│                       2-TO-4 DECODER                            │
│                                                                 │
│            ┌─────────────────────────┐                          │
│            │                         ├───► Y0 (active when 00) │
│      S0 ──►│                         ├───► Y1 (active when 01) │
│            │        DECODER          ├───► Y2 (active when 10) │
│      S1 ──►│                         ├───► Y3 (active when 11) │
│            └─────────────────────────┘                          │
│                                                                 │
│   Input (S1 S0) = 00  →  Y0 = 1, others = 0                     │
│   Input (S1 S0) = 01  →  Y1 = 1, others = 0                     │
│   Input (S1 S0) = 10  →  Y2 = 1, others = 0                     │
│   Input (S1 S0) = 11  →  Y3 = 1, others = 0                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Decoders are essential for memory addressing. When you access memory at address `0x1A3F`, a decoder circuit activates exactly that memory location.

<details>
<summary>Practice: Design a 1-bit comparator that outputs whether A > B</summary>

For single bits A and B, A > B only when A = 1 and B = 0:

```
A > B  =  A AND (NOT B)
```

Truth table verification:
```
┌───┬───┬───────┐
│ A │ B │ A > B │
├───┼───┼───────┤
│ 0 │ 0 │   0   │
│ 0 │ 1 │   0   │
│ 1 │ 0 │   1   │  ← Only case where A > B
│ 1 │ 1 │   0   │
└───┴───┴───────┘
```

For multi-bit comparison, we start from the most significant bit and work down, using multiplexers to select the result.

</details>

## Key Takeaways

1. **Combinational circuits have no memory.** Output depends only on current inputs. Change the inputs, and the outputs change immediately.

2. **The half-adder adds two bits using XOR (sum) and AND (carry).** This elegant mapping from Boolean operations to arithmetic is fundamental to computing.

3. **The full-adder handles carry-in, enabling multi-bit addition.** Chain them together to add numbers of any size.

4. **XOR detects differences; NOR confirms all zeros.** Together, they form an equality checker.

5. **The multiplexer is the hardware if-else.** It selects between inputs based on a control signal, implementing conditional logic.

6. **Decoders activate one output based on binary input.** They are essential for memory addressing and instruction decoding.

## Looking Ahead

Every circuit we have built is stateless. Feed it inputs and it produces outputs; change the inputs and the outputs change instantly. There is no way for these circuits to count how many times they have been activated, or to hold a value from one moment to the next.

And yet your computer clearly *does* remember things. It holds variables, tracks which instruction comes next, and loops through code step by step. Something is missing from our toolkit. The next article fills that gap with **sequential circuits**, where a simple idea, feeding a circuit's output back into its input, gives rise to memory, registers, and ultimately the CPU itself.
