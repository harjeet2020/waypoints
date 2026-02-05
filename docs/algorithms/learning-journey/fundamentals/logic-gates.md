---
title: Logic Gates
---
## From Algebra to Gates

In the previous article, we explored the physics of electrical circuits: how voltage, current, and resistance govern circuit behavior, how voltage dividers determine the voltage at a midpoint, and how transistors act as voltage-controlled switches. We now have the physical foundation for digital electronics.

This article provides the *mathematical* foundation: **Boolean algebra**, the system of logic that underlies all digital computation. We will then bring math and physics together by building **logic gates**: circuits that implement Boolean operations using the transistors and voltage dividers we now understand.

In the next article, we will learn about **combinational circuits**: how we can combine gates to perform arithmetic, comparison, and selection. Finally, the following article will discuss **sequential circuits and the CPU**, which will explain how computers are able to execute instructions like loops or if statements.

## Boolean Algebra: The Mathematics of Logic

Before we dive into circuits, we need to understand the mathematical foundation they are built upon. In the mid-1800s, an English mathematician named *George Boole* had a remarkable insight: logical reasoning could be expressed as algebra. Just as ordinary algebra manipulates numbers, Boolean algebra manipulates truth values.

Since computers use only **1s** and **0s** (mapped to **true** and **false** respectively), Boolean algebra is the foundation that computer logic is built upon.

### Truth as Numbers

In Boolean algebra, we work with only two values:
- **True** (represented as 1)
- **False** (represented as 0)

This maps perfectly to our binary system. A transistor that is *on* represents true; a transistor that is *off* represents false. Boolean algebra gives us the rules for combining these values in meaningful ways.

### The Fundamental Operations

Boolean algebra defines three fundamental operations. Every logical operation, no matter how complex, can be built from these three.

#### NOT (Negation)

The simplest operation: NOT inverts a value. True becomes false; false becomes true.

```
NOT 0 = 1
NOT 1 = 0
```

In everyday language: "It is NOT raining" is true only when "It is raining" is false.

#### AND (Conjunction)

AND returns true only when *both* inputs are true.

```
0 AND 0 = 0
0 AND 1 = 0
1 AND 0 = 0
1 AND 1 = 1
```

In everyday language: "I will go outside if it is sunny AND warm" requires both conditions to be true.

#### OR (Disjunction)

OR returns true when *at least one* input is true.

```
0 OR 0 = 0
0 OR 1 = 1
1 OR 0 = 1
1 OR 1 = 1
```

In everyday language: "I will be happy if I get coffee OR tea" is satisfied by either (or both).

:::info Inclusive vs Exclusive Or
The OR we defined above is *inclusive*: it returns true even when both inputs are true. In everyday speech, "or" is often exclusive ("Would you like coffee or tea?" implies one, not both). Computers use inclusive OR by default, but we will meet exclusive OR (XOR) shortly.
:::

### Truth Tables

A **truth table** exhaustively lists all possible input combinations and their corresponding outputs. This is how we formally define logical operations.

Here are the truth tables for our three fundamental operations:

```
┌─────────────────────────────────────────────────────────────────┐
│                        TRUTH TABLES                             │
├─────────────────┬───────────────────────┬───────────────────────┤
│      NOT        │         AND           │          OR           │
├────────┬────────┼────────┬────────┬─────┼────────┬────────┬─────┤
│   A    │ NOT A  │   A    │   B    │ A∧B │   A    │   B    │ A∨B │
├────────┼────────┼────────┼────────┼─────┼────────┼────────┼─────┤
│   0    │   1    │   0    │   0    │  0  │   0    │   0    │  0  │
├────────┼────────┼────────┼────────┼─────┼────────┼────────┼─────┤
│   1    │   0    │   0    │   1    │  0  │   0    │   1    │  1  │
├────────┴────────┼────────┼────────┼─────┼────────┼────────┼─────┤
│                 │   1    │   0    │  0  │   1    │   0    │  1  │
│                 ├────────┼────────┼─────┼────────┼────────┼─────┤
│                 │   1    │   1    │  1  │   1    │   1    │  1  │
└─────────────────┴────────┴────────┴─────┴────────┴────────┴─────┘
```

