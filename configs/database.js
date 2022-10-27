const sequelize = require('sequelize');
const env = require('dotenv').config();
module.exports =  new sequelize(
    process.env.DATABASE_NAME||"xentabtw_mmc_chat", 
    process.env.DATABASE_USERNAME||"xentabtw_mmc", 
    process.env.DATABASE_PASSWORD||"xentabtw_mmc", 
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8',
            multipleStatements: true
        }
    }
);