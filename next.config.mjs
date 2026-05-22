/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/charter-partners",
        destination: "/partner/charter",
        permanent: true,
      },
      {
        source: "/list-your-marina",
        destination: "/partner/marina",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
