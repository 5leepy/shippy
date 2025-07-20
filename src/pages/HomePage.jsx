// src/pages/HomePage.jsx
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ShippingForm from '../components/ShippingForm';
import LabelPreview from '../components/LabelPreview';
import styles from './HomePage.module.css';

// Opsi ukuran kertas yang tersedia
const paperSizes = [
  { id: '100mm', name: '100mm x 150mm (A6)' },
  { id: '80mm', name: '80mm' },
  { id: '58mm', name: '58mm' },
];

function HomePage() {
  // State untuk data form
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

  // State untuk menyimpan ukuran kertas yang dipilih
  const [paperSize, setPaperSize] = useState('100mm'); // Default ke 100mm

  // Ref untuk menunjuk ke komponen yang akan dicetak
  const labelRef = useRef();

  // Hook dari react-to-print
  const handlePrint = useReactToPrint({
    content: () => labelRef.current,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.formSection}>
        <h1>ShippyLabel</h1>
        <p>Buat label pengiriman dengan mudah.</p>
        <hr />
        <ShippingForm
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      </div>
      <div className={styles.previewSection}>
        {/* Kontainer untuk area cetak, class-nya dinamis */}
        <div className={`label-print-area ${paperSize}`} ref={labelRef}>
          <LabelPreview data={formData} />
        </div>

        {/* UI untuk memilih ukuran kertas */}
        <div className={styles.paperSizeSelector}>
          <h4>Pilih Ukuran Kertas Cetak:</h4>
          {paperSizes.map(size => (
            <label key={size.id}>
              <input
                type="radio"
                name="paperSize"
                value={size.id}
                checked={paperSize === size.id}
                onChange={(e) => setPaperSize(e.target.value)}
              />
              {size.name}
            </label>
          ))}
        </div>
        
        {/* Tombol Cetak */}
        <button className={styles.printButton} onClick={handlePrint}>
          🖨️ Cetak Label
        </button>
      </div>
    </div>
  );
}

export default HomePage;