import React from 'react';

export default function Simulator() {
  const [running, setRunning] = React.useState(false);
  const [logs, setLogs] = React.useState([
    "[10:31:05] Simulation service ready...",
  ]);

  const handleSimulate = async () => {
    setRunning(true);
    setLogs(prev => [...prev, "[10:31:42] DDoS simulation initiated: Target 10.0.0.5..."]);
    
    // Fire real API multiple times
    for (let i = 0; i < 55; i++) {
        setTimeout(async () => {
            try {
              const baseLog = {
                ipAddress: "192.168.100.55",
                method: "GET",
                endpoint: "/api/login",
                statusCode: 200,
                userAgent: "Simulator Bot 1.0"
              };
              await fetch("http://localhost:5000/api/logs", {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(baseLog)
              });
            } catch(e){}
        }, i * 150); // fast stream of logs
    }

    setTimeout(() => {
        setLogs(prev => [...prev, "[10:31:45] ALERT generated: DDoS Traffic Spike detected (Severity: HIGH, Source IP: 192.168.100.55)"]);
        setRunning(false);
    }, 55 * 160);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
      
      {/* Controls */}
      <div className="card flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-2">Simulation Control</h2>
        
        <div>
          <label className="block text-sm text-slate-400 mb-1">Attack Type</label>
          <select className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-primary">
            <option>DDoS Traffic Spike</option>
            <option>Brute Force SSH</option>
            <option>SQL Injection</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Target IP Address</label>
          <input className="w-full bg-slate-900 border border-primary text-blue-300 rounded-md p-2 shadow-[0_0_10px_rgba(59,130,246,0.2)] focus:outline-none" defaultValue="10.0.0.5" />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button className="btn-secondary w-full" disabled={running}>Start Normal Traffic</button>
          <button 
            className="btn-primary w-full flex items-center justify-center gap-2 bg-secondary hover:bg-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.4)]" 
            onClick={handleSimulate}
            disabled={running}
          >
             {running ? "Running..." : "Launch Attack Simulation"}
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="card bg-slate-900 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(139,92,246,0.15)] border-secondary/30">
        <h3 className="font-semibold text-white mb-4">Live Output Console</h3>
        <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded-md font-mono text-sm h-full flex-1 overflow-y-auto">
          {logs.map((log, i) => (
            <p key={i} className={log.includes("ALERT") ? "text-red-500 font-bold" : "text-green-400 tracking-tight"}>{log}</p>
          ))}
        </div>
      </div>

    </div>
  );
}
