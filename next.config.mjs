/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
  reactCompiler: true,
};

export default nextConfig;
