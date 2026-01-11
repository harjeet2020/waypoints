# Waypoints

A personal knowledge base documenting a software engineering learning journey. Built with Docusaurus 3.

## Project Structure

```bash
waypoints/
├── docs/                          # All content lives here
│   ├── algorithms/
│   │   ├── learning-journey/      # Structured learning path
│   │   │   ├── fundamentals/      # Core CS concepts
│   │   │   ├── data-structures/   # Basic data structures
│   │   │   ├── sorting/           # Sorting algorithms
│   │   │   └── patterns/          # Core Problem Patterns (Deep Journey)
│   │   └── reference/             # Algorithm Bible (reference)
│   ├── stack/                     # Language/framework technical exploration
│   │   ├── javascript/
│   │   ├── react/
│   │   └── ...
│   └── journal/                   # Free-form articles
├── sidebars.js                    # Sidebar configuration (manual ordering)
├── docusaurus.config.js           # Site configuration
├── src/
│   ├── css/custom.css             # Custom styles
│   ├── components/                # React components
│   │   └── PracticeEditor/        # Interactive code editor for practice problems
│   └── theme/
│       └── MDXComponents.tsx      # Global MDX component registration
└── datastructures.md              # Planning doc for data structures section
```

## Docusaurus Configuration

- **Route base path:** `/` (docs are served from root, not `/docs`)
- **Sidebar:** Manual ordering via `sidebars.js` (not auto-generated)
- **Blog:** Disabled
- **Search:** Local search via `@easyops-cn/docusaurus-search-local`

---

## Content Guidelines

### Markdown File Format

Skip top-level headings (h1) in markdown files. Use `title` field in frontmatter instead.

```md
---
title: Page Title
---
```

**Important:** Docusaurus strips numeric prefixes from document IDs. A file named `01-how-computers-work.md` gets the ID `how-computers-work`. Use numeric prefixes for filesystem ordering only.

### Adding New Files

1. Create the markdown file in the appropriate directory
2. **Manually add it to `sidebars.js`** - do not rely on `sidebar_position` frontmatter
3. Use the document ID (file path without numeric prefix or `.md` extension)

Example for `docs/algorithms/learning-journey/fundamentals/02-binary-and-data.md`:

```js
// In sidebars.js
items: [
  'algorithms/learning-journey/fundamentals/how-computers-work',
  'algorithms/learning-journey/fundamentals/binary-and-data',  // NOT 02-binary-and-data
  // ...
]
```

**Numeric prefixes:** Avoid them when possible. If you must use them for filesystem ordering, Docusaurus strips them from document IDs automatically. Always reference the unprefixed ID in `sidebars.js`.

### Internal Links

Use root-relative paths starting with `/`:

```md
[Link Text](/algorithms/learning-journey/fundamentals/how-computers-work)
```

For linking within the same section, relative paths work:

```md
[Next: Binary & Data](./binary-and-data)
```

### External Links

Standard markdown:

```md
[Link Text](https://example.com)
```

### Code Blocks

Always specify the language for syntax highlighting:

````md
```javascript
const example = "highlighted";
```
````

Supported languages (configured in `docusaurus.config.js`):

- `javascript`, `typescript`, `tsx`
- `python`, `java`
- `bash`, `json`, `sql`

### Tables

Keep all columns the same width. Use one space inside padding; no space padding for separator rows:

```md
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Images

Store local images in `docs/images/`. Reference them with root-relative paths:

```md
![Alt text](/images/filename.png)
```

### Details/Summary (Collapsible Sections)

```md
<details>
<summary>Click to expand</summary>

Hidden content here. Useful for answers to practice problems.

</details>
```

### Admonitions (When to Use)

- **`:::note`** — General context or supplementary information
- **`:::tip`** — Best practices and helpful techniques
- **`:::info`** — Important facts or clarifications
- **`:::warning`** — Gotchas, edge cases, or common mistakes
- **`:::danger`** — Critical issues or destructive actions

## Styling Guide

### ESLint Markdown Standards

Follow these eslint guidelines for all markdown files:

- **Line length:** Keep lines under 100 characters where practical (readability)
- **Trailing whitespace:** Remove all trailing spaces
- **Blank lines:** Use single blank lines between sections; avoid multiple consecutive blank lines
- **List formatting:** Use consistent list markers (hyphens `-` for unordered lists)
- **Emphasis:** Use `**bold**` for strong emphasis and `*italic*` for emphasis
- **Headings:** Use proper heading hierarchy (no skipped levels); start with h2 (`##`) in content files

### Dividers

Use horizontal dividers (`---`) sparingly to separate major sections. **Never place dividers immediately before h2 tags** — Docusaurus automatically handles visual separation for h2-level headings.

### Writing Tone

Use a warm, personable tone - but with refined language and a poetic, light-hearted touch. Keep technical explanations clear and concise, but ensure it sounds natural and intellectually engaging. Avoid using em dashes and emojis.

Example:

```md
Problem solving is the foundation of software engineering. It is easy to forget, among all the layers of abstraction we have built over the years, that the essence of programming is effective usage of loops and if statements.

When I was first introduced to algorithms & data structures, I quickly developed a loathing for the topic. Why spend hours solving riddles instead of building something cool? I still think today that practical skills and technical knowledge are more important - but with time, I developed an intellectual curiosity about algorithms and revisited the topic.

Studying algorithms & data structures because I wanted to was a completely different experience. Instead of a rat's race to become the best riddle-solver of them all, it became a slow-paced, thoughtful exploration. I encourage you to take a similar approach - the journey matters more than the destination.
```

## Development Commands

```bash
npm run start     # Start dev server
npm run build     # Production build (catches errors)
npm run serve     # Serve pre-built files
npm run clear     # Clear cache (.docusaurus directory)
```

Always run `npm run build` before committing to catch broken links and invalid sidebar references.

---

## Interactive Practice Problems

Practice problem files use the `PracticeEditor` component for interactive code editing and test validation.

### File Extension Requirement

Practice problem files **must use `.mdx` extension** (not `.md`) because they contain JSX. The Docusaurus config uses `markdown.format: 'detect'`, which only processes JSX in `.mdx` files.

### Using the PracticeEditor Component

The component is globally available in MDX files. Basic usage:

```jsx
<PracticeEditor
  problemId="unique-problem-id"
  functionName="functionToTest"
  starterCode={`function functionToTest(input) {
  // Your code here
}`}
  solutionCode={`function functionToTest(input) {
  return input * 2;
}`}
  testCases={[
    { input: [5], expected: 10, description: "Basic case" },
    { input: [0], expected: 0, description: "Zero input" },
  ]}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `problemId` | string | Unique identifier for the problem |
| `functionName` | string | Name of the function to test |
| `starterCode` | string | Initial code shown in the editor |
| `solutionCode` | string | Solution code revealed via button |
| `testCases` | array | Array of test case objects |

### Test Case Format

```javascript
{
  input: [arg1, arg2, ...],  // Arguments passed to the function
  expected: returnValue,     // Expected return value
  description: "Test name"   // Optional description shown in results
}
```

### Component Features

- Run tests against user code
- Reset to starter code
- Reveal solution (with confirmation prompt)
- Show/hide test case details
- Console output capture for debugging
- Dark mode support

### Component Location

```
src/components/PracticeEditor/
├── index.tsx          # Main component
├── types.ts           # TypeScript interfaces
├── TestRunner.ts      # Test execution logic
└── styles.module.css  # Component styles (edit for theming)
```

### Example Problem Structure

See `docs/algorithms/learning-journey/data-structures/arrays/practice/find-maximum.mdx` for a complete example.
