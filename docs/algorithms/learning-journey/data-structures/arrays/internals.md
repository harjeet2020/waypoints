---
title: Memory & Internals
---
## How Arrays Work in Memory

An array is, at its core, a contiguous block of memory. When you create an array of five integers, the computer reserves five adjacent memory slots, one right after another with no gaps between them. Memory slot size is fixed within each array, and depends on the type of data the array stores.

```
Memory Address:   1000     1004     1008     1012     1016
                ┌────────┬────────┬────────┬────────┬────────┐
Array [5]:      │   10   │   20   │   30   │   40   │   50   │
                └────────┴────────┴────────┴────────┴────────┘
Index:             [0]      [1]      [2]      [3]      [4]
```

In this example, each integer occupies 4 bytes. The array starts at memory address 1000, so element 0 lives at 1000, element 1 at 1004, element 2 at 1008, and so on.

This layout is the key to understanding array performance.

## The Magic of O(1) Access

When you write `arr[3]`, the computer doesn't search through the array to find the fourth element. Instead, it performs a simple calculation:

```
element_address = base_address + (index × element_size)
```

For `arr[3]` in our example:
```
element_address = 1000 + (3 × 4) = 1012
```

The CPU can jump directly to address 1012 and read the value. This calculation takes the same amount of time whether you're accessing `arr[0]` or `arr[999999]`. That's why array access is O(1), constant time, regardless of the array's size.

:::info Why Indices Start at Zero
This formula also explains why array indices start at 0 in most languages. The first element is at `base + (0 × size)`, which is simply the base address itself. Starting at 1 would waste the first slot or require subtracting 1 on every access.
:::

## Why Contiguous Memory Matters

Beyond enabling fast access, contiguous storage provides another crucial benefit: cache efficiency.

When the CPU reads a value from memory, it doesn't fetch just that single value. It loads an entire cache line, typically 64 bytes, into the CPU cache. If your array elements are adjacent in memory, a single cache load might bring in 16 integers at once.

```
┌─────────────────────────────────────────────────────────────────┐
│                     One Cache Line (64 bytes)                    │
├────────┬────────┬────────┬────────┬────────┬────────┬──────────┤
│ arr[0] │ arr[1] │ arr[2] │ arr[3] │ arr[4] │ arr[5] │   ...    │
└────────┴────────┴────────┴────────┴────────┴────────┴──────────┘
```

When you iterate through an array sequentially, most accesses are cache hits because the data you need is already sitting in the fastest memory available. This is called **spatial locality**, and it's why arrays often outperform theoretically equivalent data structures in practice.

Linked lists, by contrast, scatter their elements throughout memory. Each access might require fetching a new cache line, making sequential traversal significantly slower despite having the same O(n) complexity.

## Static vs Dynamic Arrays

Arrays come in two fundamental flavors:

### Static Arrays

A static array has a fixed size determined at creation. Once allocated, it cannot grow or shrink.

```c
int scores[100];  // Exactly 100 integers, no more, no less
```

**Advantages:**
- Predictable memory usage
- No overhead for tracking capacity
- Often allocated on the stack (very fast)

**Disadvantages:**
- Must know the size upfront
- Wastes memory if you overestimate
- Crashes or corrupts memory if you underestimate

### Dynamic Arrays

A dynamic array can grow as needed. When it runs out of space, it allocates a larger block, copies everything over, and continues.

```javascript
const items = [];      // Starts empty
items.push('first');   // Grows as needed
items.push('second');
```

Most modern languages provide dynamic arrays as their default: JavaScript arrays, Python lists, Java's ArrayList, and C++'s vector all work this way.

**Advantages:**
- Flexible size, no need to predict capacity
- Easier to use correctly

**Disadvantages:**
- Occasional expensive resize operations
- Memory overhead for tracking capacity
- Slightly more complex implementation

## How Dynamic Arrays Grow

