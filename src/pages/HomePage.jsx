import React, { useState } from 'react';
import ShippingForm from '../components/ShippingForm';
import LabelPreview from '../components/LabelPreview';
import styles from './HomePage.module.css';

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
    <div className={styles.appContainer}>
      <div className={styles.formSection}>
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
      <div className={styles.previewSection}>
        {/* Kirim state sebagai prop ke LabelPreview */}
        <LabelPreview data={formData} />
      </div>
    </div>
  );
}

export default HomePage;