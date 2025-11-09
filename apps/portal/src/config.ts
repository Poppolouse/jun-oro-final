// Frontend environment config
// VITE_API_URL, VITE_R2_PUBLIC_URL gibi değişkenleri kullanır.

const DEFAULT_API = 'https://api.jun-oro.com';
const DEFAULT_R2 = 'https://pub-f31c742a4d8545aba1589f1893c59dab.r2.dev';

export const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API;
export const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || DEFAULT_R2;