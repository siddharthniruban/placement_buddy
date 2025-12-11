import React, { useState } from "react";
import BinarySearchPageFixed from "./pages/BinarySearchPageFixed";
import LinearSearchPage from "./pages/LinearSearchPage";
import JumpSearchPage from "./pages/JumpSearchPage";
import InterpolationSearchPage from "./pages/InterpolationSearchPage";
const BubbleSortPage = React.lazy(() => import("./pages/BubbleSortPage"));
const MergeSortPage = React.lazy(() => import("./pages/MergeSortPage"));
const QuickSortPage = React.lazy(() => import("./pages/QuickSortPage"));
const HeapSortPage = React.lazy(() => import("./pages/HeapSortPage"));

export default function App() {
  const [selected, setSelected] = useState("Binary Search");
  const searchAlgos = ["Binary Search", "Linear Search", "Jump Search", "Interpolation Search"];
  const sortAlgos = ["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"];

  const btnStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    margin: '8px 0',
    padding: '10px 12px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="topbar" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="brand" style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: 18 }}>Company Name</div>
        <div style={{ flex: 1 }}>
          <input className="search-input" placeholder="Search algorithm or topic..." />
        </div>
        <button className="login-btn">Login</button>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ width: 240, padding: 20, background: 'var(--bg-card)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent-blue)' }}>Searching Algorithms</h3>
          {searchAlgos.map((a) => (
            <button
              key={a}
              onClick={() => setSelected(a)}
              className={"alg-btn " + (selected === a ? "active" : "")}
              style={btnStyle}
            >
              {a}
            </button>
          ))}

          <h3 style={{ marginTop: 18, color: 'var(--accent-blue)' }}>Sorting Algorithms</h3>
          {sortAlgos.map((a) => (
          <button
            key={a}
            onClick={() => setSelected(a)}
            className={"alg-btn " + (selected === a ? "active" : "")}
            style={btnStyle}
          >
            {a}
          </button>
        ))}
        </div>

        <div style={{ flex: 1, padding: 20 }}>
          <React.Suspense fallback={<div>Loading...</div>}>
          {selected === "Binary Search" ? (
            <BinarySearchPageFixed />
          ) : selected === "Linear Search" ? (
            <LinearSearchPage />
          ) : selected === "Jump Search" ? (
            <JumpSearchPage />
          ) : selected === "Interpolation Search" ? (
            <InterpolationSearchPage />
          ) : selected === "Bubble Sort" ? (
            <BubbleSortPage />
          ) : selected === "Merge Sort" ? (
            <MergeSortPage />
          ) : selected === "Quick Sort" ? (
            <QuickSortPage />
          ) : selected === "Heap Sort" ? (
            <HeapSortPage />
          ) : (
            <div className="container">
              <h2 style={{ color: 'var(--accent-blue)' }}>{selected}</h2>
              <div className="section">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Template for {selected} will use the same layout as Binary Search; content can be added here.
                </p>
              </div>
            </div>
          )}
        </React.Suspense>
        </div>
      </div>
    </div>
  );
}
