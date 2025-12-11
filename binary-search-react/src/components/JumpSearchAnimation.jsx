import React, { useState, useEffect } from "react";

export default function JumpSearchAnimation() {
  const baseArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [cells, setCells] = useState(Array(baseArray.length).fill("default"));
  const [status, setStatus] = useState("Click Start Search");
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(9);
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

  const animateJumpSearch = async (t) => {
    const n = baseArray.length;
    const blockSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let jumpStep = blockSize;
    let s = 0;

    setStatus(`Starting Jump Search for target ${t}. Jump size = √${n} = ${blockSize}`);
    await sleep(800);

    while (jumpStep < n && baseArray[jumpStep] < t) {
      s++;
      setStep(s);

      for (let i = 0; i < prev; i++) updateCell(i, "eliminated");
      updateCell(prev, "jump");
      updateCell(jumpStep, "jump");
      setStatus(`Step ${s}: Jump from index ${prev} to ${jumpStep}, arr[${jumpStep}] = ${baseArray[jumpStep]} < ${t}`);
      await sleep(700);

      prev = jumpStep;
      jumpStep += blockSize;
    }

    if (prev >= n) {
      setStatus(`❌ Jumped beyond array. Target ${t} not found.`);
      return -1;
    }

    s++;
    setStep(s);
    const endIdx = Math.min(jumpStep, n);
    setStatus(`Step ${s}: Found block! Performing linear search from index ${prev} to ${endIdx - 1}`);
    await sleep(700);

    for (let i = prev; i < endIdx; i++) {
      s++;
      setStep(s);
      updateCell(i, "checking");
      setStatus(`Step ${s}: Linear search - checking arr[${i}] = ${baseArray[i]}`);
      await sleep(600);

      if (baseArray[i] === t) {
        updateCell(i, "found");
        setStatus(`🎉 Target ${t} found at index ${i}! Search completed in ${s} steps.`);
        return i;
      }
      updateCell(i, "eliminated");
    }

    setStatus(`❌ Target ${t} not found in the array.`);
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
    setStatus(`🔍 Starting jump search for target: ${t}...`);
    await sleep(800);

    await animateJumpSearch(t);
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
      width: 50,
      height: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-card)",
      border: `2px solid var(--border)`,
      borderRadius: 8,
      fontFamily: "Fira Code, monospace",
      fontWeight: 600,
      fontSize: 14,
      color: "var(--text-primary)",
      position: "relative",
      transition: "all 0.35s ease",
    };

    switch (state) {
      case "jump":
        return { ...base, borderColor: "var(--accent-orange)", background: "rgba(245,158,11,0.2)", transform: 'scale(1.15) translateY(-8px)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' };
      case "checking":
        return { ...base, borderColor: "var(--accent-blue)", background: "rgba(59,130,246,0.15)", transform: 'translateY(-5px)' };
      case "found":
        return { ...base, borderColor: "var(--accent-green)", background: "rgba(16,185,129,0.28)", transform: 'scale(1.2) translateY(-10px)', boxShadow: '0 4px 25px rgba(16,185,129,0.5)' };
      case "eliminated":
        return { ...base, opacity: 0.28, transform: 'scale(0.9)' };
      default:
        return base;
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Jump Search Animation</h2>

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
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 2 }}>{index}</div>
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
