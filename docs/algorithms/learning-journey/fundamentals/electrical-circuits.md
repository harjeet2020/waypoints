---
title: Electrical Circuits
---
## The Physics of Computation

In the previous articles, we explored how computers represent information using binary. We saw that patterns of 1s and 0s can encode numbers, text, and virtually any data we can imagine. But representation alone is not computation. A computer does not simply store data; it transforms data, performing calculations, making decisions, and executing logic. How does a machine built from simple switches actually do this?

The answer lies in circuits called *logic gates*. A logic gate is a small circuit that takes one or two voltage levels as input (each representing a 1 or a 0) and produces a voltage level as output, according to a logical rule. An AND gate outputs 1 only when *both* its inputs are 1. An OR gate outputs 1 when *either* input is 1. A NOT gate flips its input: 1 becomes 0, 0 becomes 1. These are the building blocks of all digital computation. From gates, we build circuits that add numbers, compare values, store memory, and ultimately form the CPU itself.

In the next article, we will build these gates out of transistors and resistors. But to understand *how* they work (why a particular arrangement of components produces the right output), we first need to understand the physics they are built upon: how current flows through circuits, how voltage distributes across components, and how transistors act as controllable switches.

That is what this article covers. By the end, you will have the electronics foundation that makes everything in the next three articles click.

## What is Electricity?

All matter is made of atoms. At the center of each atom sits a nucleus containing protons (positively charged) and neutrons (no charge). Orbiting the nucleus are electrons, which carry a negative charge. In most materials, these electrons are tightly bound to their atoms and cannot move freely.

But in *conductors* (metals like copper, gold, and aluminum), the outermost electrons are loosely bound. In a metal, atoms pack tightly together and their outermost electron orbitals overlap, creating a shared "sea" of electrons that belongs to no single atom. These delocalized electrons can drift freely through the material. When we apply a force to push them in a consistent direction, we get *electricity*: the orderly flow of charged particles through a material.

