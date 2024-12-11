import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: process.env.NODE_ENV === 'production' ?
  //         `${process.env.BACKEND_URL_LOCAL}/api/:path*` :
  //         `${process.env.BACKEND_URL_LOCAL}/api/:path*`
  //     }
  //   ]
  // },
};

export default nextConfig;
