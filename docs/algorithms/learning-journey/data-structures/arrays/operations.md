---
title: Array Operations
---

## The Building Blocks

Every algorithm that works with arrays is built from a small set of fundamental operations: reading, writing, inserting, deleting, and traversing. Understanding these operations and their performance characteristics is essential for writing efficient code and recognizing when an array is the right tool for the job.

This page covers the "how" of array manipulation, with complexity analysis for each operation.

## Reading Operations

### Accessing by Index

As we explored in the [internals page](./internals), array access is O(1) because the computer calculates the memory address directly. No searching required.

```javascript
const arr = [10, 20, 30, 40, 50];

// Access by index - O(1)
const first = arr[0];           // 10
const third = arr[2];           // 30
const last = arr[arr.length - 1]; // 50

// Negative indices don't work in JavaScript (unlike Python)
const oops = arr[-1];           // undefined, not 50
```

**Bounds checking:** JavaScript returns `undefined` for out-of-bounds access rather than throwing an error. This can mask bugs, so it's good practice to validate indices when they come from user input or calculations.

```javascript
function safeGet(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new RangeError(`Index ${index} out of bounds for array of length ${arr.length}`);
  }
  return arr[index];
}
```

### Searching

When you need to find an element by its value rather than its position, you must search through the array.

#### Linear Search

The simplest approach: check each element one by one until you find what you're looking for.

