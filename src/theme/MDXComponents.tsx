/**
 * @module theme/MDXComponents
 * Custom MDX components for Docusaurus.
 *
 * @remarks
 * This module extends the default MDX components to include custom components
 * that can be used directly in MDX files without explicit imports.
 *
 * @see https://docusaurus.io/docs/markdown-features/react#mdx-component-scope
 */

import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import PracticeEditor from '@site/src/components/PracticeEditor';

export default {
  // Spread default components
  ...MDXComponents,
  // Add custom components
  PracticeEditor,
};
