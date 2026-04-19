import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, AlertTriangle, MapPin } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard({ socket }) {
  const [stats, setStats] = useState({ logs24h: 12540, totalAlerts: 18, highSeverity: 3, activeIPs: 142 });
  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on('new_alert_received', (alert) => {
      setRecentAlerts(prev => [alert, ...prev].slice(0, 5));
      setStats(s => ({ ...s, totalAlerts: s.totalAlerts + 1 }));
    });
    return () => socket.off('new_alert_received');
  }, [socket]);

  // Chart data
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Requests per Hour',
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
      x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Logs Today', value: stats.logs24h, icon: Activity, color: 'text-primary', bg: 'bg-primary/20' },
          { label: 'Total Alerts', value: stats.totalAlerts, icon: ShieldAlert, color: 'text-secondary', shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]', bg: 'bg-secondary' },
          { label: 'High Severity', value: stats.highSeverity, icon: AlertTriangle, color: 'text-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]', bg: 'bg-red-500' },
          { label: 'Active IPs', value: stats.activeIPs, icon: MapPin, color: 'text-cyan-400', shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]', bg: 'bg-cyan-400' },
        ].map((stat, i) => (
          <div key={i} className="card flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value.toLocaleString()}</h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.shadow || ''}`}>
              <stat.icon className={`w-6 h-6 ${stat.shadow ? 'text-white' : stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="card lg:col-span-2 min-h-[400px] flex flex-col relative overflow-hidden">
             <div className="absolute top-4 left-6 text-slate-300 font-medium">Threat Map</div>
             <div className="w-full h-full flex items-center justify-center pt-8">
                {/* Simulated SVG lines representing connections would go here, we mock the visual */}
                <div className="bg-slate-900 border border-slate-700 w-full h-[300px] rounded flex items-center justify-center">
                    <p className="text-slate-500">Global Connection Map Visualization</p>
                </div>
             </div>
        </div>

        {/* Recent Alerts */}
        <div className="card">
             <h3 className="text-slate-300 font-medium mb-4">Recent Alerts</h3>
             <div className="space-y-4">
               {/* Mock Alerts List */}
               {[{ type: 'DDoS Attempt', ip: '192.168.1.50', severity: 'High' }, { type: 'Brute Force', ip: '10.0.0.22', severity: 'Medium' }].map((alert, i) => (
                 <div key={i} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-white text-sm">{alert.type}</p>
                      <p className="text-xs text-slate-400">{alert.ip} - {alert.severity}</p>
                    </div>
                    <span className={`text-xs font-medium ${alert.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`}>
                      {alert.severity === 'High' ? 'Red' : 'Yellow'}
                    </span>
                 </div>
               ))}
               {recentAlerts.map((alert, i) => (
                 <div key={'s'+i} className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <p className="font-semibold text-white text-sm">{alert.alertType}</p>
                      <p className="text-xs text-slate-400">{alert.sourceIP} - {alert.severity}</p>
                    </div>
                 </div>
               ))}
             </div>
        </div>
      </div>

      {/* Traffic Line Chart */}
      <div className="card h-[300px] flex flex-col">
          <h3 className="text-slate-300 font-medium mb-4">Network Traffic</h3>
          <div className="flex-1 w-full relative">
            <Line data={data} options={chartOptions} />
          </div>
      </div>
    </div>
  );
}
