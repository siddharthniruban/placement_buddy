import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import InterpolationSearchAnimation from "../components/InterpolationSearchAnimation";
import InterpolationSearchSimulator2 from "../components/InterpolationSearchSimulator2";

export default function InterpolationSearchPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Interpolation Search Algorithm" subtitle="Estimate position using interpolation; best for uniform distributions" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given a sorted array (preferably uniformly distributed) and a target value, find the target using Interpolation Search which estimates the likely position using linear interpolation. Return the index if found; otherwise return -1.</p>
            <p style={{ marginBottom: 8 }}>Interpolation Search performs well on uniformly distributed data and can be faster than binary search on average.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [1,3,7,11,15,20,25,30], target = 15<br />
                <strong>Output:</strong> 4
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
              <li>Best used when values are uniformly distributed</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p style={{ marginBottom: 20 }}>
              Interpolation Search estimates the probable position of the target using a formula derived from linear interpolation between the low and high values. Works best on uniformly distributed arrays.
            </p>

            <h3 className="section-subtitle">Core Concept:</h3>
            <ol className="algo-steps">
              <li>Start with low = 0 and high = n - 1</li>
              <li>Calculate pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))</li>
              <li>Check arr[pos]; adjust low/high accordingly and repeat.</li>
              <li>Return index if found, otherwise return -1.</li>
            </ol>
          </div>

          <InterpolationSearchAnimation />

          <div className="section">
            <div className="note-box">
              <div className="note-title">⚠️ Important Note</div>
              <p>Interpolation Search works best with uniformly distributed data. For skewed distributions, it may perform worse than binary search.</p>
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
              <InterpolationSearchSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
          <div className="section">
            <h3 className="section-subtitle">C++ Implementation:</h3>
            <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
              <pre>{`int interpolationSearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        int pos = low + ((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]);
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
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
              <pre>{`def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        pos = low + int(((high - low) / (arr[high] - arr[low])) * (target - arr[low]))
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`}</pre>
            </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
            <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
              <pre>{`function interpolationSearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) return arr[low] === target ? low : -1;
        const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
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
                <div className="complexity-label">Average Time</div>
                <div className="complexity-value">O(log log n) (uniform distribution)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Worst-case Time</div>
                <div className="complexity-value">O(n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(1)</div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p style={{ marginBottom: 12 }}>
                Interpolation search attempts to estimate the position of the target using linear interpolation. On uniformly distributed arrays, it homes in faster than binary search, often taking O(log log n) time.
              </p>

              <ul className="styled-list">
                <li>Formula: pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))</li>
                <li>Average-case: near O(log log n) when data is uniform</li>
                <li>Worst-case: if distribution is skewed or values cause poor probes, it can degrade to O(n)</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">🆚 Comparison</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 15 }}>
                  <thead>
                    <tr style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '2px solid #3b82f6' }}>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Aspect</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Interpolation Search</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Binary Search</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#3b82f6' }}>Linear Search</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Expected Time</td>
                      <td style={{ padding: 12, color: '#10b981' }}>O(log log n) (uniform)</td>
                      <td style={{ padding: 12 }}>O(log n)</td>
                      <td style={{ padding: 12 }}>O(n)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: 12 }}>Use Case</td>
                      <td style={{ padding: 12 }}>Uniformly distributed, sorted arrays</td>
                      <td style={{ padding: 12 }}>Any sorted arrays</td>
                      <td style={{ padding: 12 }}>Unsorted or small arrays</td>
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