```
┌─────────────────────────────────────────────────────────────────┐
│                  CONDUCTORS VS INSULATORS                        │
│                                                                 │
│   Conductor (copper wire):          Insulator (rubber):         │
│                                                                 │
│   ○ ─ e⁻→ ○ ─ e⁻→ ○ ─ e⁻→ ○       ○   ○   ○   ○              │
│   ○ ─ e⁻→ ○ ─ e⁻→ ○ ─ e⁻→ ○       ○   ○   ○   ○              │
│   ○ ─ e⁻→ ○ ─ e⁻→ ○ ─ e⁻→ ○       ○   ○   ○   ○              │
│                                                                 │
│   Electrons flow freely             Electrons are locked        │
│   between atoms                     to their atoms              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

*Insulators* (rubber, glass, plastic) have tightly bound electrons that cannot move freely. No matter how hard we push, current will not flow through an insulator. This distinction between conductors and insulators is fundamental to how circuits work, and it will become especially important when we see how transistor gates control current without touching it.

## The Water Analogy

Electricity is invisible, which makes it difficult to reason about. Fortunately, it behaves much like water flowing through pipes. This analogy is not perfect, but it captures the essential behavior remarkably well. We will use it throughout this article to build intuition.

Imagine a water system with a pump and pipes:

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE WATER ANALOGY                              │
│                                                                 │
│                    ┌─────────────┐                              │
│            ┌───────┤    PUMP     ├───────┐                      │
│            │       │ (maintains  │       │                      │
│            │       │  pressure)  │       │                      │
│            │       └─────────────┘       │                      │
│            │                             │                      │
│            │  High pressure              │                      │
│            ▼                             │                      │
│      ┌───────────┐                       │                      │
│      │   WHEEL   │ ← Water does work     │                      │
│      │  (load)   │   here, losing        │                      │
│      └─────┬─────┘   pressure            │                      │
│            │                             │                      │
│            │  Low pressure               │                      │
│            └─────────────────────────────┘                      │
│                                                                 │
│   Pump = Power supply    Pressure = Voltage                     │
│   Wheel = Resistor       Water flow rate = Current              │
│   Narrow pipe = Resistance                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The pump continuously raises water from low pressure to high pressure. Water flows through the pipes, does work at the wheel (losing pressure in the process), and returns to the pump at low pressure. The cycle repeats endlessly.

With this picture in mind, let us explore the three fundamental quantities of electricity.

## Voltage, Current, and Resistance

### Current: The Flow of Charge

**Current** is the rate at which electric charge flows through a conductor. It is measured in *amperes* (A), commonly shortened to "amps."

In our water analogy, current corresponds to the *flow rate*: how much water passes through a point in the pipe per second. A wider pipe or stronger pump means more water flows. Similarly, more electrons passing through a wire per second means a higher current.

Current flows from the high-voltage side of a circuit to the low-voltage side, just as water flows from high pressure to low pressure. For current to flow at all, there must be a complete path (a closed loop) from the power supply, through the circuit components, and back. If the path is broken anywhere, current stops everywhere, just as water stops flowing if you block a pipe.

### Voltage: The Force That Pushes

**Voltage** is the *difference in electrical potential* between two points. It is measured in *volts* (V). Voltage is what drives current through a circuit.

In our water analogy, voltage corresponds to *pressure difference*. The pump creates a pressure gap: high pressure on one side, low pressure on the other. This gap is what drives water through the pipes. Without a pressure difference, the water sits still.

Similarly, a power supply (such as a battery) maintains a voltage difference between its positive terminal (high voltage, typically labeled +V) and its negative terminal (low voltage, labeled **ground** or **GND**, at 0V). This difference is what drives electrons through the circuit.

A crucial point: **voltage can exist without current**. A battery sitting on a table, disconnected from everything, still has 5V between its terminals. That voltage is a *potential*: it could push current if given a path, but until a circuit is connected, no current flows. Think of it as a pump spinning in a pipe system where all the valves are closed. The pressure exists, but nothing moves.

### Resistance: The Opposition

**Resistance** is how much a material opposes the flow of current. It is measured in *ohms* (Ω).

In our water analogy, resistance corresponds to a *narrow pipe* or an obstruction. A narrow pipe restricts flow: even with high pressure, less water passes through per second. A wide pipe allows more flow with the same pressure.

Every material has some resistance. Copper wire has very low resistance (current flows easily). A **resistor** (a component specifically designed to restrict current) has a controlled, fixed resistance. An insulator has effectively infinite resistance (no current flows at all, no matter the voltage).

### Ohm's Law: The Relationship

We have established that voltage pushes, current flows, and resistance opposes. But how exactly are these three quantities related?

Think back to our water analogy. If you increase the pressure difference across a pipe (more voltage), more water flows through it (more current). If you make the pipe narrower (more resistance), less water flows for the same pressure (less current). And if you want to know the pressure difference across a narrow section of pipe, it depends on both how narrow the pipe is *and* how much water is flowing through it: more flow through a narrow pipe means a larger pressure difference across it.

These three observations fit together into a single, elegant relationship called **Ohm's Law**, arguably the most important equation in electronics:

```
┌─────────────────────────────────────────────────────────────────┐
│                        OHM'S LAW                                 │
│                                                                 │
│                        V = I × R                                 │
│                                                                 │
│   Where:                                                        │
│     V = Voltage (volts, V)                                      │
│     I = Current (amperes, A)                                    │
│     R = Resistance (ohms, Ω)                                    │
│                                                                 │
│   Rearranged:                                                   │
│     I = V / R     (current = voltage divided by resistance)     │
│     R = V / I     (resistance = voltage divided by current)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The equation describes the relationship between three quantities *across a single component*: the voltage drop from one end of the component to the other, the current flowing through it, and its resistance. When a circuit has multiple components in series, Ohm's Law applies to each one individually: each component has its own voltage drop, its own resistance, and the same current passing through it. The water analogy led us right to this relationship: more pressure difference across a section of pipe (voltage) means more flow through it (current), and a narrower pipe (resistance) means less flow for the same pressure.

### A Note on Units

Each of these quantities has a unit worth understanding:

- A **volt** (V) measures the energy carried by each unit of charge. A 5V supply gives each unit of charge five joules of energy to spend as it travels the circuit.
- An **ampere** (A), or amp, measures the rate of charge flow. One amp means roughly 6.2 billion billion electrons passing a point every second. In digital circuits, currents are typically measured in milliamps (mA, thousandths of an amp) or even microamps (μA, millionths).
- An **ohm** (Ω) measures how much a material resists current. By Ohm's Law, one ohm is the resistance that allows one amp to flow when one volt is applied.

