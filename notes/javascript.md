# JavaScript Deep Dive - Section Outline

## Section Goal

Take the reader from a working knowledge of JavaScript to a deep, mechanistic understanding of how the language actually operates. This is not a syntax guide or an MDN summary. Every topic is explored from the engine's perspective: what happens in memory, what the spec defines, what V8 (or any engine) actually does when your code runs. By the end, the reader should be able to predict JavaScript's behavior in any situation, because they understand the rules the engine follows.

This section pairs naturally with the Fundamentals section. Where Fundamentals covers how computers work in general (compilation, interpretation, memory, concurrency), this section answers: *how does JavaScript, specifically, implement all of that?*

---

## File Structure

All files live in:
```
docs/technical-knowledge/javascript/
```

The section is divided into five sub-categories that follow a natural progression:

### I. The Engine & Execution Model

How JavaScript code actually runs, from source text to executing instructions and cleaning up after itself.

| Order | Filename | Sidebar Label |
|-------|----------|---------------|
| 1 | `how-javascript-runs.md` | How JavaScript Runs |
| 2 | `execution-context.md` | Execution Context |
| 3 | `the-call-stack.md` | The Call Stack |
| 4 | `memory-and-garbage-collection.md` | Memory & Garbage Collection |

### II. Types & Operations

JavaScript's type system and the rules that govern how values interact.

| Order | Filename | Sidebar Label |
|-------|----------|---------------|
| 5 | `types-and-values.md` | Types & Values |
| 6 | `coercion.md` | Coercion |
| 7 | `equality-and-comparison.md` | Equality & Comparison |

### III. Scope & Functions

How the engine resolves variable names, how functions really work, and how code is organized into modules.

| Order | Filename | Sidebar Label |
|-------|----------|---------------|
| 8 | `scope-and-lexical-environment.md` | Scope & Lexical Environment |
| 9 | `hoisting-and-the-tdz.md` | Hoisting & the TDZ |
| 10 | `closures.md` | Closures |
| 11 | `function-forms.md` | Function Forms |
| 12 | `higher-order-functions-and-callbacks.md` | Higher-Order Functions & Callbacks |
| 13 | `modules.md` | Modules |

### IV. Objects & Inheritance

How JavaScript models data, achieves code reuse, and exposes its internal mechanisms.

| Order | Filename | Sidebar Label |
|-------|----------|---------------|
| 14 | `objects-and-properties.md` | Objects & Properties |
| 15 | `the-this-keyword.md` | The `this` Keyword |
| 16 | `prototypes.md` | Prototypes |
| 17 | `classes-and-factory-functions.md` | Classes & Factory Functions |
| 18 | `proxy-and-reflect.md` | Proxy & Reflect |

### V. Asynchronous JavaScript

How a single-threaded language handles concurrency, from low-level event loop mechanics to modern async patterns.

| Order | Filename | Sidebar Label |
|-------|----------|---------------|
| 19 | `the-event-loop.md` | The Event Loop |
| 20 | `promises.md` | Promises |
| 21 | `async-await.md` | Async / Await |
| 22 | `generators-and-iterators.md` | Generators & Iterators |

---

## Sidebar Configuration

Update `sidebars.js` to include:

```js
javascriptSidebar: [
  {
    type: 'doc',
    id: 'technical-knowledge/javascript/index',
    label: 'JavaScript Overview',
  },
  {
    type: 'category',
    label: 'The Engine & Execution Model',
    collapsed: false,
    items: [
      'technical-knowledge/javascript/how-javascript-runs',
      'technical-knowledge/javascript/execution-context',
      'technical-knowledge/javascript/the-call-stack',
      'technical-knowledge/javascript/memory-and-garbage-collection',
    ],
  },
  {
    type: 'category',
    label: 'Types & Operations',
    collapsed: false,
    items: [
      'technical-knowledge/javascript/types-and-values',
      'technical-knowledge/javascript/coercion',
      'technical-knowledge/javascript/equality-and-comparison',
    ],
  },
  {
    type: 'category',
    label: 'Scope & Functions',
    collapsed: false,
    items: [
      'technical-knowledge/javascript/scope-and-lexical-environment',
      'technical-knowledge/javascript/hoisting-and-the-tdz',
      'technical-knowledge/javascript/closures',
      'technical-knowledge/javascript/function-forms',
      'technical-knowledge/javascript/higher-order-functions-and-callbacks',
      'technical-knowledge/javascript/modules',
    ],
  },
  {
    type: 'category',
    label: 'Objects & Inheritance',
    collapsed: false,
    items: [
      'technical-knowledge/javascript/objects-and-properties',
      'technical-knowledge/javascript/the-this-keyword',
      'technical-knowledge/javascript/prototypes',
      'technical-knowledge/javascript/classes-and-factory-functions',
      'technical-knowledge/javascript/proxy-and-reflect',
    ],
  },
  {
    type: 'category',
    label: 'Asynchronous JavaScript',
    collapsed: false,
    items: [
      'technical-knowledge/javascript/the-event-loop',
      'technical-knowledge/javascript/promises',
      'technical-knowledge/javascript/async-await',
      'technical-knowledge/javascript/generators-and-iterators',
    ],
  },
],
```

---

## File-by-File Breakdown

### I. The Engine & Execution Model

