import React, { useState } from "react";

export default function InterpolationSearchSimulator() {
  const arr = [1, 3, 7, 11, 15, 20, 25, 30, 36, 42, 50, 58, 65, 72, 80, 90];
  const [log, setLog] = useState([]);
  const [target, setTarget] = useState(36);
  const [running, setRunning] = useState(false);

  const pushLog = (msg) => setLog((l) => [...l, msg]);
  const clearLog = () => setLog([]);

  const execute = async () => {
    if (running) return;
    setRunning(true);
    clearLog();

    const t = parseInt(target, 10);
    let low = 0;
    let high = arr.length - 1;

    pushLog(`Start Interpolation Search for target = ${t}`);

    while (low <= high && t >= arr[low] && t <= arr[high]) {
      if (low === high) {
        if (arr[low] === t) {
          pushLog(`✓ Found at index ${low}`);
        } else {
          pushLog("Not Found");
        }
        setRunning(false);
        return;
      }

      const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (t - arr[low]));
      pushLog(`Interpolate: pos = ${low} + ((${t} - ${arr[low]}) * (${high} - ${low}) / (${arr[high]} - ${arr[low]})) = ${pos}`);
      pushLog(`Check arr[${pos}] = ${arr[pos]}`);

      if (arr[pos] === t) {
        pushLog(`✓ Found at index ${pos}`);
        setRunning(false);
        return;
      }

      if (arr[pos] < t) {
        pushLog(`${arr[pos]} < ${t}, search right half`);
        low = pos + 1;
      } else {
        pushLog(`${arr[pos]} > ${t}, search left half`);
        high = pos - 1;
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
        <pre>{`public static int interpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        int pos = low + (int)(((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}`}</pre>
      </div>

      <h2 className="section-title">Interpolation Search Execution Simulator</h2>
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
