import React from 'react';

export default function BentoCard({ title, value, unit, specialEffect = false }) {
  return (
    <div className="bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-300 transition-all">
      {specialEffect && (
        <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-600">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>
        </div>
      )}
      <span className="text-slate-500 text-sm font-semibold z-10">{title}</span>
      <div className="mt-4 relative z-10">
        <span className="text-6xl font-extrabold tracking-tight text-slate-900">{value || "-"}</span>
        {value && <span className="text-emerald-600 font-bold ml-2 text-lg">{unit}</span>}
      </div>
    </div>
  );
}