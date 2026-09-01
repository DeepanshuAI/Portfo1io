/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Hero frames are blitted to a 2D canvas directly from /public,
    // so we keep formats modern for the few <Image> uses (projects).
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM in places; let Next transpile it.
  transpilePackages: ["three"],
};

export default nextConfig;