Notice that with 2 inputs, we have 4 possible combinations (2² = 4). With 3 inputs, we would have 8 combinations (2³ = 8). This exponential growth is why truth tables become unwieldy for complex circuits, but they remain invaluable for understanding basic operations.

### XOR: The Exclusive Or

Beyond the three fundamentals, one derived operation appears so frequently that it deserves special attention: **XOR** (exclusive or).

XOR returns true when the inputs are *different*.

```
0 XOR 0 = 0    (same: false)
0 XOR 1 = 1    (different: true)
1 XOR 0 = 1    (different: true)
1 XOR 1 = 0    (same: false)
```

XOR can be built from AND, OR, and NOT:

```
A XOR B = (A OR B) AND NOT (A AND B)
```

This reads as: "A or B, but not both." XOR will prove essential when we build circuits for addition and comparison.

### Boolean Identities

Just as regular algebra has identities like `x + 0 = x`, Boolean algebra has its own set of laws. These are useful for simplifying circuits.

```
Identity Laws:      A AND 1 = A        A OR 0 = A
Null Laws:          A AND 0 = 0        A OR 1 = 1
Idempotent Laws:    A AND A = A        A OR A = A
Complement Laws:    A AND (NOT A) = 0  A OR (NOT A) = 1
Double Negation:    NOT (NOT A) = A

De Morgan's Laws:
    NOT (A AND B) = (NOT A) OR (NOT B)
    NOT (A OR B) = (NOT A) AND (NOT B)
```

De Morgan's laws are particularly important. They tell us that negating an AND gives us an OR (and vice versa), provided we also negate the inputs. This equivalence has profound implications for circuit design, as we will soon see.

:::info Deriving De Morgan's Laws
De Morgan's laws can be proven by exhaustively checking all possible inputs. Let us verify the first law: `NOT (A AND B) = (NOT A) OR (NOT B)`.

```
┌───┬───┬───────┬─────────────┬───────┬───────┬─────────────────┐
│ A │ B │ A AND B│ NOT(A AND B)│ NOT A │ NOT B │ (NOT A) OR (NOT B)│
├───┼───┼───────┼─────────────┼───────┼───────┼─────────────────┤
│ 0 │ 0 │   0   │      1      │   1   │   1   │        1        │
│ 0 │ 1 │   0   │      1      │   1   │   0   │        1        │
│ 1 │ 0 │   0   │      1      │   0   │   1   │        1        │
│ 1 │ 1 │   1   │      0      │   0   │   0   │        0        │
└───┴───┴───────┴─────────────┴───────┴───────┴─────────────────┘
```

The columns for `NOT (A AND B)` and `(NOT A) OR (NOT B)` are identical, proving the law holds for all inputs. The same approach verifies the second law.

Intuitively, De Morgan's laws capture a simple idea: "not both" is the same as "at least one is missing," and "not either" is the same as "both are missing." If it is not the case that you have both coffee AND tea, then you must be missing coffee OR missing tea (or both).
:::

With Boolean algebra in hand, we have the mathematical foundation for digital logic. In the previous article, we learned how electrical circuits work: how voltage distributes across components, how the voltage divider determines the voltage at a midpoint, and how transistors act as voltage-controlled variable resistors. Now we can see how transistors implement Boolean operations in hardware.

## Logic Gates

Now we bridge the abstract and the physical. A **logic gate** is an electronic circuit that implements a Boolean operation. It takes one or more binary inputs and produces a binary output according to a specific logical function.

With our understanding of Boolean algebra and circuit fundamentals, we can now see how transistors combine to form these gates.

### From Transistors to Gates

Recall that a transistor is a voltage-controlled switch whose resistance changes based on the gate voltage: effectively infinite when off, very low when on. By combining transistors cleverly, we can build circuits that implement each Boolean operation. Let us see how.

#### The NOT Gate (Inverter)

