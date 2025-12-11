import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import BinarySearchAnimation from "../components/BinarySearchAnimation2";
import JavaExecutionSimulator from "../components/JavaExecutionSimulator2";

export default function BinarySearchPageFixed() {
  const tabs = ["Problem", "Approach", "Iterative", "Recursive", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [iterTab, setIterTab] = useState("Java");
  const [recTab, setRecTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Binary Search Algorithm" subtitle="Efficient searching technique for sorted arrays" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p style={{ marginBottom: 20 }}>
              Binary Search uses a <strong>divide-and-conquer</strong> strategy. The key insight is that in a sorted array,
              we can eliminate half of the remaining elements in each comparison by checking the middle element.
            </p>

            <h3 className="section-subtitle">Core Concept:</h3>
            <ol className="algo-steps">
              <li>Start with two pointers: <code>left</code> at index 0 and <code>right</code> at the last index</li>
              <li>Calculate the middle index: <code>mid = left + (right - left) / 2</code></li>
              <li>Compare the middle element with the target:
                <ul style={{ marginTop: 10, marginLeft: 20 }}>
                  <li>If <code>arr[mid] == target</code>, we found it! Return <code>mid</code></li>
                  <li>If <code>arr[mid] &lt; target</code>, search the right half (set <code>left = mid + 1</code>)</li>
                  <li>If <code>arr[mid] &gt; target</code>, search the left half (set <code>right = mid - 1</code>)</li>
                </ul>
              </li>
              <li>Repeat until the target is found or <code>left &gt; right</code></li>
              <li>If not found, return -1</li>
            </ol>
          </div>

          <div className="section">
            <h2 className="section-title">🎯 Interactive Animation</h2>
            <p style={{ marginBottom: 20 }}>Watch how binary search finds the target value step by step:</p>

            <BinarySearchAnimation />

            <div className="section">
              <div className="note-box">
                <div className="note-title">⚠️ Important Note</div>
                <p>Use <code>mid = left + (right - left) / 2</code> instead of <code>mid = (left + right) / 2</code> to avoid integer overflow when dealing with large values.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 20 }}>
              Given a sorted array of n integers and a target value, write a function to search for the target in the array.
              If the target exists, return its index. Otherwise, return -1.
            </p>
            <p>
              Binary search is a highly efficient searching algorithm that works on sorted arrays by repeatedly dividing
              the search interval in half.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [1, 3, 5, 7, 9, 11, 13, 15], target = 7<br />
                <strong>Output:</strong> 3
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [2, 4, 6, 8, 10, 12], target = 5<br />
                <strong>Output:</strong> -1
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>6</sup></li>
              <li>Array elements are sorted in ascending order</li>
              <li>Array elements are distinct (no duplicates)</li>
              <li>-10<sup>9</sup> ≤ arr[i], target ≤ 10<sup>9</sup></li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Iterative" && (
        <div>
          <div className="tabs" style={{ marginBottom: 12 }}>
            <button className={"tab " + (iterTab === "Java" ? "active" : "")} onClick={() => setIterTab("Java")}>Java</button>
            <button className={"tab " + (iterTab === "C++" ? "active" : "")} onClick={() => setIterTab("C++")}>C++</button>
            <button className={"tab " + (iterTab === "Python" ? "active" : "")} onClick={() => setIterTab("Python")}>Python</button>
            <button className={"tab " + (iterTab === "JavaScript" ? "active" : "")} onClick={() => setIterTab("JavaScript")}>JavaScript</button>
          </div>

          {iterTab === "C++" && (
            <div className="section">
              <h3 className="section-subtitle">C++ Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
                <pre>{`int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        // Target found
        if (arr[mid] == target) {
            return mid;
        }

        // Target is in right half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // Target is in left half
        else {
            right = mid - 1;
        }
    }

    // Target not found
    return -1;
}`}</pre>
              </div>
            </div>
          )}

          {iterTab === "Java" && (
            <div className="section"><JavaExecutionSimulator /></div>
          )}

          {iterTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return mid

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`}</pre>
              </div>
            </div>
          )}

          {iterTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}`}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "Recursive" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">🔁 Recursive Implementation</h2>
            <p style={{ marginBottom: 20 }}>
              The recursive approach breaks down the problem into smaller subproblems by searching in either the left or right half.
            </p>

            <div className="tabs" style={{ marginBottom: 12 }}>
              <button className={"tab " + (recTab === "Java" ? "active" : "")} onClick={() => setRecTab("Java")}>Java</button>
              <button className={"tab " + (recTab === "C++" ? "active" : "")} onClick={() => setRecTab("C++")}>C++</button>
              <button className={"tab " + (recTab === "Python" ? "active" : "")} onClick={() => setRecTab("Python")}>Python</button>
              <button className={"tab " + (recTab === "JavaScript" ? "active" : "")} onClick={() => setRecTab("JavaScript")}>JavaScript</button>
            </div>

            {recTab === "C++" && (
              <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
                <pre>{`int binarySearchRecursive(vector<int>& arr, int target, int left, int right) {
    // Base case: search space is exhausted
    if (left > right) {
        return -1;
    }

    int mid = left + (right - left) / 2;

    // Target found
    if (arr[mid] == target) {
        return mid;
    }

    // Search right half
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }

    // Search left half
    return binarySearchRecursive(arr, target, left, mid - 1);
}

// Wrapper function
int binarySearch(vector<int>& arr, int target) {
    return binarySearchRecursive(arr, target, 0, arr.size() - 1);
}`}</pre>
              </div>
            )}

            {recTab === "Java" && (
              <div className="section">
                <div className="code-block"><div className="code-header"><span className="code-language">Java</span></div>
                  <pre>{`public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) {
        return -1;
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    }

    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }

    return binarySearchRecursive(arr, target, left, mid - 1);
}

public static int binarySearch(int[] arr, int target) {
    return binarySearchRecursive(arr, target, 0, arr.length - 1);
}`}</pre>
                </div>
              </div>
            )}

            {recTab === "Python" && (
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1

    mid = left + (right - left) // 2

    if arr[mid] == target:
        return mid

    if arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)

    return binary_search_recursive(arr, target, left, mid - 1)


def binary_search(arr, target):
    return binary_search_recursive(arr, target, 0, len(arr) - 1)`}</pre>
              </div>
            )}

            {recTab === "JavaScript" && (
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function binarySearchRecursive(arr, target, left, right) {
    if (left > right) {
        return -1;
    }

    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
        return mid;
    }

    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }

    return binarySearchRecursive(arr, target, left, mid - 1);
}

function binarySearch(arr, target) {
    return binarySearchRecursive(arr, target, 0, arr.length - 1);
}`}</pre>
              </div>
            )}

          </div>
        </div>
      )}

      {activeTab === "Complexity" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">⏱️ Time & Space Complexity</h2>

            <h3 className="section-subtitle">Iterative Approach:</h3>
            <div className="complexity-box">
              <div className="complexity-item">
                <div className="complexity-label">Time Complexity</div>
                <div className="complexity-value">O(log n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(1)</div>
              </div>
            </div>

            <h3 className="section-subtitle">Recursive Approach:</h3>
            <div className="complexity-box">
              <div className="complexity-item">
                <div className="complexity-label">Time Complexity</div>
                <div className="complexity-value">O(log n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(log n)</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">📊 Complexity Analysis</h2>

            <h3 className="section-subtitle">Time Complexity: O(log n)</h3>
            <p style={{ marginBottom: 12 }}>
              Binary search halves the search space in each iteration. If we start with n elements:
            </p>
            <ul className="styled-list">
              <li>After 1st comparison: n/2 elements remain</li>
              <li>After 2nd comparison: n/4 elements remain</li>
              <li>After 3rd comparison: n/8 elements remain</li>
              <li>After k comparisons: n/2<sup>k</sup> elements remain</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              The algorithm stops when n/2<sup>k</sup> = 1 which gives k = log₂(n). Therefore, the time complexity is <strong>O(log n)</strong>.
            </p>

            <h3 className="section-subtitle" style={{ marginTop: 20 }}>Space Complexity:</h3>
            <p style={{ marginBottom: 8 }}><strong>Iterative:</strong> O(1)</p>
            <ul className="styled-list">
              <li>Uses only a constant amount of extra space for variables (left, right, mid)</li>
              <li>No additional data structures or recursive call stack</li>
            </ul>

            <p style={{ margin: '12px 0' }}><strong>Recursive:</strong> O(log n)</p>
            <ul className="styled-list">
              <li>Each recursive call adds a frame to the call stack</li>
              <li>Maximum depth of recursion is log n (same as time complexity)</li>
              <li>Therefore, space complexity is O(log n) due to the call stack</li>
            </ul>
          </div>

          <div className="section">
            <h2 className="section-title">🆚 Comparison with Linear Search</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 15 }}>
                <thead>
                  <tr style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '2px solid #3b82f6' }}>
                    <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Aspect</th>
                    <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Binary Search</th>
                    <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Linear Search</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: 12 }}>Time Complexity</td>
                    <td style={{ padding: 12, color: '#10b981' }}>O(log n)</td>
                    <td style={{ padding: 12 }}>O(n)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: 12 }}>Space Complexity</td>
                    <td style={{ padding: 12 }}>O(1) iterative</td>
                    <td style={{ padding: 12 }}>O(1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <div className="note-box">
              <div className="note-title">💡 Key Takeaway</div>
              <p>
                Binary Search is <strong>exponentially faster</strong> than Linear Search for large datasets.
                For an array of 1 million elements, binary search needs at most 20 comparisons, while linear
                search would need up to 1 million comparisons in the worst case!
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
