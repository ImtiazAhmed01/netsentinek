import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function Logs({ socket }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch initial logs - mock function for now mostly, relying on socket for live
    const fetchLogs = async () => {
       try {
           const token = localStorage.getItem('token');
           const res = await fetch("http://localhost:5000/api/logs", {
             headers: { 'Authorization': `Bearer ${token}` }
           });
           if(res.ok) {
             const data = await res.json();
             setLogs(data);
           }
       } catch(e){}
    };
    fetchLogs();

    socket.on('new_log_received', (log) => {
      setLogs((prev) => [log, ...prev].slice(0, 50)); // keep last 50
    });

    return () => socket.off('new_log_received');
  }, [socket]);

  return (
    <div className="space-y-4">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end mb-6">
          <div className="w-full md:w-1/3">
             <input type="text" placeholder="Search by IP, Endpoint..." className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary" />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div>
                <label className="block text-xs text-slate-400 mb-1">Status Code</label>
                <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none">
                  <option>All</option>
                  <option>200 OK</option>
                  <option>404 Not Found</option>
                  <option>500 Error</option>
                </select>
             </div>
             <div>
                <label className="block text-xs text-slate-400 mb-1">Method</label>
                <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm outline-none">
                  <option>All</option>
                  <option>GET</option>
                  <option>POST</option>
                </select>
             </div>
             <div className="flex items-end">
                <button className="btn-primary flex-shrink-0">Export Logs</button>
             </div>
          </div>
      </div>

      {/* Logs Table */}
      <div className="card overflow-x-auto p-0 border-0 shadow-xl relative mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-400 text-sm border-b border-slate-700">
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium">Method</th>
              <th className="p-4 font-medium">Endpoint</th>
              <th className="p-4 font-medium">IP Address</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">User Agent</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/50">
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors text-sm">
                <td className="p-4 whitespace-nowrap">{new Date(log.timestamp).toISOString()}</td>
                <td className={`p-4 font-medium ${log.method === 'POST' ? 'text-blue-400' : 'text-green-400'}`}>{log.method}</td>
                <td className="p-4 text-slate-300">{log.endpoint}</td>
                <td className="p-4 text-slate-300">{log.ipAddress}</td>
                <td className={`p-4 font-medium ${log.statusCode === 200 ? 'text-green-500' : log.statusCode === 404 ? 'text-yellow-500' : 'text-red-500'}`}>
                   {log.statusCode}
                </td>
                <td className="p-4 text-slate-400 truncate max-w-[200px]">{log.userAgent}</td>
                <td className="p-4">
                  <button className="text-slate-500 hover:text-white transition-colors bg-slate-800 p-2 rounded-md border border-slate-700">
                     <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
                <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">No logs generated yet. Run simulator to see live events.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
