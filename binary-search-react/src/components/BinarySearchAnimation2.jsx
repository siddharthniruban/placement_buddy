import React, { useState, useEffect } from "react";

export default function BinarySearchAnimation2() {
  const baseArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const [cells, setCells] = useState(Array(baseArray.length).fill("default"));
  const [status, setStatus] = useState("Click Start Search");
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(11);
  const [animationInProgress, setAnimationInProgress] = useState(false);

  useEffect(() => {
    setCells(Array(baseArray.length).fill("default"));
  }, []);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const updateCell = (index, state) => {
    setCells((prev) => {
      const next = [...prev];
      next[index] = state;
      return next;
    });
  };

  const resetAllCells = () => {
    setCells(Array(baseArray.length).fill("default"));
  };

  const animateBinarySearch = async (t) => {
    let left = 0;
    let right = baseArray.length - 1;
    let s = 0;

    while (left <= right) {
      s++;
      setStep(s);

      const mid = Math.floor(left + (right - left) / 2);

      // highlight active range
      for (let i = 0; i < baseArray.length; i++) {
        if (i < left || i > right) updateCell(i, "eliminated");
        else updateCell(i, "active");
      }
      await sleep(400);

      updateCell(left, "left");
      updateCell(right, "right");
      setStatus(`Step ${s}: Checking range [${left}, ${right}] → left = ${baseArray[left]}, right = ${baseArray[right]}`);
      await sleep(600);

      updateCell(mid, "mid");
      setStatus(`Step ${s}: Middle index = ${mid}, value = ${baseArray[mid]}, target = ${t}`);
      await sleep(700);

      if (baseArray[mid] === t) {
        updateCell(mid, "found");
        setStatus(`🎉 Target ${t} found at index ${mid}! Search completed in ${s} steps.`);
        return mid;
      }

      if (baseArray[mid] < t) {
        setStatus(`Step ${s}: ${baseArray[mid]} < ${t} → Search right half`);
        for (let i = left; i <= mid; i++) updateCell(i, "eliminated");
        left = mid + 1;
      } else {
        setStatus(`Step ${s}: ${baseArray[mid]} > ${t} → Search left half`);
        for (let i = mid; i <= right; i++) updateCell(i, "eliminated");
        right = mid - 1;
      }

      await sleep(800);
      setCells((prev) => prev.map((c) => (c === "eliminated" ? "eliminated" : "default")));
      await sleep(200);
    }

    setStatus(`❌ Target ${t} not found in the array. Search completed in ${s} steps.`);
    return -1;
  };

  const start = async () => {
    if (animationInProgress) {
      setStatus("⚠️ Animation already in progress. Please wait...");
      return;
    }

    const t = parseInt(target, 10);
    if (isNaN(t)) {
      setStatus("❌ Please enter a valid number");
      return;
    }

    setAnimationInProgress(true);
    resetAllCells();
    setStep(0);
    setStatus(`🔍 Starting binary search for target: ${t}...`);
    await sleep(800);

    await animateBinarySearch(t);
    setAnimationInProgress(false);
  };

  const reset = () => {
    if (animationInProgress) {
      setStatus("⚠️ Cannot reset while animation is running");
      return;
    }
    resetAllCells();
    setStep(0);
    setStatus('Click "Start Search" to begin the animation');
  };

  const cellStyle = (state) => {
    const base = {
      width: 60,
      height: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-card)",
      border: `2px solid var(--border)`,
      borderRadius: 8,
      fontFamily: "Fira Code, monospace",
      fontWeight: 600,
      fontSize: 16,
      color: "var(--text-primary)",
      position: "relative",
      transition: "all 0.35s ease",
    };

    switch (state) {
      case "left":
        return { ...base, borderColor: "var(--accent-green)", background: "rgba(16,185,129,0.15)", transform: 'translateY(-5px)' };
      case "right":
        return { ...base, borderColor: "var(--accent-red)", background: "rgba(239,68,68,0.15)", transform: 'translateY(-5px)' };
      case "mid":
        return { ...base, borderColor: "var(--accent-orange)", background: "rgba(245,158,11,0.2)", transform: 'scale(1.15) translateY(-8px)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' };
      case "found":
        return { ...base, borderColor: "var(--accent-green)", background: "rgba(16,185,129,0.28)", transform: 'scale(1.2) translateY(-10px)', boxShadow: '0 4px 25px rgba(16,185,129,0.5)' };
      case "eliminated":
        return { ...base, opacity: 0.28, transform: 'scale(0.9)' };
      case "active":
        return { ...base, opacity: 1, transform: 'scale(1)' };
      default:
        return base;
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Binary Search Animation</h2>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: 'var(--text-secondary)', fontWeight: 600, marginRight: 8 }}>Target to Search:</label>
        <input type="number" value={target} onChange={(e) => setTarget(e.target.value)}
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 6, width: 120, marginRight: 12 }} />
        <button onClick={start} className="btn-blue" style={{ marginRight: 8 }}>Start Search</button>
        <button onClick={reset} className="btn-green">Reset</button>
      </div>

      <div id="arrayContainer" style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
        {baseArray.map((value, index) => (
          <div key={index} id={`cell-${index}`} style={cellStyle(cells[index])}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{index}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>

      <div id="statusDisplay" style={{ background: 'rgba(59,130,246,0.08)', borderLeft: '4px solid var(--accent-blue)', padding: 12, borderRadius: 6, minHeight: 60 }}>
        <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 6 }}>Status:</div>
        <div id="statusText" style={{ color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: status }} />
      </div>

      <div style={{ textAlign: 'center', marginTop: 14, color: 'var(--text-secondary)', fontSize: 13 }}>
        <span style={{ fontWeight: 600 }}>Step:</span> <span id="stepCounter">{step}</span>
      </div>
    </div>
  );
}
