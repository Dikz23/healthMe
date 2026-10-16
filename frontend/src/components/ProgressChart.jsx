import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ProgressChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="sm:col-span-2 bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-8 min-h-[280px] flex flex-col items-center justify-center border-dashed">
        <span className="text-emerald-500 p-3 bg-emerald-50 rounded-full mb-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        </span>
        <p className="text-slate-500 text-sm text-center font-medium">
          Isi metrik tubuh lalu klik "Analisis Sehat" untuk melihat grafik target.
        </p>
      </div>
    );
  }

  return (
    <div className="sm:col-span-2 bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-slate-900 font-bold text-lg">Proyeksi Progres Sehat</h3>
          <p className="text-slate-500 text-xs mt-0.5">Progres estimasi perubahan berat badan Anda</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
          Linear Forecast
        </span>
      </div>

      <div className="w-full h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="minggu" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#a7f3d0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#0f172a' }}
              itemStyle={{ color: '#059669', fontWeight: 'bold' }}
              formatter={(value) => [`${value} KG`, 'Berat']}
            />
            <Line 
              type="monotone" 
              dataKey="berat" 
              stroke="#059669" 
              strokeWidth={3} 
              dot={{ fill: '#059669', r: 5 }} 
              activeDot={{ r: 7, fill: '#10b981' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}