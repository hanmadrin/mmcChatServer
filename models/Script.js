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
    },
    options: {
        // JSON DATA type
        type: sequelize.STRING(10000),
        allowNull: false,
        get: function() {
            return JSON.parse(this.getDataValue('options'));
        },
        set: function(val) {
            return this.setDataValue('options', JSON.stringify(val));
        }
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'scripts'
});
// Script.sync({force: true});
module.exports = Script;