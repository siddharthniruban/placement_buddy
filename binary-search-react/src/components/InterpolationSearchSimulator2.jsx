import React, { useState } from "react";

export default function InterpolationSearchSimulator2() {
  const javaArray = [1, 3, 7, 11, 15, 20, 25, 30, 36, 42, 50, 58, 65, 72, 80, 90];
  const [logs, setLogs] = useState([]);
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [pos, setPos] = useState(null);
  const [target, setTarget] = useState(36);
  const [lineHighlight, setLineHighlight] = useState(null);
  const [cellStates, setCellStates] = useState(Array(javaArray.length).fill("default"));
  const [running, setRunning] = useState(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const addLog = (msg) => {
    setLogs((l) => [...l, `→ ${msg}`]);
    setTimeout(() => {
      const el = document.getElementById("interpolationExecutionLog");
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
    "public static int interpolationSearch(int[] arr, int target) {",
    "    int low = 0, high = arr.length - 1;",
    "    ",
    "    while (low <= high && target >= arr[low] && target <= arr[high]) {",
    "        if (low == high) {",
    "            if (arr[low] == target) return low;",
    "            return -1;",
    "        }",
    "        int pos = low + (int)(((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));",
    "        if (arr[pos] == target) return pos;",
    "        if (arr[pos] < target) low = pos + 1;",
    "        else high = pos - 1;",
    "    }",
    "    ",
    "    return -1;",
    "}"
  ];

  const executeJavaInterpolationSearch = async (t) => {
    let L = 0;
    let H = javaArray.length - 1;
    let iteration = 0;

    await highlightLine(1, 600);
    addLog("Entering interpolationSearch function");

    await highlightLine(2, 600);
    setLow(L);
    setHigh(H);
    addLog(`Initialize: low = ${L}, high = ${H}`);

    await highlightLine(4, 600);

    while (L <= H && t >= javaArray[L] && t <= javaArray[H]) {
      iteration++;
      addLog(`--- Iteration ${iteration} ---`);
      addLog(`Checking condition: low(${L}) <= high(${H}) && target(${t}) in range [${javaArray[L]}, ${javaArray[H]}] = true`);

      for (let i = 0; i < javaArray.length; i++) {
        if (i < L || i > H) updateCell(i, "eliminated");
        else updateCell(i, "active");
      }
      await sleep(500);

      await highlightLine(5, 600);
      addLog(`Check: low(${L}) == high(${H})? ${L === H}`);

      if (L === H) {
        await highlightLine(6, 600);
        if (javaArray[L] === t) {
          updateCell(L, "found");
          addLog(`✓ arr[${L}] == target, returning ${L}`);
          addLog(`🎉 Target ${t} found at index ${L}`);
          return L;
        }
        await highlightLine(7, 600);
        addLog(`✗ arr[${L}] != target, returning -1`);
        addLog(`❌ Target ${t} not found`);
        return -1;
      }

      await highlightLine(9, 700);
      const P = L + Math.floor(((H - L) / (javaArray[H] - javaArray[L])) * (t - javaArray[L]));
      setPos(P);
      addLog(`Calculate interpolated position:`);
      addLog(`pos = ${L} + ((${t} - ${javaArray[L]}) * (${H} - ${L}) / (${javaArray[H]} - ${javaArray[L]})) = ${P}`);

      updateCell(L, "low");
      updateCell(H, "high");
      updateCell(P, "probe");
      await sleep(700);

      await highlightLine(10, 700);
      addLog(`Check: arr[${P}] (${javaArray[P]}) == target (${t})?`);

      if (javaArray[P] === t) {
        updateCell(P, "found");
        addLog(`✓ Match found! Returning index ${P}`);
        addLog(`🎉 Target ${t} found at index ${P}`);
        return P;
      }

      addLog(`✗ No match. Continue searching...`);
      await sleep(400);

      await highlightLine(11, 700);
      addLog(`Check: arr[${P}] (${javaArray[P]}) < target (${t})?`);

      if (javaArray[P] < t) {
        await sleep(400);
        addLog(`✓ True. Search right half.`);
        for (let i = L; i <= P; i++) updateCell(i, "eliminated");
        L = P + 1;
        setLow(L);
        addLog(`Update: low = ${P} + 1 = ${L}`);
        await sleep(600);
      } else {
        await sleep(400);
        await highlightLine(12, 700);
        addLog(`✗ False. Search left half.`);
        for (let i = P; i <= H; i++) updateCell(i, "eliminated");
        H = P - 1;
        setHigh(H);
        addLog(`Update: high = ${P} - 1 = ${H}`);
        await sleep(600);
      }

      resetCells();
      await highlightLine(4, 500);
    }

    addLog(`Checking condition: low(${L}) <= high(${H}) = false or target out of range`);
    addLog(`Exiting loop - target not found`);
    await sleep(400);

    await highlightLine(15, 700);
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
    setLow(null);
    setHigh(null);
    setPos(null);
    setLineHighlight(null);

    await executeJavaInterpolationSearch(t);

    setRunning(false);
  };

  const resetExecution = () => {
    if (running) {
      alert('Cannot reset while animation is running');
      return;
    }
    setLineHighlight(null);
    resetCells();
    setLow(null);
    setHigh(null);
    setPos(null);
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
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>LOW</div>
          <div style={{ fontSize: 18, color: 'var(--accent-blue)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{low !== null ? low : '-'}</div>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid var(--accent-red)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>HIGH</div>
          <div style={{ fontSize: 18, color: 'var(--accent-red)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{high !== null ? high : '-'}</div>
        </div>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid var(--accent-orange)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>POS</div>
          <div style={{ fontSize: 18, color: 'var(--accent-orange)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{pos !== null ? pos : '-'}</div>
        </div>
        <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid var(--accent-purple)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>TARGET</div>
          <div style={{ fontSize: 18, color: 'var(--accent-purple)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{target !== null ? target : '-'}</div>
        </div>
      </div>

      <div id="interpolationArrayContainer" style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        {javaArray.map((v, i) => (
          <div key={i} style={{ width: 50, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', border: `2px solid var(--border)`, borderRadius: 8, fontFamily: 'Fira Code, monospace', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', transition: 'all 0.35s ease', ...(cellStates[i] === 'low' ? { borderColor: 'var(--accent-blue)', background: 'rgba(59,130,246,0.2)', transform: 'translateY(-5px)' } : {}), ...(cellStates[i] === 'high' ? { borderColor: 'var(--accent-red)', background: 'rgba(239,68,68,0.2)', transform: 'translateY(-5px)' } : {}), ...(cellStates[i] === 'probe' ? { borderColor: 'var(--accent-orange)', background: 'rgba(245,158,11,0.3)', transform: 'scale(1.15) translateY(-8px)', boxShadow: '0 4px 20px rgba(245,158,11,0.5)' } : {}), ...(cellStates[i] === 'found' ? { borderColor: 'var(--accent-green)', background: 'rgba(16,185,129,0.35)', transform: 'scale(1.25) translateY(-10px)', boxShadow: '0 4px 25px rgba(16,185,129,0.6)' } : {}), ...(cellStates[i] === 'eliminated' ? { opacity: 0.25, transform: 'scale(0.85)' } : {}), ...(cellStates[i] === 'active' ? { opacity: 1, transform: 'scale(1)' } : {}) }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 2 }}>[{i}]</div>
            <div style={{ fontSize: 12 }}>{v}</div>
          </div>
        ))}
      </div>

      <div id="interpolationExecutionLog" style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '4px solid var(--accent-green)', padding: 12, borderRadius: 6, marginTop: 10, minHeight: 60, maxHeight: 160, overflowY: 'auto' }}>
        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: 6 }}>Execution Log:</div>
        <div style={{ color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace', fontSize: 13 }}>{logs.length ? logs.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />) : 'Click "Execute Code" to start'}</div>
      </div>
    </div>
  );
}
