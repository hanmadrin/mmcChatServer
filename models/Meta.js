const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Meta = db.define('meta',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(30),
        autoIncrement: true,
    },
    key: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    value: {
        type: sequelize.STRING(1000),
        allowNull: false
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'metas'
});
// Meta.sync({force: true});
module.exports = Meta;