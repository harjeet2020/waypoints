# Data Structures Section: Planning & Reference Guide

This document outlines the structure, templates, and guidelines for building the Data Structures section of the learning journey. It serves as a reference to ensure consistency as we add new data structures over time.

## Overview

The data structures section covers fundamental data structures with a focus on:

1. **Deep understanding** - How each structure works in memory, not just how to use it
2. **Multi-language perspective** - Comparing implementations across JavaScript, Python, Java, and C
3. **Practical application** - Real-world use cases and production patterns
4. **Interactive practice** - Embedded code editor with test validation

## Data Structure Order

Based on the existing placeholder files, we will cover data structures in this order:

1. Arrays
2. Strings
3. Linked Lists
4. Stacks
5. Queues
6. Hash Tables and Sets
7. Trees
8. Heaps
9. Graphs

---

## Language Comparison Guidelines

Each data structure's `internals.md` file includes a multi-language comparison section. We use **four core languages** that represent distinct paradigms, with brief mentions of similar languages where relevant.

### Core Languages

| Language | Paradigm | Why It's Included |
|----------|----------|-------------------|
| **C** | Low-level, manual memory | Shows what's really happening in memory; the baseline for understanding overhead |
| **Java** | Managed memory, static typing | Represents enterprise/VM-based languages |
| **Python** | Dynamic typing, interpreted | Represents flexible scripting languages |
| **JavaScript** | Dynamic with unique quirks | Primary language for this learning path; has distinctive characteristics worth understanding |

### Similar Languages to Mention

When discussing each core language, briefly note similar languages so readers can transfer knowledge:

| Core Language | Similar Languages | Notes |
|---------------|-------------------|-------|
| C | - | Unique in its direct memory access |
| Java | C#, Kotlin, Scala | All JVM/CLR-based with similar array semantics |
| Python | Ruby, PHP | Dynamic typing, reference-based storage |
| JavaScript | TypeScript | Same runtime behavior (TS is compile-time only) |

### Structure for Language Sections

For each core language in the internals file:

1. **Code example** showing basic usage
2. **Key characteristics** (3-5 bullet points)
3. **What's happening under the hood** (brief explanation)
4. **Similar languages** (one sentence mentioning related languages)

### Comparison Table

Always include a summary table comparing all four languages across relevant features. Common comparison points:

- Dynamic vs fixed sizing
- Type homogeneity (can it hold mixed types?)
- Bounds checking behavior
- Memory overhead
- Cache efficiency
- Thread safety considerations (where relevant)

---

## Folder Structure Template

Each data structure will be converted from a single file to a folder with the following structure:

```
data-structures/
├── index.md                          # Section overview (links to all data structures)
├── arrays/
│   ├── index.md                      # Overview: what, why, when to use
│   ├── internals.md                  # Memory layout, language comparisons
│   ├── operations.md                 # Common operations with complexity
│   └── practice/
│       ├── index.md                  # Problem list with difficulty tags
│       ├── find-maximum.md           # Individual practice problems
│       ├── remove-element.md
│       ├── merge-sorted-arrays.md
│       └── rotate-array.md
├── strings/
│   ├── index.md
│   ├── internals.md
│   ├── operations.md
│   └── practice/
│       ├── index.md
│       └── ...
├── linked-lists/
│   └── ... (same structure)
└── ... (remaining data structures)
```

### Sidebar Configuration

When converting from single files to folders, update `sidebars.js`:

```javascript
{
  type: 'category',
  label: 'Data Structures',
  collapsed: false,
  link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/index' },
  items: [
    {
      type: 'category',
      label: 'Arrays',
      collapsed: true,
      link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/arrays/index' },
      items: [
        'algorithms/learning-journey/data-structures/arrays/internals',
        'algorithms/learning-journey/data-structures/arrays/operations',
        {
          type: 'category',
          label: 'Practice Problems',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/arrays/practice/index' },
          items: [
            'algorithms/learning-journey/data-structures/arrays/practice/find-maximum',
            'algorithms/learning-journey/data-structures/arrays/practice/remove-element',
            'algorithms/learning-journey/data-structures/arrays/practice/merge-sorted-arrays',
            'algorithms/learning-journey/data-structures/arrays/practice/rotate-array',
          ],
        },
      ],
    },
    // ... repeat for other data structures
  ],
}
```

---

## File Templates

### 1. Data Structure Overview (`index.md`)

