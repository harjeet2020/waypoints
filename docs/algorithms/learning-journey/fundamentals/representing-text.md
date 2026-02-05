---
title: Representing Text
---
## From Numbers to Characters

In the previous articles, we explored how computers represent data using binary. We saw how transistors give us 1s and 0s, how the binary number system lets us encode any integer, and how two's complement and IEEE 754 handle negative numbers and decimals.

But computers don't just work with numbers. They display text, process documents, and communicate across the internet using messages written in dozens of languages. How do we represent the letter "A" or the word "hello" or a Chinese character using only 1s and 0s?

The answer involves mapping numbers to characters through **character encodings**. In this article, we'll trace the evolution from the simple ASCII standard to the comprehensive Unicode system that makes modern global computing possible.

## ASCII: The Original Standard

**ASCII** (American Standard Code for Information Interchange) was created in the 1960s. It uses 7 bits to represent 128 characters:

| Range   | Characters                                |
|---------|-------------------------------------------|
| 0-31    | Control characters (newline, tab, etc.)   |
| 32-47   | Punctuation and symbols                   |
| 48-57   | Digits 0-9                                |
| 65-90   | Uppercase A-Z                             |
| 97-122  | Lowercase a-z                             |
| 123-127 | More punctuation                          |

```javascript
// ASCII values
'A'.charCodeAt(0);  // 65
'a'.charCodeAt(0);  // 97
'0'.charCodeAt(0);  // 48

// Converting back
String.fromCharCode(72, 105);  // "Hi"
```

The beauty of ASCII is its simplicity. Each character fits in a single byte (with one bit to spare), and the encoding is universal across all computers.

:::tip ASCII Tricks
Because of how ASCII is organized:
- To convert uppercase to lowercase, add 32: `'A' (65) → 'a' (97)` (or subtract 32 to reverse)
- To convert a digit character to its value, subtract 48: `'7' (55) → 7`

```javascript
const lower = String.fromCharCode('A'.charCodeAt(0) + 32);  // 'a'
const digit = '7'.charCodeAt(0) - 48;  // 7
```
:::

### The Limitation of ASCII

ASCII works fine for English, but what about é, ñ, 中, 日, or 😀? 128 characters is nowhere near enough.

The 8th bit (unused in standard ASCII) doubled the available space to 256 characters. Various "extended ASCII" encodings each defined their own 128 additional characters for specific regions: Latin-1 for Western European languages, KOI8-R for Russian, and so on. But this fragmented approach meant that a document written on one computer might display as garbage on another.

The world needed a universal standard.

## Unicode: The Universal Standard

**Unicode** aims to represent every character from every writing system, past and present. It assigns a unique number (called a **code point**) to each character:

- `U+0041` = A
- `U+00E9` = é
- `U+4E2D` = 中 (Chinese for "middle")
- `U+1F600` = 😀 (grinning face emoji)

Unicode currently defines over 150,000 characters, including:
- All modern alphabets (Latin, Cyrillic, Greek, Arabic, Hebrew, etc.)
- East Asian scripts (Chinese, Japanese, Korean)
- Historical scripts (Egyptian hieroglyphs, Cuneiform)
- Symbols, emoji, and technical notation
- Right-to-left and bidirectional text

The code point is just a number: an abstract identifier for the character. How that number is stored in memory is a separate question, which is where encodings come in.

:::info Why Hexadecimal?
Unicode code points are written in hexadecimal (base-16) notation, prefixed with `U+`. Hexadecimal uses digits 0-9 and letters A-F, making it more compact than decimal for large numbers. Each hex digit represents exactly 4 bits, so `U+00E9` maps cleanly to binary: `0000 0000 1110 1001`.

This convention makes it easier to see byte boundaries and bit patterns at a glance.
:::

## UTF-8: The Practical Encoding

Unicode defines the mapping from characters to numbers, but **UTF-8** defines how to store those numbers in bytes. It's the dominant encoding on the web and in modern software.

### The Design Challenge

UTF-8 needed to solve several problems at once:
- **Backward compatibility:** ASCII text should work unchanged
- **Compactness:** Common characters shouldn't waste bytes
- **Robustness:** If you jump into the middle of a byte stream, you should be able to find your bearings

The solution is a **variable-length encoding** where the first few bits of each byte tell you what role it plays.

### How the Bit Patterns Work

UTF-8 uses a clever prefix system. The leading bits of each byte signal its purpose:

