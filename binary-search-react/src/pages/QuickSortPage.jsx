import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import QuickSortAnimation from "../components/QuickSortAnimation";
import QuickSortSimulator2 from "../components/QuickSortSimulator2";

export default function QuickSortPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Quick Sort" subtitle="Divide and conquer pivot-based sort" badge="Sorting Algorithms" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given an array of integers, sort it in ascending order using Quick Sort by selecting a pivot, partitioning the array around the pivot and recursively sorting partitions.</p>
            <p style={{ marginBottom: 8 }}>Quick Sort is efficient on average (O(n log n)) but worst-case O(n²) with poor pivot choices.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [7, 2, 1, 6, 8, 5, 3, 4]<br />
                <strong>Output:</strong> [1, 2, 3, 4, 5, 6, 7, 8]
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [3, 1, 2]<br />
                <strong>Output:</strong> [1, 2, 3]
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>6</sup></li>
              <li>-10<sup>9</sup> ≤ arr[i] ≤ 10<sup>9</sup></li>
              <li>Average-case O(n log n); use randomized pivot or median-of-three to avoid worst-case</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p>Choose a pivot, partition array into <code>&lt;= pivot</code> and <code>&gt; pivot</code> parts, then recurse. Average O(n log n), worst O(n^2).</p>
          </div>

          <QuickSortAnimation />
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
              <QuickSortSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
            <div className="section">
              <h3 className="section-subtitle">C++ Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
                <pre>{`void quickSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int p = partition(arr, l, r);
        quickSort(arr, l, p-1);
        quickSort(arr, p+1, r);
    }
}`}</pre>
              </div>
            </div>
          )}

          {langTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def quicksort(arr):
    if len(arr)<=1: return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x<pivot]
    middle = [x for x in arr if x==pivot]
    right = [x for x in arr if x>pivot]
    return quicksort(left)+middle+quicksort(right)`}</pre>
              </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function quickSort(arr){
    if(arr.length<=1) return arr;
    const pivot = arr[Math.floor(arr.length/2)];
    const left = arr.filter(x=>x<pivot);
    const mid = arr.filter(x=>x===pivot);
    const right = arr.filter(x=>x>pivot);
    return quickSort(left).concat(mid).concat(quickSort(right));
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

            <div className="complexity-box">
              <div className="complexity-item"><div className="complexity-label">Average Time</div><div className="complexity-value">O(n log n)</div></div>
              <div className="complexity-item"><div className="complexity-label">Worst Time</div><div className="complexity-value">O(n^2)</div></div>
              <div className="complexity-item"><div className="complexity-label">Space</div><div className="complexity-value">O(log n) average (recursion)</div></div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p>Quick sort partitions around pivots; average depth of recursion is log n and each level does O(n) work → O(n log n). Poor pivot choices can lead to O(n^2).</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