These units tie together neatly: volts = amps × ohms. If you know any two, you can calculate the third.

:::info The Story Behind the Law
Georg Ohm discovered this relationship in 1827 through careful experimentation: he varied the voltage across conductors, measured the resulting current, and found the relationship was consistently linear. At the time, nobody knew *why* it should be linear. The theoretical explanation came in 1900, when Paul Drude modeled conductors as lattices of atoms with free electrons bouncing between them. When voltage is applied, the electric field accelerates electrons in one direction, but they keep colliding with atoms in the lattice, which slows them down. The result is an average drift velocity that is proportional to the applied field, which gives rise to the linear V = IR relationship.

Ohm's Law holds remarkably well for most conductors at normal temperatures, but it is not universal. Materials like diodes and transistors (in certain operating regimes) violate it, as do superconductors. For the circuits in this series, however, it applies perfectly.
:::

A simple example to build that intuition: if we connect a 1,000Ω resistor (commonly written as 1kΩ) between a 5V power supply and ground, how much current flows?

```
I = V / R = 5V / 1,000Ω = 0.005A = 5mA
```

Five milliamps. If we doubled the resistance to 2kΩ, the current would halve to 2.5mA. If we doubled the voltage to 10V instead (keeping 1kΩ), the current would double to 10mA.

## Building Circuits

### The Complete Loop

For current to flow, there must be a complete path from the power supply's positive terminal, through the circuit components, and back to the negative terminal (ground). If the path is broken at any point, no current flows anywhere in the circuit.

```
┌─────────────────────────────────────────────────────────────────┐
│              COMPLETE VS BROKEN CIRCUIT                          │
│                                                                 │
│      Complete circuit:             Broken circuit:              │
│                                                                 │
│         +5V ─────┐                    +5V ─────┐               │
│                   │                             │               │
│                  ─┴─ R                         ─┴─ R            │
│                   │                             │               │
│                   │                             ╳  (break)      │
│                   │                             │               │
│         GND ◄────┘                              │               │
│                                                                 │
│      Current flows                 No current flows             │
│      (loop is complete)            (loop is broken)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This is like a water pipe system: if you cut a pipe, water stops flowing everywhere in the system, not just at the cut. The loop must be complete.

### Essential Components

Circuits are built from a handful of basic components:

```
┌─────────────────────────────────────────────────────────────────┐
│                   CIRCUIT COMPONENTS                              │
│                                                                 │
│   Power supply    Provides a constant voltage difference.       │
│   (+V and GND)    Like the pump in our water system.            │
│                                                                 │
│   Wire            Connects components. Very low resistance.     │
│   ─────────       Like a wide pipe: current flows freely.       │
│                                                                 │
│   Resistor        Opposes current with a fixed resistance.      │
│     ─┴─           Like a narrow section of pipe.                │
│                                                                 │
│   Switch          Opens or closes a path for current.           │
│     ╳ / │         Like a valve: open = no flow, closed = flow.  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

These four components are enough to understand every circuit in the next three articles. The power supply provides energy, wires carry current, resistors control how much current flows, and switches open and close paths.

### Series and Parallel Connections

Components can be arranged in two fundamental ways:

**Series:** Components are connected end-to-end, forming a single path for current. Current must flow through each component in turn. If any component breaks the path, current stops everywhere.

**Parallel:** Components are connected side-by-side, creating multiple paths for current. Current splits between the available paths. If one path is broken, current still flows through the others.

