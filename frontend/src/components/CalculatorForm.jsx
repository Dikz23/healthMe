import React from 'react';

export default function CalculatorForm({ formData, onChange, onSubmit }) {
  return (
    <div className="md:col-span-4 bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-300 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Metrik Tubuh</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6 relative z-10">
        <div className="group/input">
          <label className="block text-emerald-800/60 text-[10px] font-bold tracking-widest uppercase mb-1">Tinggi Badan</label>
          <div className="flex items-center border-b-2 border-slate-100 pb-1 focus-within:border-emerald-500 transition-colors">
            <input type="number" name="tinggi" value={formData.tinggi} onChange={onChange} className="w-full bg-transparent text-2xl font-semibold outline-none placeholder-slate-300 text-slate-900" placeholder="170" required />
            <span className="text-emerald-700/60 font-mono text-xs font-bold">CM</span>
          </div>
        </div>
        
        <div className="group/input">
          <label className="block text-emerald-800/60 text-[10px] font-bold tracking-widest uppercase mb-1">Berat Saat Ini</label>
          <div className="flex items-center border-b-2 border-slate-100 pb-1 focus-within:border-emerald-500 transition-colors">
            <input type="number" name="berat" value={formData.berat} onChange={onChange} className="w-full bg-transparent text-2xl font-semibold outline-none placeholder-slate-300 text-slate-900" placeholder="65" required />
            <span className="text-emerald-700/60 font-mono text-xs font-bold">KG</span>
          </div>
        </div>

        <div className="group/input">
          <label className="block text-emerald-800/60 text-[10px] font-bold tracking-widest uppercase mb-1">Umur</label>
          <div className="flex items-center border-b-2 border-slate-100 pb-1 focus-within:border-emerald-500 transition-colors">
            <input type="number" name="umur" value={formData.umur} onChange={onChange} className="w-full bg-transparent text-2xl font-semibold outline-none placeholder-slate-300 text-slate-900" placeholder="21" required />
            <span className="text-emerald-700/60 font-mono text-xs font-bold">THN</span>
          </div>
        </div>

        <div className="group/input">
          <label className="block text-emerald-800/60 text-[10px] font-bold tracking-widest uppercase mb-1">Gender</label>
          <div className="flex items-center border-b-2 border-slate-100 pb-1 focus-within:border-emerald-500 transition-colors">
            <select name="gender" value={formData.gender} onChange={onChange} className="w-full bg-transparent text-lg font-medium outline-none text-slate-900 cursor-pointer py-1">
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full mt-8 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all">
          Analisis Sehat
        </button>
      </form>
    </div>
  );
}