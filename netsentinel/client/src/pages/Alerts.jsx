import React, { useState, useEffect } from 'react';
import { Eye, CheckSquare, Flag } from 'lucide-react';

export default function Alerts({ socket }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/alerts", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAlerts(data);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e) { /* empty */ }
    };
    fetchAlerts();

    socket.on('new_alert_received', (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    socket.on('alert_resolved', (updatedAlert) => {
      setAlerts((prev) => prev.map(a => a._id === updatedAlert._id ? updatedAlert : a));
    });

    return () => {
      socket.off('new_alert_received');
      socket.off('alert_resolved');
    }
  }, [socket]);

  const resolveAlert = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/alerts/${id}/resolve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) { console.error(e) }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Alerts Inbox</h2>
        <button className="btn-primary">Acknowledge All</button>
      </div>

      <div className="card p-0 border-0 shadow-xl overflow-hidden mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-300 text-sm border-b border-slate-700">
              <th className="p-4 font-medium w-32">Severity</th>
              <th className="p-4 font-medium">Alert Type</th>
              <th className="p-4 font-medium">Source IP</th>
              <th className="p-4 font-medium">Message</th>
              <th className="p-4 font-medium hidden md:table-cell">Timestamp</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/40">
            {alerts.map((alert, i) => (
              <tr key={i} className={`border-b border-slate-800 hover:bg-slate-800/40 transition-colors ${alert.status === 'Resolved' ? 'opacity-50' : ''}`}>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md tracking-wide ${alert.severity === 'Critical' ? 'bg-red-500 text-white' :
                      alert.severity === 'High' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-black'
                    }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 font-medium text-white">{alert.alertType}</td>
                <td className="p-4 text-primary cursor-pointer hover:underline">{alert.sourceIP}</td>
                <td className="p-4 text-slate-300 text-sm truncate max-w-[200px]" title={alert.message}>{alert.message}</td>
                <td className="p-4 text-slate-400 text-sm whitespace-nowrap hidden md:table-cell">{new Date(alert.timestamp).toLocaleString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded border border-slate-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => resolveAlert(alert._id)} disabled={alert.status === 'Resolved'} className={`p-2 rounded border transition-colors ${alert.status === 'Resolved' ? 'text-green-500 bg-slate-800 border-green-500/30' : 'text-slate-400 hover:text-white bg-slate-800 border-slate-600'}`}>
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">Inbox Zero. No critical alerts detected.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
