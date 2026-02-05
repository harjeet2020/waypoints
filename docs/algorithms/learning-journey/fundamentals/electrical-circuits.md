---
title: Electrical Circuits
---
## The Physics of Computation

In the previous articles, we explored how computers represent information using binary. We learned that transistors act as tiny switches, and that patterns of 1s and 0s can encode numbers, text, and virtually any data we can imagine. But representation alone is not computation.

To understand how a computer actually *computes* (how it adds numbers, compares values, and makes decisions), we need to understand how electrical circuits work. In the coming articles, we will see how simple circuits called *logic gates* implement Boolean operations, how gates combine into circuits that perform arithmetic, and how these circuits come together in the CPU. But before any of that can make sense, we need to understand the physics it is all built upon.

This article is your introduction to electricity and circuits. By the end, you will understand how current flows, how voltage distributes, and how transistors fit into circuits as controllable switches. These concepts are the foundation that makes everything in the next three articles click.

## What is Electricity?

All matter is made of atoms. At the center of each atom sits a nucleus containing protons (positively charged) and neutrons (no charge). Orbiting the nucleus are electrons, which carry a negative charge. In most materials, these electrons are tightly bound to their atoms and cannot move freely.

But in *conductors* (metals like copper, gold, and aluminum), the outermost electrons are loosely bound. They can drift from atom to atom, forming a sea of mobile charge. When we apply a force to push these electrons in a consistent direction, we get *electricity*: the orderly flow of charged particles through a material.

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

The relationship between voltage, current, and resistance is captured by **Ohm's Law**, arguably the most important equation in electronics:

```
┌─────────────────────────────────────────────────────────────────┐
│                        OHM'S LAW                                 │
│                                                                 │
│                        V = I × R                                 │
│                                                                 │
│   Where:                                                        │
│     V = Voltage (volts)                                         │
│     I = Current (amperes)                                       │
│     R = Resistance (ohms)                                       │
│                                                                 │
│   Rearranged:                                                   │
│     I = V / R     (current = voltage divided by resistance)     │
│     R = V / I     (resistance = voltage divided by current)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This says: the voltage across a component equals the current through it multiplied by its resistance. The relationships are intuitive: more resistance means less current, more voltage means more current.

A simple example: if we connect a 1,000Ω resistor (commonly written as 1kΩ) between a 5V power supply and ground, how much current flows?

```
I = V / R = 5V / 1,000Ω = 0.005A = 5mA
```

Five milliamps. If we doubled the resistance to 2kΩ, the current would halve to 2.5mA. If we doubled the voltage to 10V instead (keeping 1kΩ), the current would double to 10mA.

:::info A Qualitative Understanding is Enough
We will not be doing circuit calculations in this series. The point of Ohm's Law is to give you the *principle* connecting voltage, current, and resistance. When we say "higher resistance causes a larger voltage drop," you now know the physics behind that statement. The qualitative understanding is what matters for everything that follows.
:::

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

## Electric Fields

So far, we have talked about current flowing through wires and resistors. But there is another way that electrical forces can act: through **electric fields**. Understanding electric fields is essential for understanding how transistors control current without consuming any themselves.

### Forces at a Distance

Every charged particle creates an invisible force field around itself called an *electric field*. This field exerts a force on other charged particles nearby: positive charges repel other positive charges and attract negative ones (and vice versa). The field exists in the space around the charge, and it acts on any other charges that enter that space.

The important point for our purposes is that an electric field can influence charged particles *without physical contact and without current flowing*. The field simply reaches through space (and through certain insulating materials) and rearranges charges on the other side.

### Fields Through Insulators

Here is where it gets interesting. Electric fields can pass through insulating materials. Current cannot cross an insulator (by definition, the electrons are locked in place). But an electric field can reach through the insulator and affect the material on the other side.

```
┌─────────────────────────────────────────────────────────────────┐
│              ELECTRIC FIELD THROUGH INSULATOR                    │
│                                                                 │
│     Charged plate          Insulator          Material          │
│   ┌──────────────┐    ┌─────────────────┐   ┌──────────────┐   │
│   │  + + + + + + │    │                 │   │ - - - - - - -│   │
│   │  + + + + + + │~~~~│  (field passes  │~~~│  (charges    │   │
│   │  + + + + + + │    │   through)      │   │  rearrange)  │   │
│   └──────────────┘    └─────────────────┘   └──────────────┘   │
│                                                                 │
│   No current crosses the insulator.                             │
│   But the electric field does, pulling charges in the material  │
│   toward the charged plate.                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

When a positive charge is placed on one side of an insulator, the electric field reaches through and attracts negative charges (electrons) in the material on the other side. The electrons cannot cross the insulator, but they are pulled toward it, accumulating near the surface. This rearrangement happens without any current flowing across the boundary.

This principle is exactly how a transistor's gate works. The gate is separated from the channel by a thin insulating layer, but its electric field reaches through and controls whether the channel conducts. Let us see this in detail.

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

When voltage is applied to the gate, the resulting electric field penetrates through the oxide insulator and reaches the semiconductor channel below. It attracts charge carriers into the channel, transforming it from a non-conductor into a conductor. Remove the gate voltage, and the field disappears, the carriers disperse, and the channel returns to its non-conductive state.

This has a profound consequence: **a transistor's gate senses voltage without consuming current**. A tiny amount of current flows momentarily to charge up the gate (the oxide layer acts like a small capacitor), but once charged, the state is maintained with essentially zero ongoing current.

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

6. **Electric fields act through insulators.** A charged surface can influence a nearby material without physical contact or current flow. This is how transistor gates control the channel.

7. **Transistors are voltage-controlled variable resistors.** The gate voltage controls channel resistance via electric fields, consuming essentially no current. This makes voltage an ideal carrier of information between circuits.

## Looking Ahead

We now understand the physics that makes digital electronics possible. We know how current flows, how voltage distributes across components, and how transistors fit into circuits as controllable switches.

In the next article, we will put this knowledge to work. We will explore **Boolean algebra** (the mathematics of logic) and then build **logic gates**: circuits that implement AND, OR, NOT, and XOR using the transistors and voltage dividers we now understand. You will see how the physics of this article translates directly into the logic of computation.
