const sequelize = require('sequelize');
require('dotenv').config();
// console.log(process.env.DATABASE_NAME);
// console.log(process.env.DATABASE_USERNAME);
// console.log(process.env.DATABASE_PASSWORD);
module.exports = new sequelize(
    process.env.DATABASE_NAME || "xentabtw_mmc_chat",
    process.env.DATABASE_USERNAME || "rimo",
    process.env.DATABASE_PASSWORD || "p@ssword69",
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8',
            collate: 'utf8mb4_general_ci',
            multipleStatements: true
        },
        logging: false,
    }
);