---
title: How JavaScript Runs
---

You write `const x = 5`, save the file, and something happens. The variable
exists. The value is stored. Later, a function runs, a condition is checked,
a loop iterates. It all just *works*.

But what does "works" actually mean? Between the moment you write a line of
JavaScript and the moment a CPU somewhere executes an instruction, there is
an entire hidden world of machinery. Your source code is read character by
character, transformed into data structures, compiled into low-level
instructions, optimized on the fly, and sometimes even thrown away and
recompiled when the engine's assumptions turn out to be wrong.

Understanding this machinery is not about trivia. It is the difference
between writing code that happens to work and writing code you truly
understand. When you know what the engine does with your code, you can
predict its behavior, reason about its performance, and debug it with
confidence. This article traces that journey from source text to running
program, and it sets the stage for everything that follows.

## A Language That Needs an Engine

JavaScript is a high-level language. You never allocate memory by hand,
never manage registers, never think about machine instructions. You write
human-readable code, and something else takes care of translating it into
the language your computer actually speaks.

That "something else" is the **JavaScript engine**: a program whose sole
purpose is to read, understand, and execute your JavaScript code. The three
major engines are:

- **V8** powers Chrome and Node.js. It is the engine we will reference
  most, because it is the most widely used and the most thoroughly
  documented.
- **SpiderMonkey** powers Firefox. It was the very first JavaScript engine,
  written by Brendan Eich alongside the language itself in 1995.
- **JavaScriptCore** (also called Nitro) powers Safari and is used by the
  Bun runtime.

These engines differ in their internal architectures and optimization
strategies, but they all implement the same language specification
(ECMAScript) and follow the same fundamental pattern: take source code in,
produce behavior out.

It is important to understand that the engine is *only* responsible for the
language itself: parsing your code, managing memory, executing instructions.
It does not know anything about files, networks, timers, or web pages.
Those capabilities come from the **runtime**, which we will meet later in
this article. For now, let us focus on the engine and what it does with your
source code.

## Interpreted, Compiled, or Something Else?

You will often hear JavaScript described as an "interpreted language." This
was true in 1995, when Netscape's original engine read JavaScript source
code and executed it line by line, with no intermediate compilation step.
It was simple, but it was slow.

Today, every major engine compiles your JavaScript before executing it. V8
first interprets your code as bytecode (a lightweight intermediate form),
then selectively compiles frequently run code into optimized machine code.
SpiderMonkey has a similar multi-tier pipeline. So is JavaScript a compiled
language now?

Not quite. The distinction matters:

- **Ahead-of-time (AOT) compiled languages** like C, Go, and Rust are
  compiled *before* the program runs. You run a compiler, it produces a
  binary, and that binary is what executes. The compilation step is
  separate from execution.
- **Interpreted languages** in the traditional sense (like early JavaScript,
  or shell scripts) are executed directly from source, with no compilation
  step at all.
- **JIT-compiled languages** like modern JavaScript, Java, and C# occupy a
  third category. They compile *during* execution, at runtime, while your
  code is already running. There is no separate compilation step the
  developer needs to perform, and the compilation happens transparently
  inside the engine.

Modern JavaScript is best described as a **JIT-compiled language**. The
engine interprets your code at first (for fast startup), then compiles the
parts that matter most (for fast execution). This hybrid approach gives
JavaScript the quick startup time of an interpreter with the raw speed of
a compiler, at least for the code paths that run frequently.

Understanding this has practical consequences. Code that runs once (like
initialization logic) will likely stay interpreted. Code that runs in a
tight loop or handles thousands of requests will be compiled to fast machine
code. The same function can transition from slow to fast *while your program
is running*, which is something that never happens in an AOT-compiled
language.

:::info Why Not Compile Ahead of Time?
JIT compilation is not just a performance trick. For JavaScript, it is a
necessity driven by three constraints.

