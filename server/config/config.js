const dotEnv = require("dotenv");
dotEnv.config({ path: `.env` });
module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USER,
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
};
