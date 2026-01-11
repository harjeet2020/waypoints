---
title: Data Structures
---
Data structures are the building blocks of efficient programs. They determine how data is organized in memory, which in turn determines how quickly you can access, insert, delete, and search through that data. Choosing the right data structure for a problem is often the difference between a solution that runs in milliseconds and one that takes hours.

This section covers the fundamental data structures you will encounter in software engineering. We focus not just on how to use them, but on *why* they work the way they do. Understanding the underlying mechanics will help you make informed decisions about which structure to use and how to optimize your code.

## How This Section is Organized

Each data structure is covered in depth across multiple pages:

| Page | Purpose |
|------|---------|
| **Overview** | What the structure is, when to use it, and quick reference for operations |
| **Internals** | How the structure works in memory, with comparisons across programming languages |
| **Operations** | Common operations with code examples and complexity analysis |
| **Practice** | Hands-on problems with an interactive code editor to build mastery |

This layered approach lets you learn at the depth you need. If you just want to know which structure to use, the overview page is sufficient. If you want to understand why insertion is O(n) for arrays but O(1) for linked lists, dive into the internals.

## The Data Structures

### Sequential Structures

These structures store elements in a linear sequence, one after another.

**[Arrays](./arrays)** are the most fundamental data structure: a contiguous block of memory where elements are stored side by side. Their simplicity enables O(1) access by index, but insertions and deletions require shifting elements. Arrays are the right choice when you need fast random access and your data size is relatively stable.

**[Strings](./strings)** are sequences of characters with their own set of operations and considerations. While often implemented as arrays under the hood, strings have unique characteristics like immutability in many languages and specialized operations for text processing.

**[Linked Lists](./linked-lists)** store elements in nodes scattered throughout memory, with each node pointing to the next. This design makes insertion and deletion O(1) at known positions, but sacrifices random access. Linked lists shine when you need frequent insertions and deletions and can live without index-based access.

### LIFO and FIFO Structures

These structures control the order in which elements are accessed.

**[Stacks](./stacks)** follow Last-In-First-Out ordering: the most recently added element is the first to be removed. Think of a stack of plates. Stacks are essential for function call tracking, undo operations, and parsing expressions.

**[Queues](./queues)** follow First-In-First-Out ordering: elements are processed in the order they arrive. Think of a line at a store. Queues are fundamental to scheduling, breadth-first search, and buffering.

### Associative Structures

These structures enable fast lookup by key rather than position.

**[Hash Tables and Sets](./hash-tables-and-sets)** use a hash function to map keys to array indices, enabling O(1) average-case lookup, insertion, and deletion. Hash tables (also called dictionaries or maps) store key-value pairs, while sets store unique values only. These structures are ubiquitous in real-world applications.

### Hierarchical Structures

These structures organize elements in parent-child relationships.

**[Trees](./trees)** arrange elements in a hierarchy where each node can have multiple children. Binary search trees maintain sorted order for O(log n) operations. Trees model hierarchical data naturally and power everything from file systems to database indices.

**[Heaps](./heaps)** are specialized trees that maintain a specific ordering property: the parent is always greater (or smaller) than its children. This structure enables O(1) access to the maximum or minimum element, making heaps essential for priority queues and efficient sorting.

### Network Structures

**[Graphs](./graphs)** model relationships between entities. Unlike trees, graphs can have cycles and multiple connections between nodes. They represent networks of all kinds: social connections, road maps, dependencies, and state machines.

## Choosing the Right Structure

The best data structure depends on what operations you need to perform most frequently.

| If you need to... | Consider |
|-------------------|----------|
| Access elements by index | Array |
| Insert/delete frequently at arbitrary positions | Linked List |
| Process elements in LIFO order | Stack |
| Process elements in FIFO order | Queue |
| Look up values by key | Hash Table |
| Store unique values and check membership | Set |
| Keep elements in sorted order with fast lookup | Binary Search Tree |
| Quickly find the min or max element | Heap |
| Model relationships between entities | Graph |

### Complexity Comparison

This table summarizes the time complexity of common operations across data structures. Use it as a quick reference when choosing between options.

| Structure | Access | Search | Insert | Delete | Notes |
|-----------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n)* | O(n) | *O(1) amortized at end |
| Linked List | O(n) | O(n) | O(1)** | O(1)** | **At known position |
| Stack | O(n) | O(n) | O(1) | O(1) | Access limited to top |
| Queue | O(n) | O(n) | O(1) | O(1) | Access limited to front |
| Hash Table | O(1)* | O(1)* | O(1)* | O(1)* | *Average case; O(n) worst |
| Binary Search Tree | O(log n)* | O(log n)* | O(log n)* | O(log n)* | *Balanced; O(n) if unbalanced |
| Heap | O(1)† | O(n) | O(log n) | O(log n) | †Min or max only |

