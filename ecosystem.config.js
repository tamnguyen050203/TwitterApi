// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'twitter-clone-api',
      script: './dist/index.js', // Remove 'node' command
      env: {
        NODE_ENV: 'development',
        TEN_BIEN: 'Gia tri'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
