---
title: Representing Numbers
---

## Beyond Positive Integers

In the previous article, we learned how binary works: a positional number system where each digit represents a power of 2. We saw how to convert between binary and decimal, and how bytes group 8 bits together to represent values from 0 to 255.

But there is a problem. So far, we have only been able to represent positive whole numbers. How does a computer represent -5 or -1000? What about 3.14159 or 0.001? Real-world programs need negative numbers for temperatures, account balances, and coordinates. They need decimals for prices, measurements, and scientific calculations.

In this article, we will explore how computers represent the full spectrum of numbers, and discover both the elegance and the pitfalls of these representations.

## Negative Numbers

How does a computer represent -5 or -1000? The answer is not as simple as adding a minus sign.

### The Naive Approach: Sign Bit

The simplest idea: reserve one bit for the sign.
- 0 = positive
- 1 = negative

So in an 8-bit system:
- `00000101` = +5
- `10000101` = -5

This is called **sign-magnitude** representation, and it mirrors how we write numbers on paper. Unfortunately, it creates serious problems for computers.

**Problem 1: Two zeros.** Both `00000000` (+0) and `10000000` (-0) represent zero. This wastes one of our 256 bit patterns, and every equality check must account for both representations.

**Problem 2: Addition breaks.** With sign-magnitude, you cannot simply add two numbers. The CPU would need to:
1. Check if the signs are the same or different
2. If different, subtract the smaller magnitude from the larger
3. Determine the sign of the result based on which operand was larger

```
Adding 5 + (-3) in sign-magnitude:

    00000101   (+5)
  + 10000011   (-3)
  ──────────
    10001000   (-8)  ← Wrong! We wanted +2

The CPU can't just add the bits. It needs special logic
to detect opposite signs and perform subtraction instead.
```

This complexity requires extra circuitry and slows down the most common operation in computing. We need a better approach.

### Two's Complement: The Elegant Solution

Modern computers use **two's complement**, a clever system where:
- Positive numbers are represented normally
- Negative numbers are represented by inverting all bits and adding 1

```
To get -5 in 8-bit two's complement:

Step 1: Start with +5 in binary
   00000101

Step 2: Invert all bits (0→1, 1→0)
   11111010

Step 3: Add 1
   11111011

Result: -5 is represented as 11111011
```

But why does "invert and add 1" work? It seems like an arbitrary trick, but there is elegant logic behind it.

**The key insight:** In two's complement, a negative number -N is represented as `2ⁿ - N`, where n is the number of bits. For 8 bits, -5 is stored as `256 - 5 = 251`, which in binary is `11111011`.

Why `2ⁿ - N`? Because when you add N and (2ⁿ - N), you get exactly 2ⁿ, which overflows back to zero in an n-bit system. This means N and its two's complement representation are perfect additive inverses.

The "invert and add 1" formula is just a clever shortcut for computing `2ⁿ - N`:
- Inverting all bits of N gives you `(2ⁿ - 1) - N` (since `2ⁿ - 1` is all 1s)
- Adding 1 gives you `2ⁿ - N`

```
For 8 bits, 2⁸ - 1 = 255 = 11111111

To find -5:
  11111111   (255, which is 2⁸ - 1)
- 00000101   (5)
──────────
  11111010   (250, which is 255 - 5)
+ 00000001   (add 1)
──────────
  11111011   (251, which is 256 - 5 = -5 in two's complement)
```

This is not just a mathematical curiosity. It is the reason two's complement makes arithmetic so elegant.

### Why Two's Complement is Brilliant

The beauty of two's complement is that addition works automatically:

```
Adding 5 + (-3):

    00000101   (5)
  + 11111101   (-3 in two's complement)
  ──────────
   100000010   (9-bit result)
        ↓
    00000010   (discard the overflow bit → 2)
```

But *why* does this work? Let's trace through the math:

- We want to compute `5 + (-3) = 2`
- In two's complement, -3 is stored as `256 - 3 = 253`
- So we're actually computing `5 + 253 = 258`
- In binary, 258 is `100000010` (9 bits)
- But we only have 8 bits, so the leading 1 is discarded
- `258 - 256 = 2` ✓

This is **modular arithmetic**: numbers wrap around at 2ⁿ, like hours on a clock wrap around at 12. When the result exceeds what our bits can hold, it naturally overflows to the correct answer.

