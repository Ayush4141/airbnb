/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental:{
        appDir: true
    },
    images: {
        domains:["avatars.githubusercontent.com","lh3.googleusercontent.com","res.cloudinary.com"]
    }
};

export default nextConfig;
