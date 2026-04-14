import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 flex flex-col md:flex-row gap-8">
       {/* Sidebar */}
       <div className="w-full md:w-64 space-y-2">
            <button className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded-md text-slate-400">Profile Info</button>
            <button className="w-full text-left px-4 py-2 bg-slate-800 rounded-md text-primary font-medium border-l-2 border-primary">System Config</button>
            <button className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded-md text-slate-400">Alert Thresholds</button>
       </div>

       {/* Panel */}
       <div className="flex-1 card space-y-8">
           <div>
               <h2 className="text-xl font-bold text-white mb-6">System Config</h2>
               <h3 className="text-sm font-semibold text-slate-300 mb-4 border-b border-slate-700 pb-2">General Settings</h3>
               <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Application Name</label>
                       <input className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white" defaultValue="NetSentinel" />
                   </div>
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Primary Data Region</label>
                       <select className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white">
                           <option>US-East (N. Virginia)</option>
                           <option>EU-Central</option>
                       </select>
                   </div>
               </div>
           </div>

           <div>
               <h3 className="text-sm font-semibold text-slate-300 mb-4 border-b border-slate-700 pb-2">Detection Service (DS)</h3>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-5 bg-primary rounded-full relative shadow-[0_0_10px_rgba(59,130,246,0.6)] cursor-pointer">
                      <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-slate-300">Enable Real-time Threat Detection</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mt-6">
                   <div>
                       <label className="block text-xs text-slate-400 mb-1 flex justify-between">Threat Severity Level (Min.) <span>MEDIUM</span></label>
                       <div className="h-2 bg-slate-700 rounded-full mt-3 relative">
                           <div className="absolute left-0 top-0 h-full bg-primary w-1/2 rounded-l-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                           <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow cursor-pointer"></div>
                       </div>
                   </div>
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Max Requests per IP (1 min)</label>
                       <input className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white" defaultValue="100" />
                   </div>
               </div>
           </div>
           
           <div className="flex justify-end pt-4 border-t border-slate-700">
               <button className="btn-primary shadow-[0_0_20px_rgba(59,130,246,0.6)] font-bold px-6 py-2">Save Changes</button>
           </div>
       </div>
    </div>
  );
}
