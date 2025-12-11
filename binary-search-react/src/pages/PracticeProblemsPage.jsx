import React, { useState } from "react";
import Header from "../components/Header";

// Simple BarGraph component: receives array of numbers and highlights via colors
function BarGraph({ values, highlight = [] }) {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display: "flex", alignItems: "end", gap: 8, padding: 12 }}>
      {values.map((v, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div
            style={{
              height: `${(v / max) * 160}px`,
              width: 28,
              background: highlight.includes(i) ? "#4aa3ff" : "#8fc1ff",
              borderRadius: 4,
              transition: "height 300ms, background 200ms",
            }}
          />
          <div style={{ marginTop: 6, fontSize: 12 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

export default function PracticeProblemsPage() {
  const problems = [
    {
      id: "two-sum",
      title: "Two Sum (Array + Hash)",
      desc: "Given an array and a target, return indices of two numbers that add up to target.",
      example: { input: "[2,7,11,15], target = 9", output: "[0,1]" },
      arr: [2, 7, 11, 15],
    },
    {
      id: "search-rotated",
      title: "Search in Rotated Sorted Array",
      desc: "Search a target in a rotated sorted array in O(log n) using modified binary search.",
      example: { input: "[4,5,6,7,0,1,2], target = 0", output: 4 },
      arr: [4, 5, 6, 7, 0, 1, 2],
    },
    {
      id: "find-duplicate",
      title: "Find Duplicate Number",
      desc: "Find the duplicate in an array where values are in range [1,n] using cycle detection or binary search on value.",
      example: { input: "[1,3,4,2,2]", output: 2 },
      arr: [1, 3, 4, 2, 2],
    },
  ];

  const [selected, setSelected] = useState(problems[0].id);
  const current = problems.find((p) => p.id === selected);

  return (
    <div className="container" style={{ paddingBottom: 48 }}>
      <Header title="Practice Problems" subtitle="Search & Sort Interview Questions" />

      <div style={{ display: "flex", gap: 24, marginTop: 18 }}>
        <div style={{ width: 320 }}>
          <h3 style={{ marginBottom: 8 }}>Problems</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  textAlign: "left",
                  padding: 12,
                  borderRadius: 8,
                  border: selected === p.id ? "2px solid #4aa3ff" : "1px solid #e6eefc",
                  background: selected === p.id ? "#f2f9ff" : "#fff",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ padding: 16, borderRadius: 8, background: "#fff", border: "1px solid #e6eefc" }}>
            <h2 style={{ marginTop: 0 }}>{current.title}</h2>
            <p style={{ color: "#333" }}>{current.desc}</p>

            <div style={{ marginTop: 12 }}>
              <strong>Example:</strong>
              <div style={{ marginTop: 8, padding: 12, background: "#f9fbff", borderRadius: 6 }}>
                <div style={{ fontSize: 13 }}>
                  <strong>Input:</strong> {current.example.input}
                </div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  <strong>Output:</strong> {String(current.example.output)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <strong>Visual Representation</strong>
              <div style={{ marginTop: 10, padding: 12, borderRadius: 6, background: "#fbfdff" }}>
                <BarGraph values={current.arr} />
                <div style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
                  The bar-graph above represents the array values visually; heights are proportional to values. Use this to
                  step through algorithms when practising.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <strong>Hints & Approaches</strong>
              <ul style={{ marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}>
                  Two Sum: use a hash map to store complements; one-pass solution in O(n) time and O(n) space.
                </li>
                <li style={{ marginBottom: 6 }}>
                  Search in Rotated Array: find pivot with binary-search-style checks; then binary search in appropriate s
ide.
                </li>
                <li>
                  Find Duplicate: use Floyd's Tortoise and Hare cycle detection or binary search on value range for O(n log n)
 or O(n) solutions.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