**The hardware advantage:** Because addition "just works," the CPU can use the exact same adder circuit for both signed and unsigned numbers. There is no special "signed addition" instruction. The processor simply adds the bits; the only difference is how your program interprets the result.

This also means subtraction is free. To compute `A - B`, the CPU simply calculates `A + (-B)` by taking the two's complement of B and adding. No separate subtraction circuit is needed.

### The Cost of Negative Numbers

Two's complement is elegant, but it comes with a trade-off: **supporting negative numbers cuts your positive range in half**.

In an 8-bit system, we have 256 possible bit patterns (0 to 255). With two's complement, we split this range:
- Patterns `00000000` to `01111111` (0-127) represent positive numbers
- Patterns `10000000` to `11111111` (128-255) represent negative numbers (-128 to -1)

The most significant bit (MSB) effectively becomes a sign indicator. Any value with a 1 in the MSB is interpreted as negative:

```
01111111 = 127   (MSB is 0 → positive)
10000000 = -128  (MSB is 1 → negative)
10000001 = -127  (MSB is 1 → negative)
11111111 = -1    (MSB is 1 → negative)
```

This means if you're using signed integers and only storing positive values, you're wasting half your range. An 8-bit signed integer maxes out at 127, while those same 8 bits could store up to 255 if we didn't need negatives.

### Signed vs Unsigned: Explicit Control

This raises a question: what if you *know* a value will never be negative? Languages like C, C++, Rust, and Go let you explicitly choose between **signed** and **unsigned** integer types:

```cpp
// Signed types: can store negative values, but lower positive maximum
int temperature = -10;  // Range: -2,147,483,648 to 2,147,483,647

// Unsigned types: no negatives, but double the positive range
unsigned int count = 100;  // Range: 0 to 4,294,967,295
```

When you declare a variable as signed, you're telling the compiler: "interpret the MSB as a sign indicator using two's complement." When you declare it as unsigned, you're saying: "treat all bits as magnitude."

The unsigned operator therefore allows us to double our range when working with large data:

| Type (8-bit) | Minimum | Maximum |
|--------------|---------|---------|
| signed       | -128    | 127     |
| unsigned     | 0       | 255     |

| Type (32-bit) | Minimum        | Maximum       |
| ------------- | -------------- | ------------- |
| signed        | -2,147,483,648 | 2,147,483,647 |
| unsigned      | 0              | 4,294,967,295 |

:::warning Integer Overflow
What happens if you add 1 to the maximum value? It wraps around!

```
127 + 1 in 8-bit signed:
  01111111
+ 00000001
──────────
  10000000 = -128 (wrapped to minimum!)
```

This is called **integer overflow** and is a common source of bugs. The behavior varies by language:
- **C/C++:** Signed overflow is undefined behavior; unsigned overflow wraps predictably
- **Rust:** Panics in debug mode, wraps in release mode
- **Python:** Integers have arbitrary precision, so they never overflow

Always consider whether your values might exceed the type's range.
:::

## Floating-Point Numbers

Integers are straightforward, but what about numbers like 3.14159 or 0.001? These provide a unique kind of challenge: some numbers have infinite decimal places, like `1/3 = 0.3333333... = 0.(3)`.

### The Challenge

We cannot store infinite decimal places, so floating-point is inherently an approximation. The standard used by virtually all modern computers is **IEEE 754**, which defines how to encode decimal values in binary.

### Scientific Notation in Binary

Before diving into the format, let's understand the core idea. In decimal, we use scientific notation to write numbers compactly:

```
6.75 = 6.75 × 10⁰
675  = 6.75 × 10²
0.0675 = 6.75 × 10⁻²
```

Binary works the same way, but with powers of 2:

```
6.75 in binary = 110.11
              = 1.1011 × 2²
```

:::info
How did we get `110.11`? Just like decimal places represent 10⁻¹, 10⁻², etc., binary places after the point represent 2⁻¹, 2⁻², etc.:

```
Binary: 1   1   0  .  1     1
        ↓   ↓   ↓     ↓     ↓
        4 + 2 + 0  + 0.5 + 0.25 = 6.75
```
:::

### The IEEE 754 Format

A 32-bit floating-point number is stored in three parts:

