import React, { useState } from "react";

export default function JavaExecutionSimulator2() {
  const javaArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const [logs, setLogs] = useState([]);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [mid, setMid] = useState(null);
  const [target, setTarget] = useState(11);
  const [lineHighlight, setLineHighlight] = useState(null);
  const [cellStates, setCellStates] = useState(Array(javaArray.length).fill("default"));
  const [running, setRunning] = useState(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const addLog = (msg) => {
    setLogs((l) => [...l, `→ ${msg}`]);
    setTimeout(() => {
      const el = document.getElementById("javaExecutionLog");
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
    "public static int binarySearch(int[] arr, int target) {",
    "    int left = 0;",
    "    int right = arr.length - 1;",
    "    ",
    "    while (left <= right) {",
    "        int mid = left + (right - left) / 2;",
    "        ",
    "        if (arr[mid] == target) {",
    "            return mid;",
    "        }",
    "        ",
    "        if (arr[mid] < target) {",
    "            left = mid + 1;",
    "        } else {",
    "            right = mid - 1;",
    "        }",
    "    }",
    "    ",
    "    return -1;",
    "}"
  ];

  const executeJavaBinarySearch = async (t) => {
    let L = 0;
    let R = javaArray.length - 1;
    let iteration = 0;

    await highlightLine(1, 600);
    addLog("Entering binarySearch function");

    await highlightLine(2, 600);
    setLeft(L);
    addLog(`Initialize: left = ${L}`);

    await highlightLine(3, 600);
    setRight(R);
    addLog(`Initialize: right = ${R} (arr.length - 1)`);

    await highlightLine(5, 600);

    while (L <= R) {
      iteration++;
      addLog(`--- Iteration ${iteration} ---`);
      addLog(`Checking condition: left(${L}) <= right(${R}) = true`);

      // highlight active range
      for (let i = 0; i < javaArray.length; i++) {
        if (i < L || i > R) updateCell(i, "eliminated");
        else updateCell(i, "default");
      }
      await sleep(500);

      await highlightLine(6, 600);
      const M = Math.floor(L + (R - L) / 2);
      setMid(M);
      addLog(`Calculate: mid = ${L} + (${R} - ${L}) / 2 = ${M}`);

      updateCell(L, "left");
      updateCell(R, "right");
      updateCell(M, "mid");
      await sleep(700);

      await highlightLine(8, 700);
      addLog(`Compare: arr[${M}] (${javaArray[M]}) == target (${t})?`);

      if (javaArray[M] === t) {
        await sleep(400);
        await highlightLine(9, 700);
        updateCell(M, "found");
        addLog(`✓ Match found! Returning index ${M}`);
        addLog(`🎉 Target ${t} found at index ${M}`);
        return M;
      }

      addLog(`✗ No match. Continue searching...`);
      await sleep(400);

      await highlightLine(12, 700);
      addLog(`Compare: arr[${M}] (${javaArray[M]}) < target (${t})?`);

      if (javaArray[M] < t) {
        await sleep(400);
        await highlightLine(13, 700);
        addLog(`✓ True. Search right half.`);
        for (let i = L; i <= M; i++) updateCell(i, "eliminated");
        L = M + 1;
        setLeft(L);
        addLog(`Update: left = ${M} + 1 = ${L}`);
        await sleep(600);
      } else {
        await sleep(400);
        await highlightLine(14, 400);
        await highlightLine(15, 700);
        addLog(`✗ False. Search left half.`);
        for (let i = M; i <= R; i++) updateCell(i, "eliminated");
        R = M - 1;
        setRight(R);
        addLog(`Update: right = ${M} - 1 = ${R}`);
        await sleep(600);
      }

      resetCells();

      await highlightLine(17, 400);
      await highlightLine(5, 500);
    }

    addLog(`Checking condition: left(${L}) <= right(${R}) = false`);
    addLog(`Exiting loop - target not found`);
    await sleep(400);

    await highlightLine(19, 700);
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
    setLeft(null);
    setRight(null);
    setMid(null);
    setLineHighlight(null);

    await executeJavaBinarySearch(t);

    setRunning(false);
  };

  const resetExecution = () => {
    if (running) {
      alert('Cannot reset while animation is running');
      return;
    }
    setLineHighlight(null);
    resetCells();
    setLeft(null);
    setRight(null);
    setMid(null);
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
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>LEFT</div>
          <div style={{ fontSize: 18, color: 'var(--accent-blue)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{left !== null ? left : '-'}</div>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid var(--accent-red)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>RIGHT</div>
          <div style={{ fontSize: 18, color: 'var(--accent-red)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{right !== null ? right : '-'}</div>
        </div>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid var(--accent-orange)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>MID</div>
          <div style={{ fontSize: 18, color: 'var(--accent-orange)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{mid !== null ? mid : '-'}</div>
        </div>
        <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid var(--accent-purple)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>TARGET</div>
          <div style={{ fontSize: 18, color: 'var(--accent-purple)', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>{target !== null ? target : '-'}</div>
        </div>
      </div>

      <div id="javaArrayContainer" style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        {javaArray.map((v, i) => (
          <div key={i} style={{ width: 60, height: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', border: `2px solid var(--border)`, borderRadius: 8, fontFamily: 'Fira Code, monospace', fontWeight: 600, color: 'var(--text-primary)', transition: 'all 0.35s ease', ...(cellStates[i] === 'left' ? { borderColor: 'var(--accent-blue)', background: 'rgba(59,130,246,0.2)', transform: 'translateY(-5px)' } : {}), ...(cellStates[i] === 'right' ? { borderColor: 'var(--accent-red)', background: 'rgba(239,68,68,0.2)', transform: 'translateY(-5px)' } : {}), ...(cellStates[i] === 'mid' ? { borderColor: 'var(--accent-orange)', background: 'rgba(245,158,11,0.3)', transform: 'scale(1.15) translateY(-8px)', boxShadow: '0 4px 20px rgba(245,158,11,0.5)' } : {}), ...(cellStates[i] === 'found' ? { borderColor: 'var(--accent-green)', background: 'rgba(16,185,129,0.35)', transform: 'scale(1.25) translateY(-10px)', boxShadow: '0 4px 25px rgba(16,185,129,0.6)' } : {}), ...(cellStates[i] === 'eliminated' ? { opacity: 0.25, transform: 'scale(0.85)' } : {}) }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>[{i}]</div>
            <div>{v}</div>
          </div>
        ))}
      </div>

      <div id="javaExecutionLog" style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '4px solid var(--accent-green)', padding: 12, borderRadius: 6, marginTop: 10, minHeight: 60, maxHeight: 160, overflowY: 'auto' }}>
        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: 6 }}>Execution Log:</div>
        <div style={{ color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace', fontSize: 13 }}>{logs.length ? logs.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />) : 'Click "Execute Code" to start'}</div>
      </div>
    </div>
  );
}
