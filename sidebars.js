// @ts-check

/**
 * Sidebar Configuration for Learn Knowledge Base
 *
 * Each sidebar corresponds to a section in the navbar.
 * Sidebars use explicit ordering (not frontmatter) for positioning.
 *
 * @see https://docusaurus.io/docs/sidebar
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  /**
   * Algorithms - Learning Journey
   * Structured learning path for algorithms and data structures
   */
  algorithmsSidebar: [
    {
      type: 'doc',
      id: 'algorithms/learning-journey/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Fundamentals',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Hardware Foundations',
          collapsed: false,
          items: [
            'algorithms/learning-journey/fundamentals/how-computers-work',
            'algorithms/learning-journey/fundamentals/binary-basics',
            'algorithms/learning-journey/fundamentals/representing-numbers',
            'algorithms/learning-journey/fundamentals/representing-text',
            'algorithms/learning-journey/fundamentals/logic-gates',
          ],
        },
        {
          type: 'category',
          label: 'The Layers of Software',
          collapsed: false,
          items: [
            'algorithms/learning-journey/fundamentals/assembly-basics',
            'algorithms/learning-journey/fundamentals/programming-languages',
            'algorithms/learning-journey/fundamentals/types-and-memory-layout',
            'algorithms/learning-journey/fundamentals/memory-management',
            'algorithms/learning-journey/fundamentals/abstraction-and-paradigms',
          ],
        },
        {
          type: 'category',
          label: 'Introduction to Algorithms',
          collapsed: false,
          items: [
            'algorithms/learning-journey/fundamentals/algorithms-and-complexity',
            'algorithms/learning-journey/fundamentals/math-prerequisites',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Data Structures',
      collapsed: false,
      items: [
        'algorithms/learning-journey/data-structures/arrays',
        'algorithms/learning-journey/data-structures/strings',
        'algorithms/learning-journey/data-structures/linked-lists',
        'algorithms/learning-journey/data-structures/stacks',
        'algorithms/learning-journey/data-structures/queues',
        'algorithms/learning-journey/data-structures/hash-tables-and-sets',
        'algorithms/learning-journey/data-structures/trees',
        'algorithms/learning-journey/data-structures/heaps',
        'algorithms/learning-journey/data-structures/graphs',
      ],
    },
    {
      type: 'category',
      label: 'Sorting Algorithms',
      collapsed: true,
      items: [
        'algorithms/learning-journey/sorting/overview',
        'algorithms/learning-journey/sorting/bubble-sort',
        'algorithms/learning-journey/sorting/selection-sort',
        'algorithms/learning-journey/sorting/insertion-sort',
        'algorithms/learning-journey/sorting/merge-sort',
        'algorithms/learning-journey/sorting/quick-sort',
        'algorithms/learning-journey/sorting/heap-sort',
      ],
    },
    {
      type: 'category',
      label: 'Algorithm Patterns',
      collapsed: true,
      items: [
        'algorithms/learning-journey/patterns/binary-search',
        'algorithms/learning-journey/patterns/two-pointers',
        'algorithms/learning-journey/patterns/sliding-window',
        'algorithms/learning-journey/patterns/fast-slow-pointers',
        'algorithms/learning-journey/patterns/bfs',
        'algorithms/learning-journey/patterns/dfs',
        'algorithms/learning-journey/patterns/backtracking',
        'algorithms/learning-journey/patterns/dynamic-programming',
      ],
    },
  ],

  /**
   * Algorithms - Algorithm Bible
   * In-depth reference for individual algorithms
   */
  algorithmBibleSidebar: [
    {
      type: 'doc',
      id: 'algorithms/reference/index',
      label: 'Algorithm Bible',
    },
    {
      type: 'category',
      label: 'Searching',
      collapsed: true,
      items: [
        'algorithms/reference/searching/binary-search',
        'algorithms/reference/searching/linear-search',
      ],
    },
    {
      type: 'category',
      label: 'Graph Algorithms',
      collapsed: true,
      items: [
        'algorithms/reference/graph/dijkstra',
        'algorithms/reference/graph/bellman-ford',
        'algorithms/reference/graph/floyd-warshall',
        'algorithms/reference/graph/topological-sort',
      ],
    },
    {
      type: 'category',
      label: 'Tree Algorithms',
      collapsed: true,
      items: [
        'algorithms/reference/tree/tree-traversals',
        'algorithms/reference/tree/lowest-common-ancestor',
      ],
    },
    {
      type: 'category',
      label: 'String Algorithms',
      collapsed: true,
      items: [
        'algorithms/reference/string/kmp',
        'algorithms/reference/string/rabin-karp',
      ],
    },
    {
      type: 'category',
      label: 'Dynamic Programming',
      collapsed: true,
      items: [
        'algorithms/reference/dp/fibonacci',
        'algorithms/reference/dp/longest-common-subsequence',
        'algorithms/reference/dp/knapsack',
      ],
    },
  ],

  /**
   * Stack - CSS
   */
  cssSidebar: [
    {
      type: 'doc',
      id: 'stack/css/index',
      label: 'CSS Overview',
    },
  ],

  /**
   * Stack - JavaScript
   */
  javascriptSidebar: [
    {
      type: 'doc',
      id: 'stack/javascript/index',
      label: 'JavaScript Overview',
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'stack/javascript/core/event-loop',
        'stack/javascript/core/closures',
        'stack/javascript/core/prototypes',
        'stack/javascript/core/this-keyword',
        'stack/javascript/core/modules',
      ],
    },
    {
      type: 'category',
      label: 'Gotchas & Quirks',
      collapsed: true,
      items: [
        'stack/javascript/gotchas/equality',
        'stack/javascript/gotchas/hoisting',
        'stack/javascript/gotchas/async-pitfalls',
      ],
    },
  ],

  /**
   * Stack - React
   */
  reactSidebar: [
    {
      type: 'doc',
      id: 'stack/react/index',
      label: 'React Overview',
    },
  ],

  /**
   * Stack - React Native
   */
  reactNativeSidebar: [
    {
      type: 'doc',
      id: 'stack/react-native/index',
      label: 'React Native Overview',
    },
  ],

  /**
   * Stack - Node.js
   */
  nodeSidebar: [
    {
      type: 'doc',
      id: 'stack/node/index',
      label: 'Node.js Overview',
    },
  ],

  /**
   * Stack - MongoDB
   */
  mongodbSidebar: [
    {
      type: 'doc',
      id: 'stack/mongodb/index',
      label: 'MongoDB Overview',
    },
  ],

  /**
   * Stack - PostgreSQL
   */
  postgresqlSidebar: [
    {
      type: 'doc',
      id: 'stack/postgresql/index',
      label: 'PostgreSQL Overview',
    },
  ],

  /**
   * Journal - Technical articles grouped by topic
   */
  journalSidebar: [
    {
      type: 'doc',
      id: 'journal/index',
      label: 'Journal',
    },
  ],
};

module.exports = sidebars;