This is the entry point for each data structure. Keep it accessible and engaging.

```markdown
---
title: Arrays
---

## What is an Array?

[One-paragraph definition in plain language]

[Real-world analogy to build intuition]

## Why Arrays Matter

[2-3 bullet points on practical importance]

## When to Use Arrays

| Use Arrays When | Avoid Arrays When |
|-----------------|-------------------|
| ...             | ...               |

## Quick Reference

| Operation        | Time Complexity | Space Complexity |
|------------------|-----------------|------------------|
| Access by index  | O(1)            | -                |
| Search           | O(n)            | -                |
| Insert at end    | O(1) amortized  | -                |
| Insert at middle | O(n)            | -                |
| Delete           | O(n)            | -                |

## In This Section

- [How Arrays Work in Memory](./internals) - Deep dive into memory layout
- [Array Operations](./operations) - Common operations with code examples
- [Practice Problems](./practice) - Hands-on exercises to build mastery

## Prerequisites

Before diving in, make sure you understand:
- [Binary and Data Representation](/algorithms/learning-journey/fundamentals/binary-basics)
- [Types and Memory Layout](/algorithms/learning-journey/fundamentals/types-and-memory-layout)
```

---

### 2. Internals (`internals.md`)

This file covers how the data structure works at a low level, with language comparisons.

```markdown
---
title: "Arrays: Memory & Internals"
---

## How Arrays Work in Memory

[Explanation with ASCII diagrams showing memory layout]

```
Memory Address:  1000   1004   1008   1012   1016
                ┌──────┬──────┬──────┬──────┬──────┐
Array [5]:      │  10  │  20  │  30  │  40  │  50  │
                └──────┴──────┴──────┴──────┴──────┘
                  [0]    [1]    [2]    [3]    [4]
```

## Contiguous Memory

[Explain why contiguous storage enables O(1) access]

[Explain cache locality benefits]

## Language Implementations Compared

Different languages implement arrays differently. Understanding these differences helps you write efficient code in each language.

### JavaScript Arrays

```javascript
// JavaScript arrays are dynamic and heterogeneous
const arr = [1, 'hello', { key: 'value' }, [1, 2, 3]];
arr.push(42);  // Dynamic resizing
```

**Key characteristics:**
- Dynamic sizing (no fixed capacity)
- Can hold mixed types (implemented as object references)
- Sparse arrays are possible
- Under the hood: V8 uses different internal representations based on usage

### Python Lists

```python
# Python lists are also dynamic arrays
arr = [1, 2, 3]
arr.append(4)  # Amortized O(1)
```

**Key characteristics:**
- Dynamic sizing with over-allocation strategy
- Stores pointers to objects (not values directly)
- List comprehensions for efficient creation

### Java Arrays vs ArrayList

```java
// Fixed-size array
int[] fixedArray = new int[5];

// Dynamic ArrayList
ArrayList<Integer> dynamicList = new ArrayList<>();
dynamicList.add(42);
```

**Key characteristics:**
- Primitive arrays are fixed-size, store values directly
- ArrayList wraps an array with dynamic resizing
- Generic type must be object type (autoboxing for primitives)

### C Arrays

```c
// Stack-allocated fixed array
int arr[5] = {1, 2, 3, 4, 5};

// Heap-allocated dynamic array
int* dynamic = malloc(5 * sizeof(int));
```

**Key characteristics:**
- No bounds checking (undefined behavior on overflow)
- Fixed size unless manually managed
- Direct memory access, no overhead

## Comparison Table

| Feature              | JavaScript   | Python      | Java ArrayList | C           |
|----------------------|--------------|-------------|----------------|-------------|
| Dynamic sizing       | Yes          | Yes         | Yes            | Manual      |
| Type homogeneity     | No           | No          | Yes (generics) | Yes         |
| Bounds checking      | Silent fail  | Exception   | Exception      | None        |
| Memory overhead      | High         | High        | Medium         | None        |
| Cache efficiency     | Low          | Low         | Medium         | High        |

## Why This Matters

[Practical implications for choosing languages/approaches]

## Dynamic Array Resizing

[Explain the doubling strategy and amortized analysis]
```

---

### 3. Operations (`operations.md`)

This file covers common operations with code examples and complexity analysis.

```markdown
---
title: "Array Operations"
---

## Common Operations

### Accessing Elements

[Explanation of O(1) access with pointer arithmetic]

```javascript
const arr = [10, 20, 30, 40, 50];

