import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import MergeSortAnimation from "../components/MergeSortAnimation";
import MergeSortSimulator2 from "../components/MergeSortSimulator2";

export default function MergeSortPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Merge Sort" subtitle="Divide and conquer stable sort (merge)" badge="Sorting Algorithms" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given an array of integers, sort it in ascending order using Merge Sort by dividing the array into halves, sorting each half and merging them.</p>
            <p style={{ marginBottom: 8 }}>Merge Sort is a stable divide-and-conquer algorithm with guaranteed O(n log n) time.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [8, 4, 5, 3, 7, 2, 6, 1]<br />
                <strong>Output:</strong> [1, 2, 3, 4, 5, 6, 7, 8]
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [2, 1]<br />
                <strong>Output:</strong> [1, 2]
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>6</sup></li>
              <li>-10<sup>9</sup> ≤ arr[i] ≤ 10<sup>9</sup></li>
              <li>Stable sort using O(n) extra space for merging</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p>Merge sort divides the array into halves recursively, sorts each half and merges them. It is stable and runs in O(n log n).</p>
          </div>

          <MergeSortAnimation />
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
              <MergeSortSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
            <div className="section">
              <h3 className="section-subtitle">C++ Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
                <pre>{`void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}`}</pre>
              </div>
            </div>
          )}

          {langTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr)//2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)`}</pre>
              </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left,right);
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
              <div className="complexity-item"><div className="complexity-label">Time</div><div className="complexity-value">O(n log n)</div></div>
              <div className="complexity-item"><div className="complexity-label">Space</div><div className="complexity-value">O(n)</div></div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p>Merge sort divides into halves (log n levels) and merges n elements per level → O(n log n). It uses extra space for merging.</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
