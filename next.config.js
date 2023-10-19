// const UnoCSS = require("@unocss/webpack").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack: (config) => {
  //   config.cache = false;
  //   config.plugins.push(UnoCSS());
  //   return config;
  // },
};

module.exports = nextConfig;
