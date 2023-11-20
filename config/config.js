require('dotenv').config();

module.exports = {
  database: {
    database: process.env.DB_NAME || 'defaultdb',
    username: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_BmBcoWP3dNvPJlUFJlW',
    host: process.env.DB_HOST || 'mysql-382b2428-ikanid-9057.a.aivencloud.com',
    port: process.env.DB_PORT || '25075',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  certificate: {
    privkey: process.env.PRIVKEY_PATH || 'path to priv key',
    fullchain: process.env.FULLCHAIN_PATH || 'path to fullchain key'
  },
  protocol: process.env.PROTOCOL || 'http',
  port: process.env.APP_PORT || 3000
};
