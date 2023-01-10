const sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DATABASE_NAME);
console.log(process.env.DATABASE_USERNAME);
console.log(process.env.DATABASE_PASSWORD);
module.exports = new sequelize(
    process.env.DATABASE_NAME || "xentabtw_mmc_chat",
    process.env.DATABASE_USERNAME || "xentabtw_mmc",
    process.env.DATABASE_PASSWORD || "xentabtw_mmc",
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8',
            multipleStatements: true
        }
    }
);