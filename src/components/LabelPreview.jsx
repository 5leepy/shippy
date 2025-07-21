import React from 'react';
import styles from './LabelPreview.module.css';

// Ini menjadi komponen fungsional biasa, tanpa forwardRef
function LabelPreview({ data }) {
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
        <div className={styles.labelSection}>
          <strong>PENERIMA:</strong>
          <p>{data.recipientName || 'Nama Penerima'}</p>
          <p>{data.recipientPhone || 'No. HP Penerima'}</p>
          <p>{data.recipientAddress || 'Alamat Penerima'}</p>
          <p>
            {(data.recipientCityName || 'Kota') + ', ' + (data.recipientProvinceName || 'Provinsi') + ', ' + (data.recipientPostalCode || 'Kode Pos')}
          </p>
          </div>
      </div>
    </div>
  );
};

export default LabelPreview;