The NOT gate is the simplest logic gate. Its job is to invert the input: if the input is 1, the output is 0, and vice versa. The circuit achieves this by arranging components so that electricity has no choice but to produce inversion - it is a consequence of physics, not programming.

The NOT gate places a **resistor** and a **transistor** in series between the power supply (+V) and ground, with the output taken from the point between them:

```
┌─────────────────────────────────────────────────────────────────┐
│                     NOT GATE CIRCUIT                            │
│                                                                 │
│                         +V (power supply, e.g., 5V)             │
│                          │                                      │
│                         ─┴─ (resistor - fixed resistance)       │
│                          │                                      │
│                          ├───────────── Output                  │
│                          │                                      │
│      Input A ───────┤    │    (transistor - variable resistance)│
│                     └────┤                                      │
│                          │                                      │
│                         GND (ground, 0V)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The resistor has fixed resistance. The transistor's resistance changes based on the input: effectively infinite when OFF, very low when ON. The input signal (from another gate or input device) controls the transistor's gate, determining whether its channel opens or closes.

This arrangement creates a **voltage divider**, the circuit pattern we explored in the previous article. The component with higher resistance claims the larger voltage drop. If the resistance below the tap point is higher, most of the voltage drops there, leaving the tap point close to +V. If the resistance above is higher, most of the voltage drops there, pulling the tap point toward ground.

**When input = 0 (transistor OFF):**
The transistor has infinite resistance, breaking the path to ground, so no current flows. Recall that no current means no voltage drop: the output point, connected to +V through the resistor, sits at +V. Output = 1.

**When input = 1 (transistor ON):**
The transistor now has very low resistance, creating a complete path from +V to ground. Current flows through the resistor and transistor. Because the transistor's resistance is much lower than the resistor's, almost all of the voltage drops across the resistor, leaving the output point at nearly 0V. Output = 0.

```
┌─────────────────────────────────────────────────────────────────┐
│                  NOT GATE: TWO STATES                           │
│                                                                 │
│         INPUT = 0                      INPUT = 1                │
│                                                                 │
│           +V                             +V                     │
│            │                              │                     │
│           ─┴─                            ─┴─                    │
│            │                              │                     │
│            ●──── Output = 1              ●──── Output = 0       │
│            │                              │                     │
│      0V ──┤ ╳ (transistor OFF)     5V ──┤ │ (transistor ON)    │
│            │                              │                     │
│           GND                            GND                    │
│                                                                 │
│   No current flows,              Current flows to ground,       │
│   output equals +V               voltage drops across resistor  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The placement of components matters: if we swapped them (transistor above, resistor below), the circuit would produce non-inverted output instead.

```
┌─────────────────────────────────────────────────────────────────┐
│  Symbol:          ┌───┐                                         │
│            A ─────┤ ▷○├───── NOT A                              │
│                   └───┘                                         │
│                     ↑                                           │
│              (bubble means inversion)                           │
└─────────────────────────────────────────────────────────────────┘
```

This relationship is continuous: the output voltage always reflects the current input state, updating within nanoseconds. Complex behavior emerges from the physics of current flow, not from any external intelligence directing traffic.

#### The NAND Gate

Before we build AND and OR, let us build something even more fundamental: the **NAND gate** (NOT-AND). NAND returns false only when both inputs are true.

The NAND gate uses two transistors arranged **in series** between the output and ground. For current to flow to ground, it must pass through *both* transistors. If either transistor is off, the path is broken.

