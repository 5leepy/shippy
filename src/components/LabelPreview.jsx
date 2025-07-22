import React, { useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import styles from './LabelPreview.module.css';

const formatDisplayDate = (dateString) => {
  if (!dateString) return ''; // Kembalikan string kosong jika tidak ada tanggal
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
// Ini menjadi komponen fungsional biasa, tanpa forwardRef
function LabelPreview({ data, paperSize }) {
  const [barcodeImage, setBarcodeImage] = useState(null);
  const barcodeRef = useRef(null);
  useEffect(() => {
    if (data.shippingCode && barcodeRef.current) {
      // Beri sedikit waktu agar barcode selesai render sebelum di-capture
      setTimeout(() => {
        html2canvas(barcodeRef.current).then(canvas => {
          setBarcodeImage(canvas.toDataURL('image/png'));
        });
      }, 50); // Jeda 50 milidetik
    } else {
      setBarcodeImage(null);
    }
  }, [data.shippingCode, paperSize]);
  const getBarcodeWidth = () => {
    switch (paperSize) {
      case '100mm':
        return 1.5;
      case '80mm':
        return 1.2;
      case '58mm':
        return 1;
      default:
        return 2;
    }
  };
  
   console.log("Ukuran Kertas Diterima:", paperSize);

   const getBarcodeFontSize = () => {
    switch (paperSize) {
      case '100mm':
        return '11pt'; // Ukuran font untuk kertas 100mm
      case '80mm':
        return '10pt'; // Ukuran font untuk kertas 80mm
      case '58mm':
        return '8pt';  // Ukuran font untuk kertas 58mm
      default:
        return '11pt'; // Ukuran default
    }
  };
  return (

    <div className={styles.labelPreviewContainer}>
      {/* ... (bagian barcode tersembunyi) ... */}
      <div style={{ height: 0, overflow: 'hidden' }}>
        {data.shippingCode && (
          <div ref={barcodeRef} className={styles.hiddenBarcodeWrapper}>
            <Barcode
              value={data.shippingCode}
              width={getBarcodeWidth()}      // Lebar setiap bar
              height={20}    // Tinggi barcode
              displayValue={false}// Tampilkan teks kode di bawah barcode// Tidak perlu teks, kita hanya butuh barnya
              margin={0}
            />
          </div>
        )}
      </div>
      <div className={styles.shippingLabel}>
        <div className={styles.labelHeader}>
          <h3>ShippyLabel</h3>
          <p className={styles.slogan}>Dibuat gratis di shippylabel.id</p>
        </div>
        {/* 2. Tambahkan Tanggal di bagian Pengirim */}
        <div className={styles.labelSection}>
          <div className={styles.sectionRow}>
            <div className={styles.paddingAll}>
              <strong>PENGIRIM:</strong>
              <p>{data.senderName || 'Nama Pengirim'}</p>
              <p>{data.senderPhone ? '+62' + data.senderPhone : 'No. HP Pengirim'}</p>
            </div>
            <div className={`${styles.dateSection} ${styles.paddingAll}`}>
              <p>TGL:{formatDisplayDate(data.shippingDate)}</p>
            </div>
          </div>
        </div>
        
        {/* ... (bagian Pengirim dan Penerima tetap sama) ... */}
        <div className={styles.labelSection}>
          <div className={styles.paddingAll}>
            <strong>PENERIMA:</strong>
          <p className={styles.recipientName}>{data.recipientName || 'Nama Penerima'}</p>
          <p>{data.recipientPhone || 'No. HP Penerima'}</p>
          <p>{data.recipientAddress || 'Alamat Penerima'}</p>
          <p>
            {(data.recipientVillageName || 'Kelurahan') + ', ' + (data.recipientDistrictName || 'Kecamatan')}
          </p>
          <p>
            {(data.recipientCityName || 'Kota') + ', ' + (data.recipientProvinceName || 'Provinsi') + ', ' + (data.recipientPostalCode || 'Kode Pos')}
          </p>
          </div>
        </div>

        {/* 2. Tambahkan bagian Barcode di sini */}
        {data.shippingCode && (
          <div className={styles.barcodeSection}>
            {/* Tampilkan teks kode secara manual */}
            <p 
              className={styles.barcodeText} 
              style={{ fontSize: getBarcodeFontSize() }}
            >
              {data.shippingCode}
            </p>
            <img 
                src={barcodeImage} 
                alt={`Barcode untuk ${data.shippingCode}`}
                className={styles.barcodeImage} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelPreview;