// src/components/ShippingForm.jsx
import React, { useState, useEffect } from "react";
import styles from "./ShippingForm.module.css";

function toTitleCase(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Fungsi untuk mendapatkan tanggal dalam format YYYY-MM-DD
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// --- PENGATURAN TANGGAL ---
const daysAllowed = 5; // <-- CUKUP UBAH ANGKA DI SINI (misal: 1, 7, 10, 30)

const today = new Date();
const maxDateObject = new Date(today);
maxDateObject.setDate(maxDateObject.getDate() + daysAllowed);

const minDate = getFormattedDate(today);
const maxDate = getFormattedDate(maxDateObject);
// --- AKHIR PENGATURAN TANGGAL ---

function ShippingForm({ formData, setFormData }) {
  // Ganti state 'provinces' menjadi 'apiProvinces'
  const [apiProvinces, setApiProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetch("/api/provinces.json")
      .then((response) => response.json())
      .then((provincesData) => {
        // LANGSUNG gunakan datanya, karena API ini mengembalikan array
        setApiProvinces(provincesData);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    // Pastikan ada provinsi yang dipilih
    if (formData.recipientProvince) {
      // Gunakan ID provinsi untuk mengambil data kota/kabupaten yang sesuai
      fetch(`/api/regencies/${formData.recipientProvince}.json`)
        .then((response) => response.json())
        .then((regenciesData) => {
          setCities(regenciesData);
        })
        .catch((error) => console.error("Error fetching regencies:", error));
    } else {
      // Jika tidak ada provinsi yang dipilih, kosongkan daftar kota
      setCities([]);
    }
  }, [formData.recipientProvince]);
  useEffect(() => {
    if (formData.recipientCity) {
      fetch(`/api/districts/${formData.recipientCity}.json`)
        .then((response) => response.json())
        .then((districtsData) => {
          setDistricts(districtsData);
        })
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
    }
  }, [formData.recipientCity]);

  // useEffect untuk mengambil data kelurahan/desa
  useEffect(() => {
    if (formData.recipientDistrict) {
      fetch(`/api/villages/${formData.recipientDistrict}.json`)
        .then((response) => response.json())
        .then((villagesData) => {
          setVillages(villagesData);
        })
        .catch((error) => console.error("Error fetching villages:", error));
    } else {
      setVillages([]);
    }
  }, [formData.recipientDistrict]);

  // Tambahkan handleChange yang baru di sini
  const handleChange = (e) => {
    // KITA UBAH 'const' MENJADI 'let' DI SINI
    let { name, value } = e.target;

    // Logika validasi untuk nomor telepon
    if (name === "senderPhone" || name === "recipientPhone") {
      // Hapus semua yang bukan angka
      value = value.replace(/[^0-9]/g, "");
      // Jika angka pertama adalah 0, hapus
      if (value.startsWith("0")) {
        value = value.substring(1);
      }
    }

    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };

      if (name === "recipientProvince") {
        const selectedProvince = apiProvinces.find((p) => p.id === value);
        newState.recipientProvinceName = selectedProvince
          ? toTitleCase(selectedProvince.name)
          : "";
        // Reset semua dropdown di bawahnya
        newState.recipientCity = "";
        newState.recipientCityName = "";
        newState.recipientDistrict = "";
        newState.recipientDistrictName = "";
        newState.recipientVillage = "";
        newState.recipientVillageName = "";
      }

      if (name === "recipientCity") {
        const selectedCity = cities.find((c) => c.id === value);
        newState.recipientCityName = selectedCity
          ? toTitleCase(selectedCity.name)
          : "";
        // Reset semua dropdown di bawahnya
        newState.recipientDistrict = "";
        newState.recipientDistrictName = "";
        newState.recipientVillage = "";
        newState.recipientVillageName = "";
      }

      if (name === "recipientDistrict") {
        const selectedDistrict = districts.find((d) => d.id === value);
        newState.recipientDistrictName = selectedDistrict
          ? toTitleCase(selectedDistrict.name)
          : "";
        // Reset dropdown di bawahnya
        newState.recipientVillage = "";
        newState.recipientVillageName = "";
      }

      if (name === "recipientVillage") {
        const selectedVillage = villages.find((v) => v.id === value);
        newState.recipientVillageName = selectedVillage
          ? toTitleCase(selectedVillage.name)
          : "";
      }

      return newState;
    });
  };

  return (
    <form className={styles.shippingForm}>
      <h2>Informasi Pengirim</h2>
      <div className={styles.formGridUnevenL}>
        <div className={styles.formGroup}>
          <label htmlFor="senderName">Nama Pengirim</label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="senderPhone">No. HP Pengirim</label>
          <div className={styles.phoneInputContainer}>
            <span className={styles.countryCode}>+62</span>
            <input
              type="tel"
              id="senderPhone"
              name="senderPhone"
              value={formData.senderPhone}
              onChange={handleChange}
              placeholder="812 3456 7890"
            />
          </div>
        </div>
      </div>
      <div className={styles.formGridUnevenR}>
        {/* Perbaiki input alamat pengirim */}
      <div className={styles.formGroup}>
        <label htmlFor="shippingDate">Tanggal Pengiriman</label>
        <input
          type="date"
          id="shippingDate"
          name="shippingDate"
          value={formData.shippingDate}
          onChange={handleChange}
          min={minDate}
          max={maxDate}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="shippingCode">Kode Pengiriman (Opsional)</label>
        <input
          type="text"
          id="shippingCode"
          name="shippingCode"
          value={formData.shippingCode}
          onChange={handleChange}
        />
      </div>
      </div>

      <h2>Informasi Penerima</h2>
      <div className={styles.formGridUnevenL}>
        <div className={styles.formGroup}>
          <label htmlFor="recipientName">Nama Penerima</label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="recipientPhone">No. HP Penerima</label>
          <div className={styles.phoneInputContainer}>
            <span className={styles.countryCode}>+62</span>
            <input
              type="tel"
              id="recipientPhone"
              name="recipientPhone"
              value={formData.recipientPhone}
              onChange={handleChange}
              placeholder="812 3456 7890"
            />
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="recipientAddress">
          Detail Alamat (Jalan, No. Rumah, RT/RW)
        </label>
        <input
          type="text"
          id="recipientAddress"
          name="recipientAddress"
          value={formData.recipientAddress}
          onChange={handleChange}
        />
      </div>

      {/* Provinsi dan Kota/Kabupaten */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="recipientProvince">Provinsi</label>
          {/* Dropdown Provinsi */}
          <select
            id="recipientProvince"
            name="recipientProvince"
            value={formData.recipientProvince}
            onChange={handleChange}
          >
            <option value="">Pilih Provinsi</option>
            {apiProvinces.map((province) => (
              <option key={province.id} value={province.id}>
                {toTitleCase(province.name)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="recipientCity">Kota / Kabupaten</label>
          {/* Dropdown Kota */}
          <select
            id="recipientCity"
            name="recipientCity"
            value={formData.recipientCity}
            onChange={handleChange}
            disabled={!formData.recipientProvince}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {toTitleCase(city.name)}
              </option>
            ))}
          </select>
        </div>
      </div>
       {/* Kecamatan dan Kelurahan/Desa */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
        <label htmlFor="recipientDistrict">Kecamatan</label>
        <select
          id="recipientDistrict"
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          disabled={!formData.recipientCity}
        >
          <option value="">Pilih Kecamatan</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {toTitleCase(district.name)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="recipientVillage">Kelurahan / Desa</label>
        <select
          id="recipientVillage"
          name="recipientVillage"
          value={formData.recipientVillage}
          onChange={handleChange}
          disabled={!formData.recipientDistrict}
        >
          <option value="">Pilih Kelurahan/Desa</option>
          {villages.map((village) => (
            <option key={village.id} value={village.id}>
              {toTitleCase(village.name)}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="recipientPostalCode">Kode Pos</label>
        <input
          type="text"
          id="recipientPostalCode"
          name="recipientPostalCode"
          value={formData.recipientPostalCode}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default ShippingForm;
