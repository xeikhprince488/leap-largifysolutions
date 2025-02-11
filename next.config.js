/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/fonts/",
            publicPath: "_next/static/fonts/",
          },
        },
      })
      return config
    },
    async headers() {
      return [
        {
          source: "/fonts/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ]
    },
  }
  
  module.exports = nextConfig
  
  