When a dynamic array fills up, it needs more space. The naive approach would be to add one slot at a time, but this performs terribly. If you're inserting n elements, and each insert requires copying all existing elements, the total work becomes O(n²).

The solution is **geometric growth**: when the array fills up, double its capacity.

```
Insert 1:  [■ _ _ _]         capacity 4, size 1
Insert 2:  [■ ■ _ _]         capacity 4, size 2
Insert 3:  [■ ■ ■ _]         capacity 4, size 3
Insert 4:  [■ ■ ■ ■]         capacity 4, size 4
Insert 5:  [■ ■ ■ ■ ■ _ _ _] capacity 8, size 5  ← doubled!
```

### Amortized Analysis

With doubling, most insertions are O(1), but occasionally you pay O(n) to copy everything. How do we reason about this?

Consider inserting n elements into an initially empty array. The total copying work is:

```
1 + 2 + 4 + 8 + ... + n/2 + n ≈ 2n (geometric series)
```

We do about 2n total copies for n insertions. That's O(n) total work, or **O(1) per insertion on average**. This is called amortized O(1).

:::tip The Accounting Metaphor
Think of it like saving money. Each cheap O(1) insertion "saves up" a small amount. When the expensive O(n) resize happens, you have enough saved to pay for it. The average cost per operation stays constant.
:::

## Language Implementations

Different languages implement arrays differently. Understanding these differences helps you write efficient code and reason about performance across your stack.

### C: The Baseline

C arrays are the closest to the hardware. They're simply a pointer to a memory address with no additional bookkeeping.

```c
// Stack-allocated, fixed size
int arr[5] = {10, 20, 30, 40, 50};

// Heap-allocated, manually managed
int* dynamic = malloc(5 * sizeof(int));
dynamic[0] = 10;
// ... use the array ...
free(dynamic);  // Must free manually!
```

**Key characteristics:**
- No bounds checking; accessing `arr[100]` on a 5-element array is undefined behavior
- Fixed size unless you manually reallocate
- Zero overhead; the array *is* just the data
- Direct memory access enables maximum performance

**Under the hood:** A C array is literally a contiguous block of memory. The variable `arr` is the address of the first element. `arr[i]` computes `*(arr + i)`, dereferencing the pointer at offset i.

### Java: Managed but Typed

Java provides both primitive arrays (fixed-size) and ArrayList (dynamic). C#, Kotlin, and Scala follow similar patterns.

```java
// Primitive array - fixed size, stores values directly
int[] numbers = new int[5];
numbers[0] = 10;

// ArrayList - dynamic, stores object references
ArrayList<Integer> list = new ArrayList<>();
list.add(10);  // Autoboxing: int → Integer
list.add(20);
```

**Key characteristics:**
- Bounds checking on every access (throws ArrayIndexOutOfBoundsException)
- Primitive arrays store values directly (cache-efficient)
- ArrayList stores object references, requiring an extra indirection
- Generics require object types, so primitives get "boxed" into objects

**Under the hood:** Primitive arrays are contiguous blocks of values, similar to C. ArrayList wraps a primitive array internally, doubling capacity when full. The JVM adds bounds checking code before every array access.

**Similar languages:** C# arrays and List<T> work nearly identically. Kotlin and Scala compile to JVM bytecode and use the same underlying structures.

### Python: Flexibility First

Python lists are dynamic arrays that can hold any type of object. Ruby and PHP arrays behave similarly.

```python
# Can hold mixed types
items = [1, "hello", 3.14, [1, 2, 3]]

# Dynamic sizing
items.append("new item")

# List comprehension (efficient creation)
squares = [x**2 for x in range(10)]
```

**Key characteristics:**
- Dynamic sizing with over-allocation (grows by ~12.5% when full, not doubling)
- Stores pointers to objects, not the objects themselves
- Can hold heterogeneous types (mixed integers, strings, etc.)
- Bounds checking raises IndexError on invalid access

