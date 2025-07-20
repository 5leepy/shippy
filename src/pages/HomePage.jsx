import React from 'react';
import ShippingForm from '../components/ShippingForm';

function HomePage() {
  return (
    <div>
      <h1>ShippyLabel - Cetak Label Pengiriman</h1>
      <p>Aplikasi untuk membuat label pengiriman dengan mudah.</p>

      <hr />

      {/* TAMPILKAN FORM DI SINI */}
      <ShippingForm />
    </div>
  );
}

export default HomePage;