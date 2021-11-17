const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host_address: process.env.DB_HOST,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