First, **JavaScript is dynamically typed**. A variable can hold a number
one moment and a string the next. An AOT compiler has no way of knowing
what types your variables will hold, so it cannot generate the kind of
specialized machine code that makes compiled languages fast. A JIT compiler
can: it watches your code run, observes the actual types, and generates
machine code tailored to what it has seen.

Second, **JavaScript must run on any CPU architecture**. A browser on an
x86 laptop and a browser on an ARM phone must both execute the same
JavaScript file. AOT compilation produces machine code for one specific
architecture. Bytecode is portable: the engine compiles it to whatever
architecture the user happens to be running.

Third, **on the web, there is no gap between receiving code and running
it**. A browser downloads a script and needs to execute it immediately.
There is no room for a slow compilation pass that blocks the page from
loading. JIT solves this by starting execution instantly (with interpreted
bytecode) and compiling in the background (with optimized machine code),
so the user never waits.
:::

## The Pipeline: From Characters to Execution

The transformation from source code to executable instructions is not a
single leap. It happens in stages, each one building on the output of the
previous, each one bringing the code closer to something the engine can act
on. Understanding why each stage exists, and what it produces for the next
stage, is the key to understanding the pipeline as a whole.

Let us trace a single line through the entire pipeline:

```javascript
const total = price + tax;
```

### Stage 1: Lexing (Tokenization)

The engine starts by reading your source code one character at a time. At
this point, the code is just a raw string of characters: `c`, `o`, `n`,
`s`, `t`, ` `, `t`, `o`, `t`, `a`, `l`... The engine cannot do anything
useful with individual characters. It needs to group them into meaningful
chunks called **tokens**. This process is called **lexing** (or
tokenization).

The lexer scans through the characters and produces a stream of tokens:

| Token    | Type       |
|----------|------------|
| `const`  | Keyword    |
| `total`  | Identifier |
| `=`      | Operator   |
| `price`  | Identifier |
| `+`      | Operator   |
| `tax`    | Identifier |
| `;`      | Punctuator |

Each token carries a type and a value. Whitespace and comments are
discarded (they are meaningful to humans, not to machines). What remains is
a clean sequence of the building blocks of your program.

This is a purely mechanical process. The lexer does not understand what your
code *means*. It does not know that `total` is a variable or that `+` will
add two numbers. It simply recognizes patterns: this group of characters is
a keyword, that group is an identifier, this symbol is an operator.

But why bother with this step? Because the next stage, the parser, needs
to reason about the *structure* of your code, and it cannot do that with
raw characters. It needs units with meaning: "this is a keyword," "this is
an operator," "this is a name." Tokens are those units.

### Stage 2: Parsing

The **parser** takes the flat stream of tokens and builds a tree-shaped
data structure called an **Abstract Syntax Tree** (AST).

A flat list of tokens tells you *what* the pieces are, but not *how they
relate to each other*. Looking at the token stream `const`, `total`, `=`,
`price`, `+`, `tax`, `;`, the parser has to answer structural questions:
Is `price + tax` the value being assigned to `total`, or is `tax` something
separate? What is the scope of the `const` declaration? What takes
precedence if the expression is more complex?

The AST captures these relationships as a tree:

```
VariableDeclaration (const)
└── VariableDeclarator
    ├── Identifier: "total"
    └── BinaryExpression (+)
        ├── Identifier: "price"
        └── Identifier: "tax"
```

The tree encodes structure that a flat list cannot. It knows that
`price + tax` is a binary expression, that this expression is the *value*
of a variable declaration, and that `total` is the *name*. The `=` sign,
the semicolon, the whitespace: all absorbed into the tree's shape. They
were syntactic scaffolding, necessary for the parser but not needed beyond
it.

This is also the stage where **syntax errors** are caught. If you write
something like `const = 5;` (missing a variable name), the parser cannot
build a valid tree, and it throws a `SyntaxError` before your code ever
runs. The engine will not attempt to execute a program it cannot parse.