**Under the hood:** A Python list is an array of pointers (PyObject*). Each element points to an object elsewhere in memory. This indirection means cache locality is poor, as the actual values are scattered across the heap.

```
Python list structure:
┌────────────────────────────────────────┐
│ List object                            │
│ ┌──────────────────────────────────┐   │
│ │ ptr │ ptr │ ptr │ ptr │ ... │    │   │
│ └──┬───┴──┬──┴──┬──┴──┬──┴─────────┘   │
└────│──────│─────│─────│────────────────┘
     ▼      ▼     ▼     ▼
   ┌───┐  ┌───┐ ┌───┐ ┌───┐
   │ 1 │  │"a"│ │3.1│ │[.]│  ← actual objects scattered in heap
   └───┘  └───┘ └───┘ └───┘
```

**Similar languages:** Ruby arrays and PHP arrays use similar reference-based storage, prioritizing flexibility over raw performance.

### JavaScript: The Chameleon

JavaScript arrays are perhaps the most unusual. They're technically objects with numeric keys, but modern engines optimize them heavily.

```javascript
// Standard array
const arr = [10, 20, 30, 40, 50];

// Can hold mixed types
const mixed = [1, 'hello', { key: 'value' }, [1, 2, 3]];

// Sparse arrays are possible (but discouraged)
const sparse = [];
sparse[0] = 'first';
sparse[1000] = 'way out here';  // Elements 1-999 don't exist
```

**Key characteristics:**
- Dynamic sizing with push/pop
- Can hold any type (including functions, objects, other arrays)
- Sparse arrays are possible but trigger de-optimization
- Out-of-bounds access returns `undefined` (no error!)
- Array methods (map, filter, reduce) encourage functional patterns

**Under the hood:** V8 (Chrome/Node.js) uses multiple internal representations:

1. **Packed SMI (small integer) arrays:** Contiguous memory, maximum performance
2. **Packed double arrays:** Contiguous doubles
3. **Packed object arrays:** Array of pointers (like Python)
4. **Holey arrays:** Has gaps/undefined elements, slower
5. **Dictionary mode:** For very sparse arrays, uses hash table internally

The engine tracks how you use each array and optimizes accordingly. Mixing types or creating holes forces slower representations.

```javascript
// Fast: stays in optimized packed mode
const fast = [1, 2, 3, 4, 5];
fast.push(6);

// Slow: forces object/holey mode
const slow = [1, 'mixed', 3];
slow[100] = 'sparse';
```

**Similar languages:** TypeScript compiles to JavaScript and has identical runtime behavior. The type annotations are erased at compile time; they don't change how arrays work in memory.

## Comparison Table

| Feature | C | Java (ArrayList) | Python | JavaScript |
|---------|---|------------------|--------|------------|
| Dynamic sizing | Manual | Yes | Yes | Yes |
| Type homogeneity | Enforced | Enforced (generics) | No | No |
| Bounds checking | None | Exception | Exception | Returns undefined |
| Memory overhead | None | Low-Medium | High | Varies |
| Cache efficiency | Excellent | Good | Poor | Varies |
| Out-of-bounds behavior | Undefined | ArrayIndexOutOfBounds | IndexError | Returns undefined |

## When These Differences Matter

For most application code, these implementation details don't significantly impact your day-to-day work. A few thousand elements will be fast in any language.

However, understanding internals becomes crucial when:

- **Processing large datasets:** Python's pointer-chasing adds up with millions of elements. Consider NumPy, which uses C-style contiguous arrays under the hood.
- **Performance-critical loops:** JavaScript arrays that stay in "packed SMI" mode can be 10-100x faster than those forced into dictionary mode.
- **Memory-constrained environments:** A Java ArrayList<Integer> uses far more memory than an int[] of the same logical size due to object overhead.
- **Debugging mysterious slowdowns:** Knowing that Python lists store pointers explains why iterating over a list of numbers is slower than you might expect.

The goal isn't to micro-optimize everything, but to have the mental model that helps you make informed decisions when performance matters.