```javascript
/**
 * Finds the index of target in arr, or -1 if not found.
 * @param {any[]} arr - Array to search
 * @param {any} target - Value to find
 * @returns {number} Index of target, or -1
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

**Time Complexity:** O(n) - in the worst case, you check every element.

**When to use:** Linear search works on any array, sorted or unsorted. For small arrays (under ~100 elements), it's often the best choice due to its simplicity and low overhead.

#### Binary Search

If the array is sorted, you can do much better. Binary search repeatedly divides the search space in half.

```javascript
/**
 * Finds the index of target in a sorted array, or -1 if not found.
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} Index of target, or -1
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

**Time Complexity:** O(log n) - each comparison eliminates half the remaining elements.

**When to use:** Only on sorted arrays. The speedup is dramatic for large arrays: searching 1 million elements takes at most 20 comparisons instead of 1 million.

:::warning Sorted Requirement
Binary search on an unsorted array produces garbage results. Always ensure the array is sorted first, or use linear search.
:::

#### Built-in Search Methods

JavaScript provides several convenient search methods:

```javascript
const fruits = ['apple', 'banana', 'cherry', 'date'];

// indexOf - returns index or -1
fruits.indexOf('cherry');     // 2
fruits.indexOf('grape');      // -1

// includes - returns boolean
fruits.includes('banana');    // true
fruits.includes('grape');     // false

// find - returns first element matching predicate
const numbers = [1, 5, 10, 15, 20];
numbers.find(n => n > 8);     // 10

// findIndex - returns index of first match
numbers.findIndex(n => n > 8); // 2
```

All of these are O(n) under the hood; they use linear search. There's no built-in binary search in JavaScript's standard library.

## Writing Operations

### Updating Elements

Changing an existing element is straightforward and fast.

```javascript
const arr = [10, 20, 30, 40, 50];
arr[2] = 35;  // [10, 20, 35, 40, 50]
```

**Time Complexity:** O(1) - direct memory access, same as reading.

### Insertion

Adding new elements is where arrays show their limitations. The complexity depends entirely on *where* you insert.

#### At the End

```javascript
const arr = [10, 20, 30];
arr.push(40);  // [10, 20, 30, 40]
```

**Time Complexity:** O(1) amortized - usually instant, occasionally O(n) when the array needs to resize.

This is the array's sweet spot. If you're building up an array element by element, always add to the end.

#### At the Beginning

```javascript
const arr = [10, 20, 30];
arr.unshift(5);  // [5, 10, 20, 30]
```

**Time Complexity:** O(n) - every existing element must shift one position to the right.

```
Before: [10][20][30][ ]
         ↓   ↓   ↓
After:  [ 5][10][20][30]
         ↑
       inserted
```

The array doesn't just "make room" at the front. It physically moves every element to a new memory address. For large arrays, this is expensive.

#### At a Specific Index

```javascript
const arr = [10, 20, 40, 50];
arr.splice(2, 0, 30);  // Insert 30 at index 2
// Result: [10, 20, 30, 40, 50]
```

The `splice` method's signature is `splice(startIndex, deleteCount, ...itemsToInsert)`. To insert without deleting, use `deleteCount` of 0.

**Time Complexity:** O(n) - elements after the insertion point must shift.

```
Before: [10][20][40][50]
                 ↓   ↓
After:  [10][20][30][40][50]
               ↑
            inserted
```

The closer to the beginning you insert, the more elements need to move.

### Deletion

Deletion mirrors insertion: removing from the end is cheap, removing from elsewhere requires shifting.

#### From the End

```javascript
const arr = [10, 20, 30, 40];
const removed = arr.pop();  // removed = 40, arr = [10, 20, 30]
```

**Time Complexity:** O(1) - no shifting needed, just decrement the length.

#### From the Beginning

```javascript
const arr = [10, 20, 30, 40];
const removed = arr.shift();  // removed = 10, arr = [20, 30, 40]
```

**Time Complexity:** O(n) - every remaining element shifts left.

```
Before: [10][20][30][40]
          ↑   ↓   ↓   ↓
After:     [20][30][40]
```

#### From a Specific Index

```javascript
const arr = [10, 20, 30, 40, 50];
const removed = arr.splice(2, 1);  // Remove 1 element at index 2
// removed = [30], arr = [10, 20, 40, 50]
```

**Time Complexity:** O(n) - elements after the deletion point shift left.

#### By Value

To remove an element by its value, you first search for it, then delete it.

```javascript
const arr = [10, 20, 30, 40, 50];
const index = arr.indexOf(30);
if (index !== -1) {
  arr.splice(index, 1);
}
// arr = [10, 20, 40, 50]
```

**Time Complexity:** O(n) for search + O(n) for shift = O(n) overall.

## Traversal Patterns

Iterating through an array is one of the most common operations in programming. JavaScript offers several approaches, each with tradeoffs.

### Basic For Loop

The classic approach, with full control over the index.

```javascript
const arr = [10, 20, 30, 40, 50];

for (let i = 0; i < arr.length; i++) {
  console.log(`Index ${i}: ${arr[i]}`);
}
```

**When to use:**
- You need the index for calculations
- You need to iterate in reverse or skip elements
- You need to break out early based on complex conditions

### For...of Loop

Cleaner syntax when you only need the values.

```javascript
const arr = [10, 20, 30, 40, 50];

for (const value of arr) {
  console.log(value);
}
```

**When to use:**
- You only need values, not indices
- You want cleaner, more readable code
- You might need to `break` or `continue`

### forEach Method

Functional style, passes each element to a callback.

```javascript
const arr = [10, 20, 30, 40, 50];

arr.forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});
```

**When to use:**
- You want functional style
- You don't need to break out early (forEach ignores `return`)
- You need both value and index without manual tracking

:::tip Breaking Out Early
`forEach` cannot be stopped early. If you need to exit the loop before completion, use a regular `for` loop or `for...of` with `break`. Alternatively, `some()` and `every()` can short-circuit based on a condition.

```javascript
// Stop when we find a value > 25
const arr = [10, 20, 30, 40, 50];
arr.some(value => {
  console.log(value);
  return value > 25;  // Stops after logging 30
});
```
:::

## Transformation Operations

JavaScript arrays have powerful built-in methods for transforming data. These follow a functional programming style: they don't modify the original array but return a new one.

### map

Transform each element into something new.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// doubled = [2, 4, 6, 8, 10]
// numbers unchanged
```

**Time Complexity:** O(n)
**Space Complexity:** O(n) - creates a new array

### filter

Keep only elements that match a condition.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
// evens = [2, 4, 6, 8, 10]
```

**Time Complexity:** O(n)
**Space Complexity:** O(n) worst case (if all elements pass)

### reduce

Combine all elements into a single value.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// sum = 15
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) for simple reductions

### Chaining Considerations

These methods can be chained for expressive code:

```javascript
const transactions = [
  { amount: 100, type: 'credit' },
  { amount: 50, type: 'debit' },
  { amount: 200, type: 'credit' },
  { amount: 75, type: 'debit' },
];

const totalCredits = transactions
  .filter(t => t.type === 'credit')
  .map(t => t.amount)
  .reduce((sum, amount) => sum + amount, 0);
// totalCredits = 300
```

This is readable, but be aware that each method creates an intermediate array. For very large arrays, this can impact performance and memory. In such cases, consider combining operations into a single `reduce`:

```javascript
const totalCredits = transactions.reduce((sum, t) => {
  return t.type === 'credit' ? sum + t.amount : sum;
}, 0);
```

## Operations Summary

| Operation | Method | Time | Space | Notes |
|-----------|--------|------|-------|-------|
| Access | `arr[i]` | O(1) | O(1) | Direct calculation |
| Update | `arr[i] = x` | O(1) | O(1) | Direct assignment |
| Search (unsorted) | `indexOf`, `find` | O(n) | O(1) | Linear scan |
| Search (sorted) | Binary search | O(log n) | O(1) | Must be sorted |
| Insert at end | `push` | O(1)* | O(1) | *Amortized |
| Insert at start | `unshift` | O(n) | O(1) | Shifts all elements |
| Insert at index | `splice` | O(n) | O(1) | Shifts elements after |
| Delete from end | `pop` | O(1) | O(1) | No shifting |
| Delete from start | `shift` | O(n) | O(1) | Shifts all elements |
| Delete at index | `splice` | O(n) | O(1) | Shifts elements after |
| Traverse | `for`, `forEach` | O(n) | O(1) | Visits each element |
| Map | `map` | O(n) | O(n) | New array |
| Filter | `filter` | O(n) | O(n) | New array |
| Reduce | `reduce` | O(n) | O(1)* | *Depends on accumulator |

## Common Gotchas

### Mutating vs Non-Mutating Methods

Some methods change the original array, others return a new one. This is a common source of bugs.

**Mutating (modify in place):**
- `push`, `pop`, `shift`, `unshift`
- `splice`, `sort`, `reverse`
- `fill`, `copyWithin`

**Non-mutating (return new array):**
- `map`, `filter`, `reduce`
- `slice`, `concat`
- `flat`, `flatMap`

```javascript
const arr = [3, 1, 2];

// Gotcha: sort mutates the original!
const sorted = arr.sort();
console.log(arr);     // [1, 2, 3] - original is changed!
console.log(sorted);  // [1, 2, 3] - same reference

// Safe approach: copy first
const arr2 = [3, 1, 2];
const sorted2 = [...arr2].sort();
console.log(arr2);    // [3, 1, 2] - unchanged
```

### Off-by-One Errors

The classic bug. Arrays are zero-indexed, so the last valid index is `length - 1`.

```javascript
const arr = [10, 20, 30];

// Wrong: index 3 doesn't exist
for (let i = 0; i <= arr.length; i++) {  // <= should be <
  console.log(arr[i]);  // Logs: 10, 20, 30, undefined
}

// Correct
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);  // Logs: 10, 20, 30
}
```

### Modifying While Iterating

Changing an array's length while iterating over it leads to unpredictable behavior.

```javascript
// Dangerous: removing elements while iterating forward
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    arr.splice(i, 1);  // Removes element, shifts everything
  }
}
console.log(arr);  // [1, 3, 5]? No! It's [1, 3, 5] by luck, but 4 was skipped

// Safe approach 1: iterate backwards
const arr2 = [1, 2, 3, 4, 5];
for (let i = arr2.length - 1; i >= 0; i--) {
  if (arr2[i] % 2 === 0) {
    arr2.splice(i, 1);
  }
}

// Safe approach 2: use filter (creates new array)
const arr3 = [1, 2, 3, 4, 5];
const odds = arr3.filter(n => n % 2 !== 0);
```

### Empty Slots vs Undefined

Sparse arrays have "empty slots" that behave differently from `undefined`.

```javascript
const sparse = [1, , 3];  // Empty slot at index 1
const explicit = [1, undefined, 3];

console.log(sparse[1]);     // undefined
console.log(explicit[1]);   // undefined
console.log(1 in sparse);   // false - slot doesn't exist!
console.log(1 in explicit); // true - slot exists, value is undefined

// forEach skips empty slots
sparse.forEach(x => console.log(x));    // 1, 3
explicit.forEach(x => console.log(x));  // 1, undefined, 3
```

Avoid sparse arrays. They trigger slower internal representations and have surprising behavior with iteration methods.
