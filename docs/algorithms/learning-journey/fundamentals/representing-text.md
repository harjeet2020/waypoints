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
- To convert uppercase to lowercase, add 32: `'A' (65) → 'a' (97)`
- To convert a digit character to its value, subtract 48: `'7' (55) → 7`

```javascript
const lower = String.fromCharCode('A'.charCodeAt(0) + 32);  // 'a'
const digit = '7'.charCodeAt(0) - 48;  // 7
```
:::

### The Limitation of ASCII

ASCII works fine for English, but what about é, ñ, 中, 日, or 😀? 128 characters is nowhere near enough.

The 8th bit (unused in standard ASCII) was used to create various "extended ASCII" encodings, each defining 128 additional characters for specific regions: Latin-1 for Western European languages, KOI8-R for Russian, and so on. But this fragmented approach meant that a document written on one computer might display as garbage on another.

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

## UTF-8: The Practical Encoding

Unicode defines the mapping from characters to numbers, but **UTF-8** defines how to store those numbers in bytes. It's the dominant encoding on the web and in modern software.

UTF-8 is a **variable-length encoding**. Different characters use different numbers of bytes:

| Code Point Range    | Bytes | Binary Format                           |
|---------------------|-------|-----------------------------------------|
| U+0000 to U+007F    | 1     | 0xxxxxxx                                |
| U+0080 to U+07FF    | 2     | 110xxxxx 10xxxxxx                       |
| U+0800 to U+FFFF    | 3     | 1110xxxx 10xxxxxx 10xxxxxx              |
| U+10000 to U+10FFFF | 4     | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx     |

The leading bits of each byte tell you how to interpret it:
- `0xxxxxxx` — Single-byte character (ASCII compatible)
- `110xxxxx` — First byte of a 2-byte sequence
- `1110xxxx` — First byte of a 3-byte sequence
- `11110xxx` — First byte of a 4-byte sequence
- `10xxxxxx` — Continuation byte

### The Genius of UTF-8

UTF-8 was designed with remarkable foresight:

1. **ASCII compatibility:** Any ASCII text is valid UTF-8. The first 128 characters use exactly the same bytes in both encodings. This means billions of existing ASCII documents work without modification.

2. **Self-synchronizing:** You can jump into the middle of a UTF-8 stream and quickly find character boundaries. Continuation bytes always start with `10`, so you can scan backward to find a leading byte.

3. **Efficient for English:** ASCII characters use only 1 byte. European characters use 2 bytes. East Asian characters use 3 bytes. This variable length means UTF-8 is compact for languages that primarily use ASCII.

4. **No byte-order issues:** Unlike UTF-16 and UTF-32, UTF-8 doesn't need a byte-order mark because each code unit is a single byte.

```javascript
// UTF-8 byte lengths
new TextEncoder().encode('A').length;     // 1 byte
new TextEncoder().encode('é').length;     // 2 bytes
new TextEncoder().encode('中').length;    // 3 bytes
new TextEncoder().encode('😀').length;    // 4 bytes
```

### Encoding Example: The Euro Sign (€)

Let's encode the Euro sign (€, code point U+20AC) in UTF-8:

```
Step 1: Determine the range
   U+20AC is between U+0800 and U+FFFF → 3 bytes

Step 2: Convert to binary
   0x20AC = 0010 0000 1010 1100 (16 bits)

Step 3: Fit into the 3-byte template
   1110xxxx 10xxxxxx 10xxxxxx
        ↓      ↓↓        ↓↓
   0010   0000 10   10 1100

   1110 0010  10 000010  10 101100
      ↓           ↓           ↓
     0xE2        0x82        0xAC

Result: € is encoded as the bytes E2 82 AC
```

## Other Unicode Encodings

While UTF-8 dominates the web, other encodings exist for specific use cases:

**UTF-16** uses 2 or 4 bytes per character. It's used internally by JavaScript, Java, and Windows. Characters in the Basic Multilingual Plane (U+0000 to U+FFFF) use 2 bytes; others use 4 bytes via "surrogate pairs."

**UTF-32** uses exactly 4 bytes per character. It's simple (fixed-width) but wasteful of space. Rarely used for storage, but useful for internal processing when you need fast random access to characters.

| Encoding | Bytes per Character | Use Case |
|----------|---------------------|----------|
| UTF-8    | 1-4                 | Web, files, APIs |
| UTF-16   | 2-4                 | JavaScript, Java, Windows internals |
| UTF-32   | 4                   | Internal processing |

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

## Practical Guidelines

### 1. Always Use UTF-8

Unless you have a specific reason not to, use UTF-8 everywhere:
- File encodings
- API responses
- Database storage
- HTML documents (`<meta charset="utf-8">`)

### 2. Be Careful with String Length

Remember that `length` may not give you the number of visible characters:

```javascript
// Counting visible characters (graphemes) in modern JavaScript
function countGraphemes(str) {
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  return [...segmenter.segment(str)].length;
}

countGraphemes('👨‍👩‍👧');  // 1 (the family is one grapheme)
```

### 3. Normalize Before Comparing

When comparing strings from different sources:

```javascript
function safeCompare(a, b) {
  return a.normalize('NFC') === b.normalize('NFC');
}
```

### 4. Specify Encoding Explicitly

Never assume encoding. Always specify it when reading or writing files:

```javascript
// Writing
fs.writeFileSync('output.txt', text, 'utf8');

// Reading
const content = fs.readFileSync('input.txt', 'utf8');

// HTTP headers
res.setHeader('Content-Type', 'application/json; charset=utf-8');
```

## Key Takeaways

1. **Characters are just numbers.** Every character, from 'A' to '😀', is assigned a numeric code point. The encoding determines how that number is stored in bytes.

2. **ASCII was simple but limited.** With only 128 characters, it couldn't represent the world's languages. Extended ASCII variants fragmented the ecosystem.

3. **Unicode is the universal standard.** It assigns a unique code point to over 150,000 characters from every writing system.

4. **UTF-8 is the practical encoding.** Variable-length (1-4 bytes), ASCII-compatible, self-synchronizing, and dominant on the web.

5. **String length is tricky.** In JavaScript and many languages, `length` counts code units, not visible characters. Emoji and combining characters can cause surprises.

6. **Normalize before comparing.** The same visual character can have multiple representations in Unicode.

## Looking Ahead

We've now covered how computers represent the fundamental types of data: binary numbers, integers (signed and unsigned), decimals (floating-point), and text (ASCII and Unicode). These representations form the foundation for everything computers do.

In the next article, we'll explore **logic gates**: the physical circuits that manipulate these binary values to perform computation. You'll see how simple AND, OR, and NOT operations combine to create the arithmetic and logic that powers every program.
