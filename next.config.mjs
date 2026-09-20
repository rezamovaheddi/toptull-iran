/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  reactCompiler: true,
};

export default nextConfig;