:::info Exploring the AST
If you are curious about what ASTs look like in practice, the tool
[AST Explorer](https://astexplorer.net/) lets you paste in JavaScript code
and see the resulting tree. It is a wonderful way to build intuition for
how the engine sees your code.
:::

### Stage 3: Bytecode Generation and Interpretation

The AST captures the full structure of your program, but it is not
something that can be *executed*. Trees are good for representing
relationships; they are not good for telling a machine "do this, then
this, then this." The next step is to walk the tree and generate
**bytecode**: a flat sequence of simple instructions.

What is bytecode, exactly? Think of it as assembly language for a machine
that does not physically exist. Real assembly (x86, ARM) targets a specific
CPU with specific registers and specific instructions. Bytecode targets a
**virtual machine**: a software-defined processor with its own instruction
set, designed specifically for running JavaScript efficiently. The bytecode
defines the virtual machine's instruction set (what operations are
available, what registers exist), and an **interpreter** executes those
instructions by translating each one into real CPU operations.

In V8, this interpreter is called **Ignition**. Ignition's job has two
parts. First, it **compiles** the AST into bytecode: it walks the tree and
produces a flat sequence of instructions. This is a compilation step (the
AST is transformed into a different, lower-level representation), but it
targets Ignition's virtual instruction set rather than any physical CPU.
Second, it **interprets** (executes) that bytecode, stepping through it
instruction by instruction. Each bytecode instruction is a simple
operation: load a value, store it somewhere, add two things, call a
function. There are no variable names, no keywords, no nesting. Just a
flat sequence of steps.

For our example, the bytecode might look roughly like:

```
LdaGlobal [price]       // Load the value of 'price' into the accumulator
Star r0                 // Store it in register r0
LdaGlobal [tax]         // Load the value of 'tax' into the accumulator
Add r0                  // Add r0 (price) to the accumulator (tax)
StaGlobal [total]       // Store the result in 'total'
```

This is simplified for clarity. Real V8 bytecode includes additional
metadata (feedback vectors for profiling, register counts, source position
tables for debugging) that would distract from the concept. But the spirit
is accurate: the tree structure has been flattened into sequential steps
that the interpreter walks through one at a time.

Here is the important distinction: **your CPU cannot execute bytecode
directly**. Bytecode is consumed by Ignition, the interpreter, which reads
each instruction and translates it into the actual CPU operations needed to
carry it out. This is the "interpretation" step, and it is why interpreted
bytecode is slower than native machine code: there is always a middleman
between your code and the hardware. But bytecode is much faster to
*generate* than machine code, which is why the engine starts here rather
than compiling everything to machine code up front.

:::tip
You can see real V8 bytecode by running Node.js with the
`--print-bytecode` flag: `node --print-bytecode your-file.js`. The output
is verbose, but scanning through it builds a visceral sense of what the
engine actually does with your code.
:::

At this point, your code is running. Ignition is stepping through the
bytecode, executing each instruction, and your program is doing its thing.
For many programs, this is where the story ends.

But V8 has another trick up its sleeve.

## JIT Compilation: When the Engine Gets Clever

Interpreting bytecode works, but it is not the fastest way to run code.
Every time the interpreter encounters an instruction, it must decode it,
figure out what to do, and then do it. For code that runs once or twice,
this overhead is negligible. But for code that runs thousands or millions
of times, like the body of a hot loop, it adds up.

This is where **Just-In-Time (JIT) compilation** enters the picture.

### The Tiered Strategy

Modern JavaScript engines do not make a single binary choice between
"interpret" and "compile." Instead, they use a **tiered execution
strategy**, where code graduates through levels of optimization based on
how frequently it runs.

In V8, the tiers look like this:

1. **Ignition (interpreter).** All code starts here. The bytecode is
   interpreted instruction by instruction. This is slow to execute but
   fast to start, because generating bytecode from the AST is cheap. While
   interpreting, Ignition collects **profiling data**: what types do
   variables hold? How many times has this function been called? Which
   branch of an `if` statement is taken most often?

