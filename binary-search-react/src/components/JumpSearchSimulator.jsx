import React, { useState } from "react";

export default function JumpSearchSimulator() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [log, setLog] = useState([]);
  const [target, setTarget] = useState(9);
  const [running, setRunning] = useState(false);

  const pushLog = (msg) => setLog((l) => [...l, msg]);
  const clearLog = () => setLog([]);

  const execute = async () => {
    if (running) return;
    setRunning(true);
    clearLog();

    const t = parseInt(target, 10);
    const n = arr.length;
    const blockSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let step = blockSize;

    pushLog(`Start Jump Search for target = ${t}`);
    pushLog(`Array length n = ${n}, Jump step = √${n} = ${blockSize}`);

    while (step < n && arr[step] < t) {
      pushLog(`Jump to index ${step}, arr[${step}] = ${arr[step]} < ${t}?`);
      prev = step;
      step += blockSize;
    }

    if (prev >= n) {
      pushLog("Jumped beyond array. Not Found.");
      setRunning(false);
      return;
    }

    pushLog(`Block found! Linear search from ${prev} to ${Math.min(step, n) - 1}`);

    for (let i = prev; i < Math.min(step, n); i++) {
      pushLog(`Check arr[${i}] = ${arr[i]}`);
      if (arr[i] === t) {
        pushLog(`✓ Found at index ${i}`);
        setRunning(false);
        return;
      }
    }

    pushLog("Not Found");
    setRunning(false);
  };

  return (
    <div className="section">
      <h3 className="section-subtitle">Java Implementation:</h3>
      <div className="code-block">
        <div className="code-header">
          <span className="code-language">Java</span>
        </div>
        <pre>{`public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int)Math.floor(Math.sqrt(n));
    int prev = 0;

    while (step < n && arr[step] < target) {
        prev = step;
        step += (int)Math.floor(Math.sqrt(n));
    }

    if (prev >= n) return -1;

    for (int i = prev; i < Math.min(step, n); i++) {
        if (arr[i] == target) return i;
    }

    return -1;
}`}</pre>
      </div>

      <h2 className="section-title">Jump Search Execution Simulator</h2>
      <div style={{ marginBottom: 12 }}>
        <label style={{ color: 'var(--text-secondary)', fontWeight: 600, marginRight: 8 }}>Target:</label>
        <input type="number" value={target} onChange={(e) => setTarget(e.target.value)}
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 6, width: 100, marginRight: 12 }} />
        <button onClick={execute} className="btn-green">Run</button>
      </div>
      <div className="log-box">
        {log.map((l, i) => (
          <div key={i}>→ {l}</div>
        ))}
      </div>
    </div>
  );
}
