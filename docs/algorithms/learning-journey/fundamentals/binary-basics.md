---
title: Binary Basics
---
## The Language of Machines

A CPU that executes billions of instructions per second. RAM that holds all your running programs. Storage that preserves files for years. We have seen what these components do, but not *how*. How does a machine made of silicon and electricity actually store and manipulate information?

The answer lies in **binary**: a number system built entirely on two digits, 1 and 0. Everything your computer does, every calculation it performs, every piece of data it stores, ultimately reduces to patterns of these two values.

Two digits might seem absurdly limiting. How can they represent the richness of text, images, music, and video? By the end of this article, you will understand not just how binary works, but why it is the perfect foundation for digital computing.

## Why Binary?

### The Physical Reality

To understand why computers use binary, we need to look at what they are made of. A computer is an electrical machine. At the heart of every processor lie billions of **transistors**: microscopic electronic switches etched into silicon. A modern CPU contains tens of billions of them, each smaller than a virus.

The purpose of transistors is to map the flow of electrical current to a value we can measure. If the current is flowing through a transistor, we assign it the value of 1 (true). If it isn't, it becomes 0 (false). This simple mapping of energy flow state to a number is what enables computers to represent data, perform arithmetic operations and follow logical instructions. We will see exactly how in the following articles - but for now, let us return to the transistors and the binary.

Unlike a dimmer switch with a range of settings, a transistor operates in just two states: **on** or **off**. There is no "medium" setting, no dial from 1 to 10. This is not a limitation of our engineering; it is a deliberate choice rooted in physics and reliability. To see why, we need to understand how these tiny switches actually work.

### How a Transistor Works

A transistor is a switch made from **semiconductor** material (usually silicon). Unlike a light switch that you physically flip, a transistor is controlled by electricity itself. The type used in modern computers is called a **MOSFET** (Metal-Oxide-Semiconductor Field-Effect Transistor), and it has three terminals:

- **Source:** Where current comes from (the input side)
- **Drain:** Where current wants to go (the output side)
- **Gate:** The control terminal that determines whether current can flow

```
┌─────────────────────────────────────────────────────────┐
│                   MOSFET STRUCTURE                      │
│                                                         │
│                      Gate                               │
│                       │                                 │
│                       ▼                                 │
│              ┌────────────────┐                         │
│              │   Metal Gate   │ ← Gate electrode        │
│              ├────────────────┤                         │
│              │     Oxide      │ ← Insulating layer      │
│              ├────────────────┤                         │
│   Source ────┤    Channel     ├──── Drain               │
│              │  (semiconductor)                         │
│              └────────────────┘                         │
│                                                         │
│   Current flows from Source → Drain (when gate is on)   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

The gate does not sit *between* the source and drain like a physical barrier. Instead, it sits *above* the channel (separated by a thin insulating oxide layer), controlling whether the channel is conductive:

**When no voltage is applied to the gate:**
The semiconductor channel between source and drain is non-conductive by default. Current cannot flow. This is the **OFF state**, representing **0**.

**When voltage is applied to the gate:**
The voltage creates an electric field that reaches through the oxide layer and transforms the channel below into a conductor. Now current can flow from source to drain. This is the **ON state**, representing **1**.

Think of it like a valve or faucet: apply voltage to open the valve, and current flows through. Remove the voltage, and the flow stops. The gate itself consumes almost no power because the oxide layer prevents current from flowing into it. This is why modern processors can pack billions of transistors without melting.

```
┌─────────────────────────────────────────────────────────┐
│                  TRANSISTOR STATES                      │
│                                                         │
│         OFF (0)                    ON (1)               │
│                                                         │
│      Gate: 0V                   Gate: 5V                │
│         │                          │                    │
│         ▼                          ▼                    │
│   ┌───┬─────┬───┐            ┌───┬─────┬───┐           │
│   │ S │ /// │ D │            │ S │═════│ D │           │
│   └───┴─────┴───┘            └───┴─────┴───┘           │
│         ↑                          ↑                    │
│    No channel               Channel formed              │
│   (non-conductive)           (conductive)               │
│                                                         │
│   No current flows          Current flows →             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Billions of these tiny switches, flipping on and off billions of times per second, form the foundation of every computer.

