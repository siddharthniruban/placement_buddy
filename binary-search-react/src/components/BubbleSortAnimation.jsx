import React, { useState, useRef } from "react";

export default function BubbleSortAnimation() {
  const base = [5,3,8,4,2,7,1,6];
  const [cells, setCells] = useState(base);
  const [inputValue, setInputValue] = useState(base.join(','));
  const [highlight, setHighlight] = useState([-1,-1]);
  const [logs, setLogs] = useState(['Click Play to animate']);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [viewMode, setViewMode] = useState('boxes'); // 'boxes' or 'bars'
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

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg]);
    setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const applyInput = () => {
    const parsed = inputValue.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    if (parsed.length) setCells(parsed);
  };
  const resetArray = () => { setCells([...base]); setInputValue(base.join(',')); setHighlight([-1,-1]); runningRef.current = false; setRunning(false); setPaused(false); pausedRef.current = false; setLogs(['Click Play to animate']); };

  const togglePause = () => {
    if (!running) return;
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
    if (pausedRef.current) addLog('⏸ Paused');
    else addLog('▶ Resumed');
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
    setLogs(['Starting Bubble Sort: We will compare adjacent elements and swap if needed']);
    await sleep(speed);
    
    const arr = [...cells];
    let stepCount = 0;
    
    for (let i=0;i<arr.length-1;i++){
      if (!runningRef.current) { addLog('🛑 Stopped'); setHighlight([-1,-1]); setRunning(false); setPaused(false); return; }
      addLog(`📍 Pass ${i+1}/${arr.length-1}: Finding the ${arr.length-i}${arr.length-i===1?'st':arr.length-i===2?'nd':arr.length-i===3?'rd':'th'} largest element. Array: [${arr.join(', ')}]`);
      await sleep(speed);
      
      for (let j=0;j<arr.length-i-1;j++){
        if (!runningRef.current) { addLog('🛑 Stopped'); setHighlight([-1,-1]); setRunning(false); setPaused(false); return; }
        stepCount++;
        setHighlight([j,j+1]);
        if (!pausedRef.current) addLog(`Step ${stepCount} - Pass ${i+1}: Comparing arr[${j}] = ${arr[j]} with arr[${j+1}] = ${arr[j+1]}`);
        await sleep(speed);
        
        if (!runningRef.current) { addLog('🛑 Stopped'); setHighlight([-1,-1]); setRunning(false); setPaused(false); return; }
        if (arr[j] > arr[j+1]){
          if (!pausedRef.current) addLog(`Step ${stepCount}: ${arr[j]} > ${arr[j+1]} → Swapping! New order: arr[${j}] = ${arr[j+1]}, arr[${j+1}] = ${arr[j]}`);
          const tmp = arr[j]; arr[j]=arr[j+1]; arr[j+1]=tmp;
          setCells([...arr]);
          await sleep(speed);
        } else {
          if (!pausedRef.current) addLog(`Step ${stepCount}: ${arr[j]} ≤ ${arr[j+1]} → No swap needed, continue`);
          await sleep(speed * 0.7);
        }
      }
      addLog(`✓ Pass ${i+1} complete! Element ${arr[arr.length-i-1]} is now in its final sorted position. Array: [${arr.join(', ')}]`);
      await sleep(speed * 1.2);
    }
    setHighlight([-1,-1]);
    addLog(`✅ Sorting Complete! Final sorted array: [${arr.join(', ')}]. Total comparisons: ${stepCount}`);
    runningRef.current = false;
    setRunning(false);
    setPaused(false);
    pausedRef.current = false;
  };

  return (
    <div className="section">
      <h2 className="section-title">Bubble Sort Animation</h2>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
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
          <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
            <button 
              className={viewMode === 'boxes' ? 'btn-blue' : 'btn-green'}
              onClick={() => setViewMode('boxes')}
              style={{ padding: '6px 12px' }}
            >
              📦 Boxes
            </button>
            <button 
              className={viewMode === 'bars' ? 'btn-blue' : 'btn-green'}
              onClick={() => setViewMode('bars')}
              style={{ padding: '6px 12px' }}
            >
              📊 Bars
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'boxes' ? (
        <div style={{display:'flex',gap:8,justifyContent:'center',margin:'20px 0',flexWrap:'wrap'}}>
          {cells.map((v,i)=> (
            <div key={i} style={{
              width:70,
              height:70,
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              background: highlight.includes(i)?'rgba(59,130,246,0.2)':'var(--bg-card)',
              border:`2px solid ${highlight.includes(i)?'var(--accent-blue)':'var(--border)'}`,
              borderRadius:8,
              fontFamily:'Fira Code, monospace',
              transition: 'all 0.3s ease',
              transform: highlight.includes(i) ? 'scale(1.1)' : 'scale(1)'
            }}>
              <div style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>[{i}]</div>
              <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)'}}>{v}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{display:'flex',gap:4,alignItems:'flex-end',justifyContent:'center',margin:'20px 0',height:300}}>
          {cells.map((v,i)=> {
            const maxVal = Math.max(...cells);
            const heightPercent = (v / maxVal) * 100;
            return (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{fontSize:11,color:'var(--text-secondary)',fontFamily:'Fira Code'}}>{v}</div>
                <div style={{
                  width:50,
                  height:`${heightPercent * 2}px`,
                  background: highlight.includes(i) 
                    ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)'
                    : 'linear-gradient(180deg, var(--accent-green) 0%, #059669 100%)',
                  borderRadius:'4px 4px 0 0',
                  transition: 'all 0.3s ease',
                  border: highlight.includes(i) ? '2px solid #60a5fa' : '2px solid var(--accent-green)',
                  boxShadow: highlight.includes(i) ? '0 0 20px rgba(59,130,246,0.5)' : 'none'
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
          <input type="range" min="500" max="3000" step="100" value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} style={{width:120}} />
          <span style={{fontSize:14,color:'var(--text-secondary)',width:60}}>{speed < 1200 ? 'Fast' : speed < 2000 ? 'Medium' : 'Slow'}</span>
        </div>
      </div>
      
      <div style={{marginTop:20,padding:'12px 16px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)',maxHeight:200,overflowY:'auto'}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:'var(--text-primary)'}}>Execution Log:</div>
        {logs.map((log, i) => (
          <div key={i} style={{fontSize:13,lineHeight:1.8,color:'var(--text-secondary)',fontFamily:'Fira Code, monospace'}}>
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>

      <div style={{marginTop:16,padding:'12px 16px',background:'var(--bg-card)',borderRadius:8,border:'1px solid var(--border)'}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:'var(--text-primary)'}}>Color Legend:</div>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:16,height:16,background:'rgba(59,130,246,0.2)',border:'2px solid var(--accent-blue)',borderRadius:4}}></div>
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