// O(1) - Direct index access
const third = arr[2];  // 30

// O(1) - Last element
const last = arr[arr.length - 1];  // 50
```

### Searching

#### Linear Search

[When to use, complexity analysis]

```javascript
/**
 * Searches for target in array
 * @param {number[]} arr - Array to search
 * @param {number} target - Value to find
 * @returns {number} Index of target, or -1 if not found
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Insertion

#### At the End

[Explain amortized O(1) with resizing]

```javascript
const arr = [1, 2, 3];
arr.push(4);  // O(1) amortized
```

#### At a Specific Index

[Explain why this requires shifting elements]

```javascript
const arr = [1, 2, 4, 5];
arr.splice(2, 0, 3);  // Insert 3 at index 2
// Result: [1, 2, 3, 4, 5]
```

**Time Complexity:** O(n) - must shift elements after insertion point

[ASCII diagram showing the shift]

### Deletion

[Similar structure to insertion]

## Operations Complexity Summary

| Operation            | Average Case | Worst Case | Notes                      |
|----------------------|--------------|------------|----------------------------|
| Access `arr[i]`      | O(1)         | O(1)       | Direct calculation         |
| Search (unsorted)    | O(n)         | O(n)       | Must check each element    |
| Search (sorted)      | O(log n)     | O(log n)   | Binary search              |
| Insert at end        | O(1)*        | O(n)       | *Amortized, resize on full |
| Insert at index      | O(n)         | O(n)       | Shift required             |
| Delete at end        | O(1)         | O(1)       | No shift needed            |
| Delete at index      | O(n)         | O(n)       | Shift required             |

## Production Patterns

### Iteration Patterns

[Different ways to iterate with tradeoffs]

### Common Gotchas

[Edge cases and mistakes to avoid]
```

---

### 4. Practice Index (`practice/index.md`)

This file lists all practice problems for the data structure.

```markdown
---
title: "Array Practice Problems"
---

## Practice Problems

Build your array manipulation skills with these exercises. Each problem includes an interactive editor where you can write, test, and validate your solution.

### Difficulty Legend

- 🟢 **Easy** - Fundamental operations, single concept
- 🟡 **Medium** - Combines multiple concepts
- 🔴 **Hard** - Requires optimization or advanced techniques

## Problem List

| Problem | Difficulty | Key Concepts |
|---------|------------|--------------|
| [Find Maximum Element](./find-maximum) | 🟢 Easy | Iteration, comparison |
| [Remove Element](./remove-element) | 🟢 Easy | In-place modification, shifting |
| [Merge Sorted Arrays](./merge-sorted-arrays) | 🟡 Medium | Two pointers, merging |
| [Rotate Array](./rotate-array) | 🟡 Medium | Multiple approaches, space tradeoffs |

## Recommended Order

If you're new to arrays, tackle these problems in order. Each builds on concepts from the previous one.

## Tips for Success

1. **Understand before coding** - Make sure you can explain the approach before writing code
2. **Consider edge cases** - Empty arrays, single elements, duplicates
3. **Analyze complexity** - Know the time and space complexity of your solution
4. **Try multiple approaches** - There's often more than one valid solution
```

---

### 5. Practice Problem Template (`practice/[problem-name].md`)

This is the template for individual practice problems with interactive elements.

```markdown
---
title: Find Maximum Element
difficulty: easy
concepts: [iteration, comparison]
---

## Problem Statement

Given an array of integers, find and return the maximum value.

**Function Signature:**

```javascript
function findMax(arr) {
  // Your code here
}
```

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[3, 1, 4, 1, 5, 9, 2, 6]` | `9` | 9 is the largest value |
| `[-5, -2, -8, -1]` | `-1` | -1 is the largest (least negative) |
| `[42]` | `42` | Single element is the maximum |

## Constraints

- Array length: 1 ≤ arr.length ≤ 10,000
- Element values: -10⁹ ≤ arr[i] ≤ 10⁹
- Array is guaranteed to have at least one element

## Interactive Editor

<PracticeEditor
  problemId="arrays-find-maximum"
  starterCode={`function findMax(arr) {
  // Your code here
}`}
  testCases={[
    { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expected: 9 },
    { input: [[-5, -2, -8, -1]], expected: -1 },
    { input: [[42]], expected: 42 },
    { input: [[1, 1, 1, 1]], expected: 1 },
    { input: [[-1000000000, 1000000000]], expected: 1000000000 },
  ]}
/>

## Hints

Use hints progressively - try to solve it yourself first!

<details>
<summary>💡 Hint 1: Approach</summary>

Think about how you would find the tallest person in a line. You'd remember the tallest you've seen so far, and update your answer whenever you see someone taller.

</details>

<details>
<summary>💡 Hint 2: Algorithm</summary>

You need to track a "current maximum" as you iterate through the array. For each element, compare it to your current maximum and update if necessary.

</details>

<details>
<summary>💡 Hint 3: Initialization</summary>

What should your initial "current maximum" be? You could use the first element of the array, or you could use `-Infinity` (the smallest possible value).

</details>

<details>
<summary>⚠️ Edge Case Hint 1</summary>

What if all elements are negative? Make sure your initialization doesn't assume positive numbers exist.

</details>

<details>
<summary>⚠️ Edge Case Hint 2</summary>

What if the array has only one element? Your solution should handle this without special-casing.

</details>

## Solution

<details>
<summary>📝 Reveal Solution</summary>

### Approach 1: Track Maximum While Iterating

```javascript
/**
 * Finds the maximum value in an array of integers.
 *
 * @param {number[]} arr - Array of integers (non-empty)
 * @returns {number} The maximum value in the array
 *
 * @example
 * findMax([3, 1, 4, 1, 5]) // returns 5
 */
