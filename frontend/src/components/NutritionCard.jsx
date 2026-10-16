import React from 'react';

export default function NutritionCard({ data }) {
  if (!data) return null;

  return (
    <div className="sm:col-span-2 bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-100 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Rekomendasi Nutrisi</span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{data.pola_makan}</h3>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-right">
          <span className="text-xs text-emerald-800/80 font-medium block">Target Kalori Harian</span>
          <span className="text-2xl font-extrabold text-emerald-700">{data.target_kalori} <span className="text-xs font-normal text-slate-500">kcal/hari</span></span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs text-slate-500 font-bold block">PROTEIN</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{data.protein} <span className="text-xs text-emerald-600 font-bold">g</span></span>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs text-slate-500 font-bold block">KARBOHIDRAT</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{data.karbo} <span className="text-xs text-emerald-600 font-bold">g</span></span>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs text-slate-500 font-bold block">LEMAK</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{data.lemak} <span className="text-xs text-emerald-600 font-bold">g</span></span>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs text-slate-500 font-bold block">SERAT</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{data.serat} <span className="text-xs text-emerald-600 font-bold">g</span></span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3">Contoh Plan Menu Sehari-hari</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>SARAPAN</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">{data.contoh_menu.sarapan}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>MAKAN SIANG</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">{data.contoh_menu.makan_siang}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>CAMILAN</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">{data.contoh_menu.camilan}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>MAKAN MALAM</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">{data.contoh_menu.makan_malam}</p>
          </div>
        </div>
      </div>
    </div>
  );
}