We represent these two states as **0** (off) and **1** (on). This gives us binary: a number system with only two digits.

:::info Why Not Use More States?
You might wonder: why not design transistors with ten states (0-9) and use decimal directly?

The answer is **reliability**. Electronic components are imperfect. Voltages fluctuate, temperatures change, and electrical noise is everywhere. If we tried to distinguish between ten voltage levels (0V = 0, 0.5V = 1, 1.0V = 2, etc.), a slight fluctuation could make 1.3V ambiguous: is it a "2" or a "3"?

With binary, we only distinguish "low" (0V-1.5V) from "high" (3.5V-5V). The large gap between them provides noise immunity. Binary is not the most efficient in theory, but it is the most reliable in practice.
:::

## The Binary Number System

Transistors give us the ability to represent two states: **current flowing (1)** or **not flowing (0)**. But a single 1 or 0 is not very useful on its own. It can answer a yes/no question, but it cannot store a number larger than 1, represent a letter, or encode a color.

To represent complex information, we need a way to combine these simple signals into meaningful values. This is where the **binary number system** comes in.

### From One Bit to Many

The key insight is that by combining multiple binary digits, we can represent far more than two values:

| Bits | Possible Combinations | Number of Values |
|------|----------------------|------------------|
| 1    | 0, 1                 | 2                |
| 2    | 00, 01, 10, 11       | 4                |
| 3    | 000, 001, 010, 011, 100, 101, 110, 111 | 8 |
| 4    | 0000 ... 1111        | 16               |
| 8    | 00000000 ... 11111111 | 256             |

The pattern is simple: **n bits can represent 2ⁿ different values**. With just 8 bits, we can distinguish between 256 different things. With 32 bits, over 4 billion.

### What Can We Represent?

With this system, we can encode virtually anything as patterns of 1s and 0s:

- **Numbers:** Integers, decimals, negative numbers (we will see how shortly)
- **Text:** Assign each character a number (A=65, B=66, etc.)
- **Colors:** Mix of red, green, blue values (each 0-255)
- **Images:** Grid of colored pixels, each pixel encoded as numbers
- **Sound:** Samples of audio waveforms at regular intervals
- **Instructions:** CPU operations encoded as numeric codes

### A Positional Number System

So computers can encode, store and process all kinds of data as patterns of 1s and 0s. But how does that 1s & 0s representation work exactly? Binary is not just a random collection of bits; it is a **positional number system**, just like the decimal system we use every day.

In any positional number system, each digit's value depends on two things:
- **The digit itself** (0-9 in decimal, 0-1 in binary)
- **Its position**, which determines the digit's weight

The weight of each position is calculated as `base^position`, where positions are counted from right to left starting at 0. The total value is the sum of each digit multiplied by its positional weight:

```
value = Σ (digit × base^position)
```

In **decimal** (base 10), each position represents a power of 10:

```
Decimal 247:   2×10²  +  4×10¹  +  7×10⁰  =  200 + 40 + 7  =  247
```

In **binary** (base 2), each position represents a power of 2:

```
Binary 1101:   1×2³   +  1×2²   +  0×2¹   +  1×2⁰
               8      +  4      +  0      +  1      =  13
```

This principle applies to any base. Hexadecimal (base 16), octal (base 8), and even exotic bases like base 60 (used by ancient Babylonians for time) all follow the same pattern.

:::info Why Decimal?
We use decimal because it is more intuitive for us to reason about, but it provides no mathematical advantage over other bases. In fact, base 12 would be more convenient for division (12 is divisible by 2, 3, 4, and 6), which is why we have 12 hours on a clock and 12 inches in a foot.
:::

### Binary to Decimal (and Back)

Now that we understand how positional number systems work, let's practice converting between binary and decimal to reinforce this understanding and build our intuition.

#### Binary to Decimal

Converting binary to decimal is straightforward: multiply each digit by its positional weight (power of 2) and sum the results.

```
Binary: 1 1 0 1 0 1 1 0

Position:   7    6    5    4    3    2    1    0
Power of 2: 128  64   32   16   8    4    2    1
Digit:      1    1    0    1    0    1    1    0

Calculation: 128 + 64 + 0 + 16 + 0 + 4 + 2 + 0 = 214
```

So `11010110` in binary equals `214` in decimal.