```
┌─────────────────────────────────────────────────────────────────┐
│               SERIES VS PARALLEL                                 │
│                                                                 │
│   Series (one path):                                            │
│                                                                 │
│      +V ────┬─┴─┬────┬─┴─┬──── GND                             │
│             R1         R2                                       │
│                                                                 │
│      Current flows through both resistors.                      │
│      Break either one, and current stops entirely.              │
│                                                                 │
│   Parallel (multiple paths):                                    │
│                                                                 │
│             ┌──┬─┴─┬──┐                                         │
│      +V ────┤   R1    ├──── GND                                 │
│             └──┬─┴─┬──┘                                         │
│                 R2                                               │
│                                                                 │
│      Current splits between the two resistors.                  │
│      Break one, and current still flows through the other.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This distinction will prove essential for understanding logic gates. As we will see in the next article, transistors in *series* implement AND logic (both must be on for current to flow), while transistors in *parallel* implement OR logic (either one being on creates a path for current).

## How Voltage Behaves in Circuits

Understanding how voltage distributes across a circuit is *the* key to understanding logic gates. This section covers the most important principles.

### Voltage Drops

When current flows through a component with resistance, the voltage is higher on one side than the other. This difference is called a **voltage drop**. The energy that charges lose crossing the resistance is converted to heat (or useful work, in the case of a motor or light bulb).

In a series circuit, the total voltage from the power supply is shared among the components. Each component claims a share of the voltage proportional to its resistance: higher resistance means a larger share. This follows directly from Ohm's Law.

```
┌─────────────────────────────────────────────────────────────────┐
│                  VOLTAGE DROPS IN SERIES                          │
│                                                                 │
│         +5V                                                     │
│          │                                                      │
│          │  ← Voltage here: 5V                                  │
│         ─┴─  R1 = 4kΩ  (large resistance, large drop: 4V)      │
│          │                                                      │
│          │  ← Voltage here: 1V                                  │
│         ─┴─  R2 = 1kΩ  (small resistance, small drop: 1V)      │
│          │                                                      │
│          │  ← Voltage here: 0V                                  │
│         GND                                                     │
│                                                                 │
│   Current: I = 5V / (4kΩ + 1kΩ) = 5V / 5kΩ = 1mA              │
│   Drop across R1: 1mA × 4kΩ = 4V  (from 5V down to 1V)        │
│   Drop across R2: 1mA × 1kΩ = 1V  (from 1V down to 0V)        │
│   Total drops: 4V + 1V = 5V ✓                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Notice how the voltage drops add up to the total supply voltage (5V). This is always the case: the voltage supplied must equal the sum of all voltage drops in the circuit. The component with four times the resistance claims four times the voltage drop.

### The Voltage Divider

When two resistors are connected in series, the point between them sits at a voltage determined by the ratio of their resistances. This arrangement is called a **voltage divider**, and it is the single most important circuit pattern for understanding logic gates.

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE VOLTAGE DIVIDER                            │
│                                                                 │
│         +V (e.g., 5V)                                           │
│          │                                                      │
│         ─┴─  R1                                                 │
│          │                                                      │
│          ├──────────── Output (Vout)                             │
│          │                                                      │
│         ─┴─  R2                                                 │
│          │                                                      │
│         GND                                                     │
│                                                                 │
│                     R2                                          │
│   Vout  =  V  ×  ─────────                                     │
│                   R1 + R2                                       │
│                                                                 │
│   Example scenarios:                                            │
│                                                                 │
│   If R1 = R2:   Vout = 5V × 1/2 = 2.5V  (split evenly)        │
│   If R1 >> R2:  Vout ≈ 0V  (most voltage drops across R1)      │
│   If R1 << R2:  Vout ≈ 5V  (most voltage drops across R2)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The key insight: **the component with higher resistance claims the larger voltage drop**. If R1 is much larger than R2, most of the 5V drops across R1, and the output sits near 0V. If R2 is much larger than R1, most drops across R2, and the output sits near 5V.

Why does this matter? Because a logic gate places a fixed resistor and a transistor in series. The transistor's resistance changes based on its input (very high when off, very low when on), and the output voltage at the midpoint reflects the logical result. We will see exactly how this works in the next article.

### No Current, No Voltage Drop

Here is the most important principle for understanding logic gates: **if no current flows through a component, there is no voltage drop across it**.

This follows directly from Ohm's Law. The voltage drop across a component is V = I x R. If I = 0 (no current), then V = 0 x R = 0, regardless of the resistance. No current, no drop.

Consider a resistor connected to +5V on one end, with nothing connected to the other:

