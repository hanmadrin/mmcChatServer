const sequelize = require('sequelize');
const db = require('../configs/database.js');

const RawItem = db.define('RawItem',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(10),
        autoIncrement: true,
    },
    item_id:{
        type: sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    taken:{
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: false,
});
// RawItem.sync({force: true});
module.exports = RawItem;