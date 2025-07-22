// src/utils/courierDetector.js

// Daftar pola regex yang diperbarui sesuai dengan nama file logo Anda
const courierPatterns = [
  // Prioritaskan yang lebih spesifik terlebih dahulu
  { courier: 'spx', name: 'Shopee Express', pattern: /^SPXID\d{6,}$/i},
  { courier: 'jnt', name: 'J&T', pattern: /^(JB|JP|JD)\d{8,}$/i },
  { courier: 'sicepat', name: 'SiCepat', pattern: /^(\d{12}|\d{15}|PK\d{6,}|MP\d{6,})$/i },
  { courier: 'anteraja', name: 'Anteraja', pattern: /^(1000\d{8,10}|SJ\d{9,11})$/i },
  { courier: 'jne', name: 'JNE', pattern: /^(\d{12,13}|[A-Z]{2}\d{9}[A-Z]{2})$/i },
  { courier: 'id-express', name: 'ID Express', pattern: /^ID[A-Z]\d{11,14}$/i },
  { courier: 'ninja', name: 'Ninja Xpress', pattern: /^(NVID\d{6,}|SHP\d{6,}|NV\d{10,})$/i },
  { courier: 'posind', name: 'POS Indonesia', pattern: /^(\d{11}|[A-Z]{2}\d{9}ID)$/i },
  { courier: 'lion', name: 'Lion Parcel', pattern: /^\d{2}-\d{10,12}$/ },
  { courier: 'wahana', name: 'Wahana', pattern: /^[A-Z0-9]{7,10}$/i },
  { courier: 'lazada', name: 'Lazada', pattern: /^LXAD\d{6,}$/i },
  // Tambahkan kurir lain di sini jika perlu
];

/**
 * Mendeteksi nama kurir dari nomor resi.
 * @param {string} awb - Nomor resi yang akan dideteksi.
 * @returns {string|null} Nama file logo kurir (misal: 'jne-logo') atau null.
 */
export const detectCourier = (awb) => {
  if (!awb || awb.length < 5) {
    return null;
  }

  for (const { courier, pattern } of courierPatterns) {
    if (pattern.test(awb)) {
      return `${courier}-logo`; // Kembalikan nama yang cocok dengan file (e.g., "jne-logo")
    }
  }

  return null;
};