```
┌─────────────────────────────────────────────────────────────────┐
│              NO CURRENT, NO VOLTAGE DROP                         │
│                                                                 │
│         +5V                                                     │
│          │                                                      │
│         ─┴─  R (any resistance value)                           │
│          │                                                      │
│          ●──────── This point is also at 5V!                    │
│          │                                                      │
│         (nothing connected, no path to ground)                  │
│                                                                 │
│   No complete circuit → no current flows                        │
│   No current → no voltage drop across R                         │
│   Both ends of R sit at the same voltage: 5V                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The resistor is connected to 5V, and since no current flows through it, both ends sit at 5V. The resistance value does not matter. It could be 1Ω or 1MΩ. With zero current, the drop is zero.

This might feel counterintuitive. After all, 5V is "trying" to push current through the resistor. But without a complete loop, there is nowhere for the current to go. The voltage is present as a potential, but without a path to ground, no current can flow and no voltage can drop.

### Connected Points Equalize

A closely related principle: **connected points equalize to the same voltage when no current flows between them**.

Imagine two water tanks connected by a pipe:

```
┌─────────────────────────────────────────────────────────────────┐
│              CONNECTED POINTS EQUALIZE                           │
│                                                                 │
│   ┌───────────┐           ┌───────────┐                        │
│   │ ~~~~~~~~~ │───────────│ ~~~~~~~~~ │                        │
│   │ ~~~~~~~~~ │   pipe    │ ~~~~~~~~~ │                        │
│   │ ~~~~~~~~~ │           │ ~~~~~~~~~ │                        │
│   └───────────┘           └───────────┘                        │
│                                                                 │
│   If no water is flowing, the levels must be equal.             │
│   If they were unequal, water would flow until they matched.    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

If the water levels were different, the pressure difference would cause water to flow from the higher tank to the lower one until they equalized. The only way for flow to be zero is if the levels are already the same.

The same applies to voltage. If two points are connected and no current flows between them, they must be at the same voltage. If they were at different voltages, current would flow until they equalized. This is why the open end of the resistor in the previous example sits at 5V: it is connected to +5V through the resistor, no current flows, so both ends of the resistor must be at the same voltage.

## Electric Fields and Charge

So far, we have talked about current flowing through wires and resistors. But there is another way that electrical forces can act: through **electric fields**. Understanding electric fields is essential for understanding how transistors control current without consuming any themselves. To get there, we need to start from a more fundamental concept: electric charge itself.

### What is Electric Charge?

Electric charge is a fundamental property of matter, as basic as mass. Just as mass determines how strongly an object feels gravity, charge determines how strongly a particle interacts with electrical forces.

Charge comes in two varieties, which we call *positive* and *negative*. The names are a historical convention (Benjamin Franklin chose them in the 1750s), but the underlying rule is one of nature's most fundamental laws: **opposite charges attract, like charges repel**. A positive charge pulls a negative charge toward it, pushes another positive charge away, and vice versa.

In atoms, protons carry positive charge and electrons carry negative charge. These charges are exactly equal in magnitude but opposite in sign, so a normal atom (with equal numbers of protons and electrons) is electrically neutral. When electrons are stripped away or added, the atom becomes a charged *ion*, and it begins to interact with electrical forces.

The charge carried by a single electron is incredibly small. It takes roughly 6.2 billion billion (6.2 × 10¹⁸) electrons flowing past a point every second to make one ampere of current. But in a copper wire, there are *vastly* more free electrons than that available to move, which is why metals conduct so well.

### Forces at a Distance

Here is the remarkable thing about charge: it does not need physical contact to exert force. Every charged particle creates an invisible **electric field** around itself, a region of influence that extends outward in all directions. Any other charged particle that enters this field feels a force: attraction if the charges are opposite, repulsion if they are the same.

The strength of this force depends on two things:

