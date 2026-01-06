---
title: Representing Numbers
---
## Beyond Positive Integers

In the previous article, we learned how binary works: a positional number system where each digit represents a power of 2. We saw how to convert between binary and decimal, and how bytes group 8 bits together to represent values from 0 to 255.

But there is a problem. So far, we have only been able to represent positive whole numbers. How does a computer represent -5 or -1000? What about 3.14159 or 0.001? Real-world programs need negative numbers for temperatures, account balances, and coordinates. They need decimals for prices, measurements, and scientific calculations.

In this article, we will explore how computers represent the full spectrum of numbers, and discover both the elegance and the pitfalls of these representations.

## Negative Numbers

How does a computer store negative values like -5 or -1000? As it turns out, the answer is not as simple as adding a minus sign.

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

This approach would require extra circuitry, slowing down the most common operation in computing. We need a better approach.

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

Let's trace through the math:

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

We have seen how two's complement elegantly handles negative integers, and how choosing between signed and unsigned types affects our available range. But integers, whether negative or positive, share a fundamental limitation: they can only represent whole numbers.

What about 3.14159 or 0.001? Real programs need fractions constantly: prices with cents, GPS coordinates with decimal degrees, scientific measurements with arbitrary precision. We cannot simply "add a decimal point" to our integer representation. Binary has no concept of a decimal point; it only knows 1s and 0s.

This challenge requires a fundamentally different approach.

### The Range Problem

With integers, each bit position has a fixed meaning: the ones place, the twos place, the fours place, and so on. We could try the same approach for decimals by splitting our bits between an integer part and a fractional part. This is called **fixed-point** representation:

```
Fixed-point with 4 integer bits and 4 fractional bits:

    0101.1100
    ↓↓↓↓ ↓↓↓↓
    8421.½¼⅛1/16

    = 4 + 1 + 0.5 + 0.25 = 5.75
```

This works, but it forces a painful trade-off. With only 4 integer bits, we max out at 15. With only 4 fractional bits, our smallest step is 0.0625. We cannot represent both 0.000001 and 1,000,000.5 with the same fixed-point format. We must choose: precision for small numbers OR the ability to represent large numbers.

**Floating-point** solves this by letting the decimal point "float", moving left or right depending on the number's magnitude. This is where the name comes from. A tiny number like 0.000001 shifts the point far to the left; a huge number like 1,000,000.5 shifts it to the right. The same bits can represent vastly different scales.

### Scientific Notation

Floating-point is built on scientific notation, so let's make sure we understand it thoroughly.

In scientific notation, every number is broken into three components:

```
 -6.75 × 10²
 ↑ ↑      ↑
 │ │      └── Exponent: how far to shift the decimal point
 │ └───────── Significand (or Mantissa): the meaningful digits
 └────────── Sign: positive or negative
```

- The **sign** tells us if the number is positive or negative.
- The **significand** (also called the **mantissa**) contains the actual digits. We "normalize" it so there is exactly one non-zero digit before the decimal point.
- The **exponent** tells us how many places to shift the decimal. Positive exponents shift right (making larger numbers), negative exponents shift left (making smaller numbers).

```
Scientific notation examples:

  675     = 6.75 × 10²   (shift decimal 2 places right)
  6.75    = 6.75 × 10⁰   (no shift)
  0.0675  = 6.75 × 10⁻²  (shift decimal 2 places left)
  -0.0675 = -6.75 × 10⁻² (same, but negative)
```

The beauty of this system is that we can represent numbers of wildly different magnitudes by simply adjusting the exponent, while keeping the same precision in the significand.

### Binary Scientific Notation

Binary scientific notation works identically, but with powers of 2 instead of powers of 10:

```
6.75 in binary:

Step 1: Convert to binary
   6.75 = 4 + 2 + 0.5 + 0.25
        = 110.11 in binary

Step 2: Normalize (one digit before the point)
   110.11 = 1.1011 × 2²
            ↑ ↑      ↑
            │ │      └── Exponent: 2 (we shifted 2 places)
            │ └───────── Mantissa: 1011 (digits after the point)
            └────────── The leading 1 (always present when normalized)
```

