require("dotenv").config();

module.exports = {
    username: process.env.DATABASE_USER ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? 'Camargos123@',
    database: process.env.DATABASE_NAME ?? 'r4_dev_db',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_HOST ?? '3306'),
    dialect: process.env.DATABASE_SERVER || "mysql",
};