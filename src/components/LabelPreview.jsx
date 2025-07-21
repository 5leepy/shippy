import React from 'react';
import Barcode from 'react-barcode';
import styles from './LabelPreview.module.css';

// Ini menjadi komponen fungsional biasa, tanpa forwardRef
function LabelPreview({ data, paperSize }) {
  const getBarcodeWidth = () => {
    switch (paperSize) {
      case '100mm':
        return 2;
      case '80mm':
        return 1.5;
      case '58mm':
        return 1;
      default:
        return 2; // Default jika tidak ada yang cocok
    }
  };
   console.log("Ukuran Kertas Diterima:", paperSize);
  return (
    // Tidak ada lagi div pembungkus dan tidak ada ref
    <div className={styles.labelPreviewContainer}>
      <h2 className="no-print">Pratinjau Label</h2>
      <div className={styles.shippingLabel}>
        <div className={styles.labelHeader}>
          <h3>ShippyLabel</h3>
        </div>
        <div className={styles.labelSection}>
          <strong>PENGIRIM:</strong>
          <p>{data.senderName || 'Nama Pengirim'}</p>
          <p>{data.senderPhone || 'No. HP Pengirim'}</p>
        </div>
        {/* ... (bagian Pengirim dan Penerima tetap sama) ... */}
        <div className={styles.labelSection}>
          <strong>PENERIMA:</strong>
          <p>{data.recipientName || 'Nama Penerima'}</p>
          <p>{data.recipientPhone || 'No. HP Penerima'}</p>
          <p>{data.recipientAddress || 'Alamat Penerima'}</p>
          <p>
            {(data.recipientVillageName || 'Kelurahan') + ', ' + (data.recipientDistrictName || 'Kecamatan')}
          </p>
          <p>
            {(data.recipientCityName || 'Kota') + ', ' + (data.recipientProvinceName || 'Provinsi') + ', ' + (data.recipientPostalCode || 'Kode Pos')}
          </p>
        </div>

        {/* 2. Tambahkan bagian Barcode di sini */}
        {data.shippingCode && (
          <div className={styles.barcodeSection}>
            <Barcode 
              value={data.shippingCode}
              width={getBarcodeWidth()}      // Lebar setiap bar
              height={30}    // Tinggi barcode
              displayValue={true} // Tampilkan teks kode di bawah barcode
              fontSize={12}
              textPosition='top'
              marginTop={2} // Atur margin atas sesuai kebutuhan
              marginBottom={2} // Atur margin bawah sesuai kebutuhan
              marginLeft={-1} // Atur margin sesuai kebutuhan
              marginRight={-1} // Atur margin sesuai kebutuhan
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelPreview;