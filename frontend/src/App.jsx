import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import BentoCard from './components/BentoCard.jsx';
import ProgressChart from './components/ProgressChart.jsx';
import NutritionCard from './components/NutritionCard.jsx';
import FoodTracker from './components/FoodTracker.jsx';

export default function App() {
  const [formData, setFormData] = useState({ tinggi: '', berat: '', umur: '', gender: 'L' });
  const [hasil, setHasil] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/hitung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setHasil(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke Python. Pastikan server backend berjalan!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans selection:bg-emerald-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <Header />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Form Input di kiri */}
          <CalculatorForm 
            formData={formData} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
          />

          {/* Kotak Hasil, Grafik, Nutrisi & Log Makanan di kanan */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <BentoCard 
              title="Target Ideal" 
              value={hasil?.berat_ideal} 
              unit="KG" 
            />
            <BentoCard 
              title="Prediksi AI" 
              value={hasil?.estimasi_minggu} 
              unit="Minggu" 
              specialEffect={true} 
            />

            {/* Komponen Grafik Progres */}
            <ProgressChart data={hasil?.grafik_progres} />

            {/* Komponen Rekomendasi Nutrisi */}
            {hasil?.nutrisi && <NutritionCard data={hasil.nutrisi} />}

            {/* Komponen Catatan Makanan Otomatis */}
            <FoodTracker targetKalori={hasil?.nutrisi?.target_kalori} />
          </div>

        </div>

      </div>
    </div>
  );
}