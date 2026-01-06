---
title: How Computers Work
---
## Why Study Hardware?

In the modern era, technology advances so fast that it is hard to keep track of it. Computers seem like magical devices that just work - but next to nobody knows exactly how. Even as a developer, you are able to create polished user-facing applications without realizing the complexity of what is going on under the hood. This is good - the whole idea of abstraction is that you can build new things on a foundation created and maintained by someone else. But it also has its downsides. For one, it is somewhat embarrassing to call yourself a software engineer and have no idea what a computer is. But more importantly, understanding computers at a deep level empowers you as a developer.

Knowing how low-level hardware operates, you will:

- **Write faster code** by understanding what operations are expensive
- **Debug mysterious issues** that stem from hardware behavior
- **Make better architectural decisions** about where to store data and how to process it
- **Understand why** certain best practices exist instead of just memorizing them

That is why our exploration of computer science must begin at hardware. Don't worry, we won't be diving too much into technical details; we will be looking at computers from the perspective of a software, not an electrical engineer. Still, do arm yourself in patience - developing even a basic grasp of all the layers of hardware and software that make computers function as they do requires time.

In this article, we will cover high-level basics.

## The Core Trio: CPU, RAM, and Storage

Every computer has three essential components that work together:

```
┌─────────────────────────────────────────────────────────────┐
│                        YOUR COMPUTER                        │
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │     CPU     │◄────►│     RAM     │◄────►│   Storage   │ │
│  │  (Thinker)  │      │  (Notebook) │      │ (File Cab)  │ │
│  └─────────────┘      └─────────────┘      └─────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Our purpose today will be to understand what each of those does, and how they work together. The best way to visualize this is through analogy: imagine you're a chef (the CPU) working in a kitchen.

---
### The CPU: The Brain

**What it is:** The *Central Processing Unit* is the "brain" of the computer. It's a chip about the size of a postage stamp that contains billions of tiny transistors.

**What it does:** The CPU executes instructions—the individual steps of your program. It can:
- Perform arithmetic (add, subtract, multiply, divide)
- Compare values (is A greater than B?)
- Move data from one place to another
- Make decisions based on conditions

**Analogy:** You are the chef. You can only do one thing at a time with your hands, but you do it very *(very)* fast. You follow recipes - *programs* - step by step.

**Key specs you'll hear about:**
- **Clock speed (GHz):** How many cycles per second. A 3 GHz processor can do 3 billion cycles per second. Each instruction takes one or more cycles.
- **Cores:** Modern CPUs have multiple cores, like having multiple chefs in the kitchen. A 4-core CPU can work on 4 things truly simultaneously, with each core operating independently. This is called *parallelism*.

:::info Parallelism vs Multithreading
*Parallelism* is distinct from *multithreading*, where a single core rapidly switches between multiple tasks to create the illusion of parallel execution.
:::

---
### RAM: The Workspace

**What it is:** *Random Access Memory* is your computer's short-term memory. It is extremely fast, but it requires power supply (when a computer is turned off or crashes, RAM is wiped clean).

**What it does:** RAM holds the data and programs that the CPU is actively working with. When you open an application, it loads from storage into RAM so the CPU can access it quickly.

**Analogy:** RAM is your kitchen counter. It's where you place ingredients you're actively using. The counter is limited in size, but you can reach anything on it instantly. When you leave the kitchen (power off), the counter gets cleared.

**Key characteristics:**
- **Fast access:** The CPU can read from RAM in nanoseconds
- **Volatile:** Data disappears when power is lost
- **Random access:** Any location can be accessed equally fast

**Typical sizes:** 8GB, 16GB, 32GB, 64GB in modern desktop computers

:::danger Overflow Memory
If a computer runs out of RAM, the operating system starts using storage as overflow memory (called *swapping*). This is extremely slow, which is why a computer running out of RAM begins to lag significantly.
:::

---
### Storage: The File Cabinet

**What it is:** Your hard drive (HDD) or solid-state drive (SSD). It is large and provides permanent storage - but it is very slow when compared to RAM.

**What it does:** Storage holds all your files, applications, and the operating system - even when the power is off. It's where things live long-term.

**Analogy:** Storage is the pantry and refrigerator. It holds everything you might need, but walking to the pantry takes time. You can't cook directly from the pantry - you need to bring ingredients to your counter (RAM) first.

**Key characteristics:**
- **Persistent:** Data survives power loss
- **Slower:** Accessing storage takes milliseconds (SSDs) to tens of milliseconds (HDDs)
- **Large capacity:** Hundreds of gigabytes to terabytes

:::info Cache: The Hidden Helper
Between the CPU and RAM, there's a crucial layer called **cache**. Cache is a small amount of ultra-fast memory built directly into the CPU chip.

**Why it exists:** RAM is fast, but the CPU is faster. If the CPU had to wait for RAM every time it needed data, it would spend most of its time waiting. Cache solves this by keeping copies of recently-used data very close to the CPU.

**How it works:** When the CPU needs data:
1. First, it checks L1 cache (smallest, fastest, usually 32-64KB)
2. If not there, it checks L2 cache (larger, slightly slower, 256KB to 1MB)
3. If not there, it checks L3 cache (shared among cores, several MB)
4. If not there, it finally goes to RAM

This is called a **cache hit** (found in cache) or **cache miss** (had to go to RAM). Modern programs can run dramatically slower *(even 10-100x slower!)* if their cache hit rate is poor.
:::

## Why Do We Need All Three?

There is a pattern you may have noticed - the higher the memory capacity, the lower the access speed. This is a fundamental constraint in computing - and it is mitigated by *memory hierarchy*. Rather than relying on a single multi-purpose storage medium, we employ a tiered architecture that utilizes multiple components - each optimized for different actions.

Here is a quick comparison of speed to capacity relationship:

| Property    | CPU Registers | RAM              | SSD               | HDD              |
| ----------- | ------------- | ---------------- | ----------------- | ---------------- |
| Speed       | ~1 nanosecond | ~100 nanoseconds | ~0.1 milliseconds | ~10 milliseconds |
| Capacity    | ~1 KB         | ~16 GB           | ~1-2 TB           | ~2-4 TB          |
| Cost per GB | Astronomical  | ~$3              | ~$0.10            | ~$0.02           |
| Persistent? | No            | No               | Yes               | Yes              |

**The fundamental tradeoff:** Fast memory is expensive and small. Cheap memory is slow and big. There's no single technology that's fast, cheap, large, AND persistent.

## The Fetch-Decode-Execute Cycle

Now that we know the hardware, let's see how the CPU actually runs programs. Every program, no matter how complex, is executed through a simple loop:

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│    ┌─────────┐     ┌─────────┐     ┌─────────┐            │
│    │  FETCH  │────►│ DECODE  │────►│ EXECUTE │            │
│    └─────────┘     └─────────┘     └─────────┘            │
│         ▲                               │                  │
│         └───────────────────────────────┘                  │
│                    (repeat)                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Step 1: Fetch

The CPU grabs the next instruction from memory. It keeps track of where it is in the program using a special register called the **Program Counter** (PC) or **Instruction Pointer** (IP).

Think of it like reading a recipe: "What's the next step? Oh, step 7: 'Add salt.'"

### Step 2: Decode

The CPU figures out what the instruction means. Instructions are just numbers (remember, everything is binary!), and the CPU has circuitry that interprets these numbers.

For example, the binary pattern `10110000 01100001` might mean "move the value 97 into register AL."

This is like understanding what "add salt" means - you need to know what salt is and what adding means.

### Step 3: Execute

The CPU actually performs the operation. This might mean:
- Doing arithmetic in the ALU (Arithmetic Logic Unit)
- Reading from or writing to memory
- Changing the program counter to jump to a different instruction

This is the actual cooking—picking up the salt shaker and shaking it over the pot.

### Repeat

The cycle continues. Billions of times per second. A 3 GHz processor goes through this cycle 3 billion times every second.

:::info Clarification
Modern CPUs actually overlap these stages through a technique called *pipelining*: while one instruction is being executed, the next is being decoded, and the one after that is being fetched. This allows the CPU to work on multiple instructions at once, dramatically increasing throughput. Conceptually, though, the fetch-decode-execute cycle still applies to each individual instruction.
:::

---
### A Simple Example

Let's say your program has this code:
```javascript
let x = 5;
let y = 3;
let z = x + y;
```

At the CPU level, this becomes something like:

| Cycle | Fetch | Decode | Execute |
|-------|-------|--------|---------|
| 1 | Get instruction 1 | "Load 5 into register A" | A ← 5 |
| 2 | Get instruction 2 | "Store register A to memory address X" | Memory[X] ← 5 |
| 3 | Get instruction 3 | "Load 3 into register A" | A ← 3 |
| 4 | Get instruction 4 | "Store register A to memory address Y" | Memory[Y] ← 3 |
| 5 | Get instruction 5 | "Load from address X into register A" | A ← 5 |
| 6 | Get instruction 6 | "Load from address Y into register B" | B ← 3 |
| 7 | Get instruction 7 | "Add registers A and B, store in A" | A ← 8 |
| 8 | Get instruction 8 | "Store register A to memory address Z" | Memory[Z] ← 8 |

Your simple 3-line program became 8 CPU instructions! This is why computers need to be fast.

## How Data Flows

Let's trace what happens when you run a program:

### 1. Loading the Program

```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│ Storage │  ──────────────►  │   RAM   │  ──────────────►  │   CPU   │
│  (SSD)  │  "Load program"   │         │  "Ready to run"   │         │
└─────────┘                    └─────────┘                    └─────────┘
```

When you double-click an application:
1. The operating system finds the program file on storage
2. The program's instructions and initial data are copied into RAM
3. The CPU is told where in RAM the program starts

### 2. Running the Program

```
┌─────────┐         ┌─────────┐         ┌─────────┐
│   CPU   │ ◄─────► │  Cache  │ ◄─────► │   RAM   │
└─────────┘         └─────────┘         └─────────┘
     │                                        │
     │  "Need data from file"                 │
     ▼                                        ▼
