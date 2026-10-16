import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app) 

# DATABASE KALORI MAKANAN (Nilai kalori per 100 gram)
DATABASE_MAKANAN = {
    "nasi": 130,
    "nasi putih": 130,
    "nasi merah": 110,
    "dada ayam": 165,
    "paha ayam": 215,
    "telur": 155,
    "tempe": 190,
    "tahu": 76,
    "roti gandum": 247,
    "roti putih": 265,
    "pisang": 89,
    "apel": 52,
    "daging sapi": 250,
    "ikan": 140,
    "kentang": 77,
    "oatmeal": 389,
    "alpukat": 160,
    "buncis": 31,
    "susu": 60
}

# Data Dummy untuk pelatihan model ML
X_train = np.array([
    [170, 80, 25],
    [160, 70, 22],
    [175, 90, 30],
    [165, 65, 20],
    [180, 85, 28]
])
y_train = np.array([12, 10, 16, 8, 14])

model = LinearRegression()
model.fit(X_train, y_train)

# API 1: Kalkulasi Tubuh & AI Prediction
@app.route('/hitung', methods=['POST'])
def hitung():
    data = request.json
    tinggi = float(data['tinggi'])
    berat = float(data['berat'])
    umur = float(data['umur'])
    gender = data['gender']

    if gender == 'L':
        berat_ideal = (tinggi - 100) - (0.10 * (tinggi - 100))
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) + 5
    else:
        berat_ideal = (tinggi - 100) - (0.15 * (tinggi - 100))
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) - 161

    tdee = bmr * 1.375

    if berat > berat_ideal + 2:
        pola_makan = "Defisit Kalori (Penurunan Berat Badan)"
        target_kalori = round(tdee - 400)
        protein = round(berat * 2.0)
        lemak = round((target_kalori * 0.25) / 9)
        karbo = round((target_kalori - (protein * 4) - (lemak * 9)) / 4)
        serat = 30
        contoh_menu = {
            "sarapan": "2 Telur rebus + 1 tangkup roti gandum + Kopi hitam / Teh hijau",
            "makan_siang": "150g Dada ayam panggang + 100g Nasi merah + Tumis buncis",
            "camilan": "1 Buah apel / 15 butir kacang almond",
            "makan_malam": "150g Ikan bakar/panggang + Sup sayuran tanpa santan"
        }
    elif berat < berat_ideal - 2:
        pola_makan = "Surplus Kalori (Peningkatan Berat Badan & Massa Otot)"
        target_kalori = round(tdee + 400)
        protein = round(berat * 1.8)
        lemak = round((target_kalori * 0.30) / 9)
        karbo = round((target_kalori - (protein * 4) - (lemak * 9)) / 4)
        serat = 25
        contoh_menu = {
            "sarapan": "Oatmeal susu + 1 pisang + 2 telur mata sapi",
            "makan_siang": "200g Daging sapi/Ayam + Nasi putih + Tempe/Tahu",
            "camilan": "Smoothie pisang selai kacang / Alpukat",
            "makan_malam": "Nasi goreng dada ayam minyak zaitun + Telur dadar"
        }
    else:
        pola_makan = "Pemeliharaan (Maintenance & Sehat Seimbang)"
        target_kalori = round(tdee)
        protein = round(berat * 1.5)
        lemak = round((target_kalori * 0.25) / 9)
        karbo = round((target_kalori - (protein * 4) - (lemak * 9)) / 4)
        serat = 28
        contoh_menu = {
            "sarapan": "Omelet telur isi bayam + Roti gandum",
            "makan_siang": "Nasi secukupnya + Ikan/Ayam + Tahu + Sayur bening",
            "camilan": "Yogurt segar / Buah potong",
            "makan_malam": "Salad dada ayam / Sup daging bening"
        }

    input_user = np.array([[tinggi, berat, umur]])
    prediksi_minggu = max(1, round(float(model.predict(input_user)[0]), 1))

    grafik_progres = []
    total_minggu = int(round(prediksi_minggu))
    for minggu in range(total_minggu + 1):
        berat_saat_ini = berat + ((berat_ideal - berat) / total_minggu) * minggu
        grafik_progres.append({
            "minggu": f"Mgg {minggu}",
            "berat": round(berat_saat_ini, 1)
        })

    return jsonify({
        "berat_ideal": round(berat_ideal, 1),
        "estimasi_minggu": prediksi_minggu,
        "grafik_progres": grafik_progres,
        "nutrisi": {
            "pola_makan": pola_makan,
            "target_kalori": target_kalori,
            "protein": protein,
            "karbo": karbo,
            "lemak": lemak,
            "serat": serat,
            "contoh_menu": contoh_menu
        }
    })

# API 2: HITUNG KALORI MAKANAN OTOMATIS BERDASARKAN GRAM
@app.route('/hitung-kalori-makanan', methods=['POST'])
def hitung_kalori_makanan():
    data = request.json
    nama_makanan = data.get('nama', '').lower().strip()
    gram = float(data.get('gram', 100))

    kalori_per_100g = 130
    ditemukan = False

    for key, val in DATABASE_MAKANAN.items():
        if key in nama_makanan:
            kalori_per_100g = val
            ditemukan = True
            break

    total_kalori = round((kalori_per_100g / 100) * gram)

    return jsonify({
        "nama": nama_makanan.title(),
        "gram": gram,
        "kalori": total_kalori,
        "ditemukan": ditemukan
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)