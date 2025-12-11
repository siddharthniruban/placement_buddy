import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import HeapSortAnimation from "../components/HeapSortAnimation";
import HeapSortSimulator2 from "../components/HeapSortSimulator2";

export default function HeapSortPage() {
  const tabs = ["Problem", "Approach", "Implementation", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");
  const [langTab, setLangTab] = useState("Java");

  return (
    <div className="container">
      <Header title="Heap Sort" subtitle="Build heap and repeatedly extract max" badge="Sorting Algorithms" />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Problem" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">📋 Problem Statement</h2>
            <p style={{ marginBottom: 12 }}>Given an array of integers, sort it in ascending order using Heap Sort by first building a max-heap and then repeatedly extracting the maximum element to build a sorted array.</p>
            <p style={{ marginBottom: 8 }}>Heap Sort is an in-place comparison-based sorting algorithm with O(n log n) time complexity.</p>
          </div>

          <div className="section">
            <h2 className="section-title">📝 Examples</h2>

            <div className="example-box">
              <div className="example-title">Example 1:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [4, 10, 3, 5, 1, 2, 8, 7]<br />
                <strong>Output:</strong> [1, 2, 3, 4, 5, 7, 8, 10]
              </div>
            </div>

            <div className="example-box">
              <div className="example-title">Example 2:</div>
              <div className="example-content">
                <strong>Input:</strong> arr = [9, 4, 8, 1]<br />
                <strong>Output:</strong> [1, 4, 8, 9]
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">⚙️ Constraints</h2>
            <ul className="styled-list">
              <li>1 ≤ n ≤ 10<sup>6</sup></li>
              <li>-10<sup>9</sup> ≤ arr[i] ≤ 10<sup>9</sup></li>
              <li>In-place sorting; auxiliary space O(1)</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Approach" && (
        <div className="tab-content active">
          <div className="section">
            <h2 className="section-title">💡 Algorithm Approach</h2>
            <p>Build a max-heap in O(n), then swap root with last and heapify reducing heap size — total O(n log n).</p>
          </div>

          <HeapSortAnimation />
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
              <HeapSortSimulator2 />
            </div>
          )}

          {langTab === "C++" && (
            <div className="section">
              <h3 className="section-subtitle">C++ Implementation:</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-language">C++</span>
                </div>
                <pre>{`void heapSort(vector<int>& arr) { buildHeap(arr); for(int i=arr.size()-1;i>0;i--){ swap(arr[0],arr[i]); heapify(arr,0,i); } }`}</pre>
              </div>
            </div>
          )}

          {langTab === "Python" && (
            <div className="section">
              <h3 className="section-subtitle">Python Implementation:</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-language">Python</span>
                </div>
                <pre>{`def heap_sort(arr):\n    import heapq\n    h = [-x for x in arr]\n    heapq.heapify(h)\n    return [-heapq.heappop(h) for _ in range(len(h))]`}</pre>
              </div>
            </div>
          )}

          {langTab === "JavaScript" && (
            <div className="section">
              <h3 className="section-subtitle">JavaScript Implementation:</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-language">JavaScript</span>
                </div>
                <pre>{`function heapSort(arr){ /* build heap and heapify */ }`}</pre>
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
              <div className="complexity-item">
                <div className="complexity-label">Time</div>
                <div className="complexity-value">O(n log n)</div>
              </div>
              <div className="complexity-item">
                <div className="complexity-label">Space</div>
                <div className="complexity-value">O(1)</div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">📊 Complexity Analysis</h2>
              <p>Heap sort builds a heap in O(n) and performs n extract-heap operations costing O(log n) each → O(n log n).</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}