- **The amount of charge:** More charge means a stronger field and a stronger force.
- **The distance:** The force weakens rapidly with distance. Double the distance and the force drops to one quarter. This inverse-square relationship (known as **Coulomb's Law**) is why proximity matters so much in circuit design.

:::info Coulomb's Law
The force between two charged particles is given by:

**F = k × (q₁ × q₂) / r²**

Where F is the force, q₁ and q₂ are the amounts of charge, r is the distance between them, and k is a constant. The key insight is the r² in the denominator: double the distance and the force drops to one quarter. Halve the distance and the force quadruples. This is why the thin oxide layer in a transistor (just nanometers thick) allows such effective control over the channel.
:::

In our water analogy, you might think of the electric field as a current in the water that pushes floating objects around. The current exists whether or not any objects are present to feel it, and it gets weaker the farther you are from the source.

### Fields Through Insulators

Here is where this becomes essential for understanding transistors. Current cannot flow through an insulator: by definition, the electrons are locked to their atoms. But an electric field *can* pass through an insulating material, and it can influence charges on the other side.

```
┌─────────────────────────────────────────────────────────────────┐
│              ELECTRIC FIELD THROUGH INSULATOR                    │
│                                                                 │
│     Charged plate          Insulator          Conductor         │
│   ┌──────────────┐    ┌─────────────────┐   ┌──────────────┐   │
│   │  + + + + + + │    │                 │   │ - - - - - - -│   │
│   │  + + + + + + │~~~~│  (field passes  │~~~│  (electrons   │   │
│   │  + + + + + + │    │   through)      │   │  pulled near) │   │
│   └──────────────┘    └─────────────────┘   └──────────────┘   │
│                                                                 │
│   No current crosses the insulator.                             │
│   But the field passes through it, attracting electrons         │
│   in the conductor toward the insulator boundary.               │
│   The electrons move freely within the conductor,               │
│   but cannot cross the insulating barrier.                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

When a positive charge is placed on one side of an insulator, the electric field reaches through the insulating material. On the other side, if there is a conductor (or semiconductor), the field attracts electrons within that material toward the boundary. The electrons are free to move *within* their material, so they accumulate near the insulator's surface. But they cannot cross the insulator itself. The result is a rearrangement of charge without any current flowing across the boundary.

The strength of this effect depends on distance. Remember Coulomb's Law: the force drops off rapidly as distance increases. This is why the insulating layer in a transistor is made extraordinarily thin (just a few nanometers in modern chips). The thinner the insulator, the closer the gate charge is to the channel, and the stronger the field's influence. This engineering detail is one of the key reasons transistors have gotten smaller over the decades: thinner oxides mean more control over the channel with less voltage.

This principle is exactly how a transistor's gate works. Let us see it in action.

## Transistors in Circuits

In the Binary Basics article, we introduced the MOSFET transistor as a tiny switch with three terminals: source, drain, and gate. We said that applying voltage to the gate opens the channel, allowing current to flow from source to drain. Now that we understand circuits, voltage dividers, and electric fields, we can see *how* this works and why it matters for building logic.

### The MOSFET as a Variable Resistor

Rather than thinking of a transistor as a simple on/off switch, it is more precise to think of it as a **voltage-controlled variable resistor**. The gate voltage determines the channel's resistance:

- **Gate at 0V (off):** The channel has *effectively infinite resistance*. No current can flow between source and drain. The circuit behaves as if the wire were cut.
- **Gate at 5V (on):** The channel has *very low resistance*. Current flows freely between source and drain, as if a straight wire connected them.

```
┌─────────────────────────────────────────────────────────────────┐
│              TRANSISTOR AS VARIABLE RESISTOR                     │
│                                                                 │
│         Gate = 0V                      Gate = 5V                │
│                                                                 │
│   Source ────┤ ╳ ├──── Drain     Source ────┤ │ ├──── Drain     │
│              (OFF)                          (ON)                │
│                                                                 │
│   Resistance: ~infinite           Resistance: very low          │
│   Current: zero                   Current: flows freely         │
│                                                                 │
│   Like a closed valve             Like an open valve            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This "variable resistor" perspective is what makes the voltage divider pattern so powerful. When we place a transistor in series with a fixed resistor, the transistor's state determines the voltage at the midpoint. This is the fundamental mechanism behind every logic gate, as we will see in the next article.

### How the Gate Controls Without Current

The gate terminal is separated from the channel by a thin layer of oxide, which is an insulator. No current can flow into or out of the gate. Instead, the gate works through the electric field effect we just explored.

```
┌─────────────────────────────────────────────────────────────────┐
│                  MOSFET GATE OPERATION                            │
│                                                                 │
│                      Gate voltage                               │
│                          │                                      │
│                          ▼                                      │
│                 ┌─────────────────┐                             │
│                 │   Metal Gate    │                             │
│                 ├─────────────────┤                             │
│                 │ Oxide (insulator)│ ← No current crosses       │
│                 ├─────────────────┤                             │
│                 │    Channel      │ ← But electric field does   │
│                 └─────────────────┘                             │
│                                                                 │
│   Gate at 0V:                    Gate at 5V:                    │
│   No electric field              Electric field penetrates      │
│   Channel is non-conductive      Channel becomes conductive     │
│   (infinite resistance)          (very low resistance)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

To see how this works in detail, let us trace the full sequence from applied voltage to conducting channel.

**Step 1: Voltage charges the gate.** When we connect the gate to +5V, the power supply pulls electrons out of the gate metal (they flow through the external circuit toward the supply's positive terminal). With fewer electrons than protons, the gate surface is left with a net positive charge. The gate is now a charged plate, sitting just nanometers above the semiconductor channel, separated only by the thin oxide insulator.

**Step 2: The field reaches through the oxide.** The positively charged gate creates an electric field that penetrates through the oxide. Because the oxide is so thin, the field at the channel's surface is powerful (remember Coulomb's Law: force grows rapidly as distance shrinks).

**Step 3: The field creates a conductive channel.** The semiconductor between source and drain does not normally conduct: most of its electrons are bound to atoms in the crystal lattice. But the strong electric field from the gate pulls free electrons toward the surface, while pushing positive charge carriers away. When enough electrons accumulate, they form a thin conductive layer that bridges source and drain. Current can now flow.

**Step 4: Removing voltage dissipates the channel.** When the gate voltage drops to 0V, the power supply stops pulling electrons from the gate, and the gate discharges. The electric field disappears. The electrons that were held at the surface drift back into the bulk semiconductor, the conductive layer vanishes, and current stops.

This has a profound consequence: **a transistor's gate senses voltage without consuming current**. A tiny amount of current flows momentarily to charge up the gate (as described in step 1), but once charged, the state is maintained with essentially zero ongoing current. The gate controls *through the field*, not through a flow of charge.

### Voltage as Information

This property of the transistor gate leads to an elegant way of passing information between circuits. If the output of one circuit is a wire sitting at a certain voltage (high or low), it can control the next circuit's transistor simply by connecting to its gate.

```
┌─────────────────────────────────────────────────────────────────┐
│              VOLTAGE AS INFORMATION                              │
│                                                                 │
│   ┌─────────┐                      ┌─────────┐                 │
│   │Circuit 1├───── Output wire ────┤Circuit 2│                 │
│   └─────────┘      (at 5V or 0V)   └─────────┘                 │
│                         │                                       │
│                         ▼                                       │
│                  Voltage level                                  │
│                  represents 1 or 0                              │
│                                                                 │
│   Circuit 2's input is a transistor gate:                       │
│   it senses voltage through its electric field,                 │
│   drawing almost no current from Circuit 1.                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Circuit 1 does not need to "send" current to Circuit 2. It simply holds a voltage level, and Circuit 2's transistor senses that level through its electric field. Information propagates as voltage levels, not as a continuous stream of current. This is why chains of logic gates are so efficient, and it is the foundation upon which all digital electronics is built.

## Key Takeaways

1. **Electricity is the flow of charged particles.** Conductors allow this flow; insulators prevent it. The distinction is fundamental to circuit design.

2. **Voltage, current, and resistance are connected by Ohm's Law (V = I x R).** Voltage pushes, current flows, resistance opposes. Higher resistance means less current for a given voltage.

3. **Circuits require complete loops.** No complete path means no current, regardless of the voltage applied.

4. **Voltage distributes based on resistance.** In a series circuit, the component with more resistance claims a larger share of the voltage drop. This is the voltage divider principle.

5. **No current means no voltage drop.** If no current flows through a component, both ends sit at the same voltage. This single insight is the key to understanding how logic gates produce their output.

6. **Electric charge creates fields that act through insulators.** Opposite charges attract, like charges repel, and the force weakens with distance (Coulomb's Law). A charged surface can influence charges in a nearby material without current crossing the boundary. This is how transistor gates control the channel: through the field, not through a flow of charge.

7. **Transistors are voltage-controlled variable resistors.** The gate voltage controls channel resistance via electric fields, consuming essentially no current. This makes voltage an ideal carrier of information between circuits.

## Looking Ahead

We now understand the physics that makes digital electronics possible. We know how current flows, how voltage distributes across components, and how transistors fit into circuits as controllable switches.

In the next article, we will put this knowledge to work. We will explore **Boolean algebra** (the mathematics of logic) and then build **logic gates**: circuits that implement AND, OR, NOT, and XOR using the transistors and voltage dividers we now understand. You will see how the physics of this article translates directly into the logic of computation.
