import React, { useState, useRef } from "react";

export default function HeapSortSimulator2(){
  const base=[4,10,3,5,1,2,8,7];
  const [arr,setArr]=useState(base);
  const [inputValue,setInputValue]=useState(base.join(','));
  const [logs,setLogs]=useState([]);
  const [line,setLine]=useState(null);
  const [running,setRunning]=useState(false);
  const [paused, setPaused] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [viewMode, setViewMode] = useState('boxes');
  const runningRef = useRef(false);
  const pausedRef = useRef(false);

  const sleep = async (ms)=> {
    const adjustedMs = ms / speed;
    const start = Date.now();
    while (Date.now() - start < adjustedMs) {
      if (!runningRef.current) return;
      while (pausedRef.current && runningRef.current) {
        await new Promise(r => setTimeout(r, 50));
      }
      if (!runningRef.current) return;
      await new Promise(r => setTimeout(r, 50));
    }
  };
  const addLog=(m)=>setLogs(l=>[...l,`→ ${m}`]);

  const applyInput = () => { const parsed = inputValue.split(',').map(s=>Number(s.trim())).filter(n=>!isNaN(n)); if(parsed.length) setArr(parsed); };

  const javaLines=[
    'public static void heapSort(int[] arr) {',
    '    buildMaxHeap(arr);',
    '    for (int i = arr.length - 1; i > 0; i--) {',
    '        swap(arr, 0, i);',
    '        heapify(arr, 0, i);',
    '    }',
    '}'
  ];

  const reset=()=>{ setArr([...base]); setInputValue(base.join(',')); setLogs([]); setLine(null); setComparing([]); setSorted([]); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; };

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
  };

  const execute=async ()=>{
    if(running) { togglePause(); return; }
    setRunning(true); runningRef.current = true; setPaused(false); pausedRef.current = false; setLogs([]);
    addLog('Starting heap sort'); setLine(1); await sleep(300);
    if(!runningRef.current){ addLog('Stopped'); setLine(null); setRunning(false); return; }
    const a=[...arr]; // visual heap sort
    const heapify = async (n,i)=>{ 
      setLine(5); await sleep(100);
      let largest=i; const l=2*i+1, r=2*i+2; 
      setComparing([i, l, r].filter(idx => idx < n));
      await sleep(150);
      if(l<n && a[l]>a[largest]) largest=l; 
      if(r<n && a[r]>a[largest]) largest=r; 
      if(largest!==i){ 
        [a[i],a[largest]]=[a[largest],a[i]]; 
        setArr([...a]); 
        addLog(`Heapify swap ${a[largest]} and ${a[i]}`); 
        await sleep(200); 
        if(!runningRef.current) { addLog('Stopped'); setLine(null); setRunning(false); return; } 
        await heapify(n,largest); 
      }
      setComparing([]);
    };
    setLine(2); await sleep(100);
    for(let i=Math.floor(a.length/2)-1;i>=0;i--){ if(!runningRef.current){ addLog('Stopped'); setLine(null); setRunning(false); return; } await heapify(a.length,i); }
    setLine(3); await sleep(100);
    for(let i=a.length-1;i>0;i--){ 
      if(!runningRef.current){ addLog('Stopped'); setLine(null); setRunning(false); return; } 
      setLine(4); await sleep(100);
      setComparing([0, i]);
      await sleep(150);
      [a[0],a[i]]=[a[i],a[0]]; 
      setArr([...a]); 
      setSorted(prev => [...prev, i]);
      await sleep(150); 
      await heapify(i,0); 
    }
    if(runningRef.current){ setArr([...a]); addLog('Sorted'); setLine(null); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; }
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
        <pre style={{lineHeight:1.8}}>{javaLines.map((l,idx)=>(
          <React.Fragment key={idx}>
            <span style={{background: line===idx+1?'rgba(59,130,246,0.12)':'transparent', display:'block', paddingLeft: 8}}>{l}</span>
          </React.Fragment>
        ))}</pre>
      </div>

      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:16,flexWrap:'wrap'}}>
        <button onClick={execute} className="btn-blue">
          {running && !paused ? '⏸ Pause' : '▶ ' + (running ? 'Resume' : 'Execute Code')}
        </button>
        <button onClick={reset} className="btn-green">Reset</button>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:14,color:'var(--text-secondary)'}}>Speed:</span>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.5" 
            value={speed} 
            onChange={(e)=>setSpeed(parseFloat(e.target.value))}
            style={{width:120}}
          />
          <span style={{fontSize:14,color:'var(--text-primary)',minWidth:30}}>{speed}x</span>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center',marginLeft:'auto'}}>
          <span style={{fontSize:14,color:'var(--text-secondary)'}}>View:</span>
          <button onClick={()=>setViewMode('boxes')} className={viewMode==='boxes'?'btn-blue':'btn-gray'} style={{padding:'6px 12px',fontSize:13}}>Boxes</button>
          <button onClick={()=>setViewMode('bars')} className={viewMode==='bars'?'btn-blue':'btn-gray'} style={{padding:'6px 12px',fontSize:13}}>Bars</button>
        </div>
      </div>

      {viewMode === 'boxes' && (
      <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
        {arr.map((v,i)=>{
          let bgColor = 'var(--bg-card)';
          let borderColor = 'var(--border)';
          let transform = 'scale(1)';
          if (sorted.includes(i)) {
            bgColor = 'rgba(16,185,129,0.28)';
            borderColor = 'var(--accent-green)';
            transform = 'scale(1.05)';
          } else if (comparing.includes(i)) {
            bgColor = 'rgba(245,158,11,0.2)';
            borderColor = 'var(--accent-orange)';
            transform = 'translateY(-5px)';
          }
          return (
          <div key={i} style={{
            width:70,
            height:70,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            background: bgColor,
            border:`2px solid ${borderColor}`,
            borderRadius:8,
            fontFamily:'Fira Code, monospace',
            transition: 'all 0.35s ease',
            transform
          }}>
            <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>[{i}]</div>
            <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)'}}>{v}</div>
          </div>
        )})}
      </div>
      )}

      {viewMode === 'bars' && (
      <div style={{display:'flex',gap:4,alignItems:'flex-end',justifyContent:'center',marginBottom:16,height:250,padding:'20px 10px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)'}}>
        {arr.map((v,i)=> {
          const maxVal = Math.max(...arr);
          const height = (v / maxVal) * 200;
          let barColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          if (sorted.includes(i)) barColor = 'var(--accent-green)';
          else if (comparing.includes(i)) barColor = 'var(--accent-orange)';
          return (
            <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,maxWidth:60}}>
              <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>{v}</div>
              <div style={{
                width:'100%',
                height:height,
                background: barColor,
                borderRadius:4,
                transition:'all 0.35s ease',
                opacity: (sorted.includes(i) || comparing.includes(i)) ? 1 : 0.7,
                transform: (sorted.includes(i) || comparing.includes(i)) ? 'scale(1.05)' : 'scale(1)'
              }}></div>
              <div style={{fontSize:10,color:'var(--text-secondary)',marginTop:4}}>[{i}]</div>
            </div>
          );
        })}
      </div>
      )}

      <div className="log-box">{logs.map((l,i)=>(<div key={i}>{l}</div>))}</div>
    </div>
  );
}
