import withCSS from '@zeit/next-css';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Optimize and strip unused CSS in production
      config.module.rules.push({
        test: /\.(css)$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-flexbugs-fixes': {},
                  'postcss-preset-env': {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                  },
                },
              },
            },
          },
        ],
      });
    }
    return config;
  },
};

export default withCSS(nextConfig);