2. **TurboFan (optimizing compiler).** When a function has been called
   enough times (or a loop has iterated enough times), V8 marks it as
   "hot" and hands it to TurboFan. TurboFan takes the bytecode *and* the
   profiling data and produces highly optimized **machine code**: native
   instructions for your specific CPU architecture.

The key insight is that TurboFan can make **speculative assumptions** based
on the profiling data. If a function has always received numbers as
arguments, TurboFan can compile it as if the arguments will *always* be
numbers, skipping all the type-checking overhead. If an object always has
the same shape (the same properties in the same order), TurboFan can use
fast, direct memory access instead of dictionary-style lookups.

The result is code that runs nearly as fast as hand-written C++, generated
automatically from your JavaScript.

### What This Means in Practice

Consider a Node.js server that handles HTTP requests:

```javascript
function processRequest(req) {
  const userId = parseInt(req.params.id);
  const user = lookupUser(userId);
  return formatResponse(user);
}
```

When the server starts and handles its first few requests, `processRequest`
runs as interpreted bytecode. It works, but each call pays the overhead of
interpretation: decoding each bytecode instruction, checking types at every
step, looking up properties through the general-purpose path.

After roughly a hundred or so calls (the exact threshold is an internal
heuristic that V8 adjusts dynamically), V8 decides this function is hot. It
pauses to compile an optimized version: `userId` is always a number, `req`
always has the same shape, `lookupUser` always returns the same kind of
object. The optimized machine code skips all the checks that the profiling
data says are unnecessary.

From that point on, every subsequent request runs through the optimized
path. This is why server benchmarks show dramatically different throughput
in the first few seconds versus steady-state performance, and why "warming
up" a JavaScript process before benchmarking is important.

### When Assumptions Go Wrong: Deoptimization

There is a catch. Those speculative assumptions TurboFan makes? They might
be wrong.

Consider a function that adds two values:

```javascript
function add(a, b) {
  return a + b;
}
```

If this function is called thousands of times with numbers, TurboFan will
compile it with the assumption that `a` and `b` are always numbers. The
optimized machine code will use fast numeric addition, skipping all the
type checks JavaScript normally requires.

But then this happens:

```javascript
add("hello", " world");
```

Suddenly the assumption is violated. The `+` operator needs to perform
string concatenation, not numeric addition. The optimized machine code
cannot handle this case.

When this happens, V8 **deoptimizes**: it throws away the optimized machine
code and falls back to the Ignition bytecode, which handles all types
correctly. The profiling data is updated, and if the function becomes hot
again, TurboFan will try once more, this time with better assumptions that
account for both numbers and strings.

This is not a failure. It is the system working as designed. JIT
compilation is a bet: "I think this code behaves a certain way, so I will
optimize for that." Most of the time, the bet pays off. When it does not,
the engine recovers gracefully.

:::warning Helping the Engine Help You
While you should never contort your code purely for engine optimization,
there is a general principle worth knowing: **consistent types help the
engine produce faster code**. If a function always receives numbers, the
engine can optimize aggressively. If the same function sometimes receives
numbers, sometimes strings, and occasionally objects, the engine has to be
more conservative, or it will keep deoptimizing and recompiling.

Similarly, creating objects with consistent shapes (the same properties
added in the same order) allows V8 to use optimized internal
representations called **hidden classes**. Adding properties to objects in
unpredictable orders, or deleting properties with `delete`, forces V8
into slower dictionary-mode representations.

Writing code with stable, predictable types and shapes is good for
readability *and* performance.
:::

## The Engine vs. The Runtime

So far we have focused on the engine: how it parses, compiles, and executes
your JavaScript. But the engine is only one piece of a larger system.

The distinction between **engine** and **runtime** is one of the most
important concepts in understanding how JavaScript works, and it is
frequently blurred:

- The **engine** is responsible for the JavaScript language itself. It
  parses your source code, manages memory (allocation and garbage
  collection), compiles and optimizes your code, and executes it. V8,
  SpiderMonkey, and JavaScriptCore are engines. They know about variables,
  functions, objects, prototypes, closures, and all the other language
  features defined in the ECMAScript specification. They know nothing about
  files, networks, HTTP, or the DOM.