:::tip Quick Mental Math
For small binary numbers, just memorize the powers of 2 (1, 2, 4, 8, 16, 32, 64, 128) and add up the positions with a 1. For `1011`, that's 8 + 0 + 2 + 1 = 11.
:::

#### Decimal to Binary

To convert decimal to binary, repeatedly divide by 2 and track the remainders:

```
Convert 214 to binary:

214 ÷ 2 = 107 remainder 0  ↑
107 ÷ 2 = 53  remainder 1  │
 53 ÷ 2 = 26  remainder 1  │  Read
 26 ÷ 2 = 13  remainder 0  │  upward
 13 ÷ 2 = 6   remainder 1  │
  6 ÷ 2 = 3   remainder 0  │
  3 ÷ 2 = 1   remainder 1  │
  1 ÷ 2 = 0   remainder 1  │

Result: 11010110
```

**Why does this work?** Each division by 2 extracts one binary digit, starting from the rightmost (least significant) bit:

- When you divide by 2, the **remainder** tells you whether the number is odd (1) or even (0). This is exactly the value of the rightmost binary digit.
- The **quotient** represents what remains after "removing" that digit.

Think of it as peeling off binary digits from right to left:

```
214 is even  → rightmost digit is 0, continue with 107
107 is odd   → next digit is 1, continue with 53
 53 is odd   → next digit is 1, continue with 26
 26 is even  → next digit is 0, continue with 13
 13 is odd   → next digit is 1, continue with 6
  6 is even  → next digit is 0, continue with 3
  3 is odd   → next digit is 1, continue with 1
  1 is odd   → next digit is 1, done

Reading from bottom to top: 11010110
```

This is the inverse of how we read binary: instead of summing powers of 2, we're decomposing a number into its powers of 2.

#### Practice Problems

<details>
<summary>Convert binary 10110 to decimal</summary>

```
Position:  4    3    2    1    0
Power:     16   8    4    2    1
Digit:     1    0    1    1    0

16 + 0 + 4 + 2 + 0 = 22
```

**Answer: 22**

</details>

<details>
<summary>Convert decimal 45 to binary</summary>

```
45 ÷ 2 = 22 remainder 1
22 ÷ 2 = 11 remainder 0
11 ÷ 2 = 5  remainder 1
 5 ÷ 2 = 2  remainder 1
 2 ÷ 2 = 1  remainder 0
 1 ÷ 2 = 0  remainder 1

Reading upward: 101101
```

**Answer: 101101**

</details>

<details>
<summary>What is the largest number you can represent with 4 bits?</summary>

With 4 bits, each can be 0 or 1:
- Smallest: 0000 = 0
- Largest: 1111 = 8 + 4 + 2 + 1 = 15

The formula is 2ⁿ - 1, where n is the number of bits.
For 4 bits: 2⁴ - 1 = 16 - 1 = **15**

</details>

### Hexadecimal: A Friendlier Notation

Binary is precise but cumbersome. The number 255 in binary is `11111111`: eight digits for a small number. For larger values, binary becomes unwieldy. That is why we also use the *hexadecimal* number system in computing.

**Hexadecimal** (base 16) offers a compact alternative. It uses 16 digits: 0-9 and A-F.

| Decimal | Binary | Hexadecimal |
|---------|--------|-------------|
| 0       | 0000   | 0           |
| 1       | 0001   | 1           |
| 2       | 0010   | 2           |
| ...     | ...    | ...         |
| 9       | 1001   | 9           |
| 10      | 1010   | A           |
| 11      | 1011   | B           |
| 12      | 1100   | C           |
| 13      | 1101   | D           |
| 14      | 1110   | E           |
| 15      | 1111   | F           |

#### Why Hexadecimal?

The magic is that one hex digit represents exactly 4 bits. This means:
- 1 byte (8 bits) = exactly 2 hex digits
- Conversion between binary and hex is trivial

```
Binary:       1101 0110
Hex digits:    D    6

11010110 (binary) = D6 (hex) = 214 (decimal)
```

#### Common Conventions

You will see hexadecimal in many places:

```javascript
// Memory addresses (prefixed with 0x)
const address = 0x7FFF5FBFF8C0;

// Colors in web development (#RRGGBB)
const red = "#FF0000";      // 255 red, 0 green, 0 blue
const purple = "#800080";   // 128 red, 0 green, 128 blue

// Unicode characters
const heart = "\u2764";     // ❤
```

