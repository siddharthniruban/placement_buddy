import React, { useState, useRef } from "react";

export default function HeapSortAnimation(){
  const base=[4,10,3,5,1,2,8,7];
  const [arr,setArr]=useState(base);
  const [inputValue,setInputValue]=useState(base.join(','));
  const [logs,setLogs]=useState(['Click Play to animate']);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(1000);
  const [viewMode, setViewMode] = useState('boxes');
  const runningRef = useRef(false);
  const pausedRef = useRef(false);
  const logsEndRef = useRef(null);
  
  const sleep = async (ms) => {
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

  const applyInput = () => { const parsed = inputValue.split(',').map(s=>Number(s.trim())).filter(n=>!isNaN(n)); if(parsed.length) setArr(parsed); };
  const addLog = (msg) => {
    setLogs(prev => [...prev, msg]);
    setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const resetArray = () => { setArr([...base]); setInputValue(base.join(',')); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; setLogs(['Click Play to animate']); setComparing([]); setSorted([]); };

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
    if (pausedRef.current) addLog('⏸ Paused');
    else addLog('▶ Resumed');
  };

  const heapify = async (n,i,a)=>{
    if (!runningRef.current) return;
    let largest=i; const l=2*i+1, r=2*i+2;
    setComparing([i, l, r].filter(idx => idx < n));
    if (!pausedRef.current) addLog(`Heapify at index ${i} (value=${a[i]}). Checking children: left=${l < n ? 'index ' + l + ' (value=' + a[l] + ')' : 'none'}, right=${r < n ? 'index ' + r + ' (value=' + a[r] + ')' : 'none'}`);
    await sleep(speed);
    
    if(l<n && a[l]>a[largest]) largest=l;
    if(r<n && a[r]>a[largest]) largest=r;
    
    if(largest!==i){ 
      if (!runningRef.current) return;
      if (!pausedRef.current) addLog(`Largest child is ${a[largest]} at index ${largest}. Swapping with parent ${a[i]} at index ${i} to maintain max-heap property`); 
      [a[i],a[largest]]=[a[largest],a[i]]; 
      setArr([...a]); 
      await sleep(speed);
      if (!runningRef.current) return;
      await heapify(n,largest,a);
    } else {
      if (!pausedRef.current) addLog(`Parent ${a[i]} at index ${i} is already largest. Heap property satisfied.`);
      await sleep(speed * 0.5);
    }
    setComparing([]);
  };

  const start = async ()=>{
    if (running) {
      togglePause();
      return;
    }
    setRunning(true);
    runningRef.current = true;
    setPaused(false);
    pausedRef.current = false;
    setLogs(['Phase 1: Building Max-Heap from unsorted array. Starting from last non-leaf node...']); 
    await sleep(speed);
    const a=[...arr];
    for(let i=Math.floor(a.length/2)-1;i>=0;i--){ 
      if (!runningRef.current) return;
      if (!pausedRef.current) addLog(`Building heap: Processing node ${i}. Current array: [${a.join(', ')}]`);
      await heapify(a.length,i,a); 
    }
    if (!runningRef.current) return;
    addLog(`Phase 2: Max-Heap built! [${a.join(', ')}]. Now extracting max elements one by one...`);
    await sleep(speed * 1.5);
    for(let i=a.length-1;i>0;i--){ 
      if (!runningRef.current) return;
      setComparing([0, i]);
      if (!pausedRef.current) addLog(`Step ${a.length - i}: Swap max element ${a[0]} (root) with last element ${a[i]} at index ${i}`);
      await sleep(speed);
      [a[0],a[i]]=[a[i],a[0]]; 
      setArr([...a]); 
      setSorted(prev => [...prev, i]);
      if (!pausedRef.current) addLog(`Element ${a[i]} is now in final position ${i}. Heap size reduced. Heapifying remaining elements...`);
      await sleep(speed);
      await heapify(i,0,a); 
    }
    if (runningRef.current) {
      setSorted(prev => [...prev, 0]);
      addLog(`✅ Sorting Complete! Final sorted array: [${a.join(', ')}]`);
      setRunning(false);
      setPaused(false);
      runningRef.current = false;
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Heap Sort Animation</h2>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap:'wrap' }}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter comma-separated numbers"
            className="search-input"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <button className="btn-blue" onClick={applyInput}>Set Array</button>
          <button className="btn-green" onClick={resetArray}>Reset</button>
          <div style={{display:'flex',gap:4,marginLeft:'auto'}}>
            <button className={viewMode==='boxes'?'btn-blue':'btn-green'} onClick={()=>setViewMode('boxes')} style={{padding:'6px 12px'}}>📦 Boxes</button>
            <button className={viewMode==='bars'?'btn-blue':'btn-green'} onClick={()=>setViewMode('bars')} style={{padding:'6px 12px'}}>📊 Bars</button>
          </div>
        </div>
      </div>

      {viewMode==='boxes'?(
      <div style={{display:'flex',gap:8,justifyContent:'center',margin:'20px 0',flexWrap:'wrap'}}>
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
      ):(
        <div style={{display:'flex',gap:4,alignItems:'flex-end',justifyContent:'center',margin:'20px 0',height:300}}>
          {arr.map((v,i)=>{
            const maxVal=Math.max(...arr);
            const heightPercent=(v/maxVal)*100;
            let barGradient='linear-gradient(180deg,var(--accent-green) 0%,#059669 100%)';
            let barBorder='2px solid var(--accent-green)';
            let barShadow='none';
            if(sorted.includes(i)){
              barGradient='linear-gradient(180deg,#10b981 0%,#059669 100%)';
              barBorder='2px solid #34d399';
              barShadow='0 0 20px rgba(16,185,129,0.5)';
            }else if(comparing.includes(i)){
              barGradient='linear-gradient(180deg,#f59e0b 0%,#d97706 100%)';
              barBorder='2px solid #fbbf24';
              barShadow='0 0 20px rgba(245,158,11,0.5)';
            }
            return (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{fontSize:11,color:'var(--text-secondary)',fontFamily:'Fira Code'}}>{v}</div>
                <div style={{
                  width:50,height:`${heightPercent*2}px`,background:barGradient,
                  borderRadius:'4px 4px 0 0',transition:'all 0.3s ease',
                  border:barBorder,boxShadow:barShadow
                }}></div>
                <div style={{fontSize:10,color:'var(--text-secondary)',fontFamily:'Fira Code'}}>[{i}]</div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{display:'flex',gap:12,alignItems:'center',justifyContent:'center',marginTop:16,flexWrap:'wrap'}}>
        <button className="btn-blue" onClick={start}>{running && !paused ? '⏸' : '▶'} {running && !paused ? 'Pause' : 'Play'}</button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:14,color:'var(--text-secondary)'}}>Speed:</span>
          <input type="range" min="500" max="3000" step="100" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} style={{width:120}} />
          <span style={{fontSize:14,color:'var(--text-secondary)',width:60}}>{speed < 1200 ? 'Fast' : speed < 2000 ? 'Medium' : 'Slow'}</span>
        </div>
      </div>
      
      <div style={{marginTop:20,padding:'12px 16px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)',maxHeight:200,overflowY:'auto'}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:'var(--text-primary)'}}>Execution Log:</div>
        {logs.map((log,i)=>(
          <div key={i} style={{fontSize:13,lineHeight:1.8,color:'var(--text-secondary)',fontFamily:'Fira Code, monospace'}}>
            {log}
          </div>
        ))}
        <div ref={logsEndRef}/>
      </div>

      <div style={{marginTop:16,padding:'12px 16px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)'}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:'var(--text-primary)'}}>Color Legend:</div>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'rgba(59,130,246,0.15)',border:'2px solid #3b82f6',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Comparing</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'rgba(16,185,129,0.28)',border:'2px solid var(--accent-green)',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Sorted</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'var(--bg-card)',border:'2px solid var(--border)',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Unsorted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

