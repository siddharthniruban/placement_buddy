import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";

export default function LinearSearchPage() {
  const tabs = ["Problem", "Approach", "Iterative", "Recursive", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [iterTab, setIterTab] = useState("Java");
  const [recTab, setRecTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Linear Search Algorithm" subtitle="Simple sequential search for unsorted arrays" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p style={{ marginBottom: 20 }}>
              Linear Search scans each element of the array one by one until the target is found or the end is reached. It's simple and works on unsorted arrays.
            </p>

            <h3 className="section-subtitle">Core Concept:</h3>
            <ol className="algo-steps">
              <li>Start at index 0 and iterate through the array</li>
              <li>Compare each element with the target</li>
              <li>If an element equals the target, return its index</li>
              <li>If the end is reached without a match, return -1</li>
            </ol>
          </div>

          <div className="section">
            <h2 className="section-title">🎯 Interactive</h2>
            <p style={{ marginBottom: 20 }}>Linear search does not benefit from complex animations — it simply checks elements sequentially. Code examples below show typical implementations.</p>
          </div>
        </div>
      )}

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given an array of n elements and a target value, scan each element sequentially and return its index if found; otherwise return -1.</p>
            <p style={{ marginBottom: 8 }}>Linear Search is simple, works on unsorted arrays, and is useful for small datasets or when simplicity is preferred.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [4, 2, 5, 1], target = 5<br />
                <strong>Output:</strong> 2
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [7, 3, 9], target = 4<br />
                <strong>Output:</strong> -1
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>6</sup></li>
              <li>-10<sup>9</sup> ≤ arr[i], target ≤ 10<sup>9</sup></li>
              <li>No ordering requirement on array elements</li>
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
                <pre>{`int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`}</pre>
              </div>
            </div>
          )}

          {iterTab === "Java" && (
            <div className="section">
              <h3 className="section-subtitle">Java Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Java</span></div>
                <pre>{`public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`}</pre>
              </div>
            </div>
          )}

          {iterTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def linear_search(arr, target):
    for i, v in enumerate(arr):
        if v == target:
            return i
    return -1`}</pre>
              </div>
            </div>
          )}

          {iterTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
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
              Linear search can be implemented recursively by checking the first element and recursing on the rest of the array.
            </p>

            <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
              <pre>{`function linearSearchRecursive(arr, target, idx = 0) {
    if (idx >= arr.length) return -1;
    if (arr[idx] === target) return idx;
    return linearSearchRecursive(arr, target, idx + 1);
}`}</pre>
            </div>
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
                <div className="complexity-value">O(n)</div>
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
                <div className="complexity-value">O(n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(n) (call stack)</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">📊 Complexity Analysis</h2>

            <h3 className="section-subtitle">Time Complexity: O(n)</h3>
            <p style={{ marginBottom: 12 }}>
              Linear search inspects elements one by one. In the worst case it checks all n elements; on average it checks about n/2 elements.
            </p>
            <ul className="styled-list">
              <li>Worst-case: checks all n elements → O(n)</li>
              <li>Average-case: ~n/2 checks → O(n)</li>
              <li>Best-case: first element matches → O(1)</li>
            </ul>

            <h3 className="section-subtitle" style={{ marginTop: 20 }}>Space Complexity:</h3>
            <p style={{ marginBottom: 8 }}><strong>Iterative:</strong> O(1)</p>
            <ul className="styled-list">
              <li>Only a few variables are used (index, target)</li>
              <li>No additional data structures are required</li>
            </ul>

            <div className="section">
              <h2 className="section-title">🆚 Comparison with Binary Search</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 15 }}>
                  <thead>
                    <tr style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '2px solid #3b82f6' }}>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Aspect</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Linear Search</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Binary Search</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Time Complexity</td>
                      <td style={{ padding: 12 }}>O(n)</td>
                      <td style={{ padding: 12, color: '#10b981' }}>O(log n)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Requirement</td>
                      <td style={{ padding: 12 }}>No sorting required (works on unsorted arrays)</td>
                      <td style={{ padding: 12 }}>Requires sorted array</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
