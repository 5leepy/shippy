import React, { useState, useEffect } from 'react';
import { provinces } from '../data/alamat.js';

// Terima formData, handleChange, dan setFormData dari props
function ShippingForm({ formData, handleChange, setFormData }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (formData.recipientProvince) {
      const selectedProvince = provinces.find(p => p.name === formData.recipientProvince);
      setCities(selectedProvince ? selectedProvince.cities : []);
      // Reset kota saat provinsi berubah. Gunakan setFormData dari props.
      setFormData(prev => ({ ...prev, recipientCity: '' }));
    } else {
      setCities([]);
    }
  }, [formData.recipientProvince, setFormData]);

  return (
    <form className="shipping-form">
      {/* ... semua input field tidak berubah, karena mereka sudah menggunakan formData dan handleChange ... */}
      <h2>Informasi Pengirim</h2>
      <div className="form-group">
        <label htmlFor="senderName">Nama Pengirim</label>
        <input type="text" id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="senderPhone">No. HP Pengirim</label>
        <input type="text" id="senderPhone" name="senderPhone" value={formData.senderPhone} onChange={handleChange} />
      </div>

      <h2>Informasi Penerima</h2>
      <div className="form-group">
        <label htmlFor="recipientName">Nama Penerima</label>
        <input type="text" id="recipientName" name="recipientName" value={formData.recipientName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="recipientPhone">No. HP Penerima</label>
        <input type="text" id="recipientPhone" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="recipientAddress">Alamat Lengkap (Nama Jalan, No. Rumah, RT/RW)</label>
        <textarea id="recipientAddress" name="recipientAddress" rows="3" value={formData.recipientAddress} onChange={handleChange}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="recipientProvince">Provinsi</label>
        <select id="recipientProvince" name="recipientProvince" value={formData.recipientProvince} onChange={handleChange}>
          <option value="">Pilih Provinsi</option>
          {provinces.map(province => (
            <option key={province.name} value={province.name}>{province.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="recipientCity">Kota / Kabupaten</label>
        <select id="recipientCity" name="recipientCity" value={formData.recipientCity} onChange={handleChange} disabled={!formData.recipientProvince}>
          <option value="">Pilih Kota/Kabupaten</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="recipientPostalCode">Kode Pos</label>
        <input type="text" id="recipientPostalCode" name="recipientPostalCode" value={formData.recipientPostalCode} onChange={handleChange} />
      </div>
    </form>
  );
}

export default ShippingForm;