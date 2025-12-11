import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import BubbleSortAnimation from "../components/BubbleSortAnimation";
import BubbleSortSimulator2 from "../components/BubbleSortSimulator2";

export default function BubbleSortPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Bubble Sort" subtitle="Simple comparison-based sorting (swap adjacent)" badge="Sorting Algorithms" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given an array of integers, sort it in ascending order using Bubble Sort — repeatedly traverse the list, compare adjacent elements, and swap them if they are in the wrong order.</p>
            <p style={{ marginBottom: 8 }}>Bubble Sort is a simple, stable, in-place comparison sort useful for teaching and small datasets.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [5, 1, 4, 2, 8]<br />
                <strong>Output:</strong> [1, 2, 4, 5, 8]
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [1, 2, 3, 4]<br />
                <strong>Output:</strong> [1, 2, 3, 4] (already sorted)
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>5</sup> (practical teaching examples; bubble sort is inefficient for very large n)</li>
              <li>-10<sup>9</sup> ≤ arr[i] ≤ 10<sup>9</sup></li>
              <li>Sort should be performed in-place (O(1) extra space)</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p>Bubble sort repeatedly passes through the array and bubbles the largest element to the end in each pass. It's stable and in-place but not efficient for large n.</p>
            <ol className="algo-steps">
              <li>Repeat n-1 passes.</li>
              <li>In each pass, compare adjacent elements and swap if left &gt; right.</li>
              <li>After each pass the largest remaining element is placed at its final position.</li>
            </ol>
          </div>

          <BubbleSortAnimation />

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
              <BubbleSortSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
            <div className="section">
              <h3 className="section-subtitle">C++ Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">C++</span></div>
                <pre>{`void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
        }
    }
}`}</pre>
              </div>
            </div>
          )}

          {langTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">Python</span></div>
                <pre>{`def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`}</pre>
              </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block"><div className="code-header"><span className="code-language">JavaScript</span></div>
                <pre>{`function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        }
    }
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
                <div className="complexity-label">Worst Time</div>
                <div className="complexity-value">O(n^2)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Average Time</div>
                <div className="complexity-value">O(n^2)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space Complexity</div>
                <div className="complexity-value">O(1)</div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p style={{ marginBottom: 12 }}>
                Bubble sort compares adjacent pairs and can perform up to n*(n-1)/2 comparisons and swaps in worst case.
              </p>
              <ul className="styled-list">
                <li>Best-case (already sorted): O(n) if optimized with a swapped flag</li>
                <li>Average/Worst-case: O(n^2) due to nested loops</li>
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