:::info Binary Decimals
How did we get `110.11` from `6.75`? Just like decimal places represent 10⁻¹, 10⁻², etc., binary places after the point represent 2⁻¹, 2⁻², etc.:

```
Binary: 1   1   0  .  1     1
        ↓   ↓   ↓     ↓     ↓
        4 + 2 + 0  + 0.5 + 0.25 = 6.75
```

The first binary decimal place is ½, the second is ¼, the third is ⅛, and so on.
:::

### The IEEE 754 Format

Now we are ready to understand **IEEE 754**, the standard that virtually all modern computers use for floating-point. It is simply a way to pack the three components of binary scientific notation into a fixed number of bits:

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

Each component maps directly to what we learned about scientific notation:

- **Sign (1 bit):** 0 for positive, 1 for negative. Straightforward.
- **Exponent (8 bits):** The power of 2 that tells us where to place the decimal point.
- **Mantissa (23 bits):** The significant digits after the decimal point.

Two clever tricks make this format more efficient:

**The bias trick:** Exponents can be negative (for numbers like 0.001), but storing negative numbers would require a sign bit. Instead, IEEE 754 adds 127 to the actual exponent before storing it. An exponent of 2 is stored as 129 (2 + 127); an exponent of -3 is stored as 124 (-3 + 127). This way, all stored exponents are positive, and comparison becomes simpler.

**The implicit leading 1:** When we normalize a binary number, it always starts with 1 (like `1.1011 × 2²`). Since this leading 1 is always there, why waste a bit storing it? The mantissa only holds the digits *after* the decimal point. The leading 1 is implied.

:::info The "Floating" Window of Precision
A 32-bit float has about 7 significant digits of precision, but *where* those digits apply depends on the exponent:

| Magnitude | Example Value  | Smallest Step (Precision) |
|-----------|----------------|---------------------------|
| 2⁻¹⁰      | ~0.001         | ~0.0000000001             |
| 2⁰        | ~1             | ~0.0000001                |
| 2¹⁰       | ~1,000         | ~0.0001                   |
| 2²⁰       | ~1,000,000     | ~0.1                      |
| 2²⁴       | ~16,777,216    | 1 (integers only!)        |
| 2³⁰       | ~1,000,000,000 | ~100                      |

At small magnitudes, you can distinguish between 0.0000001 and 0.0000002. At large magnitudes, you cannot even tell the difference between 16,777,216 and 16,777,217. They round to the same float!

This is what "floating point" means: the decimal point floats to give you precision where the number lives, rather than at a fixed position. You always get ~7 meaningful digits, but the exponent determines which 7 digits those are.
:::

### Encoding a Number: Step by Step

Let's encode **6.75** as a 32-bit float. The first challenge is converting the decimal to binary, and fractions require a different technique than whole numbers.

**Converting the integer part** is familiar: repeatedly divide by 2 and collect remainders.

```
6 ÷ 2 = 3 remainder 0  ↑
3 ÷ 2 = 1 remainder 1  │ Read upward: 110
1 ÷ 2 = 0 remainder 1  │
```

**Converting the fractional part** works in reverse: repeatedly *multiply* by 2. Each multiplication asks: "Does this fraction contain the next binary place?"