```
┌─────────────────────────────────────────────────────────────────┐
│                      NAND GATE CIRCUIT                          │
│                                                                 │
│                         +V (power supply)                       │
│                          │                                      │
│                         ─┴─ (resistor)                          │
│                          │                                      │
│                          ├───────────── Output                  │
│                          │                                      │
│      Input A ───────┤    │    (transistor A)                    │
│                     └────┤                                      │
│                          │                                      │
│      Input B ───────┤    │    (transistor B)                    │
│                     └────┤                                      │
│                          │                                      │
│                         GND                                     │
│                                                                 │
│   Both transistors must be ON for current to reach ground.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Let us trace through the possible input combinations:

**When A = 0 or B = 0 (at least one transistor OFF):**
The series connection is broken. No current flows from +V to ground. With no current through the resistor, there is no voltage drop across it. The output equalizes to +V. Output = 1.

**When A = 1 and B = 1 (both transistors ON):**
Both transistors conduct, completing the path to ground. Current flows through the resistor and both transistors. The voltage drops across the resistor, pulling the output to nearly 0V. Output = 0.

```
┌─────────────────────────────────────────────────────────────────┐
│                   NAND GATE: KEY STATES                         │
│                                                                 │
│      A=0, B=1 (or any 0)             A=1, B=1                   │
│                                                                 │
│           +V                             +V                     │
│            │                              │                     │
│           ─┴─                            ─┴─                    │
│            │                              │                     │
│            ●──── Output = 1               ●──── Output = 0      │
│            │                              │                     │
│      0V ──┤ ╳ (A is OFF)           5V ──┤ │ (A is ON)          │
│            │                              │                     │
│      5V ──┤ │ (B is ON)            5V ──┤ │ (B is ON)          │
│            │                              │                     │
│           GND                            GND                    │
│                                                                 │
│   Path broken: output high       Path complete: output low      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The series arrangement is the key insight: it implements AND at the transistor level. Both switches must close for current to flow. By placing the output *above* the transistors (connected to +V through a resistor), we get the inverted result: NAND.

```
┌─────────────────────────────────────────────────────────────────┐
│  Truth Table:                Symbol:                            │
│  ┌───┬───┬──────────┐              ┌───┐                       │
│  │ A │ B │ A NAND B │       A ─────┤   │                       │
│  ├───┼───┼──────────┤              │ & ├○───── A NAND B        │
│  │ 0 │ 0 │    1     │       B ─────┤   │                       │
│  │ 0 │ 1 │    1     │              └───┘                       │
│  │ 1 │ 0 │    1     │                ↑                          │
│  │ 1 │ 1 │    0     │         bubble = inverted output         │
│  └───┴───┴──────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
```

#### The NOR Gate

The **NOR gate** (NOT-OR) returns true only when both inputs are false. Where NAND uses transistors in series, NOR uses them **in parallel**.

```
┌─────────────────────────────────────────────────────────────────┐
│                       NOR GATE CIRCUIT                          │
│                                                                 │
│                         +V (power supply)                       │
│                          │                                      │
│                         ─┴─ (resistor)                          │
│                          │                                      │
│                          ├───────────── Output                  │
│                          │                                      │
│                    ┌─────┴─────┐                                │
│                    │           │                                │
│      Input A ─────┤│          ┤│───── Input B                   │
│                   └┤           ├┘                               │
│                    │           │                                │
│                    └─────┬─────┘                                │
│                          │                                      │
│                         GND                                     │
│                                                                 │
│   Either transistor ON creates a path to ground.                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The parallel arrangement means current can flow to ground through *either* transistor. If any path exists, the output is pulled low.

**When A = 0 and B = 0 (both transistors OFF):**
Neither transistor conducts. No path to ground exists. No current flows, so no voltage drops across the resistor. The output equalizes to +V. Output = 1.

**When A = 1 or B = 1 (at least one transistor ON):**
At least one transistor conducts, creating a path to ground. Current flows through the resistor and the conducting transistor(s). The voltage drops across the resistor, pulling the output to nearly 0V. Output = 0.

```
┌─────────────────────────────────────────────────────────────────┐
│                    NOR GATE: KEY STATES                         │
│                                                                 │
│         A=0, B=0                       A=1, B=0 (or any 1)      │
│                                                                 │
│           +V                              +V                    │
│            │                               │                    │
│           ─┴─                             ─┴─                   │
│            │                               │                    │
│            ●──── Output = 1                ●──── Output = 0     │
│            │                               │                    │
│       ┌────┴────┐                     ┌────┴────┐               │
│       │         │                     │         │               │
│  0V ──┤╳       ╳├── 0V           5V ──┤│       ╳├── 0V          │
│       │         │                     │         │               │
│       └────┬────┘                     └────┬────┘               │
│            │                               │                    │
│           GND                             GND                   │
│                                                                 │
│   No path: output high           Path exists: output low        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The parallel arrangement implements OR at the transistor level: *either* switch closing allows current to flow. By placing the output above the transistors, we get the inverted result: NOR.