┌─────────────────────────────────────────────────┐
│                    Storage                       │
└─────────────────────────────────────────────────┘
```

While running:
1. The CPU fetches instructions from RAM (via cache)
2. Data is read from and written to RAM
3. If the program needs to read a file, it must wait for storage
4. Results are written back to RAM, and eventually to storage if saved

## How This Helps You Write Better Code

Understanding hardware leads to practical insights:

### 1. Memory Access Patterns Matter

**Bad:** Jumping around in memory randomly (causes cache misses)
**Good:** Processing data sequentially (takes advantage of cache)

```javascript
// Cache-unfriendly: column-major access on row-major data
for (let col = 0; col < 1000; col++) {
    for (let row = 0; row < 1000; row++) {
        matrix[row][col] = process(matrix[row][col]);
    }
}

// Cache-friendly: row-major access
for (let row = 0; row < 1000; row++) {
    for (let col = 0; col < 1000; col++) {
        matrix[row][col] = process(matrix[row][col]);
    }
}
```

:::tip Why is the second version faster?
In JavaScript (and most languages), 2D arrays are stored row by row in memory. When you access `matrix[0][0]`, the CPU loads not just that element but an entire chunk of nearby memory into cache. With row-major access, the next elements you need (`matrix[0][1]`, `matrix[0][2]`, etc.) are already in cache. With column-major access, you jump to a completely different memory location on each iteration, causing constant cache misses.
:::

### 2. Keep Working Data Small

If your data fits in cache, your program runs much faster. This is why algorithms that work on small chunks at a time often outperform those that touch lots of data.

### 3. Disk Access is Expensive

Reading from storage is ~100,000x slower than reading from RAM. This is why:
- Databases keep frequently-accessed data in memory
- Web applications use caching
- Loading screens exist

### 4. Understand the Cost of Operations

Not all operations are equal:

| Operation       | Relative Cost |
|-----------------|---------------|
| CPU arithmetic  | 1             |
| RAM access      | 100           |
| SSD read        | 100,000       |
| HDD read        | 10,000,000    |
| Network request | 100,000,000+  |

### 5. Concurrency Makes Sense

While waiting for slow operations (disk, network), the CPU could be doing other work. This is why:
- Async programming exists
- Operating systems run multiple programs at once
- Modern apps use multiple threads

## Key Takeaways

1. **The CPU is fast but can only work on data that's close to it.** This is why we have a memory hierarchy.

2. **RAM is your working memory - fast but temporary.** Programs must be loaded into RAM to run.

3. **Storage is permanent but slow.** Reading from disk is a major bottleneck.

4. **Cache bridges the speed gap.** Writing cache-friendly code makes a huge difference.

5. **The fetch-decode-execute cycle is the heartbeat of computing.** Everything your computer does comes down to this simple loop running billions of times per second.

6. **Hardware constraints explain software patterns.** Many "best practices" exist because of physical limitations.

## Looking Ahead

Now that we have a basic grasp of hardware, we can have a look at how computers work on a low level. The next three articles will focus on **binary** - why computers use 1s and 0s, and how we represent different data types such as negative / floating-point numbers, or characters / strings.