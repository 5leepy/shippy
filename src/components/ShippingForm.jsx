import React from 'react';

function ShippingForm() {
  return (
    <form className="shipping-form">
      <h2>Informasi Pengirim</h2>
      <div className="form-group">
        <label htmlFor="senderName">Nama Pengirim</label>
        <input type="text" id="senderName" name="senderName" />
      </div>
      <div className="form-group">
        <label htmlFor="senderPhone">No. HP Pengirim</label>
        <input type="text" id="senderPhone" name="senderPhone" />
      </div>

      <h2>Informasi Penerima</h2>
      <div className="form-group">
        <label htmlFor="recipientName">Nama Penerima</label>
        <input type="text" id="recipientName" name="recipientName" />
      </div>
      <div className="form-group">
        <label htmlFor="recipientPhone">No. HP Penerima</label>
        <input type="text" id="recipientPhone" name="recipientPhone" />
      </div>
      <div className="form-group">
        <label htmlFor="recipientAddress">Alamat Lengkap</label>
        <textarea id="recipientAddress" name="recipientAddress" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="recipientProvince">Provinsi</label>
        <input type="text" id="recipientProvince" name="recipientProvince" />
      </div>
    </form>
  );
}

export default ShippingForm;