function findMax(arr) {
  // Initialize with first element (safe since array is non-empty)
  let max = arr[0];

  // Check each remaining element
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}
```

### Why This Works

1. **Initialization**: We start with `arr[0]` as our maximum. This handles the single-element case automatically and works with negative numbers.

2. **Iteration**: We compare each element to our current maximum. If we find something larger, we update.

3. **Result**: After checking all elements, `max` holds the largest value.

### Alternative: Using Math.max

```javascript
function findMax(arr) {
  return Math.max(...arr);
}
```

This is more concise but uses the spread operator, which can cause a stack overflow for very large arrays (the spread creates function arguments for each element).

### Complexity Analysis

**Time Complexity:** O(n)
- We visit each element exactly once
- Each comparison is O(1)
- Total: n elements × O(1) per element = O(n)

**Space Complexity:** O(1)
- We only use a single variable `max` regardless of input size
- No additional data structures created

### Common Mistakes

1. **Initializing max to 0** - Fails for arrays with all negative numbers
2. **Empty array handling** - Our solution assumes non-empty per constraints, but in production you might want to handle this
3. **Using Math.max spread on huge arrays** - Can exceed call stack limit

</details>

## Related Problems

- [Find Minimum Element](./find-minimum) - Same concept, opposite comparison
- [Find Second Maximum](./find-second-maximum) - Requires tracking two values
- [Find Min and Max Together](./find-min-max) - Optimize by reducing comparisons
```

---

## Interactive Editor Integration

### Technology Choice: Sandpack

We will use **Sandpack** (by CodeSandbox) for the interactive code editor. It provides:

- React-native integration (works well with Docusaurus)
- Built-in console output
- Syntax highlighting with Monaco editor
- No backend required for JavaScript execution

### Component Architecture

Create a custom `<PracticeEditor>` component that wraps Sandpack:

```
src/
└── components/
    └── PracticeEditor/
        ├── index.tsx            # Main component
        ├── TestRunner.tsx       # Test execution logic
        ├── TestResults.tsx      # Pass/fail display
        ├── HiddenTests.tsx      # Reveal tests button
        └── styles.module.css    # Component styles
```

### Component Features

The `<PracticeEditor>` component should provide:

1. **Code editor panel** - Monaco-based editor with syntax highlighting
2. **Run button** - Executes user code against test cases
3. **Test results panel** - Shows pass/fail for each test
4. **Hidden tests toggle** - Button to reveal all test cases (hidden by default)
5. **Reset button** - Restore starter code
6. **Console output** - Display console.log output from user code

### Props Interface

```typescript
interface PracticeEditorProps {
  /** Unique identifier for localStorage persistence */
  problemId: string;

  /** Initial code shown in the editor */
  starterCode: string;

  /** Test cases to validate the solution */
  testCases: Array<{
    input: any[];          // Arguments to pass to the function
    expected: any;         // Expected return value
    description?: string;  // Optional test description
  }>;

  /** Optional: function name to test (defaults to first function in code) */
  functionName?: string;
}
```