#### `how-javascript-runs.md` — How JavaScript Runs

**Goal:** Establish the mental model for everything that follows. Explain what happens between writing `const x = 5` and the CPU actually doing something.

**Topics:**
- JavaScript as a high-level, interpreted/JIT-compiled language
- The role of the JavaScript engine (V8, SpiderMonkey, JavaScriptCore)
- The compilation pipeline in V8:
  - Source code to tokens (lexing)
  - Tokens to AST (parsing)
  - AST to bytecode (Ignition, V8's interpreter)
  - Hot code paths to optimized machine code (TurboFan, V8's JIT compiler)
  - Deoptimization: when optimized code makes wrong assumptions
- What "single-threaded" really means
- The runtime environment: engine + Web APIs (or Node APIs) + event loop
- Why understanding this pipeline matters for writing performant code
- Connection to Fundamentals: how this relates to the compilation and interpretation articles

---

#### `execution-context.md` — Execution Context

**Goal:** Explain the data structure the engine creates every time code runs. This is the foundation for understanding scope, `this`, and hoisting.

**Topics:**
- What is an execution context? (The environment in which code is evaluated)
- The three types:
  - Global Execution Context (created once, on startup)
  - Function Execution Context (created on every function call)
  - Eval Execution Context (brief mention)
- The two phases of creation:
  - **Creation phase:** setting up the Lexical Environment, Variable Environment, and `this` binding
  - **Execution phase:** running the code line by line
- The Lexical Environment:
  - Environment Record (where variables live)
  - Outer Environment Reference (the chain that enables scope)
- The Variable Environment (why `var` behaves differently from `let`/`const`)
- The `this` binding (brief intro, full treatment in article 15)
- How the creation phase explains "hoisting" (preview, full treatment in article 9)
- Visualizing execution contexts as stack frames

---

#### `the-call-stack.md` — The Call Stack

**Goal:** Show how the engine manages nested function calls using execution contexts and the call stack.

**Topics:**
- The call stack as a LIFO data structure (connection to Fundamentals: stack & heap)
- Pushing and popping execution contexts
- Tracing through a multi-function example step by step
- What a stack frame contains in practice
- Stack overflow: what happens when the stack runs out of space
- The call stack and debugging:
  - Reading stack traces
  - The `console.trace()` method
  - DevTools call stack panel
- Error propagation and the call stack:
  - How thrown errors unwind the stack
  - `try`/`catch`/`finally` mechanics
  - The Error object hierarchy (`Error`, `TypeError`, `RangeError`, `SyntaxError`, etc.)
  - Custom error classes (extending `Error`)
  - Why stack traces are attached to where the error is *created*, not where it's caught
- Why the call stack matters for async (preview): one stack, one thread, blocking calls freeze everything
- Connection to the event loop (forward reference to article 19)

---

#### `memory-and-garbage-collection.md` — Memory & Garbage Collection

**Goal:** Explain how JavaScript manages memory automatically, what the garbage collector actually does, and how to avoid the common patterns that defeat it.

**Topics:**
- The memory lifecycle: allocate, use, release
  - JavaScript handles allocation and release automatically
  - The developer's role: understanding what keeps memory alive
- How V8 organizes memory:
  - The heap: where objects, strings, and closures live
  - Young generation vs old generation (generational hypothesis: most objects die young)
  - Large object space, code space, and other V8-specific regions
- The garbage collection algorithms:
  - **Scavenger (minor GC):** fast collection of the young generation
    - Semi-space copying: from-space and to-space
    - Objects that survive get promoted to old generation
  - **Mark-Sweep and Mark-Compact (major GC):** collecting the old generation
    - Marking: tracing from GC roots (global object, stack, handles)
    - Sweeping: reclaiming unmarked memory
    - Compacting: defragmenting to reduce memory overhead
  - Incremental and concurrent collection: avoiding long pauses
- What counts as a GC root:
  - Global variables
  - The current call stack (local variables, parameters)
  - Closures that are still reachable
- Reachability: the core concept
  - An object is alive if it can be reached from any root
  - When no path exists from any root, the object is eligible for collection
- Common memory leak patterns in JavaScript:
  - Accidental globals (forgetting `let`/`const` in sloppy mode)
  - Forgotten timers and intervals (`setInterval` without `clearInterval`)
  - Closures capturing more than intended
  - Detached DOM nodes (removed from the tree but still referenced)
  - Event listeners not cleaned up
  - Growing data structures (caches, maps, arrays) without bounds
- Weak references and the GC:
  - `WeakMap` and `WeakSet`: keys/values don't prevent collection
    - Why WeakMap keys must be objects
    - Use case: associating metadata with objects without preventing cleanup
  - `WeakRef`: holding a reference that doesn't prevent collection
  - `FinalizationRegistry`: running cleanup callbacks when objects are collected
  - Why these exist: solving the "leak by association" problem
- Diagnosing memory issues:
  - DevTools Memory panel: heap snapshots and allocation timelines
  - Identifying retained objects and retainer chains
- Connection to Fundamentals: how this relates to the memory management article

---

### II. Types & Operations

#### `types-and-values.md` — Types & Values

**Goal:** Explain JavaScript's type system as the engine sees it, not as a syntax reference. Understand the distinction between primitives and objects at the memory level.

**Topics:**
- The seven primitive types: `undefined`, `null`, `boolean`, `number`, `string`, `symbol`, `bigint`
- The object type (everything that isn't a primitive)
- Primitives vs objects: value semantics vs reference semantics
  - How primitives are stored (directly in the variable, on the stack or inline)
  - How objects are stored (reference to heap-allocated memory)
  - Why `typeof null === 'object'` (the historic bug)
- Numbers in JavaScript:
  - IEEE 754 double-precision floating-point (connection to Fundamentals: representing numbers)
  - Why `0.1 + 0.2 !== 0.3`
  - Safe integer range and `Number.MAX_SAFE_INTEGER`
  - `BigInt` for arbitrary-precision integers
- Strings as immutable sequences of UTF-16 code units
  - Why `'hello'.length` might not match character count
  - String interning and memory optimization
- The `typeof` operator: what it reveals and where it lies
- Primitive wrapper objects: why `'hello'.toUpperCase()` works
  - Auto-boxing: the engine temporarily wraps the primitive
  - Why you should never use `new String()`, `new Number()`, etc.
- `undefined` vs `null`: two kinds of "nothing"
- `Symbol`: unique, unforgeable identifiers
  - Well-known Symbols (`Symbol.iterator`, `Symbol.toPrimitive`)

---

#### `coercion.md` — Coercion

**Goal:** Demystify JavaScript's type conversion rules. Not "coercion is bad," but "here is exactly what happens, and when it's useful."

**Topics:**
- What is coercion? (Implicit type conversion by the engine)
- The abstract operations (the spec's internal algorithms):
  - `ToPrimitive`: how objects become primitives
    - `[Symbol.toPrimitive]`, `valueOf()`, `toString()` and the hint system
  - `ToNumber`: the conversion table (strings, booleans, null, undefined, objects)
  - `ToString`: the conversion table
  - `ToBoolean`: truthy and falsy values (the complete list)
- String coercion:
  - The `+` operator with strings (concatenation vs addition)
  - Template literals and `ToString`
- Numeric coercion:
  - Arithmetic operators (`-`, `*`, `/`, `%`)
  - Unary `+` as a shorthand for `Number()`
  - Comparison operators (`<`, `>`, `<=`, `>=`)
- Boolean coercion:
  - `if`, `while`, `for`, ternary, logical operators
  - The eight falsy values
  - `!!` as explicit boolean conversion
- Explicit vs implicit coercion:
  - When implicit coercion is actually readable (e.g., `if (str.length)`)
  - When it creates confusion (e.g., `[] + {}`)
- Common gotchas and how to predict them:
  - `[] + []`, `[] + {}`, `{} + []`
  - `null >= 0` but `null > 0` is false and `null == 0` is false
  - `NaN !== NaN` and how to check for it

---

#### `equality-and-comparison.md` — Equality & Comparison

**Goal:** Explain the exact algorithms behind `==`, `===`, and `Object.is()` so the reader can predict any comparison result.

**Topics:**
- Strict equality (`===`):
  - The algorithm: same type, then same value
  - Special cases: `NaN !== NaN`, `+0 === -0`
- Loose equality (`==`):
  - The full algorithm from the spec (step by step)
  - When types match: behaves like `===`
  - `null == undefined` (and nothing else)
  - Number vs string: string is coerced to number
  - Boolean vs anything: boolean is coerced to number first
  - Object vs primitive: `ToPrimitive` is called
  - The complete coercion flowchart
- `Object.is()`:
  - Handles the two cases `===` gets wrong: `NaN` and `+0`/`-0`
  - When to use it
- Relational comparison (`<`, `>`, `<=`, `>=`):
  - The Abstract Relational Comparison algorithm
  - String comparison: lexicographic, by code unit value
  - Numeric comparison after coercion
- Practical guidance:
  - Use `===` by default
  - The two cases where `==` is genuinely useful (`null` checks)
  - Why understanding `==` matters even if you avoid it

---

### III. Scope & Functions

#### `scope-and-lexical-environment.md` — Scope & Lexical Environment

**Goal:** Explain how the engine resolves variable names. Scope is not a runtime search; it is determined at parse time by the structure of the code.

**Topics:**
- What is scope? (The set of rules for looking up variables by name)
- Lexical scope: scope is determined by where code is *written*, not where it's called
- The three scope levels:
  - Global scope
  - Function scope
  - Block scope (`let`, `const`, and `{}`)
- The scope chain:
  - How it maps to the Outer Environment Reference in execution contexts
  - Variable lookup walks the chain outward until found (or ReferenceError)
- `var` vs `let` vs `const`:
  - `var`: function-scoped, added to the Variable Environment
  - `let`/`const`: block-scoped, added to the Lexical Environment
  - Why `const` doesn't mean immutable (for objects)
- Global scope pollution and why it matters
- Visualizing the scope chain with nested functions
- Brief forward reference: modules as the ultimate scope boundary (article 13)

---

#### `hoisting-and-the-tdz.md` — Hoisting & the TDZ

**Goal:** Explain hoisting not as "variables move to the top" (which is misleading) but as a consequence of the creation phase of execution contexts.

**Topics:**
- The myth: "declarations are moved to the top of the scope"
- The reality: during the creation phase, declarations are registered in the environment
- Function declarations:
  - Fully hoisted (both the name and the function body)
  - Why you can call a function before its declaration
- `var` declarations:
  - The name is hoisted, initialized to `undefined`
  - The assignment stays in place
  - Common bugs from `var` hoisting
- `let` and `const` declarations:
  - The name is hoisted, but **not initialized**
  - The Temporal Dead Zone (TDZ): the region between scope entry and the declaration
  - Accessing a variable in the TDZ throws `ReferenceError`
  - Why the TDZ exists (preventing use of uninitialized variables)
- Function expressions and arrow functions:
  - These follow the rules of the variable they're assigned to (`var`, `let`, or `const`)
  - Why `const myFunc = () => {}` is not hoisted the same way as `function myFunc() {}`
- Class declarations:
  - Hoisted like `let` (TDZ applies)
- Practical implications:
  - Why `let`/`const` are safer than `var`
  - Why function declarations are sometimes preferable to expressions (hoisting as a feature)

---

#### `closures.md` — Closures

**Goal:** Explain closures as a natural consequence of lexical scope and execution contexts, not as an exotic trick.

**Topics:**
- The setup: what happens when a function is created?
  - The function object stores a reference to its **creation-time** Lexical Environment
  - This is the `[[Environment]]` internal slot
- What is a closure?
  - A function that "remembers" variables from its outer scope, even after that scope has exited
  - The Lexical Environment is kept alive as long as the function references it
- Step-by-step walkthrough: tracing a closure through the call stack
  - Function is created inside another function
  - Outer function returns, its execution context is popped
  - Inner function still holds a reference to the outer Lexical Environment
  - The garbage collector cannot collect it (something still points to it)
- Classic examples:
  - Counter factory: `makeCounter()`
  - Private variables: data hiding without classes
  - The `for` loop trap with `var` (and why `let` fixes it)
- Closures and memory:
  - What gets retained and what doesn't
  - Potential memory leaks from unintended closures (connection to article 4)
  - How V8 optimizes closure scope (only retaining used variables)
- Closures in practice:
  - Event handlers and callbacks
  - Partial application and currying
  - Module pattern (before ES modules)
- Connection to functional programming patterns

---

#### `function-forms.md` — Function Forms

**Goal:** Explain the different ways to define a function and how they differ at the engine level. Pure mechanics: what each form gives you and what it doesn't.

**Topics:**
- Functions as first-class objects:
  - Functions are objects with a `[[Call]]` internal method
  - They have properties (`name`, `length`, `prototype`)
  - They can be assigned to variables, passed as arguments, returned
- The four ways to define a function:
  - Function declaration (`function foo() {}`)
  - Function expression (`const foo = function() {}`)
  - Arrow function (`const foo = () => {}`)
  - Method shorthand (`{ foo() {} }`)
- How each form differs:
  - Hoisting behavior (recap from article 9)
  - `this` binding (arrow functions don't have their own `this`; preview of article 15)
  - `arguments` object (arrow functions don't have one)
  - `prototype` property (arrow functions don't have one)
  - Whether they can be used as constructors (`new`)
- Arrow functions in depth:
  - Lexical `this` (inherits from enclosing scope)
  - Lexical `arguments`
  - Concise syntax and implicit return
  - When to use arrow functions vs regular functions
- The `arguments` object:
  - Array-like but not an array
  - Why rest parameters (`...args`) are preferred
- Default parameters, rest parameters, and destructuring in function signatures
- IIFE (Immediately Invoked Function Expression):
  - What it is and why it existed (scope isolation before modules)
  - Why it's mostly obsolete now (forward reference to article 13)

---

#### `higher-order-functions-and-callbacks.md` — Higher-Order Functions & Callbacks

**Goal:** Explain the patterns that emerge from functions being first-class: higher-order functions for abstraction, and callbacks as the foundation of asynchronous JavaScript.

**Topics:**
- What are higher-order functions?
  - Functions that accept functions as arguments
  - Functions that return functions
  - Why this pattern is so powerful (abstraction, composition, reuse)
- Synchronous higher-order functions:
  - Array methods: `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`
  - How `reduce` works step by step (accumulator pattern)
  - Writing your own: `memoize`, `debounce`, `throttle`
  - Composition: `pipe` and `compose`
- The callback pattern:
  - A function passed to another function to be called later
  - Synchronous callbacks (e.g., `Array.prototype.sort` comparator)
  - Asynchronous callbacks (e.g., `setTimeout`, event listeners)
  - The "continuation" idea: "when you're done, call this function"
- Real-world callback APIs:
  - `setTimeout` / `setInterval`
  - DOM event listeners (`addEventListener`)
  - Node.js error-first callback convention: `(error, result) => {}`
  - Node.js `fs.readFile` (callback version)
- Problems with the async callback pattern:
  - Callback hell / pyramid of doom (deeply nested code)
  - Inversion of control (you hand control to someone else)
  - Error handling is manual and error-prone
  - Difficult to compose or sequence
- Why these problems motivated Promises (bridge to article 20)

---

#### `modules.md` — Modules

**Goal:** Explain how JavaScript code is organized into isolated, reusable units, and how the two major module systems differ at the engine level.

**Topics:**
- The problem: why we need modules
  - Global scope pollution in early JavaScript (everything shared one namespace)
  - The IIFE and module pattern as early workarounds (callback to article 11)
  - The need for a language-level solution
- CommonJS (Node.js modules):
  - `require()` and `module.exports`
  - Synchronous, runtime loading: `require` is a function call that runs when reached
  - Each module is wrapped in a function (the module wrapper)
  - Modules are cached after first load (`require.cache`)
  - Circular dependencies: partially loaded exports
  - Why CommonJS works well for servers but not browsers (synchronous loading)
- ES Modules (the language standard):
  - `import` and `export` syntax
  - Static structure: imports and exports are determined at parse time, not runtime
  - **Live bindings**, not copies: imported values reflect changes in the exporting module
  - The three phases of module loading:
    1. **Construction:** parsing, building the module graph, resolving specifiers
    2. **Instantiation:** allocating memory for exports, linking imports to exports
    3. **Evaluation:** running module code top-to-bottom
  - Modules are singletons (evaluated once, cached forever)
  - Modules are always in strict mode
  - Top-level `this` is `undefined` (not the global object)
- Key differences between CommonJS and ES Modules:
  - Static vs dynamic structure
  - Live bindings vs value copies
  - Synchronous vs asynchronous loading
  - `this` behavior (`module` object vs `undefined`)
- Dynamic `import()`:
  - Returns a Promise (connection to article 20)
  - Enables code splitting and lazy loading
  - When to use static `import` vs dynamic `import()`
- Named exports vs default exports:
  - Named: explicit, multiple per module, better for tree shaking
  - Default: one per module, convenient for primary exports
  - Why named exports are generally preferred
- Tree shaking:
  - How static analysis of ES Module imports enables dead code elimination
  - Why CommonJS modules can't be tree-shaken effectively
- Module resolution:
  - How Node.js resolves module specifiers (file extensions, `node_modules`, `package.json`)
  - How browsers resolve modules (URLs, import maps)
- Practical guidance:
  - Use ES Modules for new code
  - Understanding CommonJS for working with the Node.js ecosystem
  - Module design: what to export, how to structure boundaries

---

### IV. Objects & Inheritance

#### `objects-and-properties.md` — Objects & Properties

**Goal:** Explain objects as the engine sees them: collections of properties with descriptors, not just key-value bags.

**Topics:**
- Objects as dynamic collections of properties
- Property access: dot notation vs bracket notation
  - When bracket notation is required (computed keys, special characters)
- Property descriptors: every property has metadata
  - Data descriptors: `value`, `writable`, `enumerable`, `configurable`
  - Accessor descriptors: `get`, `set`, `enumerable`, `configurable`
  - `Object.getOwnPropertyDescriptor()` and `Object.defineProperty()`
- Creating objects:
  - Object literals (`{}`)
  - `Object.create()` (creating with a specific prototype)
  - Constructor functions (connection to prototypes, article 16)
- Property enumeration:
  - `for...in` (own + inherited enumerable properties)
  - `Object.keys()` (own enumerable string keys)
  - `Object.getOwnPropertyNames()` (own string keys, including non-enumerable)
  - `Object.getOwnPropertySymbols()` (own symbol keys)
  - `Reflect.ownKeys()` (all own keys)
- Computed property names (`{ [expr]: value }`)
- Shorthand properties and methods
- Spread and rest with objects (`{ ...obj }`)
- Shallow copy vs deep copy:
  - `Object.assign()` and spread: shallow only
  - `structuredClone()`: deep copy
  - Why deep copy is hard (circular references, functions, special objects)
- Object immutability spectrum:
  - `Object.preventExtensions()`: no new properties
  - `Object.seal()`: no new properties, no deleting, no reconfiguring
  - `Object.freeze()`: seal + no writing values
  - These are all shallow
- How V8 represents objects internally (hidden classes / shapes):
  - Why consistent object shapes lead to faster code
  - Inline caches and monomorphic vs polymorphic access

---

#### `the-this-keyword.md` — The `this` Keyword

**Goal:** Demystify `this` by explaining the four binding rules and their priority.

**Topics:**
- What `this` is: a binding set when an execution context is created
- The fundamental insight: `this` is not determined by *where* a function is defined, but by *how* it is called
- The four rules (in order of precedence):
  1. **`new` binding:** `this` refers to the newly created object
  2. **Explicit binding:** `call()`, `apply()`, `bind()` set `this` directly
  3. **Implicit binding:** the object "before the dot" (`obj.method()`)
  4. **Default binding:** global object (sloppy mode) or `undefined` (strict mode)
- Losing `this`:
  - Extracting a method from an object (`const fn = obj.method; fn()`)
  - Passing a method as a callback
  - How to fix it: `bind()`, wrapper functions, arrow functions
- Arrow functions and `this`:
  - Arrow functions don't have their own `this`
  - They inherit `this` from the enclosing lexical scope
  - This is determined at definition time, not call time
  - Why arrow functions are ideal for callbacks but bad for methods
- `this` in event handlers:
  - DOM event listeners set `this` to the element
  - Arrow functions in event listeners inherit outer `this`
- `this` inside classes (forward reference to article 17)
- Practical decision tree: "What is `this`?"

---

#### `prototypes.md` — Prototypes

**Goal:** Explain JavaScript's actual inheritance mechanism: the prototype chain. This is the bedrock that classes are built on top of.

**Topics:**
- Every object has a prototype (accessed via `Object.getPrototypeOf()` or `__proto__`)
- The prototype chain:
  - Property lookup walks the chain: own property first, then prototype, then prototype's prototype, etc.
  - The chain ends at `Object.prototype`, whose prototype is `null`
- `Object.create()`: creating objects with explicit prototypes
  - `Object.create(null)`: an object with no prototype (truly empty)
- Constructor functions and `prototype`:
  - Functions have a `prototype` property (an object)
  - `new Foo()` creates an object whose `[[Prototype]]` is `Foo.prototype`
  - The `constructor` property and its role
- The prototype chain in action:
  - Method sharing: all instances share methods through the prototype
  - Memory efficiency: methods exist once, not per instance
  - Property shadowing: setting a property on the instance hides the prototype's version
- Inheritance via prototypes:
  - `Object.create(Parent.prototype)` for setting up the chain
  - The "classical" pattern (before ES6 classes)
- `hasOwnProperty()` vs `in`:
  - Checking own properties vs the whole chain
- How built-in prototypes work:
  - `Array.prototype.map`, `String.prototype.trim`, etc.
  - All arrays share methods through `Array.prototype`
  - Prototype chain: `[] -> Array.prototype -> Object.prototype -> null`
- Dangers of modifying built-in prototypes
- Visualizing the prototype chain (diagrams)

---

#### `classes-and-factory-functions.md` — Classes & Factory Functions

**Goal:** Show that ES6 classes are syntactic sugar over prototypes, and compare them to the factory function pattern.

**Topics:**
- ES6 class syntax:
  - `class`, `constructor`, methods
  - Under the hood: still prototype-based (class methods live on `ClassName.prototype`)
  - `typeof ClassName === 'function'`
- Class features:
  - Instance properties (in constructor or with field declarations)
  - Static methods and properties
  - Getters and setters
  - Private fields (`#field`): true encapsulation, engine-enforced
  - Static initialization blocks
- Inheritance with `extends`:
  - The `super` keyword (calling parent constructor and methods)
  - How `extends` sets up the prototype chain
  - Method overriding
- Factory functions as an alternative:
  - A regular function that returns an object
  - Closures for private state (vs `#private` fields)
  - No `new`, no `this`, no prototype chain
  - Composition over inheritance
- Comparing the two patterns:
  - Classes: familiar syntax, `instanceof` works, integrates with framework patterns
  - Factories: simpler mental model, true privacy via closures, easier composition
  - When to choose each
- The broader picture:
  - JavaScript's multi-paradigm nature
  - Classes for when you need inheritance hierarchies
  - Factories and closures for when you need composition and simplicity
  - Connection to "Abstraction & Paradigms" in Fundamentals

---

#### `proxy-and-reflect.md` — Proxy & Reflect

**Goal:** Explain JavaScript's metaprogramming primitives: how Proxy lets you intercept the language's fundamental operations, and how Reflect provides a clean API for those same operations.

**Topics:**
- What is metaprogramming?
  - Code that operates on other code's behavior
  - Intercepting and customizing fundamental operations (property access, assignment, function calls)
- The Proxy object:
  - `new Proxy(target, handler)`: wrapping an object with custom behavior
  - The target: the original object being proxied
  - The handler: an object whose methods (traps) intercept operations
- Proxy traps and their corresponding internal methods:
  - `get` / `[[Get]]`: intercepting property reads
  - `set` / `[[Set]]`: intercepting property writes
  - `has` / `[[HasProperty]]`: intercepting `in` operator
  - `deleteProperty` / `[[Delete]]`: intercepting `delete` operator
  - `apply` / `[[Call]]`: intercepting function calls (function proxies)
  - `construct` / `[[Construct]]`: intercepting `new` operator
  - `ownKeys`, `getOwnPropertyDescriptor`, `defineProperty`, `getPrototypeOf`, `setPrototypeOf`, etc.
- Proxy invariants:
  - The spec enforces consistency between trap results and the target
  - For example: `get` cannot return a different value for a non-writable, non-configurable property
  - Why these invariants exist (maintaining the integrity of object contracts)
- The Reflect API:
  - A built-in object that mirrors the Proxy traps as static methods
  - `Reflect.get()`, `Reflect.set()`, `Reflect.has()`, etc.
  - Why Reflect exists: clean, functional equivalents of operator-based operations
  - Using Reflect inside Proxy traps as the "default behavior" forwarding mechanism
- Revocable proxies:
  - `Proxy.revocable()`: creating a proxy that can be "turned off"
  - Use case: granting temporary access to an object
- Practical use cases:
  - Validation: rejecting invalid property assignments
  - Logging and debugging: tracing property access
  - Default values: returning defaults for missing properties
  - Reactive systems: how Vue 3 uses Proxy for change detection
  - Access control: restricting which properties can be read or written
  - Negative array indices: wrapping arrays to support `arr[-1]`
- Performance considerations:
  - Proxies add overhead to every intercepted operation
  - When to use Proxy vs simpler alternatives (getters/setters, classes)
- Connection to property descriptors (article 14) and the prototype chain (article 16):
  - Proxy traps intercept the same internal methods that descriptors and prototypes rely on
  - Understanding all three gives a complete picture of how property access works

---

### V. Asynchronous JavaScript

#### `the-event-loop.md` — The Event Loop

**Goal:** Explain the machinery that allows single-threaded JavaScript to handle concurrent operations. This is the most important article in the async section.

**Topics:**
- The problem: JavaScript has one thread, but the world is asynchronous
- The runtime model: three components
  - **The call stack:** where synchronous code runs (recap from article 3)
  - **Web APIs / Node APIs:** the environment provides timers, network, filesystem, DOM
  - **The task queues:** where callbacks wait to be executed
- How it works, step by step:
  1. Engine executes code on the call stack
  2. When encountering an async operation (e.g., `setTimeout`), it delegates to the environment
  3. The environment handles it (the timer counts, the network request fires)
  4. When complete, the environment places a callback on the appropriate queue
  5. The event loop checks: is the call stack empty? If yes, move the next callback from the queue to the stack
- The two types of queues:
  - **Macrotask queue** (task queue): `setTimeout`, `setInterval`, I/O, `requestAnimationFrame`
  - **Microtask queue:** `Promise.then()`, `queueMicrotask()`, `MutationObserver`
  - Microtasks run **after the current task completes, before the next macrotask**
  - The microtask queue is fully drained before moving to the next macrotask
- Tracing through examples:
  - `setTimeout(fn, 0)` vs synchronous code
  - `Promise.resolve().then(fn)` vs `setTimeout(fn, 0)`
  - Mixing promises and timeouts
  - A microtask that schedules more microtasks (can block rendering)
- Blocking the event loop:
  - Long-running synchronous code freezes everything (UI, timers, I/O)
  - Why infinite loops crash the tab
  - Strategies: chunking work, Web Workers, `requestIdleCallback`
- The event loop in Node.js:
  - libuv and its phases (timers, pending, poll, check, close)
  - `process.nextTick()` vs microtasks
  - How Node.js handles I/O differently from the browser
- Visualizing the event loop (diagrams)
- Why understanding the event loop is essential for debugging async code

---

#### `promises.md` — Promises

**Goal:** Explain Promises as a solution to the callback problems: a trustable, composable representation of a future value.

**Topics:**
- What is a Promise?
  - An object representing the eventual result of an async operation
  - Three states: **pending**, **fulfilled**, **rejected**
  - Once settled (fulfilled or rejected), a Promise never changes state
- Creating Promises:
  - The `new Promise((resolve, reject) => {})` constructor
  - The executor function runs synchronously
  - `resolve(value)` and `reject(reason)`
- Consuming Promises:
  - `.then(onFulfilled, onRejected)`: registering handlers
  - `.catch(onRejected)`: sugar for `.then(undefined, onRejected)`
  - `.finally(onSettled)`: runs regardless of outcome
- The microtask queue connection:
  - `.then()` callbacks are always asynchronous (scheduled as microtasks)
  - Even `Promise.resolve(value).then(fn)` doesn't run `fn` synchronously
  - Why this matters for execution order
- Promise chaining:
  - `.then()` returns a **new** Promise
  - The return value of the handler becomes the fulfillment value of the new Promise
  - Returning a Promise from `.then()` "unwraps" it (recursive resolution)
  - How chaining solves callback hell: flat, readable sequences
- Error handling:
  - Errors propagate down the chain until caught
  - `.catch()` at the end catches any error in the chain
  - Unhandled rejections and `unhandledrejection` event
  - Re-throwing errors in catch handlers
- Static methods:
  - `Promise.resolve()` / `Promise.reject()`: wrapping values
  - `Promise.all()`: wait for all, fail on first rejection
  - `Promise.allSettled()`: wait for all, never rejects
  - `Promise.race()`: first to settle wins
  - `Promise.any()`: first to fulfill wins
- Common patterns:
  - Sequential execution with chaining
  - Parallel execution with `Promise.all()`
  - Timeout pattern with `Promise.race()`
  - Promisifying callback-based APIs (`util.promisify` in Node.js)
- Common mistakes:
  - Forgetting to return in `.then()` chains
  - Nesting `.then()` instead of chaining
  - Not handling rejections

---

#### `async-await.md` — Async / Await

**Goal:** Show that `async`/`await` is syntactic sugar over Promises and generators, and how it transforms async code into something that reads like synchronous code.

**Topics:**
- The motivation: even Promise chains can get unwieldy for complex flows
- `async` functions:
  - Always return a Promise
  - The return value is wrapped in `Promise.resolve()`
  - A thrown error becomes a rejected Promise
- `await`:
  - Can only be used inside `async` functions (or at the top level of modules)
  - Pauses execution of the async function until the Promise settles
  - Returns the fulfilled value, or throws the rejection reason
  - Under the hood: similar to yielding from a generator
- How it works mechanically:
  - When `await` is encountered, the async function is suspended
  - Control returns to the caller (the function is "paused")
  - When the awaited Promise settles, the function resumes as a microtask
  - The call stack may look completely different when it resumes
- Error handling with `try`/`catch`:
  - Rejected Promises can be caught with standard `try`/`catch`
  - Much more natural than `.catch()` chains
  - Where to put `try`/`catch`: around individual operations vs. around entire blocks
- Sequential vs parallel execution:
  - `await a; await b;` runs sequentially
  - `await Promise.all([a, b])` runs in parallel
  - A common mistake: accidentally making parallel operations sequential
- Top-level `await`:
  - Available in ES modules (connection to article 13)
  - How it affects module loading
- Patterns and best practices:
  - Async iteration with `for await...of` (connection to generators, article 22)
  - Avoiding `async` when you don't need it (unnecessary Promise wrapping)
  - Error handling strategies: centralized vs. granular
- Connection to generators:
  - `async`/`await` is conceptually equivalent to generators + a runner
  - Brief forward reference to article 22

---

#### `generators-and-iterators.md` — Generators & Iterators

**Goal:** Explain the iteration protocol and generators as pausable functions, connecting them to async patterns.

**Topics:**
- The iteration protocol:
  - The `Symbol.iterator` method
  - The iterator object: `{ next() }` returning `{ value, done }`
  - What `for...of` actually does under the hood
  - Making custom objects iterable
- Built-in iterables:
  - Arrays, Strings, Maps, Sets
  - Why plain objects are not iterable by default
- The spread operator and destructuring with iterables
- Generator functions (`function*`):
  - The `yield` keyword: pausing and resuming execution
  - Each `yield` is a suspension point; execution resumes on `.next()`
  - Return value: `{ value, done }`
  - Generators are both iterators and iterables
- How generators work internally:
  - The generator object maintains its own execution context
  - Unlike regular functions, the context is not discarded on suspension
  - Similar to closures, but with the ability to pause mid-function
- Two-way communication:
  - Passing values into generators via `.next(value)`
  - `yield` as an expression, not just a statement
  - `.throw(error)`: injecting errors into the generator
  - `.return(value)`: terminating the generator
- Practical use cases for generators:
  - Lazy sequences (infinite lists, paginated data)
  - State machines
  - Custom iteration patterns
- Async generators and `for await...of`:
  - `async function*`: combining generators with async/await
  - Yielding Promises that are awaited by the consumer
  - Streaming data patterns (reading lines from a file, processing events)
- The connection to `async`/`await`:
  - Generators were the precursor to `async`/`await`
  - `async`/`await` is essentially a generator that auto-advances on Promise resolution
  - Libraries like `co` that bridged the gap historically

---

## Pedagogical Rationale

The ordering follows the engine's own logic:

1. **The Engine & Execution Model** (4 articles): Start with *how* code runs and how memory is managed. Without understanding execution contexts, the call stack, and garbage collection, everything else is hand-waving. This connects to the Fundamentals section's coverage of compilation, interpretation, and memory management.

2. **Types & Operations** (3 articles): Now that we know how code runs, we examine the *values* it manipulates. JavaScript's type system is unusual (dynamic, loosely typed, full of implicit coercion), and understanding its rules is essential for predicting behavior.

3. **Scope & Functions** (6 articles): With execution contexts established, we can properly explain scope as a consequence of Lexical Environments. Closures follow naturally from lexical scope. Then we cover the mechanics of function forms, the patterns that emerge from first-class functions (higher-order functions and callbacks), and finally how modules organize code into isolated scope boundaries. By the end of this section, the reader understands callbacks, which is the prerequisite for the async section.

4. **Objects & Inheritance** (5 articles): Objects are the other fundamental building block. We build from property descriptors up to prototypes, then show classes as sugar on top. Proxy & Reflect cap the section by revealing the internal methods that underpin all object operations, giving the reader a complete picture of how property access, assignment, and method calls actually work.

5. **Asynchronous JavaScript** (4 articles): The culmination. We started with the call stack (single-threaded) and already understand callbacks from article 12, so we can dive straight into the event loop machinery. Each subsequent article builds directly on the previous: the event loop explains *how* async works, Promises provide a composable abstraction, async/await provides clean syntax, and generators reveal the underlying mechanism that makes it all possible.

The section is 22 articles total. Each builds directly on the previous, and the reader should never encounter a concept without having the tools to understand it.

---

## Progress Tracker

### The Engine & Execution Model

| File | Status | Notes |
|------|--------|-------|
| `how-javascript-runs.md` | Not started | |
| `execution-context.md` | Not started | |
| `the-call-stack.md` | Not started | |
| `memory-and-garbage-collection.md` | Not started | New article |

### Types & Operations

| File | Status | Notes |
|------|--------|-------|
| `types-and-values.md` | Not started | |
| `coercion.md` | Not started | |
| `equality-and-comparison.md` | Not started | |

### Scope & Functions

| File | Status | Notes |
|------|--------|-------|
| `scope-and-lexical-environment.md` | Not started | |
| `hoisting-and-the-tdz.md` | Not started | |
| `closures.md` | Not started | |
| `function-forms.md` | Not started | Split from old "Functions in Depth" |
| `higher-order-functions-and-callbacks.md` | Not started | Moved from Async section, combined with HOF content |
| `modules.md` | Not started | New article |

### Objects & Inheritance

| File | Status | Notes |
|------|--------|-------|
| `objects-and-properties.md` | Not started | |
| `the-this-keyword.md` | Not started | |
| `prototypes.md` | Not started | |
| `classes-and-factory-functions.md` | Not started | |
| `proxy-and-reflect.md` | Not started | New article |

### Asynchronous JavaScript

| File | Status | Notes |
|------|--------|-------|
| `the-event-loop.md` | Not started | |
| `promises.md` | Not started | |
| `async-await.md` | Not started | |
| `generators-and-iterators.md` | Not started | |
