import React, { useState } from "react";

export default function JumpSearchSimulator2() {
  const javaArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [logs, setLogs] = useState([]);
  const [prev, setPrev] = useState(null);
  const [step, setStep] = useState(null);
  const [target, setTarget] = useState(9);
  const [lineHighlight, setLineHighlight] = useState(null);
  const [cellStates, setCellStates] = useState(Array(javaArray.length).fill("default"));
  const [running, setRunning] = useState(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const addLog = (msg) => {
    setLogs((l) => [...l, `→ ${msg}`]);
    setTimeout(() => {
      const el = document.getElementById("jumpExecutionLog");
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  };

  const clearLog = () => setLogs([]);

  const highlightLine = async (num, duration = 800) => {
    setLineHighlight(num);
    await sleep(duration);
  };

  const updateCell = (index, state) => {
    setCellStates((prev) => {
      const next = [...prev];
      next[index] = state;
      return next;
    });
  };

  const resetCells = () => setCellStates(Array(javaArray.length).fill("default"));

  const javaLines = [
    "public static int jumpSearch(int[] arr, int target) {",
    "    int n = arr.length;",
    "    int step = (int)Math.floor(Math.sqrt(n));",
    "    int prev = 0;",
    "    ",
    "    while (step < n && arr[step] < target) {",
    "        prev = step;",
    "        step += (int)Math.floor(Math.sqrt(n));",
    "    }",
    "    ",
    "    if (prev >= n) return -1;",
    "    ",
    "    for (int i = prev; i < Math.min(step, n); i++) {",
    "        if (arr[i] == target) return i;",
    "    }",
    "    ",
    "    return -1;",
    "}"
  ];

  const executeJavaJumpSearch = async (t) => {
    const n = javaArray.length;
    let iteration = 0;

    await highlightLine(1, 600);
    addLog("Entering jumpSearch function");

    await highlightLine(2, 600);
    addLog(`Initialize: n = ${n}`);

    await highlightLine(3, 600);
    const blockSize = Math.floor(Math.sqrt(n));
    setStep(blockSize);
    addLog(`Calculate: step = floor(√${n}) = ${blockSize}`);

    await highlightLine(4, 600);
    setPrev(0);
    addLog(`Initialize: prev = 0`);

    await highlightLine(6, 600);

    let P = 0;
    let S = blockSize;

    while (S < n && javaArray[S] < t) {
      iteration++;
      addLog(`--- Jump ${iteration} ---`);
      addLog(`Checking condition: step(${S}) < n(${n}) && arr[${S}] (${javaArray[S]}) < target(${t}) = true`);

      updateCell(P, "eliminated");
      updateCell(S, "jump");
      await sleep(500);

      await highlightLine(7, 600);
      P = S;
      setPrev(P);
      addLog(`Update: prev = step = ${P}`);

      await highlightLine(8, 600);
      S += blockSize;
      setStep(S);
      addLog(`Update: step = ${P} + ${blockSize} = ${S}`);

      await sleep(400);
      await highlightLine(6, 500);
    }

    addLog(`Checking condition: step(${S}) < n(${n}) && arr[${Math.min(S, n) - 1}] < target(${t}) = false`);
    addLog(`Exiting jump loop - block found`);

    await highlightLine(11, 600);
    addLog(`Checking: prev(${P}) >= n(${n})? ${P >= n}`);

    if (P >= n) {
      addLog(`Returning -1 (target not found)`);
      addLog(`❌ Target ${t} not found in array`);
      return -1;
    }

    await sleep(400);
    await highlightLine(13, 600);
    addLog(`Linear search from prev(${P}) to min(step(${S}), n(${n})) = ${Math.min(S, n)}`);

    for (let i = P; i < Math.min(S, n); i++) {
      await sleep(400);
      await highlightLine(13, 400);
      updateCell(i, "checking");
      addLog(`Check: arr[${i}] = ${javaArray[i]}`);

      await highlightLine(14, 600);
      addLog(`Compare: arr[${i}] (${javaArray[i]}) == target(${t})?`);

      if (javaArray[i] === t) {
        updateCell(i, "found");
        addLog(`✓ Match found! Returning index ${i}`);
        addLog(`🎉 Target ${t} found at index ${i}`);
        return i;
      }

      addLog(`✗ No match. Continue...`);
      updateCell(i, "eliminated");
    }

    await highlightLine(17, 700);
    addLog(`Returning -1 (target not found)`);
    addLog(`❌ Target ${t} not found in array`);
    return -1;
  };

  const startExecution = async () => {
    if (running) {
      addLog('⚠️ Animation already running...');
      return;
    }

    const t = parseInt(target, 10);
    if (isNaN(t)) {
      alert('Please enter a valid number');
      return;
    }

    setRunning(true);
    clearLog();
    resetCells();
    setPrev(null);
    setStep(null);
    setLineHighlight(null);

    await executeJavaJumpSearch(t);

    setRunning(false);
  };

  const resetExecution = () => {
    if (running) {
      alert('Cannot reset while animation is running');
      return;
    }
    setLineHighlight(null);
    resetCells();
    setPrev(null);
    setStep(null);
    clearLog();
  };

  return (
    <div className="section">
      <h2 className="section-title">Java Implementation with Live Execution</h2>

      <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontWeight: 600 }}>Target Value:</label>
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 6, width: 120 }} />
        </div>
        <div style={{ marginTop: 18 }}>
          <button onClick={startExecution} style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 600, marginRight: 10 }}>▶ Execute Code</button>
          <button onClick={resetExecution} style={{ background: 'var(--accent-red)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 600 }}>Reset</button>
        </div>
      </div>

      <div className="code-block" style={{ position: 'relative' }}>
        <div className="code-header">
          <span className="code-language">Java</span>
          <span style={{ fontSize: 12, color: 'var(--accent-green)' }}>● Live Execution</span>
        </div>
        <pre id="javaCode" style={{ lineHeight: 1.8 }}>
          {javaLines.map((line, idx) => (
            <React.Fragment key={idx}>
              <span
                id={`java-line-${idx + 1}`}
                style={{
                  background: lineHighlight === idx + 1 ? 'rgba(245,158,11,0.2)' : 'transparent',
                  borderLeft: lineHighlight === idx + 1 ? '4px solid var(--accent-orange)' : 'none',
                  paddingLeft: lineHighlight === idx + 1 ? 10 : 0,
                }}
              >
                {line}
              </span>
              <br />
            </React.Fragment>
          ))}
        </pre>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 12, marginTop: 12 }}>
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid var(--accent-blue)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>PREV</div>
          <div style={{ fontSize: 18, color: 'var(--accent-blue)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{prev !== null ? prev : '-'}</div>
        </div>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid var(--accent-orange)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>STEP</div>
          <div style={{ fontSize: 18, color: 'var(--accent-orange)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{step !== null ? step : '-'}</div>
        </div>
        <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid var(--accent-purple)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>TARGET</div>
          <div style={{ fontSize: 18, color: 'var(--accent-purple)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{target !== null ? target : '-'}</div>
        </div>
      </div>

      <div id="jumpArrayContainer" style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        {javaArray.map((v, i) => (
          <div key={i} style={{ width: 50, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', border: `2px solid var(--border)`, borderRadius: 8, fontFamily: 'Fira Code, monospace', fontWeight: 600, color: 'var(--text-primary)', transition: 'all 0.35s ease', ...(cellStates[i] === 'jump' ? { borderColor: 'var(--accent-orange)', background: 'rgba(245,158,11,0.3)', transform: 'scale(1.15) translateY(-8px)', boxShadow: '0 4px 20px rgba(245,158,11,0.5)' } : {}), ...(cellStates[i] === 'checking' ? { borderColor: 'var(--accent-blue)', background: 'rgba(59,130,246,0.2)', transform: 'translateY(-5px)' } : {}), ...(cellStates[i] === 'found' ? { borderColor: 'var(--accent-green)', background: 'rgba(16,185,129,0.35)', transform: 'scale(1.25) translateY(-10px)', boxShadow: '0 4px 25px rgba(16,185,129,0.6)' } : {}), ...(cellStates[i] === 'eliminated' ? { opacity: 0.25, transform: 'scale(0.85)' } : {}) }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 2 }}>[{i}]</div>
            <div>{v}</div>
          </div>
        ))}
      </div>

      <div id="jumpExecutionLog" style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '4px solid var(--accent-green)', padding: 12, borderRadius: 6, marginTop: 10, minHeight: 60, maxHeight: 160, overflowY: 'auto' }}>
        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: 6 }}>Execution Log:</div>
        <div style={{ color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace', fontSize: 13 }}>{logs.length ? logs.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />) : 'Click "Execute Code" to start'}</div>
      </div>
    </div>
  );
}