:::tip Quick Conversion Trick
Knowing the hex values for 0-15, you can convert any binary to hex by grouping bits into fours:

`10111110` → `1011 1110` → `B E` → `0xBE`
:::

## Bits and Bytes

Let's quickly recap what we've learned so far. We now know that computers operate on 1s and 0s only due to their physical architecture. We know that we can leverage the binary system to encode complex data with only 1s and 0s, and we know how the binary system and decimal ↔ binary conversion works.

This understanding enables us to examine how computers encode data in more detail. But first, let's have a look at binary units: how does a sequence of bits translate into megabytes and gigabytes we are familiar with?

### The Bit: The Atom of Information

A single binary digit (0 or 1) is called a **bit**. It is the smallest possible unit of information: a single yes/no, true/false, on/off answer.

One bit can represent two possibilities:
- 0 or 1
- false or true
- off or on

### The Byte: A Useful Chunk

While a bit is the fundamental unit, working with individual bits is tedious. Instead, we group bits together. The most common grouping is the **byte**: 8 bits.

```
┌───────────────────────────────────────────┐
│              ONE BYTE (8 bits)            │
│                                           │
│    ┌───┬───┬───┬───┬───┬───┬───┬───┐     │
│    │ 0 │ 1 │ 1 │ 0 │ 0 │ 1 │ 0 │ 1 │     │
│    └───┴───┴───┴───┴───┴───┴───┴───┘     │
│     ▲                               ▲     │
│     │                               │     │
│    MSB                             LSB    │
│  (Most                           (Least  │
│  Significant                  Significant│
│    Bit)                           Bit)   │
│                                           │
└───────────────────────────────────────────┘
```

:::info Why 8 bits?
Historically, 8 bits was enough to represent all English letters, numbers, and symbols (plus some extra), and it happens to be a power of 2, which makes hardware design simpler.
:::

### How Many Values Can a Byte Hold?

Each bit can be 0 or 1, giving us 2 choices. With 8 bits, we have:

```
2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2⁸ = 256 possible values
```

A single byte can represent any number from 0 to 255, or 256 different characters, or 256 different colors in a simple image.

### Larger Units

| Unit     | Size              | Bytes         | Common Use                    |
|----------|-------------------|---------------|-------------------------------|
| Bit      | 1 bit             | 1/8           | Single yes/no value           |
| Byte     | 8 bits            | 1             | Single character              |
| Kilobyte | 1,024 bytes       | ~1 thousand   | Short text document           |
| Megabyte | 1,024 KB          | ~1 million    | MP3 song, high-res photo      |
| Gigabyte | 1,024 MB          | ~1 billion    | Movie, large application      |
| Terabyte | 1,024 GB          | ~1 trillion   | Large hard drive              |

:::info Why 1,024 Instead of 1,000?
We use powers of 2 because binary works in powers of 2. 1,024 is 2¹⁰, the power of 2 closest to 1,000. This is why a "1 GB" hard drive actually holds 1,073,741,824 bytes (2³⁰), not exactly 1,000,000,000.
:::

## Key Takeaways

1. **Computers are electrical machines.** They do not "think"; they manipulate electrical signals. Transistors map current flow to 1s and 0s, giving us a way to represent information physically.

2. **Binary is a necessity, not a choice.** Two states (on/off) are far more reliable than ten in noisy electrical circuits. This is why all digital computers use binary.

3. **The binary number system is positional.** Each digit's value depends on its position, just like decimal. The difference is the base: 2 instead of 10.

4. **Hexadecimal is binary's best friend.** Because one hex digit equals exactly 4 bits, hexadecimal provides a compact, human-readable way to represent binary data.

5. **Bits combine to form bytes.** 8 bits make a byte, which can represent 256 different values. Larger units (KB, MB, GB) are powers of 2.

## Looking Ahead

We can now read and write binary, convert between bases, and understand why two states are enough. So far, though, our binary numbers can only count upward from zero. A computer that cannot represent -5 or 3.14 would not get very far. The next article tackles this challenge, and the solutions turn out to be more elegant (and more surprising) than you might expect.