```
┌─────────────────────────────────────────────────────────────────┐
│  Truth Table:                Symbol:                            │
│  ┌───┬───┬─────────┐              ┌───┐                        │
│  │ A │ B │ A NOR B │       A ─────┤   │                        │
│  ├───┼───┼─────────┤              │≥1 ├○───── A NOR B          │
│  │ 0 │ 0 │    1    │       B ─────┤   │                        │
│  │ 0 │ 1 │    0    │              └───┘                        │
│  │ 1 │ 0 │    0    │                ↑                           │
│  │ 1 │ 1 │    0    │         bubble = inverted output          │
│  └───┴───┴─────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

:::info Universal Gates
NAND and NOR are called **universal gates** because any Boolean function can be implemented using only NAND gates (or only NOR gates). This is remarkable: you can build an entire computer using just one type of gate. In practice, manufacturers often use NAND-only or NOR-only designs because producing identical gates is simpler and cheaper.
:::

#### AND, OR, and XOR Gates

With NAND and NOR as our universal building blocks, we can construct any other gate. Let us see how.

**AND Gate**

The AND gate returns true only when both inputs are true. Since NAND is simply NOT-AND, we can recover AND by inverting the NAND output:

```
A AND B = NOT (A NAND B)
```

In circuit form, we chain a NAND gate with a NOT gate (which is itself a NAND gate with both inputs tied together):

```
┌─────────────────────────────────────────────────────────────────┐
│                       AND FROM NAND                             │
│                                                                 │
│                    ┌──────┐      ┌──────┐                      │
│             A ─────┤      │      │      │                      │
│                    │ NAND ├──────┤ NOT  ├───── A AND B         │
│             B ─────┤      │      │      │                      │
│                    └──────┘      └──────┘                      │
│                                                                 │
│   Step by step:                                                 │
│     1. NAND gives us NOT(A AND B)                              │
│     2. NOT inverts it: NOT(NOT(A AND B)) = A AND B             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Symbol:
      ┌───┐
A ────┤   │
      │ & ├──── A AND B
B ────┤   │
      └───┘
```

**OR Gate**

The OR gate returns true when at least one input is true. We can derive OR from NAND using De Morgan's law:

```
De Morgan's law:    NOT (A AND B) = (NOT A) OR (NOT B)

Rearranging:        A OR B = NOT ((NOT A) AND (NOT B))
                           = (NOT A) NAND (NOT B)
```

This tells us: invert both inputs, then NAND them.

```
┌─────────────────────────────────────────────────────────────────┐
│                        OR FROM NAND                             │
│                                                                 │
│             A ────┬─────┐                                       │
│                   │ NOT ├───┐                                   │
│                   └─────┘   │                                   │
│                             ├───┬──────┐                        │
│                             │   │ NAND ├───── A OR B            │
│                             │   └──────┘                        │
│             B ────┬─────┐   │                                   │
│                   │ NOT ├───┘                                   │
│                   └─────┘                                       │
│                                                                 │
│   Step by step:                                                 │
│     1. NOT A and NOT B are computed                            │
│     2. NAND gives us NOT((NOT A) AND (NOT B))                  │
│     3. By De Morgan's law, this equals A OR B                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Symbol:
      ┌───┐
A ────┤   │
      │≥1 ├──── A OR B
B ────┤   │
      └───┘
