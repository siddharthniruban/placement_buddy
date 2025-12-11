import React, { useState } from "react";

export default function JavaExecutionSimulator() {
  const arr = [1, 3, 5, 7, 9, 11, 13, 15];
  const [log, setLog] = useState([]);

  const pushLog = (msg) => setLog((l) => [...l, msg]);

  const execute = async () => {
    setLog([]);

    let left = 0;
    let right = arr.length - 1;
    let target = 11;

    pushLog("Start Java Simulation");

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      pushLog(`Checking mid ${mid} => ${arr[mid]}`);

      if (arr[mid] === target) {
        pushLog(`Found at index ${mid}`);
        return;
      }
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    pushLog("Not Found");
  };

  return (
    <div className="section">
      <h2 className="section-title">Java Execution Simulator</h2>
      <button onClick={execute} className="btn-green">Run</button>
      <div className="log-box">
        {log.map((l, i) => (
          <div key={i}>→ {l}</div>
        ))}
      </div>
    </div>
  );
}