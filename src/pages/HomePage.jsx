import React, { useState } from 'react';
import ShippingForm from '../components/ShippingForm';
import LabelPreview from '../components/LabelPreview'; // <-- Impor komponen baru

function HomePage() {
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientProvince: '',
    recipientCity: '',
    recipientPostalCode: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="app-container">
      <div className="form-section">
        <h1>ShippyLabel</h1>
        <p>Buat label pengiriman dengan mudah.</p>
        <hr />
        {/* Kirim state dan fungsi sebagai props ke ShippingForm */}
        <ShippingForm 
          formData={formData} 
          handleChange={handleChange} 
          setFormData={setFormData} // setFormData juga dikirim untuk dropdown
        />
      </div>
      <div className="preview-section">
        {/* Kirim state sebagai prop ke LabelPreview */}
        <LabelPreview data={formData} />
      </div>
    </div>
  );
}

export default HomePage;