```

**XOR Gate**

The XOR (exclusive or) gate returns true when the inputs are *different*. Earlier, we saw that:

```
A XOR B = (A OR B) AND NOT (A AND B)
```

This reads as: "A or B, but not both." We can build this from the gates we already have:

```
┌─────────────────────────────────────────────────────────────────┐
│                       XOR FROM BASIC GATES                      │
│                                                                 │
│                         ┌──────┐                                │
│             A ──┬───────┤      │                                │
│                 │       │  OR  ├───┐                            │
│             B ──┼───┬───┤      │   │                            │
│                 │   │   └──────┘   │   ┌──────┐                 │
│                 │   │              ├───┤      │                 │
│                 │   │              │   │ AND  ├─── A XOR B      │
│                 │   │   ┌──────┐   │   │      │                 │
│                 │   └───┤      │   │   └──────┘                 │
│                 │       │ NAND ├───┘                            │
│                 └───────┤      │                                │
│                         └──────┘                                │
│                                                                 │
│   Step by step:                                                 │
│     1. OR gate: A OR B (true if either input is true)          │
│     2. NAND gate: NOT(A AND B) (false only if both are true)   │
│     3. AND combines them: (A OR B) AND NOT(A AND B)            │
│                                                                 │
│   The result is true when exactly one input is true.           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Truth Table:                Symbol:
┌───┬───┬─────────┐              ┌───┐
│ A │ B │ A XOR B │       A ─────┤   │
├───┼───┼─────────┤              │=1 ├───── A XOR B
│ 0 │ 0 │    0    │       B ─────┤   │
│ 0 │ 1 │    1    │              └───┘
│ 1 │ 0 │    1    │
│ 1 │ 1 │    0    │
└───┴───┴─────────┘
```

XOR is particularly important in computing. It detects when two bits differ, which is essential for addition (the sum bit in binary addition is precisely XOR) and comparison operations.

### Gate Symbols Summary

Here are the standard symbols you will encounter in circuit diagrams:

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOGIC GATE SYMBOLS                           │
│                                                                 │
│   NOT          AND          OR           XOR                    │
│   ┌───┐        ┌───┐        ┌───┐        ┌───┐                 │
│ ──┤ ▷○├──    ──┤   │      ──┤   │      ──┤   │                 │
│   └───┘        │ & ├──      │≥1 ├──      │=1 ├──               │
│              ──┤   │      ──┤   │      ──┤   │                 │
│                └───┘        └───┘        └───┘                 │
│                                                                 │
│   NAND         NOR          XNOR                                │
│   ┌───┐        ┌───┐        ┌───┐                              │
│ ──┤   │      ──┤   │      ──┤   │                              │
│   │ & ├○──     │≥1 ├○──     │=1 ├○──                           │
│ ──┤   │      ──┤   │      ──┤   │                              │
│   └───┘        └───┘        └───┘                              │
│                                                                 │
│   ○ = inversion (NOT) applied to output                        │
└─────────────────────────────────────────────────────────────────┘
```

## Key Takeaways

1. **Boolean algebra provides the mathematical foundation.** The three fundamental operations (AND, OR, NOT) can express any logical function. XOR is particularly useful for arithmetic and comparison.

2. **Truth tables formally define operations.** They exhaustively list all input combinations and outputs, making logical behavior unambiguous.

3. **Circuits work through voltage and current.** Voltage is potential energy (like water pressure); current is flow. Complete paths are required for current to flow.

4. **Transistors are voltage-controlled switches.** The gate terminal senses voltage through electric fields, controlling whether current flows between source and drain.

5. **Logic gates implement Boolean operations in hardware.** Transistors combine to form gates; the arrangement determines the logical function.

6. **NAND and NOR are universal gates.** Any circuit can be built from just one of these gate types, which is why they are fundamental to chip manufacturing.

## Looking Ahead

We now have the building blocks: logic gates that perform AND, OR, NOT, XOR, and their variants. But a single gate performs only a single operation. To do anything useful, we must combine gates into larger circuits.

In the next article, we will explore **combinational circuits**: circuits where the output depends only on the current inputs. We will build circuits that add numbers, compare values, and select between alternatives. These are the workhorses of computation, and they emerge naturally from the gates we have just learned.