```
┌──────────────────────────────────────────────────────┐
│             32-bit Float (IEEE 754)                  │
│                                                      │
│  ┌─────┬──────────┬─────────────────────────────┐   │
│  │Sign │ Exponent │        Mantissa             │   │
│  │1 bit│  8 bits  │        23 bits              │   │
│  └─────┴──────────┴─────────────────────────────┘   │
│                                                      │
│  Value = (-1)^sign × 1.mantissa × 2^(exponent-127)  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- **Sign (1 bit):** 0 for positive, 1 for negative
- **Exponent (8 bits):** The power of 2, stored with a bias of 127
- **Mantissa (23 bits):** The fractional part after the leading 1

The **bias** is a clever trick. Instead of storing negative exponents with a sign bit, we add 127 to the actual exponent. So an exponent of 2 is stored as 129 (2 + 127), and an exponent of -3 is stored as 124 (-3 + 127).

The **implicit leading 1** is another space-saving trick. Since normalized binary numbers always start with 1 (like `1.1011 × 2²`), we don't store it. The mantissa only holds the bits after the decimal point.

### Encoding a Number: Step by Step

Let's encode **6.75** as a 32-bit float:

```
Step 1: Convert to binary
   6.75 = 4 + 2 + 0.5 + 0.25 = 110.11 in binary

