import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-emerald-100 pb-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900">
          Health<span className="text-emerald-600">Me</span>
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">Sistem Prediksi Berat Badan & Nutrisi Ideal</p>
      </div>
    </header>
  );
}