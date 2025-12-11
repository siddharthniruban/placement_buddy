import React, { useState, useRef } from "react";

export default function MergeSortAnimation(){
  const base = [8,3,5,2,7,1,6,4];
  const [arr,setArr] = useState(base);
  const [inputValue, setInputValue] = useState(base.join(','));
  const [logs,setLogs] = useState(['Click Play to animate']);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [merged, setMerged] = useState([]);
  const [speed, setSpeed] = useState(1000);
  const [viewMode, setViewMode] = useState('boxes');
  const runningRef = useRef(false);
  const pausedRef = useRef(false);
  const logsEndRef = useRef(null);

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg]);
    setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

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

  const applyInput = () => {
    const parsed = inputValue.split(',').map(s=>Number(s.trim())).filter(n=>!isNaN(n));
    if(parsed.length) setArr(parsed);
  };
  const resetArray = () => { setArr([...base]); setInputValue(base.join(',')); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; setLogs(['Click Play to animate']); setComparing([]); setMerged([]); };

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
    if (pausedRef.current) addLog('⏸ Paused');
    else addLog('▶ Resumed');
  };

  const merge = async (l, m, r, a) => {
    let left = a.slice(l,m+1);
    let right = a.slice(m+1,r+1);
    if (!pausedRef.current) addLog(`Merging subarrays: [${left.join(', ')}] and [${right.join(', ')}] at indices ${l}-${m} and ${m+1}-${r}`);
    await sleep(speed);
    
    let i=0,j=0,k=l;
    while(i<left.length && j<right.length){
      if (!runningRef.current) return;
      setComparing([l+i, m+1+j]);
      if (!pausedRef.current) addLog(`Comparing ${left[i]} and ${right[j]}`);
      await sleep(speed);
      
      if(left[i] <= right[j]){
        if (!pausedRef.current) addLog(`${left[i]} ≤ ${right[j]}, placing ${left[i]} at position ${k}`);
        a[k] = left[i]; i++;
      } else {
        if (!pausedRef.current) addLog(`${left[i]} > ${right[j]}, placing ${right[j]} at position ${k}`);
        a[k] = right[j]; j++;
      }
      setMerged([...Array(k-l+1).keys()].map(x=>l+x));
      setArr([...a]);
      await sleep(speed);
      k++;
    }
    while(i<left.length){
      if (!runningRef.current) return;
      if (!pausedRef.current) addLog(`Copying remaining ${left[i]} to position ${k}`);
      a[k]=left[i]; i++; k++;
      setMerged([...Array(k-l).keys()].map(x=>l+x));
      setArr([...a]);
      await sleep(speed*0.5);
    }
    while(j<right.length){
      if (!runningRef.current) return;
      if (!pausedRef.current) addLog(`Copying remaining ${right[j]} to position ${k}`);
      a[k]=right[j]; j++; k++;
      setMerged([...Array(k-l).keys()].map(x=>l+x));
      setArr([...a]);
      await sleep(speed*0.5);
    }
    if (!pausedRef.current) addLog(`✓ Merged segment [${l}..${r}]: [${a.slice(l, r+1).join(', ')}]`);
    setComparing([]);
    await sleep(speed);
  };

  const mergeSort = async (l, r, a) => {
    if(l<r){
      if (!runningRef.current) return;
      const m = Math.floor((l+r)/2);
      if (!pausedRef.current) addLog(`📍 Dividing array from index ${l} to ${r}, mid=${m}`);
      await sleep(speed);
      await mergeSort(l, m, a);
      await mergeSort(m+1, r, a);
      await merge(l, m, r, a);
    }
  };

  const start = async () => {
    if (running) {
      togglePause();
      return;
    }
    setRunning(true);
    runningRef.current = true;
    setPaused(false);
    pausedRef.current = false;
    setLogs(['Starting Merge Sort: Dividing array and merging sorted halves']);
    setComparing([]); setMerged([]);
    await sleep(speed);
    
    const a = [...arr];
    await mergeSort(0, a.length-1, a);
    
    if (!runningRef.current) { addLog('🛑 Stopped'); setComparing([]); setMerged([]); setRunning(false); setPaused(false); return; }
    setComparing([]); setMerged([]);
    addLog(`✅ Sorting Complete! Final array: [${a.join(', ')}]`);
    runningRef.current = false;
    setRunning(false);
    setPaused(false);
    pausedRef.current = false;
  };

  return (
    <div className="section">
      <h2 className="section-title">Merge Sort Animation</h2>
      
      <div style={{marginBottom:16}}>
        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12,flexWrap:'wrap'}}>
          <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Enter comma-separated numbers" className="search-input" style={{flex:1,maxWidth:400}}/>
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
          {arr.map((v,i)=>(
            <div key={i} style={{
              width:70,height:70,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              background: comparing.includes(i)?'rgba(251,191,36,0.2)':merged.includes(i)?'rgba(34,197,94,0.2)':'var(--bg-card)',
              border: comparing.includes(i)?'2px solid #fbbf24':merged.includes(i)?'2px solid #22c55e':'2px solid var(--border)',
              borderRadius:8,fontFamily:'Fira Code, monospace',transition:'all 0.3s ease',
              transform: comparing.includes(i) || merged.includes(i) ? 'scale(1.1)' : 'scale(1)'
            }}>
              <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>[{i}]</div>
              <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)'}}>{v}</div>
            </div>
          ))}
        </div>
      ):(
        <div style={{display:'flex',gap:4,alignItems:'flex-end',justifyContent:'center',margin:'20px 0',height:300}}>
          {arr.map((v,i)=>{
            const maxVal=Math.max(...arr);
            const heightPercent=(v/maxVal)*100;
            return (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{fontSize:11,color:'var(--text-secondary)',fontFamily:'Fira Code'}}>{v}</div>
                <div style={{
                  width:50,height:`${heightPercent*2}px`,
                  background:comparing.includes(i)?'linear-gradient(180deg,#fbbf24 0%,#f59e0b 100%)':merged.includes(i)?'linear-gradient(180deg,#22c55e 0%,#16a34a 100%)':'linear-gradient(180deg,var(--accent-green) 0%,#059669 100%)',
                  borderRadius:'4px 4px 0 0',transition:'all 0.3s ease',
                  border:comparing.includes(i)?'2px solid #fcd34d':merged.includes(i)?'2px solid #4ade80':'2px solid var(--accent-green)',
                  boxShadow:comparing.includes(i)||merged.includes(i)?'0 0 20px rgba(251,191,36,0.5)':'none'
                }}></div>
                <div style={{fontSize:10,color:'var(--text-secondary)',fontFamily:'Fira Code'}}>[{i}]</div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{display:'flex',gap:12,alignItems:'center',justifyContent:'center',marginTop:16,flexWrap:'wrap'}}>
        <button className="btn-blue" onClick={start}>
          {running ? (paused ? '▶ Resume' : '⏸ Pause') : '▶ Play'}
        </button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:14,color:'var(--text-secondary)'}}>Speed:</span>
          <input type="range" min="500" max="3000" step="100" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} style={{width:120}}/>
          <span style={{fontSize:14,color:'var(--text-secondary)',width:60}}>{speed<1200?'Fast':speed<2000?'Medium':'Slow'}</span>
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
            <div style={{width:16,height:16,background:'rgba(251,191,36,0.2)',border:'2px solid #fbbf24',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Comparing</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'rgba(34,197,94,0.2)',border:'2px solid #22c55e',borderRadius:4}}></div>
            <span style={{fontSize:13,color:'var(--text-secondary)'}}>Merged</span>
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
