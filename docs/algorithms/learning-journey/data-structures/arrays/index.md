---
title: Arrays
---
## The Foundation of Data Structures

If data structures were a family tree, arrays would be the ancestor from whom all others descend. They are the simplest, most fundamental way to store a collection of elements, and nearly every other data structure either builds upon arrays or exists to address their limitations.

An array is a contiguous block of memory that stores elements of the same type in sequence. Think of it as a row of numbered mailboxes in an apartment building. Each mailbox has an address (index), and you can walk directly to any mailbox if you know its number. You don't need to check mailboxes 0 through 41 to find mailbox 42; you simply calculate where it is and go there.

This direct access is what makes arrays powerful. But it comes with tradeoffs, as all things in computing do.

## When to Use Arrays

Arrays excel in certain situations and struggle in others. Knowing when to reach for an array is half the battle.

| Use Arrays When | Consider Alternatives When |
|-----------------|---------------------------|
| You need fast access by position | You frequently insert/delete in the middle |
| The size is known or relatively stable | The size changes dramatically over time |
| You're iterating through elements in order | You need to search by value frequently |
| Memory efficiency matters | You need key-value associations |
| You want cache-friendly performance | Elements need to be sorted continuously |

## Operation Complexity Reference

| Operation | Time Complexity | Why |
|-----------|-----------------|-----|
| Access by index | O(1) | Direct memory calculation |
| Search (unsorted) | O(n) | Must check each element |
| Search (sorted) | O(log n) | Binary search possible |
| Insert at end | O(1) amortized | May need to resize |
| Insert at beginning/middle | O(n) | Must shift elements |
| Delete from end | O(1) | No shifting needed |
| Delete from beginning/middle | O(n) | Must shift elements |

:::info Amortized Complexity
"Amortized O(1)" means that while individual operations might occasionally be expensive (when the array needs to resize), the average cost over many operations is constant. We'll explore this in detail in the internals section.
:::

## In This Section

This section provides a comprehensive exploration of arrays:

- **[How Arrays Work in Memory](./internals)** - Dive into memory layout, understand why O(1) access is possible, and compare how different languages implement arrays
- **[Array Operations](./operations)** - Master common operations with code examples and understand their performance characteristics
- **[Practice Problems](./practice)** - Build muscle memory with hands-on exercises, from basic iteration to more nuanced manipulation

