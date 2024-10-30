require('dotenv').config();  // Asegura que dotenv cargue las variables de entorno

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,  // Cargar la API Key desde .env.local
  },
  images: {
    domains: ['flagcdn.com'],  // Agrega el dominio flagcdn.com a la lista de dominios permitidos
  },
};

module.exports = nextConfig;