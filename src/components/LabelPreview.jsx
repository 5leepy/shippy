import React from 'react';

// Komponen ini menerima 'data' sebagai prop
function LabelPreview({ data }) {
  return (
    <div className="label-preview-container">
      <h2>Pratinjau Label</h2>
      <div className="shipping-label">
        <div className="label-header">
          <h3>ShippyLabel</h3>
        </div>
        <div className="label-section">
          <strong>PENGIRIM:</strong>
          <p>{data.senderName || 'Nama Pengirim'}</p>
          <p>{data.senderPhone || 'No. HP Pengirim'}</p>
        </div>
        <div className="label-section">
          <strong>PENERIMA:</strong>
          <p>{data.recipientName || 'Nama Penerima'}</p>
          <p>{data.recipientPhone || 'No. HP Penerima'}</p>
          <p>{data.recipientAddress || 'Alamat Penerima'}</p>
          <p>
            {(data.recipientCity || 'Kota') + ', ' + (data.recipientProvince || 'Provinsi')}
          </p>
          <p>{data.recipientPostalCode || 'Kode Pos'}</p>
        </div>
      </div>
    </div>
  );
}

export default LabelPreview;