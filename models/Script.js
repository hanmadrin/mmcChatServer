const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Script = db.define('script',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(10),
        autoIncrement: true,
    },
    code: {
        type: sequelize.STRING(200),
        allowNull: false
    },
    content: {
        type: sequelize.STRING(1000),
        allowNull: false
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'scripts'
});
// Script.sync({force: true});
module.exports = Script;