Remember that binary decimal places represent ½, ¼, ⅛, and so on. When we multiply a fraction by 2, we're asking whether the next binary digit is 1 or 0:
- If the result is **≥ 1**, the digit is **1** (the fraction contains that power of ½)
- If the result is **< 1**, the digit is **0** (it doesn't)

```
Converting 0.75 to binary:

0.75 × 2 = 1.50  → 1  (0.75 contains ½; continue with 0.50)
0.50 × 2 = 1.00  → 1  (0.50 contains ¼; continue with 0.00)
0.00 × 2 = 0.00  → done!

Reading top to bottom: 0.75 = 0.11 in binary
```

Let's verify: 0.11 in binary = ½ + ¼ = 0.5 + 0.25 = 0.75 ✓

The algorithm terminated cleanly because 0.75 (which is ¾) can be expressed as a sum of powers of 2. This will become important shortly.

**Now we can encode 6.75:**

```
Step 1: Convert to binary
   Integer part: 6 = 110
   Fractional part: 0.75 = 0.11
   Combined: 6.75 = 110.11

Step 2: Normalize (one digit before the point)
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

The number 6.75 encoded perfectly. But watch what happens with **0.1**:

```
Converting 0.1 to binary:

0.1 × 2 = 0.2  → 0
0.2 × 2 = 0.4  → 0
0.4 × 2 = 0.8  → 0
0.8 × 2 = 1.6  → 1  (continue with 0.6)
0.6 × 2 = 1.2  → 1  (continue with 0.2)
0.2 × 2 = 0.4  → 0  ← We've seen 0.2 before!
0.4 × 2 = 0.8  → 0
0.8 × 2 = 1.6  → 1  (continue with 0.6)
...the pattern repeats forever

0.1 = 0.00011001100110011... (repeating)
```

The algorithm never terminates. We keep cycling through 0.2 → 0.4 → 0.8 → 0.6 → 0.2, producing the pattern `0011` forever.

**Why does 0.75 terminate but 0.1 repeat?**

A fraction has a finite binary representation only if its denominator is a power of 2. Let's look at both:

- **0.75 = ¾ = 3/4** → Denominator is 4 = 2². Terminates!
- **0.1 = 1/10** → Denominator is 10 = 2 × 5. The factor of 5 cannot be represented in binary. Repeats forever.

This is analogous to decimal: 1/4 = 0.25 terminates, but 1/3 = 0.333... repeats forever because 3 is not a factor of 10.

**The consequence:** With only 23 bits for the mantissa, we must truncate 0.1's infinite representation. The stored value is not 0.1, but the closest 23-bit approximation:

```
Stored value: 0.1000000000000000055511151231257827021181583404541015625
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

Both 0.1 + 0.2 and 0.3 are approximations, but they are *different* approximations. The errors don't cancel out; they accumulate.

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

### Comparing Floating-Point Numbers

Since floating-point arithmetic introduces small errors, exact equality checks are unreliable:

```javascript
const result = 0.1 + 0.2;
console.log(result === 0.3);  // false (we've seen why!)
```

Instead, check if two numbers are "close enough" using an **epsilon comparison**. The idea is simple: if the difference between two numbers is smaller than some tiny threshold (epsilon), treat them as equal.

```javascript
const EPSILON = 1e-10;

function nearlyEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}

console.log(nearlyEqual(0.1 + 0.2, 0.3));  // true
```

But there is a subtlety. A fixed epsilon like `1e-10` works for numbers near zero, but what about very large numbers? The difference between 1,000,000.0 and 1,000,000.0000001 might exceed `1e-10` even though they are effectively identical.

The solution is a **relative epsilon**: instead of a fixed threshold, use a fraction of the numbers' magnitude.

```javascript
function nearlyEqual(a, b, relEpsilon = 1e-9) {
  const diff = Math.abs(a - b);
  const largest = Math.max(Math.abs(a), Math.abs(b));
  return diff <= largest * relEpsilon;
}

// Works for small numbers
nearlyEqual(0.1 + 0.2, 0.3);                    // true

// Works for large numbers too
nearlyEqual(1000000.1 + 1000000.2, 2000000.3);  // true
```

### Handling Money and Financial Calculations

Floating-point errors are unacceptable in financial applications. A fraction of a cent, compounded over millions of transactions, can mean real money lost or gained.

**The simple solution: use integers.** Store monetary values as the smallest unit (cents, pence, satoshis) rather than as decimal dollars:

```javascript
// WRONG: floating-point dollars
let balance = 0.10 + 0.20;       // 0.30000000000000004
let total = balance * 100;       // 30.000000000000004 cents (!)

// RIGHT: integer cents
let balanceCents = 10 + 20;      // 30 cents, exactly
let displayDollars = balanceCents / 100;  // Convert only for display
```

This approach works well for most applications. Perform all arithmetic in cents (or your smallest unit), and only convert to decimal for display.

**For complex financial applications**, consider a dedicated decimal library that represents numbers as strings or arrays of digits, avoiding binary floating-point entirely:

```javascript
// Using a library like decimal.js or big.js
import Decimal from 'decimal.js';

const price = new Decimal('19.99');
const tax = new Decimal('0.08');
const total = price.times(tax.plus(1));

console.log(total.toString());  // "21.5892" (exact)
```

These libraries are slower than native floats, but correctness matters more than speed when money is involved.

### Float vs Double

So far we have focused on 32-bit floats, but most languages default to 64-bit **doubles** (short for "double precision"). Where do those extra 32 bits go?

```
32-bit float:
┌──────┬────────────┬───────────────────────────┐
│ Sign │  Exponent  │         Mantissa          │
│ 1bit │   8 bits   │         23 bits           │
└──────┴────────────┴───────────────────────────┘

64-bit double:
┌──────┬─────────────┬────────────────────────────────────────────────────┐
│ Sign │  Exponent   │                     Mantissa                       │
│ 1bit │   11 bits   │                     52 bits                        │
└──────┴─────────────┴────────────────────────────────────────────────────┘
```

The mantissa more than doubles (23 → 52 bits), which is why precision jumps from ~7 to ~16 significant digits. The exponent also grows (8 → 11 bits), extending the representable range dramatically.

| Type   | Bits | Mantissa | Precision     | Range        |
|--------|------|----------|---------------|--------------|
| float  | 32   | 23 bits  | ~7 digits     | ±3.4 × 10³⁸  |
| double | 64   | 52 bits  | ~15-16 digits | ±1.8 × 10³⁰⁸ |

**What does this mean in practice?**

Both formats have error when storing 0.1, but double gets 9 more correct digits:

```
Float stores 0.1 as:  0.100000001490116...
Double stores 0.1 as: 0.100000000000000005551115...
                           └── 9 more correct digits ──┘
```

Perhaps more striking is the **largest consecutive integer** each format can represent exactly. Remember from our precision table that at some magnitude, even +1 becomes too small to represent:

```
Float:  16,777,216      (2²⁴) ← cannot distinguish 16,777,216 from 16,777,217
Double: 9,007,199,254,740,992 (2⁵³) ← about 9 quadrillion
```

This is why JavaScript (which uses doubles for all numbers) has `Number.MAX_SAFE_INTEGER` set to 9,007,199,254,740,991.

**When to use which?**

- **Double (64-bit):** The safe default. Use for most calculations, scientific computing, and any time precision matters. This is what JavaScript and Python use for all numbers.
- **Float (32-bit):** Use when memory or bandwidth is critical and reduced precision is acceptable. Common in graphics programming (GPUs process millions of vertices), game physics, audio processing, and machine learning (where "close enough" is fine and speed matters).

## Key Takeaways

1. **Two's complement is elegant.** By representing -N as `2ⁿ - N`, addition works automatically without special circuitry. The "invert and add 1" trick is a shortcut for this calculation.

2. **Signed types trade range for flexibility.** Supporting negative numbers cuts your positive range in half. Choose unsigned types when you know values will never be negative.

3. **Integer overflow wraps around.** When you exceed the maximum value, you wrap to the minimum. This is predictable for unsigned types but undefined behavior for signed types in some languages.

4. **Floating-point is inherently approximate.** Many decimal fractions (like 0.1) cannot be represented exactly in binary, leading to small errors that can accumulate.

5. **Never compare floats with `===`.** Use epsilon comparisons to check if two floating-point numbers are "close enough."

6. **Never use floats for money.** Use integer arithmetic (cents) or specialized decimal libraries to avoid precision errors in financial calculations.

## Looking Ahead

We now understand how computers represent both integers and decimals. But numbers are only part of the story. In the next article, we'll explore how computers represent text, from the simple ASCII standard to the comprehensive Unicode system that encodes every character from every writing system on Earth.
