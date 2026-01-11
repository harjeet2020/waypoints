/**
 * @module components/PracticeEditor
 * Interactive code editor component for practicing algorithm problems.
 *
 * @remarks
 * This component provides a sandboxed JavaScript editor where users can write
 * and test their solutions to practice problems. It includes features for
 * running tests, viewing test cases, revealing solutions, and debugging with
 * console output.
 */

import React, { useState, useCallback } from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  useSandpack,
} from '@codesandbox/sandpack-react';

import { runTests, formatValue, type RunResult } from './TestRunner';
import type { PracticeEditorProps, TestRunnerState } from './types';
import styles from './styles.module.css';

/**
 * Props for the inner editor component that has access to Sandpack context.
 */
interface EditorInnerProps {
  starterCode: string;
  solutionCode: string;
  functionName: string;
  testCases: PracticeEditorProps['testCases'];
}

/**
 * Inner editor component with access to Sandpack context.
 *
 * @remarks
 * This component is rendered inside SandpackProvider and has access to the
 * Sandpack context for reading and updating code.
 */
function EditorInner({
  starterCode,
  solutionCode,
  functionName,
  testCases,
}: EditorInnerProps) {
  const { sandpack } = useSandpack();
  const [runState, setRunState] = useState<TestRunnerState>('idle');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [showTestCases, setShowTestCases] = useState(false);

  /**
   * Runs the user's code against all test cases.
   */
  const handleRunTests = useCallback(async () => {
    setRunState('running');
    const code = sandpack.files['/index.js']?.code || '';

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 100));

    const result = await runTests(code, functionName, testCases);
    setRunResult(result);
    setRunState('complete');
  }, [sandpack.files, functionName, testCases]);

  /**
   * Resets the editor to the starter code.
   */
  const handleReset = useCallback(() => {
    sandpack.updateFile('/index.js', starterCode);
    setRunResult(null);
    setRunState('idle');
  }, [sandpack, starterCode]);

  /**
   * Reveals the solution code in the editor.
   */
  const handleRevealSolution = useCallback(() => {
    const confirmed = window.confirm(
      'Are you sure you want to reveal the solution? This will replace your current code.'
    );
    if (confirmed) {
      sandpack.updateFile('/index.js', solutionCode);
      setRunResult(null);
      setRunState('idle');
    }
  }, [sandpack, solutionCode]);

  /**
   * Toggles visibility of test case details.
   */
  const toggleTestCases = useCallback(() => {
    setShowTestCases((prev) => !prev);
  }, []);

  return (
    <div className={styles.container}>
      {/* Code Editor */}
      <div className={styles.editorWrapper}>
        <SandpackCodeEditor
          showTabs={false}
          showLineNumbers
          wrapContent
          style={{ height: '300px' }}
        />
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleRunTests}
          disabled={runState === 'running'}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          {runState === 'running' ? 'Running...' : 'Run Tests'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Reset Code
        </button>
        <button
          type="button"
          onClick={handleRevealSolution}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Reveal Solution
        </button>
      </div>

      {/* Test Results Section */}
      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <span className={styles.testCount}>
            {runResult
              ? `Tests: ${runResult.passed}/${runResult.total} passed`
              : `Tests: ${testCases.length} total`}
          </span>
          <button
            type="button"
            onClick={toggleTestCases}
            className={styles.toggleButton}
          >
            {showTestCases ? 'Hide Test Cases' : 'Show Test Cases'}
          </button>
        </div>

        {/* Test Results List */}
        {runResult && (
          <div className={styles.testResults}>
            {runResult.results.map((result, idx) => (
              <div
                key={idx}
                className={`${styles.testResult} ${
                  result.passed ? styles.testPassed : styles.testFailed
                }`}
              >
                <div className={styles.testResultHeader}>
                  <span className={styles.testIcon}>
                    {result.passed ? '✓' : '✗'}
                  </span>
                  <span className={styles.testName}>
                    {result.testCase.description || `Test ${idx + 1}`}
                  </span>
                </div>

                {/* Show details if test failed or test cases are visible */}
                {(!result.passed || showTestCases) && (
                  <div className={styles.testDetails}>
                    {showTestCases && (
                      <>
                        <div className={styles.testDetail}>
                          <span className={styles.testLabel}>Input:</span>
                          <code>{formatValue(result.testCase.input)}</code>
                        </div>
                        <div className={styles.testDetail}>
                          <span className={styles.testLabel}>Expected:</span>
                          <code>{formatValue(result.testCase.expected)}</code>
                        </div>
                      </>
                    )}
                    {!result.passed && (
                      <div className={styles.testDetail}>
                        <span className={styles.testLabel}>
                          {result.error ? 'Error:' : 'Got:'}
                        </span>
                        <code className={styles.actualValue}>
                          {result.error || formatValue(result.actual)}
                        </code>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Test Cases Preview (before running) */}
        {!runResult && showTestCases && (
          <div className={styles.testCasesPreview}>
            {testCases.map((testCase, idx) => (
              <div key={idx} className={styles.testCasePreview}>
                <div className={styles.testName}>
                  {testCase.description || `Test ${idx + 1}`}
                </div>
                <div className={styles.testDetail}>
                  <span className={styles.testLabel}>Input:</span>
                  <code>{formatValue(testCase.input)}</code>
                </div>
                <div className={styles.testDetail}>
                  <span className={styles.testLabel}>Expected:</span>
                  <code>{formatValue(testCase.expected)}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Console Output */}
      {runResult && runResult.consoleOutput.length > 0 && (
        <div className={styles.consoleSection}>
          <div className={styles.consoleHeader}>Console Output</div>
          <div className={styles.consoleOutput}>
            {runResult.consoleOutput.map((line, idx) => (
              <div key={idx} className={styles.consoleLine}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Interactive code editor for practicing algorithm problems.
 *
 * @param props - Component props
 * @returns The rendered PracticeEditor component
 *
 * @remarks
 * This component wraps a Sandpack code editor with custom test running
 * functionality. Users can write code, run it against predefined test cases,
 * view test results, and optionally reveal the solution.
 *
 * @example
 * ```tsx
 * <PracticeEditor
 *   problemId="find-maximum"
 *   starterCode="function findMax(arr) {\n  // Your code here\n}"
 *   solutionCode="function findMax(arr) {\n  return Math.max(...arr);\n}"
 *   functionName="findMax"
 *   testCases={[
 *     { input: [[1, 2, 3]], expected: 3 },
 *     { input: [[-1, -5, -2]], expected: -1 },
 *   ]}
 * />
 * ```
 */
export default function PracticeEditor({
  problemId,
  starterCode,
  solutionCode,
  functionName,
  testCases,
}: PracticeEditorProps) {
  return (
    <div className={styles.practiceEditor} data-problem-id={problemId}>
      <SandpackProvider
        template="vanilla"
        files={{
          '/index.js': {
            code: starterCode,
            active: true,
          },
        }}
        options={{
          visibleFiles: ['/index.js'],
          activeFile: '/index.js',
        }}
        theme="auto"
      >
        <EditorInner
          starterCode={starterCode}
          solutionCode={solutionCode}
          functionName={functionName}
          testCases={testCases}
        />
      </SandpackProvider>
    </div>
  );
}
