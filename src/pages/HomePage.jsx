// src/pages/HomePage.jsx
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import ShippingForm from '../components/ShippingForm';
import LabelPreview from '../components/LabelPreview';
import styles from './HomePage.module.css';

const paperSizes = [
  // Tambahkan properti fontSize untuk setiap ukuran
  { id: '100mm', name: '100mm x 150mm (A6)', width: 100, fontSize: 11 },
  { id: '80mm', name: '80mm', width: 80, fontSize: 10 }, 
  { id: '58mm', name: '58mm', width: 58, fontSize: 8 },  
];



function HomePage() {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientProvince: '',
    recipientCity: '',
    recipientDistrict: '',
    recipientVillage: '',
    recipientPostalCode: '',
    // Tambahkan dua baris ini
    shippingDate: getTodayDate(), // Default ke hari ini
    shippingCode: '', // Kode resi/AWB
  });

  const [paperSizeId, setPaperSizeId] = useState('100mm');
  const labelRef = useRef();

  const handleDownloadPdf = () => {
    const labelToCapture = labelRef.current;
    if (!labelToCapture) return;

    const selectedPaper = paperSizes.find(p => p.id === paperSizeId);
    const titleElement = labelToCapture.querySelector('.no-print');
    if (titleElement) {
      titleElement.style.display = 'none';
    }


    html2canvas(labelToCapture, {
      // Opsi untuk meningkatkan kualitas gambar
      scale: 3, 
      useCORS: true,
      backgroundColor: null, // Gunakan background dari elemen
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
      // Buat PDF dengan orientasi portrait (p) dan satuan milimeter (mm)
      // Ukuran didapat dari state yang dipilih
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [selectedPaper.width, 150]
      });

      // Tambahkan gambar ke PDF, paskan dengan ukuran kertas
      pdf.addImage(imgData, 'PNG', 0, 0, selectedPaper.width, 150);
      pdf.save("shippy-label.pdf");
    });
  };

  return (
<div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>ShippyLabel</h1>
        <p>Buat label pengiriman dengan mudah.</p>
      </header>

      <div className={styles.appContainer}>
        {/* Kolom Kiri: Form */}
        <div className={styles.formSection}>
          <ShippingForm
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Kolom Kanan: Pratinjau */}
        <div className={styles.previewSection}>
          <div 
            ref={labelRef} 
            className={styles.labelPrintArea}
            style={{ 
              width: `${paperSizes.find(p => p.id === paperSizeId).width}mm`,
              height: '150mm', 
              fontSize: `${paperSizes.find(p => p.id === paperSizeId).fontSize}pt`,
            }}
          >
            <LabelPreview data={formData} paperSize={paperSizeId} />
          </div>

          <div className={styles.paperSizeSelector}>
            <h4>Pilih Ukuran Kertas Cetak:</h4>
            {paperSizes.map(size => (
              <label key={size.id}>
                <input
                  type="radio"
                  name="paperSize"
                  value={size.id}
                  checked={paperSizeId === size.id}
                  onChange={(e) => setPaperSizeId(e.target.value)}
                />
                {size.name}
              </label>
            ))}
          </div>
          
          <button className="button-primary" onClick={handleDownloadPdf}>
            📄 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;