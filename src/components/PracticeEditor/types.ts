/**
 * @module components/PracticeEditor/types
 * Type definitions for the PracticeEditor component.
 */

/**
 * Represents a single test case for validating user solutions.
 */
export interface TestCase {
  /** Arguments to pass to the function being tested */
  input: unknown[];
  /** Expected return value from the function */
  expected: unknown;
  /** Optional description of what this test case is checking */
  description?: string;
}

/**
 * Result of running a single test case.
 */
export interface TestResult {
  /** Whether the test passed */
  passed: boolean;
  /** The test case that was run */
  testCase: TestCase;
  /** The actual value returned by the user's function */
  actual?: unknown;
  /** Error message if the test threw an exception */
  error?: string;
  /** Index of this test in the test suite */
  index: number;
}

/**
 * Props for the PracticeEditor component.
 */
export interface PracticeEditorProps {
  /** Unique identifier for this problem (used for localStorage persistence) */
  problemId: string;
  /** Initial code shown in the editor */
  starterCode: string;
  /** Solution code that can be revealed */
  solutionCode: string;
  /** Name of the function to test (extracted from code if not provided) */
  functionName: string;
  /** Test cases to validate the solution */
  testCases: TestCase[];
}

/**
 * State of the test runner.
 */
export type TestRunnerState = 'idle' | 'running' | 'complete';
