import React, { useState } from 'react';

export default function FoodTracker({ targetKalori }) {
  const [logMakanan, setLogMakanan] = useState([]);
  const [namaMakanan, setNamaMakanan] = useState('');
  const [gram, setGram] = useState('');
  const [estimasi, setEstimasi] = useState(null);
  const [loading, setLoading] = useState(false);

  const hitungKaloriOtomatis = async (nama, beratGram) => {
    if (!nama || !beratGram) {
      setEstimasi(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/hitung-kalori-makanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: nama, gram: beratGram })
      });
      const data = await response.json();
      setEstimasi(data);
    } catch (error) {
      console.error("Gagal menghitung kalori:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNamaChange = (e) => {
    const val = e.target.value;
    setNamaMakanan(val);
    hitungKaloriOtomatis(val, gram);
  };

  const handleGramChange = (e) => {
    const val = e.target.value;
    setGram(val);
    hitungKaloriOtomatis(namaMakanan, val);
  };

  const tambahMakanan = (e) => {
    e.preventDefault();
    if (!namaMakanan || !gram || !estimasi) return;

    const baru = {
      id: Date.now(),
      nama: `${estimasi.nama} (${estimasi.gram} gram)`,
      kalori: estimasi.kalori,
      waktu: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLogMakanan([baru, ...logMakanan]);
    setNamaMakanan('');
    setGram('');
    setEstimasi(null);
  };

  const hapusMakanan = (id) => {
    setLogMakanan(logMakanan.filter((item) => item.id !== id));
  };

  const totalKaloriMasuk = logMakanan.reduce((acc, item) => acc + item.kalori, 0);

  return (
    <div className="sm:col-span-2 bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Catatan Makanan Harian</h3>
          <p className="text-slate-500 text-xs mt-0.5">Ketik nama makanan & berat gramasi untuk kalkulasi otomatis</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 font-medium block">Total Dikonsumsi</span>
          <span className="text-xl font-bold text-emerald-700">
            {totalKaloriMasuk} <span className="text-xs font-normal text-slate-400">/ {targetKalori || 2000} kcal</span>
          </span>
        </div>
      </div>

      <form onSubmit={tambahMakanan} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Nama makanan (misal: Nasi putih, Dada ayam)"
          value={namaMakanan}
          onChange={handleNamaChange}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 transition-colors"
          required
        />
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 w-full sm:w-36">
          <input
            type="number"
            placeholder="120"
            value={gram}
            onChange={handleGramChange}
            className="w-full bg-transparent py-3 text-sm text-slate-900 placeholder-slate-400 outline-none"
            required
          />
          <span className="text-emerald-700 text-xs font-mono font-bold">GRAM</span>
        </div>
        <button
          type="submit"
          disabled={!estimasi || loading}
          className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-md shadow-emerald-600/20"
        >
          + Catat
        </button>
      </form>

      {estimasi && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-900 font-medium">
              Hasil Kalkulasi: <strong className="text-emerald-950">{estimasi.nama}</strong> ({estimasi.gram} gram)
            </span>
          </div>
          <span className="font-mono font-bold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-sm">
            {estimasi.kalori} kcal
          </span>
        </div>
      )}

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {logMakanan.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">Belum ada makanan yang dicatat hari ini.</p>
        ) : (
          logMakanan.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-2xl text-xs">
              <div>
                <span className="text-slate-900 font-semibold block">{item.nama}</span>
                <span className="text-slate-400 text-[10px]">{item.waktu}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-emerald-700 font-bold">+{item.kalori} kcal</span>
                <button
                  onClick={() => hapusMakanan(item.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}