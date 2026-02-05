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
      link: { type: 'doc', id: 'algorithms/learning-journey/fundamentals/index' },
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
            'algorithms/learning-journey/fundamentals/electrical-circuits',
            'algorithms/learning-journey/fundamentals/logic-gates',
            'algorithms/learning-journey/fundamentals/combinational-circuits',
            'algorithms/learning-journey/fundamentals/sequential-circuits',
            'algorithms/learning-journey/fundamentals/computer-architecture',
            'algorithms/learning-journey/fundamentals/io-and-interrupts',
          ],
        },
        {
          type: 'category',
          label: 'The Layers of Software',
          collapsed: false,
          items: [
            'algorithms/learning-journey/fundamentals/assembly-basics',
            'algorithms/learning-journey/fundamentals/operating-systems',
            'algorithms/learning-journey/fundamentals/programming-languages',
            'algorithms/learning-journey/fundamentals/compilation',
            'algorithms/learning-journey/fundamentals/interpretation',
            'algorithms/learning-journey/fundamentals/types-and-memory-layout',
            'algorithms/learning-journey/fundamentals/stack-and-heap',
            'algorithms/learning-journey/fundamentals/memory-management',
            'algorithms/learning-journey/fundamentals/concurrency',
            'algorithms/learning-journey/fundamentals/networking',
            'algorithms/learning-journey/fundamentals/abstraction-and-paradigms',
          ],
        },
        {
          type: 'category',
          label: 'Introduction to Algorithms',
          collapsed: false,
          items: [
            'algorithms/learning-journey/fundamentals/recursion',
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
      link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/index' },
      items: [
        {
          type: 'category',
          label: 'Arrays',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/arrays/index' },
          items: [
            'algorithms/learning-journey/data-structures/arrays/internals',
            'algorithms/learning-journey/data-structures/arrays/operations',
            {
              type: 'category',
              label: 'Practice Problems',
              collapsed: true,
              link: { type: 'doc', id: 'algorithms/learning-journey/data-structures/arrays/practice/index' },
              items: [
                'algorithms/learning-journey/data-structures/arrays/practice/find-maximum',
                'algorithms/learning-journey/data-structures/arrays/practice/reverse-array',
                'algorithms/learning-journey/data-structures/arrays/practice/remove-element',
                'algorithms/learning-journey/data-structures/arrays/practice/move-zeroes',
                'algorithms/learning-journey/data-structures/arrays/practice/merge-sorted-arrays',
                'algorithms/learning-journey/data-structures/arrays/practice/rotate-array',
              ],
            },
          ],
        },
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
        {
          type: 'category',
          label: 'Binary Search',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/binary-search/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Two Pointers',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/two-pointers/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Depth First Search (DFS)',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/dfs/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Backtracking',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/backtracking/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Breadth First Search (BFS)',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/bfs/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Graph',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/graph/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Priority Queue / Heap',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/heap/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Dynamic Programming',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/dynamic-programming/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Advanced Data Structures',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/advanced-data-structures/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'Miscellaneous',
          collapsed: true,
          link: { type: 'doc', id: 'algorithms/learning-journey/patterns/miscellaneous/index' },
          items: [],
        },
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
    'journal/ai-in-coding',
  ],
};

module.exports = sidebars;