| Byte Type        | Pattern      | Meaning                                    |
|------------------|--------------|------------------------------------------- |
| Single-byte      | `0xxxxxxx`   | Complete character (ASCII range)           |
| Lead byte (2)    | `110xxxxx`   | Start of 2-byte sequence (11 data bits)    |
| Lead byte (3)    | `1110xxxx`   | Start of 3-byte sequence (16 data bits)    |
| Lead byte (4)    | `11110xxx`   | Start of 4-byte sequence (21 data bits)    |
| Continuation     | `10xxxxxx`   | Continues a multi-byte sequence (6 bits)   |

The key insight: **count the leading 1s in a lead byte to know the total byte count**. Two leading 1s (`110...`) means two bytes total. Three leading 1s (`1110...`) means three bytes. And continuation bytes *always* start with `10`, making them instantly recognizable.

This is what enables **self-synchronization**. If you land in the middle of a UTF-8 stream, just scan backward until you find a byte that doesn't start with `10`. That's your character boundary.

### Encoding Step by Step

Let's encode the letter **é** (code point U+00E9):

**Step 1: Determine byte count from code point range**

| Range               | Bytes | Available data bits |
|---------------------|-------|---------------------|
| U+0000 – U+007F     | 1     | 7 bits              |
| U+0080 – U+07FF     | 2     | 11 bits             |
| U+0800 – U+FFFF     | 3     | 16 bits             |
| U+10000 – U+10FFFF  | 4     | 21 bits             |

U+00E9 falls in the range U+0080–U+07FF, so it needs **2 bytes**.

**Step 2: Convert the code point to binary**

```
0x00E9 = 233 in decimal
       = 11101001 in binary (8 bits)
```

We need 11 bits total for a 2-byte encoding, so pad with leading zeros:

```
00011101001  (11 bits)
```

**Step 3: Split the bits into the template**

The 2-byte template is: `110xxxxx 10xxxxxx`

The template has 5 data bits in the first byte and 6 in the second (5 + 6 = 11 total).

Split our 11 bits accordingly:

```
00011 | 101001
  ↓        ↓
110 00011  10 101001
```

**Step 4: Assemble the final bytes**

```
First byte:  110 00011 = 0xC3
Second byte: 10 101001 = 0xA9

é encoded in UTF-8: C3 A9
```

```javascript
// Verify in JavaScript
new TextEncoder().encode('é');  // Uint8Array [195, 169] = [0xC3, 0xA9]
```

### Decoding Step by Step

Now let's decode the bytes `E2 82 AC` back to a character:

**Step 1: Identify the lead byte**

```
E2 = 11100010
     ^^^
     Three leading 1s → 3-byte sequence
```

**Step 2: Extract data bits from each byte**

```
E2 = 1110 0010  → data bits: 0010
82 = 10 000010  → data bits: 000010
AC = 10 101100  → data bits: 101100
```

**Step 3: Concatenate the data bits**

```
0010 + 000010 + 101100 = 0010000010101100
                       = 0x20AC
```

**Step 4: Look up the code point**

U+20AC is the **Euro sign (€)**.

### Why UTF-8 Won

UTF-8's design choices weren't accidental. They solved real problems:

1. **ASCII compatibility:** Any valid ASCII file is already valid UTF-8. The billions of existing ASCII documents didn't need conversion.

2. **Self-synchronizing:** Continuation bytes (`10xxxxxx`) can never be confused with lead bytes. You can jump into any position and find the next character boundary.

3. **No byte-order issues:** UTF-16 and UTF-32 need to specify whether the most significant byte comes first or last. UTF-8 processes one byte at a time, so byte order never matters.

4. **Efficient for Western text:** English uses 1 byte per character. European languages average 1-2 bytes. Only emoji and CJK characters need 3-4 bytes.

```javascript
// UTF-8 byte lengths
new TextEncoder().encode('A').length;     // 1 byte
new TextEncoder().encode('é').length;     // 2 bytes
new TextEncoder().encode('中').length;    // 3 bytes
new TextEncoder().encode('😀').length;    // 4 bytes
```

:::note The Cost of High Code Points
Characters with higher Unicode values require more bytes to store. This has practical implications:

- **Storage size:** A document full of emoji or Chinese characters takes 3-4x more space than equivalent English text.
- **String operations:** Counting characters, slicing strings, or finding positions becomes more complex since you can't simply divide byte count by a fixed number.
- **Network transfer:** APIs transmitting CJK text or emoji-heavy content use more bandwidth than ASCII-equivalent messages.

This tradeoff is intentional: UTF-8 optimizes for the common case (ASCII-compatible text) while still supporting the full Unicode range.
:::

## Other Unicode Encodings

While UTF-8 dominates the web, other encodings exist for specific use cases:

