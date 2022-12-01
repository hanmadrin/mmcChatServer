const sequelize = require('sequelize');
const db = require('../configs/database.js');

const AppraisalItem = db.define('appraisalitem',{
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
    status:{
        type: sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'new',
    }
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'AppraisalItems'
});
// AppraisalItem.sync({force: true});
module.exports = AppraisalItem;