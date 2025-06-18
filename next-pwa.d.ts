// types/next-pwa.d.ts
declare module "next-pwa" {
  import type { NextConfig } from "next";

  type PWAConfig = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    // Add more options as needed
  };

  const withPWA: (options: PWAConfig) => (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}