**UTF-16** uses 2 or 4 bytes per character. Characters in the Basic Multilingual Plane (U+0000 to U+FFFF) use 2 bytes; characters beyond that, including most emoji, require 4 bytes encoded as "surrogate pairs" (two 16-bit code units that combine to represent one character).

:::info Why does UTF-16 still exist?
**JavaScript**, **Java**, and **Windows** adopted it in the 1990s when Unicode was expected to fit entirely within 16 bits. By the time Unicode expanded beyond 65,536 characters, these systems were too entrenched to change. UTF-16 also has an advantage for CJK-heavy text: Chinese, Japanese, and Korean characters use 2 bytes in UTF-16 versus 3 bytes in UTF-8, making it more compact for East Asian content.
:::

**UTF-32** uses exactly 4 bytes per character, regardless of which character it is. This fixed-width property means you can jump directly to any character position with simple arithmetic (character N is at byte N×4), making it useful for text editors or parsers that need random access. The tradeoff is size: UTF-32 wastes significant space for ASCII-heavy text. It's rarely used for storage or transmission, but sometimes appears in internal processing pipelines.

| Encoding | Bytes per Character | Use Case                             |
|----------|---------------------|--------------------------------------|
| UTF-8    | 1-4                 | Web, files, APIs                     |
| UTF-16   | 2-4                 | JavaScript, Java, Windows internals  |
| UTF-32   | 4                   | Internal processing, random access   |

## Common Pitfalls

### String Length Surprises

In JavaScript, `string.length` counts UTF-16 code units, not characters:

```javascript
'Hello'.length;  // 5 (as expected)
'😀'.length;     // 2 (emoji uses 2 UTF-16 code units!)

// To count actual characters (grapheme clusters):
[...'😀'].length;  // 1
```

This is a common source of bugs when working with emoji or non-Latin text. Some "characters" that appear as single glyphs are actually composed of multiple code points:

```javascript
// Family emoji is composed of multiple code points joined by ZWJ
'👨‍👩‍👧'.length;  // 8 (!)
[...'👨‍👩‍👧'].length;  // 5 code points
```

### File Encoding Issues

When reading or writing files, encoding matters:

```javascript
const fs = require('fs');

// Specify encoding explicitly
const text = fs.readFileSync('file.txt', 'utf8');

// Binary data should not be read as text
const binary = fs.readFileSync('image.png');  // Returns Buffer, not string
```

If you see garbled text (often called "mojibake"), it usually means a file was written in one encoding but read in another. The most common mistake is treating UTF-8 text as if it were Latin-1, or vice versa.

### Normalization

Unicode allows multiple ways to represent the same character. For example, "é" can be:
- A single code point: U+00E9 (LATIN SMALL LETTER E WITH ACUTE)
- Two code points: U+0065 + U+0301 (LATIN SMALL LETTER E + COMBINING ACUTE ACCENT)

These look identical but compare as different strings:

```javascript
const e1 = '\u00E9';        // é (single code point)
const e2 = 'e\u0301';       // e + combining accent

console.log(e1 === e2);     // false!
console.log(e1.length);     // 1
console.log(e2.length);     // 2

// Normalize to compare correctly
console.log(e1.normalize('NFC') === e2.normalize('NFC'));  // true
```

Always normalize strings before comparing them, especially when processing user input.

## Key Takeaways

1. **Characters are just numbers.** Every character, from 'A' to '😀', is assigned a numeric code point. The encoding determines how that number is stored in bytes.

2. **ASCII was simple but limited.** With only 128 characters, it couldn't represent the world's languages. Extended ASCII variants fragmented the ecosystem.

3. **Unicode is the universal standard.** It assigns a unique code point to over 150,000 characters from every writing system.

4. **UTF-8 is the practical encoding.** Variable-length (1-4 bytes), ASCII-compatible, self-synchronizing, and dominant on the web.

5. **String length is tricky.** In JavaScript and many languages, `length` counts code units, not visible characters. Emoji and combining characters can cause surprises.

6. **Normalize before comparing.** The same visual character can have multiple representations in Unicode.

## Looking Ahead

We've now covered how computers represent fundamental data types in binary: integers, decimals, and text. With these building blocks, encoding colors, images, sound, and video becomes a matter of clever representation.

But computers do more than store data. They transform it, following our instructions to perform calculations, make decisions, and execute complex logic. How does a machine built from simple switches actually *compute*?

To answer that question, we first need to understand the physics that makes computation possible. In the next article, we will explore **electrical circuits**: how voltage, current, and resistance work together, how circuits are built from basic components, and how transistors fit into circuits as controllable switches. This foundation will prepare us to build logic gates in the article that follows.