### Test Visibility Behavior

- **Default state**: Tests are hidden; only shows "5 tests" or similar count
- **After running**: Shows pass/fail status for each test without revealing inputs
- **Reveal button**: "Show Test Cases" button displays full test inputs/expected outputs
- **Failed tests**: Show which test failed and the actual vs expected output

### Implementation Priority

1. **Phase 1**: Basic Sandpack integration with code editor and console
2. **Phase 2**: Test runner with pass/fail display
3. **Phase 3**: Hidden test toggle functionality
4. **Phase 4**: localStorage persistence for user progress
5. **Phase 5**: Polish (keyboard shortcuts, mobile responsiveness)

---

## Content Guidelines

### Writing Tone

Follow the established tone from the fundamentals section:

- Warm and personable, but with refined language
- Light-hearted touch without being overly casual
- Clear technical explanations that don't oversimplify
- Avoid em dashes and emojis (except for difficulty indicators in problem lists)

### Diagrams

Use ASCII diagrams for memory layouts and visualizations:

```
┌──────┬──────┬──────┬──────┬──────┐
│  10  │  20  │  30  │  40  │  50  │
└──────┴──────┴──────┴──────┴──────┘
```

### Code Examples

- Always include JSDoc comments in solution code
- Show multiple approaches when relevant (with tradeoffs)
- Use meaningful variable names
- Include complexity analysis for all solutions

### Cross-Language Comparisons

When comparing language implementations:

1. Show equivalent code in each language
2. Explain the key differences
3. Discuss performance implications
4. Use a comparison table for quick reference

---

## Migration Checklist

When converting a data structure from placeholder to full content:

1. [ ] Create the folder structure (index, internals, operations, practice/)
2. [ ] Delete the original placeholder file
3. [ ] Update `sidebars.js` with new category structure
4. [ ] Write the index.md (overview)
5. [ ] Write internals.md (memory and language comparisons)
6. [ ] Write operations.md (common operations)
7. [ ] Create practice/index.md (problem list)
8. [ ] Create individual practice problem files
9. [ ] Test all internal links
10. [ ] Run `npm run build` to verify no broken links

---

## Suggested Practice Problems by Data Structure

### Arrays

| Problem | Difficulty | Concepts |
|---------|------------|----------|
| Find Maximum Element | Easy | Iteration |
| Remove Element | Easy | In-place modification |
| Reverse Array | Easy | Two pointers |
| Merge Sorted Arrays | Medium | Two pointers, merging |
| Rotate Array | Medium | Multiple approaches |
| Two Sum | Medium | Hash map optimization |

### Strings

| Problem | Difficulty | Concepts |
|---------|------------|----------|
| Reverse String | Easy | Two pointers |
| Check Palindrome | Easy | Two pointers |
| Count Character Occurrences | Easy | Hash map |
| First Unique Character | Medium | Hash map, two passes |
| Longest Substring Without Repeating | Medium | Sliding window |

### Linked Lists

| Problem | Difficulty | Concepts |
|---------|------------|----------|
| Traverse and Print | Easy | Basic traversal |
| Find Length | Easy | Counting |
| Reverse Linked List | Easy | Pointer manipulation |
| Detect Cycle | Medium | Fast/slow pointers |
| Merge Two Sorted Lists | Medium | Merging |

### Stacks

| Problem | Difficulty | Concepts |
|---------|------------|----------|
| Valid Parentheses | Easy | Matching pairs |
| Evaluate Reverse Polish Notation | Medium | Stack operations |
| Min Stack | Medium | Auxiliary stack |

### Queues

| Problem | Difficulty | Concepts |
|---------|------------|----------|
| Implement Queue with Stacks | Easy | Two stacks |
| Recent Counter | Easy | Sliding window |
| Circular Queue | Medium | Circular buffer |

---

## File Naming Conventions

- Use kebab-case for all file names: `merge-sorted-arrays.md`
- Practice problem files should match their slug in the problem list
- Keep names concise but descriptive

## Next Steps

1. Set up the Sandpack-based `<PracticeEditor>` component
2. Create the data-structures/index.md section overview
3. Build out the Arrays section as the first complete example
4. Use Arrays as a template to validate the structure before proceeding

---

*Last updated: January 2025*
