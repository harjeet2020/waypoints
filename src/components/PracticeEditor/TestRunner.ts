/**
 * @module components/PracticeEditor/TestRunner
 * Utilities for running test cases against user code.
 *
 * @remarks
 * This module provides functionality to execute user-submitted JavaScript code
 * in a sandboxed environment and validate it against test cases. It captures
 * console output and handles errors gracefully.
 */

import type { TestCase, TestResult } from './types';

/**
 * Result of running all test cases.
 */
export interface RunResult {
  /** Results for each individual test case */
  results: TestResult[];
  /** Console output captured during execution */
  consoleOutput: string[];
  /** Number of tests that passed */
  passed: number;
  /** Total number of tests */
  total: number;
}

/**
 * Deep equality comparison for test result validation.
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are deeply equal
 *
 * @remarks
 * Handles arrays, objects, and primitive values. Used to compare
 * actual output against expected output in test cases.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (typeof a === 'object' && a !== null && b !== null) {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);

    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key]));
  }

  return false;
}

/**
 * Formats a value for display in test output.
 *
 * @param value - Value to format
 * @returns String representation of the value
 */
export function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Runs user code against a set of test cases.
 *
 * @param code - The user's JavaScript code as a string
 * @param functionName - Name of the function to test
 * @param testCases - Array of test cases to run
 * @returns Promise resolving to the run results
 *
 * @remarks
 * This function creates a sandboxed environment using the Function constructor
 * to execute user code. It captures console.log output and handles errors
 * gracefully, returning detailed results for each test case.
 *
 * @example
 * ```typescript
 * const result = await runTests(
 *   'function add(a, b) { return a + b; }',
 *   'add',
 *   [{ input: [1, 2], expected: 3 }]
 * );
 * ```
 */
export async function runTests(
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<RunResult> {
  const consoleOutput: string[] = [];
  const results: TestResult[] = [];

  // Create a mock console that captures output
  const mockConsole = {
    log: (...args: unknown[]) => {
      consoleOutput.push(args.map((arg) => formatValue(arg)).join(' '));
    },
    error: (...args: unknown[]) => {
      consoleOutput.push(`[Error] ${args.map((arg) => formatValue(arg)).join(' ')}`);
    },
    warn: (...args: unknown[]) => {
      consoleOutput.push(`[Warn] ${args.map((arg) => formatValue(arg)).join(' ')}`);
    },
  };

  try {
    // Create a function from the user's code
    // We wrap it to inject our mock console and return the target function
    const wrappedCode = `
      ${code}
      return typeof ${functionName} === 'function' ? ${functionName} : null;
    `;

    // eslint-disable-next-line no-new-func
    const createUserFunction = new Function('console', wrappedCode);
    const userFunction = createUserFunction(mockConsole);

    if (!userFunction) {
      return {
        results: testCases.map((testCase, index) => ({
          passed: false,
          testCase,
          error: `Function "${functionName}" not found in your code`,
          index,
        })),
        consoleOutput: [`Error: Function "${functionName}" not found`],
        passed: 0,
        total: testCases.length,
      };
    }

    // Run each test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      try {
        // Deep clone inputs to prevent mutation affecting other tests
        const inputs = JSON.parse(JSON.stringify(testCase.input));
        const actual = userFunction(...inputs);
        const passed = deepEqual(actual, testCase.expected);

        results.push({
          passed,
          testCase,
          actual,
          index: i,
        });
      } catch (err) {
        results.push({
          passed: false,
          testCase,
          error: err instanceof Error ? err.message : String(err),
          index: i,
        });
      }
    }
  } catch (err) {
    // Syntax error or other issue with the code itself
    const errorMessage = err instanceof Error ? err.message : String(err);
    consoleOutput.push(`Syntax Error: ${errorMessage}`);

    return {
      results: testCases.map((testCase, index) => ({
        passed: false,
        testCase,
        error: errorMessage,
        index,
      })),
      consoleOutput,
      passed: 0,
      total: testCases.length,
    };
  }

  return {
    results,
    consoleOutput,
    passed: results.filter((r) => r.passed).length,
    total: testCases.length,
  };
}