- The **runtime** is the complete environment in which your JavaScript
  runs. It *embeds* an engine, and then wraps it with platform-specific
  APIs, a module system, a threading model, and an event loop. Chrome,
  Node.js, Deno, and Bun are runtimes.

Think of it this way: the engine is a library. The runtime is the
application that uses that library. V8 by itself cannot start a server or
read a file. Node.js can, because it provides APIs for those operations on
top of V8.

When you call `setTimeout(callback, 1000)`, you are not calling a
JavaScript language feature. You are calling an API provided by the
runtime. The engine has no concept of timers. The runtime implements the
timer, tracks the delay, and tells the engine to execute your callback when
the time is up.

|                      | Engine                          | Runtime                         |
|----------------------|---------------------------------|---------------------------------|
| **Examples**         | V8, SpiderMonkey, JavaScriptCore | Node.js, Deno, Bun, Chrome     |
| **Responsible for**  | Parsing, compilation, execution, memory management, garbage collection | Platform APIs (fs, net, DOM, fetch), event loop, thread pool, module resolution |
| **Knows about**      | The JavaScript language (ECMAScript spec): variables, functions, objects, prototypes, closures, scope | Files, network, HTTP, timers, DOM, user events |
| **Does not know**    | Files, network, DOM, timers     | Language internals (parsing, type system, scope rules) |

### The Runtime Landscape

For a long time, there were only two kinds of JavaScript runtimes: browsers
and Node.js. Today, the landscape is richer.

- **Node.js** (2009) embeds V8 and pairs it with **libuv**, a C library
  that provides asynchronous I/O, a thread pool, and the event loop. It
  uses CommonJS modules by default (`require` / `module.exports`), though
  it now supports ES Modules as well. Node.js has the largest ecosystem
  (npm), the most production deployments, and the most learning resources.
  The tradeoff is ecosystem friction: deeply nested dependency trees,
  bloated `node_modules` directories, and a history of security
  vulnerabilities in transitive dependencies.

- **Deno** (2020) was created by Ryan Dahl, Node's original author, to
  address what he saw as Node's design mistakes. It also embeds V8, but
  is secure by default (no file or network access unless explicitly
  granted), supports TypeScript out of the box, and uses ES Modules as
  the standard. Deno has strong Node.js compatibility and its own package
  registry (JSR), though its ecosystem is smaller.

- **Bun** (2022) embeds **JavaScriptCore** instead of V8 and focuses on
  raw speed. It is an all-in-one toolkit (runtime, bundler, test runner,
  package manager) and is dramatically faster than Node for startup and
  package installation. As the youngest runtime, it is the least
  battle-tested in production.

All three follow the same fundamental architecture: a JavaScript engine
wrapped in platform APIs and an event loop. The JavaScript you write is
the same language across all of them, and your skills transfer completely.
Node.js remains the safe default for production; Deno and Bun are
increasingly viable for new projects.

## Single-Threaded Does Not Mean Single-Process

You will hear this phrase constantly: "JavaScript is single-threaded." It
is one of the most important facts about the language, and also one of the
most misunderstood.

Here is what it means, precisely: **your JavaScript code runs on a single
thread**. At any given moment, the engine is executing exactly one piece of
your code. There is no parallel execution of JavaScript statements, no two
functions running at the same time, no simultaneous access to shared
variables.

When a function is called, it goes on the stack. When it returns, it comes
off. The next line runs only after the current line finishes. Everything
happens in sequence, one thing after another, top to bottom, start to
finish.

But the *runtime* is not single-threaded. Not even close.

### How Many Threads Does JavaScript Actually Use?

A Node.js process typically uses **multiple threads** behind the scenes,
even though your JavaScript code only runs on one of them:

- **The main thread** runs the event loop and executes all your JavaScript.
  This is the single thread everyone talks about.
