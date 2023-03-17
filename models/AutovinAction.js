const sequelize = require('sequelize');
const db = require('../configs/database.js');

const AutovinAction = db.define('autovin_action',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER(30),
        autoIncrement: true,
    },
    item_id: {
        // unique: true,
        type: sequelize.STRING(30),
        allowNull: false
    },
    account_id :{
        type: sequelize.INTEGER(30),
        allowNull: false
    },
    action:{
        type: sequelize.STRING(100),
        allowNull: false
    },
    timestamp: {
        type: sequelize.STRING(15),
        allowNull: false
    },  
},{
    timestamps: false,
    // freezeTableName: true,
    // tableName: 'actions'
});
// AutovinAction.sync({force: true});
module.exports = AutovinAction;