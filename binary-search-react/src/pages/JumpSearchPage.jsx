import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import JumpSearchAnimation from "../components/JumpSearchAnimation";
import JumpSearchSimulator2 from "../components/JumpSearchSimulator2";

export default function JumpSearchPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Jump Search Algorithm" subtitle="Search by jumping fixed steps (√n) then linear scan" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given a sorted array of n elements and a target value, locate the target using Jump Search: jump ahead by fixed steps (usually √n) to find the block where the target may be, then perform a linear scan within that block. Return the index if found; otherwise return -1.</p>
            <p style={{ marginBottom: 8 }}>Jump Search is useful on sorted arrays as a middle-ground between linear and binary search.</p>

            <div className="section">
              <h2 className="section-title">📝 Examples</h2>

              <div className="example-box">
                <div className="example-title">Example 1:</div>
                <div className="example-content">
                  <strong>Input:</strong> arr = [0,1,2,3,4,5,6,7,8,9], target = 7<br />
                  <strong>Output:</strong> 7
                </div>
              </div>

              <div className="example-box">
                <div className="example-title">Example 2:</div>
                <div className="example-content">
                  <strong>Input:</strong> arr = [2,4,6,8,10], target = 5<br />
                  <strong>Output:</strong> -1
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">⚙️ Constraints</h2>
              <ul className="styled-list">
                <li>1 ≤ n ≤ 10<sup>6</sup></li>
                <li>Array must be sorted in ascending order</li>
                <li>-10<sup>9</sup> ≤ arr[i], target ≤ 10<sup>9</sup></li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p style={{ marginBottom: 20 }}>
              Jump Search works on sorted arrays. We jump ahead by fixed steps (usually sqrt(n)) to find a block where target may reside, then perform a linear search inside that block.
            </p>

            <h3 className="section-subtitle">Core Concept:</h3>
            <ol className="algo-steps">
              <li>Choose step = floor(sqrt(n)).</li>
              <li>Jump from index 0 to step, 2*step, ... until an element >= target or end.</li>
              <li>When a block is found, do linear search within the previous block.</li>
              <li>Return the index if found, otherwise return -1.</li>
            </ol>
          </div>

          <JumpSearchAnimation />

          <div className="section">
            <div className="note-box">
              <div className="note-title">⚠️ Important Note</div>
              <p>Jump Search only works on sorted arrays. The optimal jump size is √n which balances between linear and binary search.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Implementation" && (
        <div className="tab-content active">
          <div className="tabs" style={{ marginBottom: 12 }}>
            <button className={"tab " + (langTab === "Java" ? "active" : "")} onClick={() => setLangTab("Java")}>Java</button>
            <button className={"tab " + (langTab === "C++" ? "active" : "")} onClick={() => setLangTab("C++")}>C++</button>
            <button className={"tab " + (langTab === "Python" ? "active" : "")} onClick={() => setLangTab("Python")}>Python</button>
            <button className={"tab " + (langTab === "JavaScript" ? "active" : "")} onClick={() => setLangTab("JavaScript")}>JavaScript</button>
          </div>

          {langTab === "Java" && (
            <div>
              <JumpSearchSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
          <div className="section">
            <h3 className="section-subtitle">C++ Implementation:</h3>
            <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
              <pre>{`int jumpSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int step = floor(sqrt(n));
    int prev = 0;

    while (prev < n && arr[min(step, n)-1] < target) {
        prev = step;
        step += floor(sqrt(n));
        if (prev >= n) return -1;
    }

    for (int i = prev; i < min(step, n); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`}</pre>
            </div>
          </div>
          )}

          {langTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
            <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
              <pre>{`import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    while prev < n and arr[min(step, n)-1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    return -1`}</pre>
            </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
            <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
              <pre>{`function jumpSearch(arr, target) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (prev < n && arr[Math.min(step, n)-1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }

    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`}</pre>
            </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "Complexity" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">⏱️ Time & Space Complexity</h2>

            <h3 className="section-subtitle">Overall:</h3>
            <div className="complexity-box">
              <div className="complexity-item">
                <div className="complexity-label">Time Complexity</div>
                <div className="complexity-value">O(√n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(1)</div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p style={{ marginBottom: 12 }}>
                With jump size k, number of jumps ≈ n/k and linear scan within block costs up to k. Optimal k = √n balances both giving O(√n).
              </p>
              <ul className="styled-list">
                <li>Jump steps: ~n/k</li>
                <li>Linear scan inside block: ≤ k</li>
                <li>Total work: O(n/k + k) — minimised when k = √n → O(√n)</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">🆚 Comparison</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 15 }}>
                  <thead>
                    <tr style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '2px solid #3b82f6' }}>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Aspect</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Jump Search</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Binary Search</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Linear Search</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Time Complexity</td>
                      <td style={{ padding: 12, color: '#10b981' }}>O(√n)</td>
                      <td style={{ padding: 12 }}>O(log n)</td>
                      <td style={{ padding: 12 }}>O(n)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Best Use</td>
                      <td style={{ padding: 12 }}>Sorted arrays where jumping helps (middle ground)</td>
                      <td style={{ padding: 12 }}>Sorted arrays, large datasets</td>
                      <td style={{ padding: 12 }}>Small or unsorted arrays</td>
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
