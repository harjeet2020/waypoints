# Waypoints

A personal knowledge base documenting a software engineering learning journey. Built with [Docusaurus 3](https://docusaurus.io/).

## About

There is a quiet magic in the act of writing things down. Not for mere knowledge preservation, not for an audience, but for the simple reason that **explaining something is the truest test of understanding it**.

Waypoints is a digital garden: a living repository of thought strung together along my journey of learning to build software. It is not a tutorial site or a reference manual. It is a place where I work through ideas, connect concepts, and document what I learn in a way that makes sense to me. I am building it for myself, but hopefully you might find it useful too.

## What's Inside

### Algorithms & Data Structures

A structured learning path that emphasizes **patterns over memorization**. Instead of grinding through hundreds of problems, the focus is on understanding the core techniques that appear again and again. The journey starts from the ground up, covering how computers work before diving into Big O notation, because understanding the machine makes algorithmic thinking intuitive rather than abstract.

- **Learning Journey** - A progressive path from hardware fundamentals through data structures to algorithm patterns
- **Algorithm Bible** - Deep dives into individual algorithms for reference
- **Interactive Practice** - Hands-on coding exercises with an embedded editor, test runner, and solutions

### Tech Stack

Documentation explains syntax well, but falls short on conceptual understanding. This section digs beneath the surface of languages and frameworks, asking *why* for every *how*.

Covers: JavaScript, React, React Native, Node.js, CSS, MongoDB, PostgreSQL

### Journal

Free-flowing reflections on the craft of building software. Some technical and detailed, others more philosophical and abstract.

## Project Structure

```
waypoints/
├── docs/                          # All content lives here
│   ├── algorithms/
│   │   ├── learning-journey/      # Structured learning path
│   │   └── reference/             # Algorithm reference (Algorithm Bible)
│   ├── stack/                     # Language/framework deep dives
│   └── journal/                   # Free-form articles
├── src/                           # Custom React components and CSS
├── static/                        # Static assets
├── docusaurus.config.js           # Site configuration
└── sidebars.js                    # Sidebar navigation
```

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clear cache if things get weird
npm run clear
```

The dev server runs at `http://localhost:3003` by default.

## Work in Progress

This site is actively being developed. Some pages are incomplete or missing entirely. That is the nature of a living document: it grows and changes over time.

## License

Content is personal documentation. Feel free to reference it, but please do not republish wholesale.