- **The libuv thread pool** (4 threads by default, configurable up to 1024
  via `UV_THREADPOOL_SIZE`) handles operations that do not have native
  async OS support, like file system reads, DNS lookups, and some
  cryptographic operations.
- **V8 helper threads** perform garbage collection, bytecode compilation,
  and JIT optimization in the background, so these tasks do not stall your
  JavaScript.

When you call `fs.readFile()`, the work is dispatched to one of libuv's
threads. When you make an HTTP request with `fetch`, the runtime uses the
operating system's native async networking (epoll on Linux, kqueue on
macOS), which requires no threads at all. When V8 needs to compile a hot
function with TurboFan, it does so on a background thread without pausing
your code.

Your JavaScript is single-threaded. Your JavaScript *process* is not.

```
┌─────────────────────────────────────────────────────────────────┐
│                 THREADS IN A NODE.JS PROCESS                    │
│                                                                 │
│   Main Thread                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Event Loop + JavaScript Execution                      │   │
│   │  (your code runs here, one thing at a time)             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   libuv Thread Pool (default: 4 threads)                        │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│   │ File I/O   │ │ DNS lookup │ │ Crypto ops │ │ Available  │  │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│                                                                 │
│   V8 Background Threads                                         │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│   │ GC (garbage  │ │ JIT compile  │ │ Bytecode     │           │
│   │  collection) │ │ (TurboFan)   │ │ compile      │           │
│   └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│   OS-Level Async (no threads needed)                            │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Network I/O (TCP, HTTP, WebSockets)                    │   │
│   │  Handled by the OS kernel (epoll / kqueue / IOCP)       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### What the Main Thread Actually Does

This architecture reveals something important about what the main thread's
role truly is. In a well-designed JavaScript application, the main thread
spends most of its time **coordinating**, not computing. It says:

- "Read this file" (dispatched to the thread pool)
- "Send this HTTP request" (dispatched to the OS)
- "Query this database" (dispatched over the network)

Then, when results come back, the main thread processes them: parses the
response, transforms the data, decides what to do next, and dispatches more
work. The actual I/O happens elsewhere. The JavaScript thread is the
*orchestrator*, not the worker.

This is why Node.js can handle thousands of concurrent connections with
a single JavaScript thread. Each connection is mostly I/O: waiting for a
database query to return, waiting for a file to be read, waiting for
a response from an external API. The main thread registers each operation,
moves on to the next one, and comes back when results are ready. It never
sits idle waiting for a single operation to finish (unless you tell it to).

### I/O-Bound vs. CPU-Bound

Understanding the threading model reveals where JavaScript excels and
where it struggles. The critical question is: **who is doing the actual
work?**

For **I/O-heavy workloads** (thousands of concurrent database queries,
API calls, file reads), JavaScript shines. Each request comes in, the
main thread dispatches the actual work elsewhere (to the OS, the database,
the thread pool), and moves on to the next request. The main thread
handles each request in microseconds. When responses come back, it
processes them and sends replies. This is why Node.js can comfortably
handle tens of thousands of concurrent connections with a single
JavaScript thread.

For **CPU-heavy workloads** (image processing, video encoding, complex
algorithms), the picture changes. CPU-intensive code running on the main
thread blocks everything: no other request is handled until the
computation finishes. A hundred concurrent image-resize requests would
queue up, and response times would become abysmal.

JavaScript is not helpless here. For moderate CPU work (generating a PDF,
resizing a single image), **Worker Threads** provide true parallelism:
each worker gets its own V8 instance on a separate OS thread, so
computation does not block the main thread. **Child processes**, **job
queues** (like BullMQ), and **native C++ bindings** are other
battle-tested strategies for offloading heavy work. Many production
systems use Node.js for the HTTP layer and I/O orchestration while
delegating compute-heavy tasks to specialized services or native code.

But for sustained, high-volume computation at scale (real-time video
encoding, ML training, processing thousands of images per minute),
JavaScript hits a ceiling. Worker Threads help, but each worker is still
running JavaScript through V8, which will not match the raw throughput of
C++, Rust, or Go. For workloads that are *primarily* CPU-bound, those
languages handle concurrency more naturally, because they were designed
for it.

:::tip The Rule of Thumb
If your main thread spends most of its time *waiting* (for databases,
APIs, file reads), JavaScript's async model handles concurrency
beautifully. If it spends most of its time *computing*, move that work
off the main thread with Worker Threads or child processes. For heavy,
sustained compute at scale, consider native extensions or dedicated
services in a language designed for raw throughput.
:::

## JavaScript in Context

It is worth stepping back and comparing JavaScript's execution model to
other languages, not to declare winners, but to understand the tradeoffs
that shaped the language.

**Java** uses a similar JIT-compilation strategy (the JVM compiles bytecode
to machine code at runtime), but it supports true multithreading: multiple
threads can run Java code simultaneously, sharing memory and coordinating
via locks and concurrent data structures. This gives Java raw throughput
advantages for CPU-heavy workloads, but it also introduces an entire class
of bugs (race conditions, deadlocks) that JavaScript developers never
encounter.

**Python** is closer to JavaScript in some ways: it is dynamically typed,
interpreted (though PyPy offers JIT compilation), and has a Global
Interpreter Lock (GIL) that prevents true parallel execution of Python
code, similar in spirit to JavaScript's single-threaded constraint. Python
uses multiprocessing (separate OS processes) to achieve parallelism, much
like Node.js uses the `cluster` module.

**Go** compiles ahead of time to native machine code and uses lightweight
**goroutines** for concurrency: thousands of concurrent tasks multiplexed
across a small number of OS threads, with a built-in scheduler. Go's
model is arguably the most elegant for highly concurrent servers, because
you write straightforward sequential code and the runtime handles the
scheduling transparently.

**C and Rust** compile ahead of time with no runtime overhead. They give
you maximum performance and full control over memory and threading, but
they demand much more from the developer. There is no garbage collector to
clean up after you, no JIT to optimize your hot paths, and no event loop
to manage concurrency.

JavaScript's design philosophy becomes clear in this context: **prioritize
developer experience and fast startup over raw throughput.** The
single-threaded model eliminates an entire category of concurrency bugs.
The JIT compiler provides good-enough performance without requiring a
separate build step. The async I/O model handles concurrent workloads
efficiently for the common case (I/O-heavy applications) while acknowledging
that CPU-heavy work needs different tools.

This is not a weakness. It is a conscious tradeoff, and it is the reason
JavaScript is one of the most widely used languages in the world. The model
is simple enough for beginners to be productive quickly, and powerful enough
for companies to build massive applications on top of it.

## Key Takeaways

1. **JavaScript is a JIT-compiled language.** Modern engines interpret
   first for fast startup, then compile hot code to optimized machine
   code for fast execution.

2. **Source code goes through a multi-stage pipeline.** Lexing breaks text
   into tokens, parsing builds an AST, and bytecode generation produces
   executable instructions.

3. **The engine and the runtime are different things.** The engine handles
   the language. The runtime embeds the engine and provides platform APIs,
   threading, and the event loop.

4. **Your JavaScript is single-threaded. Your process is not.** The main
   thread runs your code and orchestrates I/O. Background threads handle
   file operations, garbage collection, and JIT compilation. The OS kernel
   handles network I/O asynchronously.

5. **JavaScript excels at I/O-bound concurrency.** CPU-bound work should
   be offloaded to Worker Threads, child processes, or native extensions.

6. **Consistent types and object shapes help the JIT compiler.** Stable,
   predictable code enables aggressive optimization. Mixed types force
   the engine to be conservative.

## Looking Ahead

We have traced the big picture: from source text through the compilation
pipeline to running program, and from the engine's internals to the
runtime's threading model.

But what happens at the moment a function is actually called? What data
structures does the engine create, and how do they determine which
variables are visible, what `this` refers to, and why some declarations
seem to exist before their code has run? The next article dives into the
**execution context**, the hidden environment the engine builds every time
your code runs.
