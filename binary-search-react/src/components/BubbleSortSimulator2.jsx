import React, { useState, useRef } from "react";

export default function BubbleSortSimulator2(){
  const arrBase = [5,3,8,4,2,7,1,6];
  const [arr, setArr] = useState(arrBase);
  const [inputValue, setInputValue] = useState(arrBase.join(','));
  const [logs, setLogs] = useState([]);
  const [iIdx, setIIdx] = useState(null);
  const [jIdx, setJIdx] = useState(null);
  const [line, setLine] = useState(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [viewMode, setViewMode] = useState('boxes');
  const runningRef = useRef(false);
  const pausedRef = useRef(false);

  const applyInput = () => { const parsed = inputValue.split(',').map(s=>Number(s.trim())).filter(n=>!isNaN(n)); if(parsed.length) setArr(parsed); };

  const sleep = async (ms)=> {
    const start = Date.now();
    while (Date.now() - start < ms) {
      if (!runningRef.current) return;
      while (pausedRef.current && runningRef.current) {
        await new Promise(r => setTimeout(r, 50));
      }
      if (!runningRef.current) return;
      await new Promise(r => setTimeout(r, 50));
    }
  };
  const addLog = (m)=> setLogs(l=>[...l,`→ ${m}`]);

  const javaLines = [
    'public static void bubbleSort(int[] arr) {',
    '    int n = arr.length;',
    '    for (int i = 0; i < n - 1; i++) {',
    '        for (int j = 0; j < n - i - 1; j++) {',
    '            if (arr[j] > arr[j+1]) swap(arr,j,j+1);',
    '        }',
    '    }',
    '}'
  ];

  const reset = ()=>{ setArr([...arrBase]); setInputValue(arrBase.join(',')); setLogs([]); setIIdx(null); setJIdx(null); setLine(null); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false;} ;

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
  };

  const execute = async ()=>{
    if (running) {
      togglePause();
      return;
    }
    setRunning(true); 
    runningRef.current = true;
    setPaused(false);
    pausedRef.current = false;
    setLogs([]);
    const a = [...arr];
    setLine(1); addLog('Entering bubbleSort'); await sleep(300);
    if(!runningRef.current){ addLog('Stopped'); setLine(null); setRunning(false); return; }
    setLine(2); addLog(`n = ${a.length}`); await sleep(300);
    if(!runningRef.current){ addLog('Stopped'); setLine(null); setRunning(false); return; }
    for (let i=0;i<a.length-1;i++){
      if(!runningRef.current){ addLog('Stopped'); setLine(null); setIIdx(null); setJIdx(null); setRunning(false); return; }
      setIIdx(i); setLine(3); addLog(`Outer loop i=${i}`); await sleep(350);
      if(!runningRef.current){ addLog('Stopped'); setLine(null); setIIdx(null); setJIdx(null); setRunning(false); return; }
      for (let j=0;j<a.length-i-1;j++){
        if(!runningRef.current){ addLog('Stopped'); setLine(null); setIIdx(null); setJIdx(null); setRunning(false); return; }
        setJIdx(j); setLine(4); addLog(`Comparing arr[${j}]=${a[j]} and arr[${j+1}]=${a[j+1]}`); await sleep(400);
        if(!runningRef.current){ addLog('Stopped'); setLine(null); setIIdx(null); setJIdx(null); setRunning(false); return; }
        setLine(5);
        if (a[j] > a[j+1]){ addLog(`Swapping ${a[j]} and ${a[j+1]}`); const t=a[j]; a[j]=a[j+1]; a[j+1]=t; setArr([...a]); await sleep(400);} else { addLog('No swap'); }
      }
    }
    setLine(null); setIIdx(null); setJIdx(null); addLog('Sorted'); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false;
  };

  return (
    <div className="section">
      <h2 className="section-title">Java Implementation with Live Execution</h2>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter comma-separated numbers"
            className="search-input"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <button className="btn-blue" onClick={applyInput}>Set Array</button>
        </div>
      </div>

      <div className="code-block" style={{marginBottom:12}}>
        <div className="code-header"><span className="code-language">Java</span></div>
        <pre style={{lineHeight:1.8}}>{javaLines.map((l,idx)=> (
          <React.Fragment key={idx}>
            <span style={{background: line===idx+1 ? 'rgba(59,130,246,0.12)' : 'transparent', display:'block', paddingLeft: 8}}>{l}</span>
          </React.Fragment>
        ))}</pre>
      </div>

      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:16,flexWrap:'wrap'}}>
        <button onClick={execute} className="btn-blue">
          {running && !paused ? '⏸ Pause' : '▶ ' + (running ? 'Resume' : 'Execute Code')}
        </button>
        <button onClick={reset} className="btn-green">Reset</button>
        <div style={{display:'flex',gap:8,alignItems:'center',marginLeft:'auto'}}>
          <span style={{fontSize:14,color:'var(--text-secondary)'}}>View:</span>
          <button onClick={()=>setViewMode('boxes')} className={viewMode==='boxes'?'btn-blue':'btn-gray'} style={{padding:'6px 12px',fontSize:13}}>Boxes</button>
          <button onClick={()=>setViewMode('bars')} className={viewMode==='bars'?'btn-blue':'btn-gray'} style={{padding:'6px 12px',fontSize:13}}>Bars</button>
        </div>
      </div>

      {viewMode === 'boxes' && (
      <div id="bubbleArray" style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:16}}>
        {arr.map((v,i)=> (
          <div key={i} style={{
            width:70,
            height:70,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            background: (i===jIdx||i===jIdx+1) ? 'rgba(59,130,246,0.2)' : 'var(--bg-card)', 
            border: `2px solid ${(i===jIdx||i===jIdx+1) ? 'var(--accent-blue)' : 'var(--border)'}`, 
            borderRadius:8, 
            fontFamily:'Fira Code, monospace', 
            color:'var(--text-primary)', 
            transition: 'all 0.3s ease',
            transform: (i===jIdx||i===jIdx+1) ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)'
          }}>
            <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>[{i}]</div>
            <div style={{fontSize:18,fontWeight:600}}>{v}</div>
          </div>
        ))}
      </div>
      )}

      {viewMode === 'bars' && (
      <div style={{display:'flex',gap:4,alignItems:'flex-end',justifyContent:'center',marginBottom:16,height:250,padding:'20px 10px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)'}}>
        {arr.map((v,i)=> {
          const maxVal = Math.max(...arr);
          const height = (v / maxVal) * 200;
          return (
            <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,maxWidth:60}}>
              <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>{v}</div>
              <div style={{
                width:'100%',
                height:height,
                background: (i===jIdx||i===jIdx+1) ? 'var(--accent-blue)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius:4,
                transition:'all 0.3s ease',
                opacity: (i===jIdx||i===jIdx+1) ? 1 : 0.7,
                transform: (i===jIdx||i===jIdx+1) ? 'scale(1.05)' : 'scale(1)'
              }}></div>
              <div style={{fontSize:10,color:'var(--text-secondary)',marginTop:4}}>[{i}]</div>
            </div>
          );
        })}
      </div>
      )}

      <div className="log-box">
        {logs.map((l,i)=> <div key={i}>{l}</div>)}
      </div>

    </div>
  );
}
