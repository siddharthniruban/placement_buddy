import React, { useState, useRef } from "react";

export default function QuickSortAnimation(){
  const base=[7,2,1,6,8,5,3,4];
  const [arr,setArr]=useState(base);
  const [inputValue,setInputValue]=useState(base.join(','));
  const [logs,setLogs]=useState(['Click Play to animate']);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pivot, setPivot] = useState(-1);
  const [comparing, setComparing] = useState([]);
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
  const resetArray = () => { setArr([...base]); setInputValue(base.join(',')); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; setLogs(['Click Play to animate']); setPivot(-1); setComparing([]); };

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
    if (pausedRef.current) addLog('⏸ Paused');
    else addLog('▶ Resumed');
  };

  const partition = async (l,r,a)=>{
    if (!runningRef.current) return -1;
    const pivotVal = a[r];
    setPivot(r);
    if (!pausedRef.current) addLog(`Partitioning range [${l}, ${r}]: Pivot = ${pivotVal} (index ${r}). Elements < ${pivotVal} go left, ≥ ${pivotVal} go right`);
    await sleep(speed);
    
    let i=l;
    for(let j=l;j<r;j++){
      if (!runningRef.current) return -1;
      setComparing([j, r]);
      if (!pausedRef.current) addLog(`Comparing arr[${j}] = ${a[j]} with pivot ${pivotVal}. ${a[j] < pivotVal ? a[j] + ' < ' + pivotVal + ' → Will swap to left side' : a[j] + ' ≥ ' + pivotVal + ' → Stays on right side'}`); 
      await sleep(speed);
      if (!runningRef.current) return -1;
      if(a[j]<pivotVal){ 
        if (!pausedRef.current) addLog(`Swapping arr[${i}] = ${a[i]} with arr[${j}] = ${a[j]} to move smaller element left`);
        [a[i],a[j]]=[a[j],a[i]]; 
        i++; 
        setArr([...a]); 
        await sleep(speed); 
      }
    }
    setComparing([]);
    if (!pausedRef.current) addLog(`Placing pivot ${pivotVal} at its final position: index ${i}. Swapping arr[${i}] with arr[${r}]`);
    [a[i],a[r]]=[a[r],a[i]]; 
    setArr([...a]); 
    await sleep(speed);
    if (!pausedRef.current) addLog(`Partition complete! Pivot ${pivotVal} is now at index ${i}. Left: [${a.slice(l,i).join(', ')}], Pivot: ${pivotVal}, Right: [${a.slice(i+1,r+1).join(', ')}]`);
    await sleep(speed * 1.2);
    setPivot(-1);
    return i;
  };

  const qsort = async (l,r,a)=>{
    if(l>=r || !runningRef.current) return;
    if (!pausedRef.current) addLog(`Quick Sort on segment [${l}, ${r}]. Array segment: [${a.slice(l, r+1).join(', ')}]`);
    await sleep(speed * 0.8);
    const p = await partition(l,r,a);
    if (!runningRef.current || p === -1) return;
    await qsort(l,p-1,a);
    if (!runningRef.current) return;
    await qsort(p+1,r,a);
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
    setLogs(['Starting Quick Sort: Using pivot-based partitioning to sort array']); 
    await sleep(speed);
    const a=[...arr]; 
    await qsort(0,a.length-1,a); 
    if (runningRef.current) {
      addLog(`✅ Sorting Complete! Final sorted array: [${a.join(', ')}]`); 
      setRunning(false);
      setPaused(false);
      runningRef.current = false;
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Quick Sort Animation</h2>
      
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
          if (pivot === i) {
            bgColor = 'rgba(245,158,11,0.2)';
            borderColor = 'var(--accent-orange)';
            transform = 'scale(1.15) translateY(-8px)';
          } else if (comparing.includes(i)) {
            bgColor = 'rgba(59,130,246,0.15)';
            borderColor = '#3b82f6';
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
            if(pivot===i){
              barGradient='linear-gradient(180deg,#f59e0b 0%,#d97706 100%)';
              barBorder='2px solid #fbbf24';
              barShadow='0 0 20px rgba(245,158,11,0.5)';
            }else if(comparing.includes(i)){
              barGradient='linear-gradient(180deg,#3b82f6 0%,#2563eb 100%)';
              barBorder='2px solid #60a5fa';
              barShadow='0 0 20px rgba(59,130,246,0.5)';
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
            <div style={{width:16,height:16,background:'rgba(245,158,11,0.2)',border:'2px solid var(--accent-orange)',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Pivot</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'rgba(59,130,246,0.15)',border:'2px solid #3b82f6',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Comparing</span>
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