Step 2: Normalize (move decimal so there's one digit before it)
   110.11 = 1.1011 × 2²

Step 3: Extract the components
   Sign: 0 (positive)
   Exponent: 2 + 127 = 129 = 10000001 in binary
   Mantissa: 1011 (the part after "1.")
             Padded to 23 bits: 10110000000000000000000

Step 4: Assemble
   0 10000001 10110000000000000000000
   ↑ ───┬──── ──────────┬────────────
  Sign  Exp         Mantissa

In hex: 0x40D80000
```

Let's verify by decoding it back:

```
Sign: 0 → positive
Exponent: 10000001 = 129 → 129 - 127 = 2
Mantissa: 1.1011 (adding implicit leading 1)

Value = +1 × 1.1011 × 2²
      = 1.1011 × 4
      = 110.11
      = 6.75 ✓
```

### When Numbers Cannot Be Represented Exactly

The number 6.75 worked perfectly because it's a sum of powers of 2. But what about **0.1**?

```
0.1 in binary:

0.1 × 2 = 0.2  → 0
0.2 × 2 = 0.4  → 0
0.4 × 2 = 0.8  → 0
0.8 × 2 = 1.6  → 1, continue with 0.6
0.6 × 2 = 1.2  → 1, continue with 0.2
0.2 × 2 = 0.4  → 0  ← Pattern repeats!
...

0.1 = 0.00011001100110011... (repeating forever)
```

Just like 1/3 = 0.333... in decimal, 0.1 has an infinite representation in binary. With only 23 bits for the mantissa, we must truncate, introducing a small error.

The stored value of 0.1 is actually:
```
0.1000000000000000055511151231257827021181583404541015625
```

This is why `0.1 + 0.2 !== 0.3`:

```javascript
// What we write:
0.1 + 0.2

// What the computer actually computes:
0.1000000000000000055... + 0.2000000000000000111...
= 0.3000000000000000444...

// Which is NOT equal to:
0.2999999999999999888...  // (what 0.3 actually stores as)
```

### Floating-Point Arithmetic and Error Accumulation

Each floating-point operation can introduce a tiny error. These errors compound:

```javascript
// Adding 0.1 ten thousand times
let sum = 0;
for (let i = 0; i < 10000; i++) {
  sum += 0.1;
}
console.log(sum);           // 1000.0000000001588 (not 1000!)
console.log(sum === 1000);  // false
```

**Catastrophic cancellation** occurs when subtracting nearly equal numbers:

```javascript
// Two numbers that are very close
const a = 1.0000001;
const b = 1.0000000;

// Their difference should be 0.0000001
const diff = a - b;
console.log(diff);  // 1.0000000000065512e-7

// The relative error is now huge because most significant
// digits cancelled out, leaving only the noisy low-order bits
```

**Order of operations matters:**

```javascript
// Adding small numbers to large numbers loses precision
let large = 1e15;
console.log(large + 1 - large);  // 1 (correct)
console.log(large - large + 1);  // 1 (correct)
console.log((large + 1) - large); // 0 (wrong! the +1 was lost)
```

When you add 1 to 10¹⁵, the 1 is so small relative to the large number that it falls outside the precision of the mantissa and gets rounded away.

:::tip Strategies for Numerical Stability
1. **Add small numbers first:** When summing a list, sort by magnitude and add smallest first
2. **Use Kahan summation:** A technique that tracks the lost low-order bits
3. **Avoid subtracting nearly equal numbers:** Reformulate the math if possible
4. **Use higher precision when needed:** 64-bit double instead of 32-bit float
:::

### The Quirks You Must Know

```javascript
// Classic floating-point weirdness
console.log(0.1 + 0.2);           // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);   // false!

// Large integers lose precision in floats
console.log(9007199254740993);     // 9007199254740992 (wrong!)

// Special values
console.log(1 / 0);               // Infinity
console.log(-1 / 0);              // -Infinity
console.log(0 / 0);               // NaN (Not a Number)
console.log(NaN === NaN);         // false (NaN is never equal to itself!)

// Checking for NaN
console.log(Number.isNaN(NaN));   // true
```

:::danger Never Use Floats for Money
Because of precision issues, never use floating-point for financial calculations:

```javascript
// WRONG
let balance = 0.10 + 0.20;  // 0.30000000000000004

// RIGHT: Use integers (cents) or a decimal library
let balanceCents = 10 + 20;  // 30 cents
```

Many financial bugs have been caused by floating-point errors. Use integer arithmetic (store cents, not dollars) or specialized decimal libraries.
:::

### Comparing Floating-Point Numbers

Never use `===` to compare floats directly. Instead, check if they're "close enough":

```javascript
// Bad: exact comparison
if (result === 0.3) { /* unreliable */ }

// Good: epsilon comparison
const EPSILON = 1e-10;
if (Math.abs(result - 0.3) < EPSILON) { /* reliable */ }

// Better: relative epsilon for numbers of varying magnitude
function nearlyEqual(a, b, relEpsilon = 1e-9) {
  const diff = Math.abs(a - b);
  const largest = Math.max(Math.abs(a), Math.abs(b));
  return diff <= largest * relEpsilon;
}
```

### Float vs Double

| Type   | Bits | Precision        | Range                    |
|--------|------|------------------|--------------------------|
| float  | 32   | ~7 digits        | ±3.4 × 10³⁸              |
| double | 64   | ~15-16 digits    | ±1.8 × 10³⁰⁸             |

JavaScript uses 64-bit doubles for all numbers. Python also uses doubles. In languages like C, Java, or Rust, you choose explicitly.

<details>
<summary>Practice: Encode -13.5 as a 32-bit float</summary>

```
Step 1: Convert to binary
   13.5 = 8 + 4 + 1 + 0.5 = 1101.1

Step 2: Normalize
   1101.1 = 1.1011 × 2³

Step 3: Extract components
   Sign: 1 (negative)
   Exponent: 3 + 127 = 130 = 10000010
   Mantissa: 1011 → 10110000000000000000000

Step 4: Assemble
   1 10000010 10110000000000000000000

Hex: 0xC1580000
```

</details>

## Key Takeaways

1. **Two's complement is elegant.** By representing -N as `2ⁿ - N`, addition works automatically without special circuitry. The "invert and add 1" trick is a shortcut for this calculation.

2. **Signed types trade range for flexibility.** Supporting negative numbers cuts your positive range in half. Choose unsigned types when you know values will never be negative.

3. **Integer overflow wraps around.** When you exceed the maximum value, you wrap to the minimum. This is predictable for unsigned types but undefined behavior for signed types in some languages.

4. **Floating-point is inherently approximate.** Many decimal fractions (like 0.1) cannot be represented exactly in binary, leading to small errors that can accumulate.

5. **Never compare floats with `===`.** Use epsilon comparisons to check if two floating-point numbers are "close enough."

6. **Never use floats for money.** Use integer arithmetic (cents) or specialized decimal libraries to avoid precision errors in financial calculations.

## Looking Ahead

We now understand how computers represent both integers and decimals. But numbers are only part of the story. In the next article, we'll explore how computers represent text, from the simple ASCII standard to the comprehensive Unicode system that encodes every character from every writing system on Earth.
