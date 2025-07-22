// src/utils/courierDetector.js

// Daftar pola regex yang diperbarui sesuai dengan nama file logo Anda
const courierPatterns = [
  // Prioritaskan yang lebih spesifik terlebih dahulu
  { courier: 'spx', name: 'Shopee Express', pattern: /^SPXID/i },
  { courier: 'shopee', name: 'Shopee Express', pattern: /^ID\d{10,}/i },
  { courier: 'jnt', name: 'J&T', pattern: /^(JB|JP|JD)\d+/i },
  { courier: 'sicepat', name: 'SiCepat', pattern: /^00\d{10,}/i },
  { courier: 'anteraja', name: 'Anteraja', pattern: /^1000\d+/i },
  { courier: 'jne', name: 'JNE', pattern: /^\d{15,}/ },
  { courier: 'id-express', name: 'ID Express', pattern: /^ID(E|X)/i },
  { courier: 'ninja', name: 'Ninja Xpress', pattern: /^(NVID|SHP)/i },
  { courier: 'posind', name: 'POS Indonesia', pattern: /^1\d{10}$/ },
  { courier: 'lion', name: 'Lion Parcel', pattern: /^\d{2}-\d{10,}/ },
  { courier: 'wahana', name: 'Wahana', pattern: /^(WPR|WHP)/i },
  { courier: 'lazada', name: 'Lazada', pattern: /^LXAD/i },
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